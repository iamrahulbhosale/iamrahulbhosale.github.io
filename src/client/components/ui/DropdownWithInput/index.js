import React, { Component } from 'react'
import classnames from 'classnames'

import Dropdown from 'components/ui/Dropdown'

import s from './DropdownWithInput.styl'

export default class DropdownWithInput extends Component {
  render() {
    const {
      className,
      dropdownClassName,
      children,
      placeholder,
      ...others
    } = this.props
    const cx = classnames(s.container, 'ui-dropdown-with-input', className)

    return (
      <Dropdown className={cx} {...others}>
        <input
          className="ui-dropdown-with-input-input"
          type="text"
          placeholder={placeholder}
        />
        {children}
      </Dropdown>
    )
  }
}
