const path = require('path')

const createTagPages = async (graphql, actions) => {
  const response = await graphql(`
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

  const { createPage } = actions
  const tags = response.data.wagtail.tags

  await tags.forEach(tag => {
    createPage({
      path: `tags/${tag.slug}`,
      component: path.resolve('./src/templates/tagindexpage.jsx'),
      context: {
        tagId: tag.id
      }
    })
  })
}

module.exports = createTagPages
