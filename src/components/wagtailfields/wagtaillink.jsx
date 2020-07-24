import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import PageLink from './pagelink'

export default function WagtailLink ({ cheerioBlock, children }) {
  const block = cheerioBlock
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
  if (block.attribs.id && block.attribs.linktype === 'page') {
    return <PageLink pageId={block.attribs.id}>{children}</PageLink>
  } else if (block.attribs.id && block.attribs.linktype === 'document') {
    const docs = data.wagtail.documents
    const doc = docs.filter((doc) => doc.id === block.attribs.id).shift()
    if (doc) {
      const graphQLEndpointURL = new URL(data.sitePlugin.pluginOptions.url)
      const backendURL = new URL(graphQLEndpointURL.origin)
      const fileURL = new URL('media/' + doc.file, backendURL)
      return <a href={fileURL.href}>{children}</a>
    } else {
      return null
    }
  }

  return (
    <a>{children}</a>
  )
}
