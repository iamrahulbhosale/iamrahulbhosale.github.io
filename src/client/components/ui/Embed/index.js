import React from 'react'
import classnames from 'classnames'
import s from './Embed.styl'

const getEmbedClassName = (providedClassName, ratio = '640x400') =>
  classnames(s.container, 'ui-embed', providedClassName, `ui-embed-${ratio}`)

const Embed = props => {
  return (
    <div className={getEmbedClassName(props.className, props.ratio)}>
      {props.children}
    </div>
  )
}

export { default as VimeoEmbed } from './Vimeo'

export default Embed
