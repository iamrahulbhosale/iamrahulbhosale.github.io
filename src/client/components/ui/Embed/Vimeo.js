import React from 'react'
import classnames from 'classnames'

const VimeoEmbed = ({ url, title, className }) => (
  <iframe
    title={title}
    src={url}
    className={classnames('ui-embed-item', className)}
    width="640"
    height="400"
    frameBorder="0"
    allowFullScreen
  />
)

export default VimeoEmbed
