/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')
const { createWagtailPages } = require('gatsby-source-wagtail/pages.js')

const createTagPages = (graphql, actions) => {
  return graphql(`
    query {
      wagtail {
        tags {
          id
          name
          slug
        }
      }
    }
  `).then(
    res => {
      const { createPage } = actions
      const tags = res.data.wagtail.tags
      tags.forEach(tag => {
        createPage({
          path: `tags/${tag.slug}`,
          component: path.resolve('./src/templates/tagindexpage.jsx'),
          context: {
            tagId: tag.id
          }
        })
      })
    }
  )
}

exports.createPages = ({ graphql, actions }) => {
  // Automatically create pages from Wagtail pages
  return createWagtailPages({
    'home.HomePage': 'templates/home.js',
    'blog.BlogPage': 'templates/blogpage.js',
    'blog.BlogIndexPage': 'templates/blogindexpage.jsx',
    'blog.BlogCategory': 'templates/blogcategory.jsx'
  }, graphql, actions, []).then(
    /*
    Additional pages that do not have a corresponding page in Wagtail but that
    are still created automatically from data. Each additional function should be in another `then()`
    call. This is basically chaining the Promises and makes sure that `createPages` is returning a
    final promise.
    */
    createTagPages(graphql, actions)
  )
}
