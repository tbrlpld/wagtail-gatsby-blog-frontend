import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

export default function ImageFluid ({ imageId }) {
  // Yes this is overkill and not how GraphQL should be used,
  // but I need a workaround until multiple imageFile fields in the same
  // query can be handled correctly in the preview.
  // https://github.com/GrappleGQL/gatsby-source-wagtail/issues/19#issuecomment-663930385
  // There are also issues with the stability of queries to the imageFile with the development
  // server that sometimes fail inexplicably. I will refrain from querying imageFile in page queries
  // altogether now.
  const data = useStaticQuery(graphql`
    query AllImages {
      wagtail {
        images {
          id
          src
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
  const image = filteredImages[0]
  console.log('Create Image with ID', imageId, image)
  if (image) {
    return (
      <Img fluid={image.imageFile.childImageSharp.fluid} />
    )
  } else {
    return null
  }
}
