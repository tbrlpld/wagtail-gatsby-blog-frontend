import React from 'react'
import { graphql } from 'gatsby'

export default ({ data }) => {
  const { page } = data.wagtail

  return (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.body }} />
    </div>
  )
}

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
