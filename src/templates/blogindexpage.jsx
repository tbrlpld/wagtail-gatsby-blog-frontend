import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

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
    <Layout>
      <h1>{page.title}</h1>
      <ul>
        {children}
      </ul>
    </Layout>
  )
}
