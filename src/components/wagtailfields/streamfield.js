import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import cheerio from 'cheerio'

import RichTextField from './richtext'
import Heading from '../heading'
import EmailLink from '../links/emaillink'
import ExternalLink from '../links/externallink'
import DocumentLink from './documentlink'
import ResponsiveIframe from '../responsiveiframe'

export function extractSrcFromEmbedIframe (html) {
  const $ = cheerio.load(html)
  const iframe = $('iframe').toArray().pop()
  if (iframe) {
    return iframe.attribs.src
  } else {
    return null
  }
}

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

  const fields = []

  for (const item of streamField) {
    switch (item.field) {
      case 'heading': {
        fields.push(<Heading key={item.id} level={2}>{item.value}</Heading>)
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
        fields.push(<div key={item.id}><input type='checkbox' checked={item.boolValue} readOnly /></div>)
        break
      }
      case 'date': {
        fields.push(<div key={item.id}><time dateTime={item.isoValue}>{item.usHuman}</time></div>)
        break
      }
      case 'time': {
        fields.push(<div key={item.id}><time dateTime={item.isoTime}>{item.usHumanTime}</time></div>)
        break
      }
      case 'datetime': {
        fields.push(<div key={item.id}><time dateTime={item.isoDateTime}>{item.usHumanDateTime}</time></div>)
        break
      }
      case 'rawhtml': {
        fields.push(<div key={item.id} dangerouslySetInnerHTML={{ __html: item.value }} />)
        break
      }
      case 'blockquote': {
        fields.push(<div key={item.id}><blockquote>{item.value}</blockquote></div>)
        break
      }
      case 'choice': {
        const choices = []
        for (const choice of item.choices) {
          choices.push(
            <div key={item.id + choice.key}>
              <input id={choice.key} type='radio' value={choice.value} checked={choice.key === item.value} readOnly />
              <label htmlFor={choice.key}>{choice.value}</label>
            </div>
          )
        }
        fields.push(
          <fieldset key={item.id}>
            <legend>{item.field}</legend>
            {choices}
          </fieldset>
        )
        break
      }
      case 'page': {
        fields.push(<div key={item.id}><Link to={item.page.url}>{item.page.title}</Link></div>)
        break
      }
      case 'doc': {
        fields.push(<div key={item.id}><DocumentLink documentId={item.document.id}>{item.document.title}</DocumentLink></div>)
        break
      }
      case 'embed': {
        let src = extractSrcFromEmbedIframe(item.value)
        src += '&modestbranding=1&rel=0&fs=1'
        fields.push(<div key={item.id}><ResponsiveIframe src={src} /></div>)
        break
      }
      case 'static': {
        fields.push(<div key={item.id}>ADD WHAT EVER THE STATIC BLOCK STANDS FOR.</div>)
        break
      }
      case 'person': {
        const person = {}
        for (const block of item.blocks) {
          person[block.id] = block.value
        }
        fields.push(
          <div key={item.id}>
            <p>
              I do not really want to deal with the image non-sense right now that this is creating.
              Because the `blocks` field can not be queried, I only get the
              image path. And because I already have an image query in the streamfield file
              I would need to create an additional file, because only one query per file is allowed.
              It's not impossible, but I just do not want to do it right now.
            </p>
            <p>
              Just found out that the `blocks` query only breaks once an image is selected for
              the `ImageChooserBlock` in the `StructBlock`.
            </p>
            <div>
              Oh, yea, here is the rest of the data:<br />
              <strong>{person.first_name} {person.last_name}</strong><br />
              <em>{person.biography}</em>
            </div>
          </div>
        )
        break
      }
      case 'list': {
        const listItems = item.items.map((i) => <li key={i.id}>{i.value}</li>)
        fields.push(<ul key={item.id}>{listItems}</ul>)
        break
      }
      default: {
        fields.push(<div key={item.id} style={{ backgroundColor: 'yellow', marginTop: '1em' }} dangerouslySetInnerHTML={{ __html: item.field + ': ' + item.rawValue }} />)
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
