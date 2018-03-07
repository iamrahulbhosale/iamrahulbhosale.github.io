import React, { Component } from 'react'
import classnames from 'classnames'
import InputField from './index'

import s from './InputField.styl'

export default class PasswordInput extends Component {
  state = {
    isPasswordVisible: false
  }
  togglePassword = () => {
    this.setState({
      isPasswordVisible: !this.state.isPasswordVisible
    })
  }
  render() {
    const { className, type, ...otherProps } = this.props
    const { isPasswordVisible } = this.state
    const cx = classnames(s.passwordInput, className)
    const toggleClass = classnames('passwordinput-toggle', {
      'is-active': isPasswordVisible
    })

    let inputType = isPasswordVisible ? 'text' : 'password'

    return (
      <InputField className={cx} type={inputType} {...otherProps}>
        <div className={toggleClass} onClick={this.togglePassword}>
          <i className="material-icons">remove_red_eye</i>
        </div>
      </InputField>
    )
  }
}
