import React, { Component } from 'react'

import s from './HomePage.styl'

import HeroSection from './HeroSection'
import ContentSection from './ContentSection'
import PortfolioSections from './PortfolioSections'
import AwardsSection from './AwardsSection'
import FocusSection from './FocusSection'
import ThanksSection from './ThanksSection'

export default class HomePage extends Component {
  state = {
    jqueryReady: false
  }
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll)
    this.loadjQuery()
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll)
  }

  loadjQuery = () => {
    import('jquery')
      .then(mod => {
        this.setState({ jqueryReady: true })
        window.jQuery = window.$ = mod.default
        console.log('jquery is ready')
      })
      .catch(console.error.bind(console))
  }

  handleScroll = () => {
    const dw = document.documentElement.clientWidth || window.innerWidth
    if (dw < 768) {
      return
    }
    if (this.isLayoutBusy) {
      return
    }
    window.requestAnimationFrame(this.updateLayout)
    this.isLayoutBusy = true
  }

  updateLayout = e => {
    const sections = Array.from(document.querySelectorAll('.cd-section'))
    sections.forEach(this.fixHeights)
    sections.forEach(this.fixSectionIfInViewport)

    // const current = sections.filter(this.isInViewport)
    // console.log('current in viewport: ', current)

    this.isLayoutBusy = false
  }

  fixSectionIfInViewport = section => {
    const inViewport = this.isInViewport(section)
    if (!inViewport) {
      section.classList.contains('stuck') && section.classList.remove('stuck')
    } else {
      !section.classList.contains('stuck') && section.classList.add('stuck')
    }
    return section
  }

  fixHeights = (section, index) => {
    const innerHeight = section
      .querySelector('.page-section')
      .getBoundingClientRect().height

    const value = `${innerHeight}px`

    if (section.style.height !== value) {
      section.style.height = `${innerHeight}px`
    }

    return section
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
        <div className="cd-section">
          <FocusSection className="page-section" />
        </div>
        <div className="cd-section">
          <ThanksSection className="page-section" />
        </div>

        <div className="contact-button">
          <img className="img-fluid" alt="" src="/public/img/hand-image.png" />
        </div>
      </div>
    )
  }
}
