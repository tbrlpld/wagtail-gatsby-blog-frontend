import { graphql } from 'gatsby'

export const streamFieldDataFragment = graphql`
fragment StreamFieldData on StreamFieldInterface {
  id
  field
  rawValue
  ... on CharBlock {
    id
    value
  }
  ... on RichTextBlock {
    id
    value
  }
  ... on ImageChooserBlock {
    image {
      src
      imageFile {
        id
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
  }
  ... on TextBlock {
    id
    value
  }
}
`
