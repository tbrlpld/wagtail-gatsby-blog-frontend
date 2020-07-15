import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import ArticleList from '../components/articlelist'

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
  const articles = page.children

  return (
    <Layout>
      <h1>{page.title}</h1>
      <ArticleList articles={articles} />
    </Layout>
  )
}
