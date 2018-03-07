import React from 'react'

import Dropdown from './Dropdown'

const DropdownWithIconButton = props => {
  const { icon, title, ...otherProps } = props
  return <Dropdown title={icon} {...otherProps} />
}

export default DropdownWithIconButton
