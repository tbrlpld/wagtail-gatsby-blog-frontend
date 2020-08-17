import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import style from './documentlink.module.css'

export default function DocumentLink ({ documentId, children }) {
  const data = useStaticQuery(graphql`
    query {
      wagtail {
        documents {
          id
          file
        }
      }
    }
  `)
  const docs = data.wagtail.documents
  const doc = docs.filter((doc) => doc.id === documentId)[0]
  if (doc) {
    if (!doc.file.startsWith('/')) {
      doc.file = '/' + doc.file
    }
    return <a href={doc.file} className={style.docLink} target='_blank' rel='noopener noreferrer'>{children}</a>
  } else {
    return null
  }
}
