/* eslint-env jest */

import { stripWrappingDivFromRawRichText } from '../../../src/components/wagtailfields/richtext'

describe('Helper function to strip wrapping div from raw richtext', () => {
  it('Returns original string if not wrapped by div', () => {
    const stripped = stripWrappingDivFromRawRichText('Any string')
    expect(stripped).toEqual('Any string')
  })
})
