import React from 'react'

import style from './responsiveiframe.module.css'

export default function ResponsiveIframe ({ src }) {
  return (
    <div className={style.iframeContainer}>
      <iframe src={src} frameborder='0' />
    </div>
  )
}
