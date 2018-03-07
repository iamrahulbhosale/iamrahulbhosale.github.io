import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import s from './Avatar.styl'

const getInitials = str => {
  return str
    .split(' ')
    .slice(0, 2)
    .filter(x => x)
    .map(x => x[0])
}

const Avatar = props => {
  const { image, name, className, lg, sm } = props

  const cx = classnames(
    s.container,
    'ui-avatar',
    {
      'is-sm': sm,
      'is-lg': lg
    },
    className
  )

  return (
    <div className={cx}>
      {!!image ? (
        <img className="avatar-img" alt="" src={image} />
      ) : (
        <div className="avatar-name">{getInitials(name)}</div>
      )}
    </div>
  )
}

Avatar.propTypes = {
  lg: PropTypes.bool,
  sm: PropTypes.bool,
  name: PropTypes.string,
  image: PropTypes.string
}

export default Avatar
