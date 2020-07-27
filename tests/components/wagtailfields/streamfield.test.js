/* eslint-env jest */
import { extractSrcFromEmbedIframe } from '../../../src/components/wagtailfields/streamfield'

describe('StreamField Component Helper Function', () => {
  it('Extracts src from embed iframe', () => {
    const result = extractSrcFromEmbedIframe('html')
    expect(result).toBe(null)
  })
})
