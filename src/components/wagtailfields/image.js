import React from 'react'

export default function Image (props) {
  const src = props.src
  const srcSet = props.srcSet
  const sizes = props.sizes

  return (
    <picture key={srcSet + sizes}>
      <source sizes={sizes} srcSet={srcSet} />
      <img src={src} alt='Alternative title' />
    </picture>
  )
}
