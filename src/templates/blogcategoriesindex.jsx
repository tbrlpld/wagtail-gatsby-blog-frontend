import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

export const query = graphql`
  query ($slug: String) {
    wagtail {
      page(slug: $slug) {
        id
        title
        ... on BlogCategoriesIndex {
          id
          children {
            id
            title
            url
          }
        }
      }
    }
  }
`

export default ({ data }) => {
  const categories = data.wagtail.page.children
  return (
    <Layout>
      <h1>Categories</h1>
      {categories.map((category) => <div key={category.id}><Link to={category.url}>{category.title}</Link></div>)}
    </Layout>
  )
}
