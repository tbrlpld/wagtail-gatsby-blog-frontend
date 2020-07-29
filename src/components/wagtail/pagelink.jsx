import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

export default function PageLink ({ pageId, children }) {
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
  const page = pages.filter((page) => page.id === pageId).shift()
  if (page) {
    return <Link to={page.url}>{children}</Link>
  } else {
    return null
  }
}
