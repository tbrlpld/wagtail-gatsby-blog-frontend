import { graphql } from 'gatsby'

export const query = graphql`
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
      id
      src
    }
  }
  ... on TextBlock {
    id
    value
  }
}
`
