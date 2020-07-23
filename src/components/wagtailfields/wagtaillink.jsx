import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

export default function WagtailLink ({ cheerioBlock, children }) {
  const block = cheerioBlock
  // console.log(block)
  const data = useStaticQuery(graphql`
    query {
      wagtail {
        pages {
          id
          url
        }
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
    const pages = data.wagtail.pages
    const page = pages.filter((page) => page.id === block.attribs.id).shift()
    const toURL = page && page.url
    return <Link to={toURL}>{children}</Link>
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
