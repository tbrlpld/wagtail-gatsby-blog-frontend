import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import TagPill from '../components/tagpill'

export const query = graphql`
  query {
    wagtail {
      tags {
        id
        name
        slug
        blogBlogpagetagItems {
          id
        }
      }
    }
  }
`

export default ({ data }) => {
  // Only tags used on articles should be listed here.
  const tags = data.wagtail.tags.filter(tag => tag.blogBlogpagetagItems.length > 0)
  return (
    <Layout>
      <h1>Tags</h1>
      {/* Linking to the  slug is enough, because it is added relative to the current pags URL. */}
      {tags.map((tag) => <TagPill slug={tag.slug} name={tag.name} key={tag.slug} />)}
    </Layout>
  )
}
