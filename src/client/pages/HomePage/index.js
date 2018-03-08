import React, { Component } from 'react'

import Header from 'components/Header'
import ParallaxContainer from 'components/ui/ParallaxContainer'
import PasswordInput from 'components/ui/InputField/PasswordInput'

import s from './HomePage.styl'

export default class HomePage extends Component {
  render() {
    return (
      <div className={s.container}>
        <ParallaxContainer
          className="hero-section"
          backgroundImage="/public/img/sample-bg-3.jpg">
          <div className="container">
            <Header transparent />
          </div>
        </ParallaxContainer>
        <div className="container">
          <PasswordInput />
          <h2>Home Page</h2>
          <h4>Some Page</h4>
          <h2>Home Page</h2>
          <h4>Some Page</h4>
          <h2>Home Page</h2>
          <h4>Some Page</h4>
          <h2>Home Page</h2>
          <h4>Some Page</h4>
          <h2>Home Page</h2>
          <h4>Some Page</h4>
          <h2>Home Page</h2>
          <h4>Some Page</h4>
          <h2>Home Page</h2>
          <h4>Some Page</h4>
          <h2>Home Page</h2>
          <h4>Some Page</h4>
        </div>
      </div>
    )
  }
}
