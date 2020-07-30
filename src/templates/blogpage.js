import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import ImageFluid from '../components/wagtail/image'
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

function HeroImage (props) {
  const galleryImages = props.galleryImages

  if (galleryImages && galleryImages.length > 0) {
    return (
      <ImageFluid imgageId={galleryImages.shift().image.id} />
    )
  } else {
    return null
  }
}

export default ({ data }) => {
  const page = data.wagtail.page
  console.log(page)

  return (
    <Layout>
      <article>
        <Heading level={1} setSelfAnchor={false}>{page.title}</Heading>
        <p><ArticleTags tags={page.tags} /></p>
        <p><em>{page.intro}</em></p>
        <HeroImage galleryImages={page.galleryImages} />
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
