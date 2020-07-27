import { graphql } from 'gatsby'

export const query = graphql`
fragment StreamFieldData on StreamFieldInterface {
  id
  field
  rawValue
  ... on CharBlock {
    value
  }
  ... on RichTextBlock {
    value
  }
  ... on ImageChooserBlock {
    image {
      id
      src
    }
  }
  ... on TextBlock {
    value
  }
  ... on EmailBlock {
    value
  }
}
`
