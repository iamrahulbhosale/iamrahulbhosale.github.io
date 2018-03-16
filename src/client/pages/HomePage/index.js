import React, { Component } from 'react'
import s from './HomePage.styl'

// import './scroll-effects.css'

import HeroSection from './HeroSection'
import ContentSection from './ContentSection'

// const SCROLL_EFFECT_BREAKPOINT = 768

export default class HomePage extends Component {
  render() {
    return (
      <div className={s.container}>
        <HeroSection className="cd-section visible page-section" />
        <ContentSection className="cd-section page-section" />
        <div className="contact-button">
          <img className="img-fluid" alt="" src="/public/img/hand-image.png" />
        </div>
      </div>
    )
  }
}
