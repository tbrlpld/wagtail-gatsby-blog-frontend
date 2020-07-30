import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import RichTextField from '../components/wagtail/richtext'
import StreamField from '../components/wagtail/streamfield'
import TagPill from '../components/tagpill'
import Heading from '../components/heading'

const ArticleTags = ({ tags }) => {
  if (tags && tags.length > 0) {
    const tagElements = tags.map((tag) => <TagPill slug={tag.slug} name={tag.name} key={tag.slug} />)
    return (
      <span>{tagElements}</span>
    )
  }
  return null
}

export default ({ data }) => {
  const page = data.wagtail.page

  let heroImageFluid = null
  if (page.galleryImages && page.galleryImages.length > 0) {
    heroImageFluid = page.galleryImages[0].image.imageFile.childImageSharp.fluid
  }

  return (
    <Layout>
      <article>
        {
          heroImageFluid &&
            <Img fluid={heroImageFluid} />
        }
        <Heading level={1} setSelfAnchor={false}>{page.title}</Heading>
        <p><ArticleTags tags={page.tags} /></p>
        <p><em>{page.intro}</em></p>
        <RichTextField rawRichText={page.body} />
        <StreamField streamField={page.freeformbody} />
      </article>
    </Layout>
  )
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
          image {
            id
            src
            imageFile {
              childImageSharp {
                fluid(grayscale: true) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        freeformbody {
          ...StreamFieldData
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
