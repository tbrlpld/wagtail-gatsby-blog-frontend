import React from 'react'
import { Link } from 'gatsby'

import TagPill from './tagpill'

const ArticleTags = ({ tags }) => {
  if (tags && tags.length > 0) {
    const tagElements = tags.map((tag) => <TagPill slug={tag.slug} name={tag.name} key={tag.slug} />)
    return (
      <span style={{ marginLeft: '1em' }}>{tagElements}</span>
    )
  }
  return null
}

const ArticleList = ({ articles }) => {
  if (!articles.length > 0) {
    return <div>Sorry, no articles found.</div>
  }
  const articleElements = articles.map((article) => (
    <li key={article.url}>
      <Link to={article.url}>{article.title}</Link>
      <ArticleTags tags={article.tags} />
    </li>
  ))
  return (
    <ul>
      {articleElements}
    </ul>
  )
}

export default ArticleList
