import React, { Component } from 'react'
import s from './LivePage.styl'

import HeroSection from './HeroSection'

export default class LivePage extends Component {
  render() {
    return (
      <div className={s.container}>
        <HeroSection />
      </div>
    )
  }
}
