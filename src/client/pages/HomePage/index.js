import React, { Component } from 'react'

import s from './HomePage.styl'

import HeroSection from './HeroSection'
import ContentSection from './ContentSection'
import PortfolioSections from './PortfolioSections'
import AwardsSection from './AwardsSection'

export default class HomePage extends Component {
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    window.requestAnimationFrame(this.updateLayout)
  }

  updateLayout = e => {
    const sections = Array.from(document.querySelectorAll('.cd-section'))
    sections.forEach(s => {
      const innerHeight = s
        .querySelector('.page-section')
        .getBoundingClientRect().height
      s.style.height = `${innerHeight}px`
      s.classList.toggle('stuck', this.isInViewport(s))
    })
  }

  isInViewport = section => {
    /* eslint-disable*/
    const dh = document.documentElement.clientHeight || window.innerHeight

    const bounds = section.getBoundingClientRect()
    const offetTop = section.offsetTop
    const scrollY = window.scrollY
    if (bounds.bottom <= dh && bounds.height - bounds.top >= dh) {
      return true
    }

    return false
    /* eslint-enable*/
  }

  render() {
    return (
      <div className={s.container}>
        <div className="cd-section stuck">
          <HeroSection className="page-section" />
        </div>
        <div className="cd-section">
          <ContentSection className="page-section" />
        </div>

        <PortfolioSections />

        <div className="cd-section">
          <AwardsSection className="page-section" />
        </div>

        <div className="contact-button">
          <img className="img-fluid" alt="" src="/public/img/hand-image.png" />
        </div>
      </div>
    )
  }
}
