import React from 'react'

import style from './externallink.module.css'

export default function ExternalLink ({ to, children }) {
  return (
    <a href={to} className={style.external} target='_blank' rel='noopener noreferrer'>{children}</a>
  )
}
