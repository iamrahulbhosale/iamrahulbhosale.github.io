import React, { Component } from 'react'

import AppShell from 'containers/AppShell'
// import PasswordInput from 'components/ui/InputField/PasswordInput'

import s from './HomePage.styl'

// import HeroSection from './HeroSection'

export default class HomePage extends Component {
  state = {
    isHeaderFixed: true
  }
  render() {
    const headerProps = {
      fixed: this.state.isHeaderFixed
    }

    return (
      <AppShell className={s.container} headerProps={headerProps}>
        <div className="container">will be using this as</div>
      </AppShell>
    )
  }
}
