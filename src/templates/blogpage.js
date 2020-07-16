import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import RichTextField from '../components/wagtailfields/richtext'
import StreamField from '../components/wagtailfields/stream'
import TagPill from '../components/tagpill'

const ArticleTags = ({ tags }) => {
  if (tags && tags.length > 0) {
    const tagElements = tags.map((tag) => <TagPill slug={tag.slug} name={tag.name} key={tag.slug} />)
    return (
      <span>{tagElements}</span>
    )
  }
  return null
}

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
        image  {
          imageFile {
            childImageSharp {
              fluid(maxWidth: 800, grayscale: true) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      freeformbody {
        id
        field
        rawValue
        ... on ImageChooserBlock {
          blockType
          image {
            id
            title
            sizes
            src
            srcSet (sizes: [1500, 1000, 500])
          }
        }
      }
      tags {
        id
        slug
        name
      }
    }
  }
}
`

function ConditionalGalleryImage (props) {
  const galleryImage = props.galleryImage

  if (galleryImage !== undefined) {
    return (
      <Img fluid={galleryImage.image.imageFile.childImageSharp.fluid} />
    )
  } else {
    return null
  }
}

export default ({ data }) => {
  const page = data.wagtail.blogPage

  console.log(page.freeformbody)

  return (
    <Layout>
      <article>
        <h1>{page.title}</h1>
        <p><ArticleTags tags={page.tags} /></p>
        <p><em>{page.intro}</em></p>
        <ConditionalGalleryImage galleryImage={page.galleryImages[0]} />
        <RichTextField rawRichText={page.body} />
        <StreamField streamField={page.freeformbody} />
      </article>
    </Layout>
  )
}
