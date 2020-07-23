import React from 'react'
import { Link } from 'gatsby'
import cheerio from 'cheerio'

// export function stripWrappingDivFromRawRichText (rawRichText) {
//   if (rawRichText.startsWith('<div class="rich-text">')) {
//     return rawRichText.slice(23, -6)
//   } else {
//     return rawRichText
//   }
// }

function richTextBlocksToComponents (richTextBlocks = []) {
  const processedBlocks = []
  richTextBlocks.forEach((block, index) => {
    console.log(index, block)
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
        case 'ol':
          processedBlocks.push(<ol key={index}>{childrenComponents}</ol>)
          break
        case 'ul':
          processedBlocks.push(<ul key={index}>{childrenComponents}</ul>)
          break
        case 'li':
          processedBlocks.push(<li key={index}>{childrenComponents}</li>)
          break
        case 'hr':
          processedBlocks.push(<hr key={index} />)
          break
        case 'br':
          processedBlocks.push(<br key={index} />)
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
  console.log(rawRichText)
  console.log(rawRichTextBlocks)

  const richTextComponents = richTextBlocksToComponents(rawRichTextBlocks)

  // rawRichTextBlocks.forEach((block, index) => {
  //   console.log(block)
  //   block.children.forEach((subblock, index) => console.log(subblock))
  //   richTextBlocks.push(
  //     <div key={index} dangerouslySetInnerHTML={{ __html: $.html(block) }} />
  //   )
  // })

  // const links = $('a[linktype=page]').toArray()
  // console.log(links)
  // links.forEach((link) => {
  //   link.name = 'Link'
  //   link.attribs.to = '/'
  // })
  // console.log(links)

  // const newHTML = $('body').html()

  return (
    <>
      {richTextComponents}
    </>
  )
}
