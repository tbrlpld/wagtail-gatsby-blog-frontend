import React from 'react'

import style from './emaillink.module.css'

export default function EmailLink ({ email, children }) {
  return (
    <a href={'mailto:' + email} className={style.email} target='_blank' rel='noopener noreferrer'>{children}</a>
  )
}
