import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import RichTextField from './richtext'
import Heading from '../heading'

function StreamImage ({ imageId }) {
  // Yes this is overkill and not how GraphQL should be used,
  // but I need a workaround until multiple imageFile fields in the same
  // query can be handled correctly in the preview.
  // https://github.com/GrappleGQL/gatsby-source-wagtail/issues/19#issuecomment-663930385
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
    return image.id === imageId
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
        // fields.push(<Img key={item.id} fluid={item.image.imageFile.childImageSharp.fluid} />)
        fields.push(<StreamImage key={item.id} imageId={item.image.id} />)
        break
      }
      default: {
        fields.push(<div style={{ backgroundColor: 'yellow', marginTop: '1em' }} dangerouslySetInnerHTML={{ __html: item.rawValue }} />)
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
