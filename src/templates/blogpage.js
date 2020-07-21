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
    page(slug: $slug) {
      ... on BlogPage {
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
            src  # This is needed to have two imageFile fields in one query
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
  #        ... on ImageChooserBlock {
  #          image {
  #            src  # This is needed to have two imageFile fields in one query
  #            imageFile {
  #              id
  #              childImageSharp {
  #                fluid {
  #                  ...GatsbyImageSharpFluid
  #                }
  #              }
  #            }
  #          }
  #        }
        }
        tags {
          id
          slug
          name
        }
      }
    }
  }
}
`

function HeroImage (props) {
  const galleryImages = props.galleryImages

  if (galleryImages && galleryImages.length > 0) {
    return (
      <Img fluid={galleryImages[0].image.imageFile.childImageSharp.fluid} />
    )
  } else {
    return null
  }
}

export default ({ data }) => {
  const page = data.wagtail.page

  return (
    <Layout>
      <article>
        <h1>{page.title}</h1>
        <p><ArticleTags tags={page.tags} /></p>
        <p><em>{page.intro}</em></p>
        <HeroImage galleryImages={page.galleryImages} />
        <RichTextField rawRichText={page.body} />
        {/* <StreamField streamField={page.freeformbody} /> */}
      </article>
    </Layout>
  )
}
