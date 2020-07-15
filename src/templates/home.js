import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

export const query = graphql`
  query($slug: String ) {
    wagtail {
      page(slug: $slug) {
        ... on HomePage {
          title
          body
        }
      }
    }
  }
`

export default ({ data }) => {
  const { page } = data.wagtail

  return (
    <Layout>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.body }} />
    </Layout>
  )
}
