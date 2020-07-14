/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { createWagtailPages } = require('gatsby-source-wagtail/pages.js')

exports.createPages = ({ graphql, actions }) => {
  return createWagtailPages({
    'home.HomePage': 'templates/home.js',
    'blog.BlogPage': 'templates/blogpage.js',
    'blog.BlogIndexPage': 'templates/blogindexpage.jsx'
  }, graphql, actions, [])
}
