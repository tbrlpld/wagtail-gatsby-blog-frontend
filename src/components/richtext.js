import React from 'react'

function stripWrappingDivFromRawRichText (rawRichText) {
  if (rawRichText.startsWith('<div class="rich-text">')) {
    return rawRichText.slice(23, -6)
  } else {
    return rawRichText
  }
}

export default function RichTextField (props) {
  const rawRichText = props.rawRichText
  const cleanedRichText = stripWrappingDivFromRawRichText(rawRichText)
  return (
    <section dangerouslySetInnerHTML={{ __html: cleanedRichText }} />
  )
}
