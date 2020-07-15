/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')
const { createWagtailPages } = require('gatsby-source-wagtail/pages.js')

exports.createPages = async ({ graphql, actions }) => {
  // Automatically create pages from Wagtail pages
  createWagtailPages({
    'home.HomePage': 'templates/home.js',
    'blog.BlogPage': 'templates/blogpage.js',
    'blog.BlogIndexPage': 'templates/blogindexpage.jsx',
    'blog.BlogCategory': 'templates/blogcategory.jsx'
  }, graphql, actions, [])

  /*
  Additional pages that do not have a corresponding page in Wagtail but that
  are still created automatically from data.
  */
  const { createPage } = actions
  const result = await graphql(`
    query {
      wagtail {
        tags {
          id
          name
          slug
        }
      }
    }
  `)

  const tags = result.data.wagtail.tags
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
