/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')
const { createWagtailPages } = require('gatsby-source-wagtail/pages.js')

const createTagPages = async (graphql, actions) => {
  return await graphql(`
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

exports.createPages = async ({ graphql, actions }) => {
  // Automatically create pages from Wagtail pages
  await createWagtailPages({
    'home.HomePage': 'templates/home.js',
    'blog.BlogPage': 'templates/blogpage.js',
    'blog.BlogIndexPage': 'templates/blogindexpage.jsx',
    'blog.BlogCategory': 'templates/blogcategory.jsx'
  }, graphql, actions, [])
  // Create pages that are not represented in Wagtail
  await createTagPages(graphql, actions)
}
