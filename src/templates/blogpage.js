import React from 'react'
import { graphql } from 'gatsby'

import RichTextField from '../components/richtext'

export const query = graphql`
query ($slug: String) {
  wagtail {
    blogPage(slug: $slug) {
      id
      title
      intro
      author
      firstPublishedAt
      live
      slug
      url
      body
      galleryImages {
        id
        caption
        image {
          title
          rendition(width: 200) {
            src
          }
        }
      }
      freeformbody {
        id
        field
        rawValue
        ... on ImageChooserBlock {
          image {
            title
            rendition(width: 200) {
              src
            }
          }
        }
      }
    }
  }
}
`

function ConditionalGalleryImage (props) {
  const galleryImage = props.galleryImage

  if (galleryImage !== undefined) {
    return (
      <img src={galleryImage.image.rendition.src} alt={galleryImage.caption} />
    )
  } else {
    return null
  }
}

function StreamField (props) {
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
    }
  }
  return (
    <ul>
      {fields}
    </ul>
  )
}

export default ({ data }) => {
  const page = data.wagtail.blogPage

  return (
    <article>
      <h1>{page.title}</h1>
      <p><em>{page.intro}</em></p>
      <ConditionalGalleryImage galleryImage={page.galleryImages[0]} />
      <RichTextField rawRichText={page.body} />
      <StreamField streamField={page.freeformbody} />
    </article>
  )
}
