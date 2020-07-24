import React from 'react'

import style from './emaillink.module.css'

export default function EmailLink ({ to, children }) {
  return (
    <a href={to} className={style.email}>{children}</a>
  )
}
