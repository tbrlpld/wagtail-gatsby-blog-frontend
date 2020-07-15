import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import PropTypes from 'prop-types'

import style from './header.module.css'

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      wagtail {
        pages {
          id
          showInMenus
          title
          url
        }
      }
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const siteTitle = data.site.siteMetadata.title
  const menuEntries = data.wagtail.pages.filter((page) => (
    page.showInMenus === true && page.url !== '/'
  ))
  const menuElements = menuEntries.map((entry) => (
    <span key={entry.url} style={{ marginRight: '1em' }}><Link to={entry.url}>{entry.title}</Link></span>
  ))

  return (
    <header>
      <div className={style.siteTitle}>
        <Link to='/'>{siteTitle}</Link>
      </div>
      <nav>
        {menuElements}
      </nav>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ''
}

export default Header
