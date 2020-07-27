import React from 'react'
import PropTypes from 'prop-types'

import style from './responsiveiframe.module.css'

function ResponsiveIframe ({ src, heightByWidth }) {
  const paddingTop = String(heightByWidth * 100) + '%'
  return (
    <div className={style.iframeContainer} style={{ paddingTop: paddingTop }}>
      <iframe src={src} frameborder='0' allowFullScreen />
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
