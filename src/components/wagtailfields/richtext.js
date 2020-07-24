import React from 'react'
import cheerio from 'cheerio'

import PageLink from './pagelink'
import DocumentLink from './documentlink'
import ExternalLink from './externallink'
import EmailLink from './emaillink'
import TelephoneLink from './telephonelink'

function RichTextLink ({ cheerioBlock, children }) {
  const block = cheerioBlock

  if (block.attribs.id && block.attribs.linktype === 'page') {
    return <PageLink pageId={block.attribs.id}>{children}</PageLink>
  } else if (block.attribs.id && block.attribs.linktype === 'document') {
    return <DocumentLink documentId={block.attribs.id}>{children}</DocumentLink>
  } else if (block.attribs.href && block.attribs.href.startsWith('http')) {
    return <ExternalLink to={block.attribs.href}>{children}</ExternalLink>
  } else if (block.attribs.href && block.attribs.href.startsWith('mailto')) {
    return <EmailLink to={block.attribs.href}>{children}</EmailLink>
  } else if (block.attribs.href && block.attribs.href.startsWith('tel')) {
    return <TelephoneLink to={block.attribs.href}>{children}</TelephoneLink>
  } else {
    console.log(block)
    return (
      <a><mark>{children}</mark></a>
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
          processedBlocks.push(<h2 key={index}>{childrenComponents}</h2>)
          break
        case 'h3':
          processedBlocks.push(<h3 key={index}>{childrenComponents}</h3>)
          break
        case 'h4':
          processedBlocks.push(<h4 key={index}>{childrenComponents}</h4>)
          break
        case 'h5':
          processedBlocks.push(<h5 key={index}>{childrenComponents}</h5>)
          break
        case 'h6':
          processedBlocks.push(<h6 key={index}>{childrenComponents}</h6>)
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
