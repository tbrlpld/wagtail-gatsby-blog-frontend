import React from 'react'
import { graphql, Link } from 'gatsby'

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
  const children = category.blogpages.map((child) => (
    <li key={child.url}><Link to={child.url}>{child.title}</Link></li>
  ))

  return (
    <>
      <h1>{category.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: category.intro }} />
      {children.length > 0 ? <ul>{children}</ul> : <div>Sorry, there are no articles in this category.</div>}
    </>
  )
}
