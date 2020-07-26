import { graphql } from 'gatsby'

export const query = graphql`
  fragment BlogPageInfo on BlogPage {
    id
    slug
    url
    title
    tags {
      id
      slug
      name
    }
  }
`
