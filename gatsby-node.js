/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')
const fs = require('fs')
const { createWagtailPages } = require('gatsby-source-wagtail/pages.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const createDocument = async () => {
  const testFileContent = 'Some nonsense string'
  await fs.writeFile('./static/testfile.txt', testFileContent, (err) => {
    if (err) {
      throw err
    } else {
      console.log('Create')
    }
  })
}

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
  await createDocument()

  // Automatically create pages from Wagtail pages
  await createWagtailPages(
    {
      'home.HomePage': 'templates/home.js',
      'blog.BlogPage': 'templates/blogpage.js',
      'blog.BlogIndexPage': 'templates/blogindexpage.jsx',
      'blog.BlogCategory': 'templates/blogcategory.jsx',
      'blog.BlogCategoriesIndex': 'templates/blogcategoriesindex.jsx'
    },
    graphql,
    actions,
    [
      'fragments/blogpage.js',
      'fragments/streamfield.js'
    ]
  )

  // Create pages that are not represented in Wagtail
  await createTagPages(graphql, actions)
}

// Disable CSS order warnings
// https://stackoverflow.com/questions/63124432/how-do-i-configure-mini-css-extract-plugin-in-gatsby
exports.onCreateWebpackConfig = ({
  stage, getConfig, rules, loaders, actions
}) => {
  if (stage === 'build-javascript') {
    const config = getConfig()
    const miniCssExtractPlugin = config.plugins.find(plugin => plugin.constructor.name === 'MiniCssExtractPlugin')
    miniCssExtractPlugin.options.ignoreOrder = true
    actions.replaceWebpackConfig(config)
  }
}
