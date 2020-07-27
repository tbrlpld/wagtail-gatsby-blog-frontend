import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import RichTextField from './richtext'
import Heading from '../heading'
import EmailLink from '../links/emaillink'
import ExternalLink from '../links/externallink'

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
      case 'text': {
        fields.push(<div key={item.id}><p>{item.value}</p></div>)
        break
      }
      case 'email': {
        fields.push(<EmailLink key={item.id} email={item.value}>{item.value}</EmailLink>)
        break
      }
      case 'integer': {
        fields.push(<div key={item.id}><data value={item.intValue}>{item.intValue}</data></div>)
        break
      }
      case 'float': {
        fields.push(<div key={item.id}><data value={item.floatValue}>{item.floatValue}</data></div>)
        break
      }
      case 'decimal': {
        fields.push(<div key={item.id}><data value={item.decimalValue}>{item.decimalValue}</data></div>)
        break
      }
      case 'regex': {
        fields.push(<div key={item.id}>{item.value}</div>)
        break
      }
      case 'url': {
        fields.push(<div key={item.id}><ExternalLink to={item.value}>{item.value}</ExternalLink></div>)
        break
      }
      case 'bool': {
        fields.push(<div key={item.id}><input type='checkbox' checked={item.boolValue} /></div>)
        break
      }
      case 'date': {
        fields.push(<div key={item.id}><time datetime={item.isoValue}>{item.usHuman}</time></div>)
        break
      }
      case 'time': {
        fields.push(<div key={item.id}><time datetime={item.isoTime}>{item.usHumanTime}</time></div>)
        break
      }
      default: {
        fields.push(<div style={{ backgroundColor: 'yellow', marginTop: '1em' }} dangerouslySetInnerHTML={{ __html: item.field + ': ' + item.rawValue }} />)
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
