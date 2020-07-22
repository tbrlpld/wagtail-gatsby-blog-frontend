
import React from 'react'
import { useStaticQuery } from 'gatsby'

import renderer from 'react-test-renderer'

import Header from '../../src/components/header.js'

describe('Header', () => {
  useStaticQuery.mockImplementationOnce(() => (
    {
      wagtail: {
        pages: [{ 
          id: 1,
          showInMenus: true,
          title: 'Testpage',
          url: 'http://localhost/testpage'
        }]
      },
      site: {
        siteMetadata: {
          title: 'Site Title'
        }
      }
    }
  ))
  it('renders correctly', () => {
    const tree = renderer
      .create(<Header />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
