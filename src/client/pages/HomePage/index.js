import React, { Component } from 'react'

import Header from 'components/Header'
import PasswordInput from 'components/ui/InputField/PasswordInput'

export default class HomePage extends Component {
  render() {
    return (
      <div className="home-page">
        <div className="container">
          <Header />
          <PasswordInput />
          <h2>Home Page</h2>
          <h4>Some Page</h4>
        </div>
      </div>
    )
  }
}
