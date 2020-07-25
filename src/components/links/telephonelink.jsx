import React from 'react'

import style from './telephonelink.module.css'

export default function TelephoneLink ({ to, children }) {
  return (
    <a href={to} className={style.phone} rel='noopener noreferrer'>{children}</a>
  )
}
