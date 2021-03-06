import React from 'react'
import cheerio from 'cheerio'

import Heading from '../heading'
import ExternalLink from '../links/externallink'
import EmailLink from '../links/emaillink'
import TelephoneLink from '../links/telephonelink'
import PageLink from './pagelink'
import DocumentLink from './documentlink'

function RichTextLink ({ cheerioBlock, children }) {
  const block = cheerioBlock

  if (block.attribs.id && block.attribs.linktype === 'page') {
    return <PageLink pageId={block.attribs.id}>{children}</PageLink>
  } else if (block.attribs.id && block.attribs.linktype === 'document') {
    return <DocumentLink documentId={block.attribs.id}>{children}</DocumentLink>
  } else if (block.attribs.href && block.attribs.href.startsWith('http')) {
    return <ExternalLink to={block.attribs.href}>{children}</ExternalLink>
  } else if (block.attribs.href && block.attribs.href.startsWith('mailto')) {
    return <EmailLink email={block.attribs.href.split(':').pop()}>{children}</EmailLink>
  } else if (block.attribs.href && block.attribs.href.startsWith('tel')) {
    return <TelephoneLink to={block.attribs.href}>{children}</TelephoneLink>
  } else if (block.attribs.href && block.attribs.href.startsWith('#')) {
    return <a href={block.attribs.href}>{children}</a>
  } else {
    console.log(block)
    return (
      <mark>{children}</mark>
    )
  }
}

function richTextBlocksToComponents (richTextBlocks = []) {
  const processedBlocks = []
  richTextBlocks.forEach((block, index) => {
    if (block.type === 'tag') {
      const childrenComponents = richTextBlocksToComponents(block.children)
      switch (block.name) {
        case 'div':
          processedBlocks.push(<div key={index}>{childrenComponents}</div>)
          break
        case 'p':
          processedBlocks.push(<p key={index}>{childrenComponents}</p>)
          break
        case 'h2':
          processedBlocks.push(<Heading level={2} key={index}>{childrenComponents}</Heading>)
          break
        case 'h3':
          processedBlocks.push(<Heading level={3} key={index}>{childrenComponents}</Heading>)
          break
        case 'h4':
          processedBlocks.push(<Heading level={4} key={index}>{childrenComponents}</Heading>)
          break
        case 'h5':
          processedBlocks.push(<Heading level={5} key={index}>{childrenComponents}</Heading>)
          break
        case 'h6':
          processedBlocks.push(<Heading level={6} key={index}>{childrenComponents}</Heading>)
          break
        case 'ol':
          processedBlocks.push(<ol key={index}>{childrenComponents}</ol>)
          break
        case 'ul':
          processedBlocks.push(<ul key={index}>{childrenComponents}</ul>)
          break
        case 'li':
          processedBlocks.push(<li key={index}>{childrenComponents}</li>)
          break
        case 'blockquote':
          processedBlocks.push(<blockquote key={index}>{childrenComponents}</blockquote>)
          break
        case 'hr':
          processedBlocks.push(<hr key={index} />)
          break
        case 'br':
          processedBlocks.push(<br key={index} />)
          break
        case 'b':
          processedBlocks.push(<strong key={index}>{childrenComponents}</strong>)
          break
        case 'i':
          processedBlocks.push(<em key={index}>{childrenComponents}</em>)
          break
        case 'sup':
          processedBlocks.push(<sup key={index}>{childrenComponents}</sup>)
          break
        case 'sub':
          processedBlocks.push(<sub key={index}>{childrenComponents}</sub>)
          break
        case 's':
          processedBlocks.push(<s key={index}>{childrenComponents}</s>)
          break
        case 'code':
          processedBlocks.push(<code key={index}>{childrenComponents}</code>)
          break
        case 'a':
          processedBlocks.push(<RichTextLink key={index} cheerioBlock={block}>{childrenComponents}</RichTextLink>)
          break
        case 'embed':
          console.log('Ignoring embedded image or video')
          break
        default:
          processedBlocks.push(<>{'<' + block.name + '>'}{childrenComponents}{'</' + block.name + '>'}</>)
          break
      }
    } else if (block.type === 'text') {
      processedBlocks.push(block.data)
    }
  })
  return processedBlocks
}

export default function RichTextField (props) {
  const rawRichText = props.rawRichText

  const $ = cheerio.load(rawRichText)
  const rawRichTextBlocks = $('body').children().toArray()

  const richTextComponents = richTextBlocksToComponents(rawRichTextBlocks)

  return (
    <>
      {richTextComponents}
    </>
  )
}
