import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import ArticleList from '../components/articlelist'
import TagPill from '../components/tagpill'

export const query = graphql`
  query Tag  ($tagId: ID) {
    wagtail {
      tag(id: $tagId) {
        id
        slug
        name
        blogBlogpagetagItems {
          contentObject {
            ... BlogPageInfo
          }
        }
      }
    }
  }
`

export default ({ data }) => {
  const tag = data.wagtail.tag
  const articles = data.wagtail.tag.blogBlogpagetagItems.map(taggedItem => taggedItem.contentObject)

  return (
    <Layout>
      <h1>Tag <TagPill slug={tag.slug} name={tag.name} /></h1>
      <ArticleList articles={articles} />
    </Layout>
  )
}
