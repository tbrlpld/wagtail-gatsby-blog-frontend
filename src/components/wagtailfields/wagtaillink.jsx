import React from 'react'

import PageLink from './pagelink'
import DocumentLink from './documentlink'

export default function WagtailLink ({ cheerioBlock, children }) {
  const block = cheerioBlock

  if (block.attribs.id && block.attribs.linktype === 'page') {
    return <PageLink pageId={block.attribs.id}>{children}</PageLink>
  } else if (block.attribs.id && block.attribs.linktype === 'document') {
    return <DocumentLink documentId={block.attribs.id}>{children}</DocumentLink>
  } else {
    return (
      <a>{children}</a>
    )
  }
}
