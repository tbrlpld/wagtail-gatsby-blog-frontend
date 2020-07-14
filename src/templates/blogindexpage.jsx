import React from 'react'
import { graphql, Link } from 'gatsby'

export const query = graphql`
  query ($slug: String) {
    wagtail {
      page(slug: $slug) {
        ... on BlogIndexPage {
          id
          title
          seoTitle
          seoDescription
          searchDescription
          showInMenus
          children(order: "-first_published_at",) {
            ...BlogPageInfo
          }
          contentType
          pageType
        }
      }
    }
  }
`

export default ({ data }) => {
  const page = data.wagtail.page
  const children = page.children.map((child) => (
    <li key={child.url}><Link to={child.url}>{child.title}</Link></li>
  ))

  return (
    <>
      <h1>{page.title}</h1>
      <ul>
        {children}
      </ul>
    </>
  )
}
