import React, { Component } from 'react'

import AppShell from 'containers/AppShell'
import PasswordInput from 'components/ui/InputField/PasswordInput'

import s from './HomePage.styl'

import HeroSection from './HeroSection'

export default class HomePage extends Component {
  state = {
    isHeaderFixed: true
  }
  render() {
    const headerProps = {
      fixed: this.state.isHeaderFixed,
      transparent: true
    }

    return (
      <AppShell className={s.container} headerProps={headerProps}>
        <HeroSection />
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
      </AppShell>
    )
  }
}
