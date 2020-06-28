import React from 'react'

import RichTextField from './richtext'

export default function StreamField (props) {
  const streamField = props.streamField
  console.log(streamField)

  const fields = []

  for (const item of streamField) {
    switch (item.field) {
      case 'paragraph': {
        fields.push(<li><RichTextField rawRichText={item.rawValue} /></li>)
        break
      }
      case 'image': {
        fields.push(<li><img src={item.image.rendition.src} alt={item.image.title} /></li>)
        break
      }
      case 'heading': {
        fields.push(<li><h3>{item.rawValue}</h3></li>)
        break
      }
      default: {
        break
      }
    }
  }
  return (
    <ul>
      {fields}
    </ul>
  )
}
