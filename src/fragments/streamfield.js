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
  ... on EmailBlock {
    id
    value
  }
  ... on IntegerBlock {
    id
    intValue: value
  }
  ... on IntegerBlock {
    id
    intValue: value
  }
  ... on FloatBlock {
    id
    floatValue: value
  }
  ... on DecimalBlock {
    id
    decimalValue: value
  }
  ... on RegexBlock {
    id
    value
  }
  ... on URLBlock {
    id
    value
  }
  ... on BooleanBlock {
    id
    boolValue: value
  }
  ... on DateBlock {
    id
    isoValue: value(format: "%Y-%m-%d")
    usHuman: value(format: "%a, %B %d, %Y")
  }
  ... on TimeBlock {
    id
    isoTime: value(format: "%H:%M:%S")
    usHumanTime: value(format: "%I:%M %p")
  }
  ... on DateTimeBlock {
    id
    isoDateTime: value
    usHumanDateTime: value(format: "%I:%M %p %a, %B %d, %Y")
  }
  ... on RawHTMLBlock {
    id
    value
  }
  ... on BlockQuoteBlock {
    id
    value
  }
  ... on ChoiceBlock {
    id
    choices {
      key
      value
    }
    value
  }
  ... on PageChooserBlock {
    id
    page {
      id
      url
      title
    }
  }
  ... on DocumentChooserBlock {
    id
    document {
      file
      id
      title
    }
  }
  ... on EmbedBlock {
    id
    url
    value
  }
  ... on StaticBlock {
    id
    value
  }
  ... on StructBlock {
    id
    rawValue
  }
  ... on ListBlock {
    items {
      ... on CharBlock {
        id
        value
      }
    }
  }
}
`
