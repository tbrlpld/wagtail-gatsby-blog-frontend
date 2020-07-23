import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

export default function WagtailLink ({ cheerioBlock, children }) {
  const block = cheerioBlock
  console.log(block)
  const data = useStaticQuery(graphql`
    query {
      wagtail {
        pages {
          id
          url
        }
      }
    }
  `)
  const pages = data.wagtail.pages
  // const pages = []
  if (block.attribs.id && block.attribs.linktype === 'page') {
    const page = pages.filter((page) => page.id === block.attribs.id).shift()
    const toURL = page && page.url
    return <Link to={toURL}>{children}</Link>
  }
  return (
    <a>{children}</a>
  )
}
