/* eslint-env jest */
import { extractSrcFromEmbedIframe } from '../../../src/components/wagtailfields/streamfield'

describe('StreamField Component Helper Function', () => {
  it('Extracts src from embed iframe', () => {
    const iframehtml = '<div>\n    <iframe width=\"480\" height=\"270\" src=\"https://www.youtube.com/embed/osBmpCfuzmQ?feature=oembed\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\n</div>\n'
    const result = extractSrcFromEmbedIframe(iframehtml)
    expect(result).toBe('https://www.youtube.com/embed/osBmpCfuzmQ?feature=oembed')
  })
})
