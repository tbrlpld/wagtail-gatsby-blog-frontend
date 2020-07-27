import React from 'react'
import slugify from 'slugify'

import style from './heading.module.css'

function Heading ({ level, children, setSelfAnchor, id }) {
  if (id === undefined) {
    id = slugify(children.toString().toLowerCase())
  }

  let heading = null
  switch (level) {
    case 1:
      heading = <h1 id={id}>{children}</h1>
      break
    case 2:
      heading = <h2 id={id}>{children}</h2>
      break
    case 3:
      heading = <h3 id={id}>{children}</h3>
      break
    case 4:
      heading = <h4 id={id}>{children}</h4>
      break
    case 5:
      heading = <h5 id={id}>{children}</h5>
      break
    case 6:
      heading = <h6 id={id}>{children}</h6>
      break
    default:
      heading = <h1 id={id}>{children}</h1>
      break
  }

  if (setSelfAnchor && id) {
    return (
      <a href={'#' + id} className={style.selfAnchor}>{heading}</a>
    )
  } else {
    return heading
  }
}

Heading.defaultProps = {
  level: 1,
  setSelfAnchor: true
}

export default Heading
