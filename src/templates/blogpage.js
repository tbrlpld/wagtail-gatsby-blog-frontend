import React from 'react'
import { graphql } from 'gatsby'

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
          rendition (width: 200) {
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
            src
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

  console.log(page.galleryImages[0].image.src)

  return (
    <article>
      <h1>{page.title}</h1>
      <p><em>{page.intro}</em></p>
      <ConditionalGalleryImage galleryImage={page.galleryImages[0]} />
      <section>
        <div dangerouslySetInnerHTML={{ __html: page.body }} />
      </section>
    </article>
  )
}
