import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import ArticleList from '../components/articlelist'

export const query = graphql`
  query ($slug: String) {
    wagtail {
      page(slug: $slug) {
        ... on BlogCategory {
          id
          title
          seoTitle
          seoDescription
          searchDescription
          showInMenus
          intro
          blogpages(order: "-first_published_at",) {
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
  const category = data.wagtail.page
  const articles = category.blogpages

  return (
    <Layout>
      <h1>{category.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: category.intro }} />
      <ArticleList articles={articles} />
    </Layout>
  )
}
