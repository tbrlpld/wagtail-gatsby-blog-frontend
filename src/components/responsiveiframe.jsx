import React from 'react'
import PropTypes from 'prop-types'
import slugify from 'slugify'

import style from './responsiveiframe.module.css'

function ResponsiveIframe ({ src, heightByWidth }) {
  const title = slugify(src)
  const paddingTop = String(heightByWidth * 100) + '%'
  return (
    <div className={style.iframeContainer} style={{ paddingTop: paddingTop }}>
      <iframe title={title} src={src} frameBorder='0' allowFullScreen />
    </div>
  )
}

ResponsiveIframe.propTypes = {
  src: PropTypes.string,
  heightByWidth: PropTypes.number
}

ResponsiveIframe.defaultProps = {
  heightByWidth: 9 / 16
}

export default ResponsiveIframe
