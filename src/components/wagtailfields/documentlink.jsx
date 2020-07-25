import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import style from './documentlink.module.css'

export default function DocumentLink ({ documentId, children }) {
  const data = useStaticQuery(graphql`
    query {
      wagtail {
        documents {
          id
          file
        }
      }
      sitePlugin(name: {eq: "gatsby-source-wagtail"}) {
        pluginOptions {
          url
        }
      }
    }
  `)
  const docs = data.wagtail.documents
  const doc = docs.filter((doc) => doc.id === documentId).shift()
  if (doc) {
    const graphQLEndpointURL = new URL(data.sitePlugin.pluginOptions.url)
    const backendURL = new URL(graphQLEndpointURL.origin)
    const fileURL = new URL('media/' + doc.file, backendURL)
    return <a href={fileURL.href} className={style.docLink} target='_blank' rel='noopener noreferrer'>{children}</a>
  } else {
    return null
  }
}
