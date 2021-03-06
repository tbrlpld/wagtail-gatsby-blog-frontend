import React from 'react'
import { Link } from 'gatsby'

const ArticleList = ({ articles }) => {
  if (!articles.length > 0) {
    return <div>Sorry, no articles found.</div>
  }
  const articleElements = articles.map((article) => (
    <li key={article.url}>
      <Link to={article.url}>{article.title}</Link>
    </li>
  ))
  return (
    <ul>
      {articleElements}
    </ul>
  )
}

export default ArticleList
