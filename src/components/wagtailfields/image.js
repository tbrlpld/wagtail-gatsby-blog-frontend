import React from 'react'

export default function Image (props) {
  const id = props.id

  const query = `query {
    images(id: "${id}")
  }`
  console.log(query)

  return (
    <picture>
      <img src='https://images.unsplash.com/photo-1570294034809-48e058c2b0ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80' alt='Alternative title' />
    </picture>
  )
}
