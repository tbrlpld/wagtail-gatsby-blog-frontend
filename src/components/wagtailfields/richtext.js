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

export default function RichTextField (props) {
  const rawRichText = props.rawRichText

  const richTextBlocks = []

  const $ = cheerio.load(rawRichText)
  const rawRichTextBlocks = $('body').children()
  console.log(rawRichTextBlocks)

  rawRichTextBlocks.each((index, block) => {
    console.log(block)
    richTextBlocks.push(
      <div key={index} dangerouslySetInnerHTML={{ __html: $.html(block) }} />
    )
  })

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
      {richTextBlocks}
    </>
  )
}
