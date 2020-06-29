import React from 'react'

export default function Image (props) {
  const sizes = props.sizes
  const src = props.src

  return (
    <picture>
      <source media='(min-width: 800px)' srcset={src} />
      <img src='https://images.unsplash.com/photo-1570294034809-48e058c2b0ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80' alt='Alternative title' />
    </picture>
  )
}
