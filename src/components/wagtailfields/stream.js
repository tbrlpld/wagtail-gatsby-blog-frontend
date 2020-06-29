import React from 'react'

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
          <Image key={item.id} sizes={item.image.sizes} src={item.image.src} srcSet={item.image.srcSet} />
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
