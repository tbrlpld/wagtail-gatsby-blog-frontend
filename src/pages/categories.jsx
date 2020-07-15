import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

export const query = graphql`
  query {
    wagtail {
      blogCategories {
        id
        title
        url
      }
    }
  }
`

export default ({ data }) => {
  const categories = data.wagtail.blogCategories
  return (
    <Layout>
      <h1>Categories</h1>
      {categories.map((category) => <div key={category.url}><Link to={category.url}>{category.title}</Link></div>)}
    </Layout>
  )
}
