import React, { Component } from 'react'
import InputField from './index'

import isFunction from 'lodash/isFunction'
import { isEmail } from 'utils/validation'

export default class EmailInput extends Component {
  state = {
    error: null,
    value: ''
  }

  onChange = e => {
    const value = e.target.value
    const message = 'Please enter a valid email'
    let isValid = isEmail(value) ? true : false
    let error = !value || isValid ? '' : message

    this.setState({ error, isValid })

    if (isFunction(this.props.onChange)) {
      this.props.onChange(e, value)
    }
  }

  render() {
    const { className, value, type, onChange, ...otherProps } = this.props

    return (
      <InputField
        type="email"
        value={this.state.value}
        error={this.state.error}
        isValid={this.state.isValid}
        onChange={this.onChange}
        {...otherProps}
      />
    )
  }
}
