import React from 'react'
import { Link } from 'gatsby'

import style from './tagpill.module.css'

const TagPill = ({ slug, name }) => {
  return <Link to={`/tags/${slug}`} className={style.tagPill}>{name}</Link>
}

export default TagPill
