import React from 'react'
import Img from 'gatsby-image'

import RichTextField from './richtext'
import Image from './image'

export default function StreamField (props) {
  const streamField = props.streamField

  const fields = []

  for (const item of streamField) {
    switch (item.field) {
      case 'paragraph': {
        fields.push(<RichTextField key={item.id} rawRichText={item.rawValue} />)
        break
      }
      case 'image': {
        fields.push(
          <Img fluid={item.image.imageFile.childImageSharp.fluid} />
        )
        break
      }
      case 'heading': {
        fields.push(<h3 key={item.id}>{item.rawValue}</h3>)
        break
      }
      default: {
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
