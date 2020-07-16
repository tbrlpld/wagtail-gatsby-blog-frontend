import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'
// import RichTextField from '../components/wagtailfields/richtext'
// import StreamField from '../components/wagtailfields/stream'
// import TagPill from '../components/tagpill'

// const ArticleTags = ({ tags }) => {
//   if (tags && tags.length > 0) {
//     const tagElements = tags.map((tag) => <TagPill slug={tag.slug} name={tag.name} key={tag.slug} />)
//     return (
//       <span>{tagElements}</span>
//     )
//   }
//   return null
// }

// export const query = graphql`
// query ($slug: String) {
//   wagtail {
//     blogPage(slug: $slug) {
//       id
//       title
//       intro
//       author
//       firstPublishedAt
//       live
//       slug
//       url
//       body
//       galleryImages {
//         id
//         caption
//         image  {
//           imageFile {
//             childImageSharp {
//               fluid(maxWidth: 800, grayscale: true) {
//                 ...GatsbyImageSharpFluid
//               }
//             }
//           }
//         }
//       }
//       freeformbody {
//         id
//         field
//         rawValue
//         ... on ImageChooserBlock {
//           blockType
//           image {
//             id
//             title
//             sizes
//             src
//             srcSet (sizes: [1500, 1000, 500])
//           }
//         }
//       }
//       tags {
//         id
//         slug
//         name
//       }
//     }
//   }
// }
// `

export const query = graphql`
query {
  wagtail {
    blogPage(slug: "first-article") {
      id
      title
      galleryImages {
        id
        image {
          src  # This is needed to have two imageFile fields in one query
          imageFile {
            id
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      freeformbody {
        id
        field
        ... on ImageChooserBlock {
          image {
            src  # This is needed to have two imageFile fields in one query
            imageFile {
              id
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
}
`

function HeroImage (props) {
  const galleryImages = props.galleryImages

  if (galleryImages !== undefined) {
    return (
      <Img fluid={galleryImages[0].image.imageFile.childImageSharp.fluid} />
    )
  } else {
    return null
  }
}

export default ({ data }) => {
  const page = data.wagtail.blogPage

  console.log(page)
  console.log(page.freeformbody)

  const imageBlock = page.freeformbody.filter((item) => {
    if (item.field === 'image') {
      return true
    }
    return false
  })[0]
  console.log(imageBlock)

  return (
    <Layout>
      <article>
        <HeroImage galleryImages={page.galleryImages} />
        <Img fluid={imageBlock.image.imageFile.childImageSharp.fluid} />
      </article>
    </Layout>
  )

  // return (
  //   <Layout>
  //     <article>
  //       <h1>{page.title}</h1>
  //       <p><ArticleTags tags={page.tags} /></p>
  //       <p><em>{page.intro}</em></p>
  //       <ConditionalGalleryImage galleryImage={page.galleryImages[0]} />
  //       <RichTextField rawRichText={page.body} />
  //       <StreamField streamField={page.freeformbody} />
  //     </article>
  //   </Layout>
  // )
}
