import { graphql } from 'gatsby'

export const blogPageFragment = graphql`
  fragment BlogPageInfo on BlogPage {
    id
    slug
    url
    title
  }
`
