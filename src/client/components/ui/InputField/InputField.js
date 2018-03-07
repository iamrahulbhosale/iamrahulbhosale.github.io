import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import isFunction from 'lodash/isFunction'

import s from './InputField.styl'

export default class InputField extends Component {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    label: PropTypes.string,
    isValid: PropTypes.bool,
    inputRef: PropTypes.func
  }

  componentDidMount = () => {
    if (typeof this.props.inputRef === 'function') {
      this.props.inputRef(this.input)
    }
  }

  onChange = e => {
    const value = e.target.value
    this.input.parentElement.classList.toggle('is-empty', !value)
    if (isFunction(this.props.onChange)) {
      this.props.onChange(e, value)
    }
  }

  render() {
    const {
      className,
      error,
      label,
      type,
      value,
      isValid,
      children,

      onChange,
      inputRef,

      ...others
    } = this.props

    const cx = classnames(s.container, 'ui-inputfield', className, {
      'is-empty': !value,
      'has-error': !!error,
      'is-valid': isValid
    })

    return (
      <div className={cx}>
        {!!label && <label className="ui-inputfield-label"> {label} </label>}
        <input
          type={type}
          ref={node => (this.input = node)}
          defaultValue={value}
          className="ui-inputfield-input"
          onChange={this.onChange}
          {...others}
        />
        {!!error && <div className="ui-inputfield-error">{error}</div>}
        {children}
      </div>
    )
  }
}
