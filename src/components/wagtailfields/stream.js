import React from 'react'
import Img from 'gatsby-image'

import RichTextField from './richtext'
import Heading from '../heading'

export default function StreamField (props) {
  const streamField = props.streamField
  console.log(streamField)

  const fields = []

  for (const item of streamField) {
    switch (item.field) {
      case 'heading': {
        fields.push(<Heading level={2} key={item.id}>{item.value}</Heading>)
        break
      }
      case 'paragraph': {
        fields.push(<RichTextField key={item.id} rawRichText={item.value} />)
        break
      }
      case 'image': {
        fields.push(<Img key={item.id} fluid={item.image.imageFile.childImageSharp.fluid} />)
        break
      }
      case 'text': {
        fields.push(<div key={item.id}>{item.value}</div>)
        break
      }
      default: {
        fields.push(<div style={{ backgroundColor: 'yellow' }} dangerouslySetInnerHTML={{ __html: item.rawValue }} />)
        break
      }
    }
  }
  return (
    <section>
      {fields}
    </section>
  )
}
