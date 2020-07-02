/* eslint-env jest */

import { stripWrappingDivFromRawRichText } from '../../../src/components/wagtailfields/richtext'

describe('Helper function to strip wrapping div from raw richtext', () => {
  it('Returns original string if not wrapped by div', () => {
    const notStripped = stripWrappingDivFromRawRichText('Any string')
    expect(notStripped).toEqual('Any string')
  })

  it('Does not remove warpping div without the `rich-text` class', () => {
    const rawRichtext = '<div><p>Some text in the rawtext field.</p></div>'
    const notStripped = stripWrappingDivFromRawRichText(rawRichtext)
    expect(notStripped).toEqual(rawRichtext)
  })

  it('Removes wrapping div', () => {
    const rawRichtext = '<div class="rich-text"><p>Some text in the rawtext field.</p></div>'
    const stripped = stripWrappingDivFromRawRichText(rawRichtext)
    expect(stripped).toEqual('<p>Some text in the rawtext field.</p>')
  })
})
