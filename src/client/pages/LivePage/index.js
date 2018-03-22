import React, { Component } from 'react'
import s from './LivePage.styl'

// import HeroSection from './HeroSection'
import PhotosSection from './PhotosSection'

export default class LivePage extends Component {
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll)
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
    sections.forEach(s => {
      const innerHeight = s
        .querySelector('.page-section')
        .getBoundingClientRect().height
      s.style.height = `${innerHeight}px`
      // s.classList.toggle('stuck', this.isInViewport(s))
    })
    this.isLayoutBusy = false
  }

  render() {
    return (
      <div className={s.container}>
        <div className="cd-section">
          <PhotosSection className="page-section" />
        </div>
      </div>
    )
  }
}
