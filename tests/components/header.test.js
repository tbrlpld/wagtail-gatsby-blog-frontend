import React from 'react'
import renderer from 'react-test-renderer'

import Header from '../../src/components/header.js'

describe('Header', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Header siteTitle='Default Stater' />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
