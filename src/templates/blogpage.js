import React from 'react'
import { graphql } from 'gatsby'

import RichTextField from '../components/wagtailfields/richtext'
import StreamField from '../components/wagtailfields/stream'

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
            id
            title
            sizes
            src
            srcSet (sizes: [2000, 1000, 500])
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
