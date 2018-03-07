import React, { Component } from 'react'
import classnames from 'classnames'

import s from './Checkbox.styl'

class Checkbox extends Component {
  render() {
    const { className, label, checked, onChange, ...otherProps } = this.props
    const cx = classnames(s.container, 'ui-checkbox', className)

    return (
      <div className={cx}>
        <input
          type="checkbox"
          className="ui-checkbox-input"
          defaultChecked={checked}
          onChange={onChange}
          {...otherProps}
        />
        {!!label && <label className="ui-checkbox-label">{label}</label>}
      </div>
    )
  }
}

export default Checkbox
