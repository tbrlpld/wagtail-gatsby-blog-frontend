import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import RichTextField from './richtext'

function StreamImage (props) {
  const imageTitle = props.imageRawValue

  // Yes this is overkill and not how GraphQL should be used,
  // but I need a workaround until the fragments for the different stream field blocks
  // can be used.
  // https://github.com/GrappleGQL/gatsby-source-wagtail/issues/21
  const data = useStaticQuery(graphql`
    query AllImages {
      wagtail {
        images {
          id
          title
          imageFile {
            childImageSharp {
              fluid {
                ... GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)
  const images = data.wagtail.images

  const filteredImages = images.filter(function (image) {
    return image.title === imageTitle
  })

  // I guess this is an ok workaround, because I am not actually pulling the images
  // and until now, also no image processing is triggered.
  if (filteredImages) {
    const image = filteredImages[0]
    return (
      <Img fluid={image.imageFile.childImageSharp.fluid} />
    )
  } else {
    return null
  }
}

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
          <StreamImage imageRawValue={item.rawValue} />
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
