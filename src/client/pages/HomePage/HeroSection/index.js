import React, { Component } from 'react'
import classnames from 'classnames'

import { Link } from 'react-router-dom'

import Sidebar, { SidebarLinks } from 'components/Sidebar'

// import { TRANSITION_END_EVENT } from 'utils/constants'
import s from './HeroSection.styl'

const PROFILE_IMAGE = '/public/img/profile-image.jpg'

export default class HeroSection extends Component {
  state = {
    imageLoaded: false
  }
  componentDidMount = () => {
    this.waitForImage(PROFILE_IMAGE)
      .then(() => this.setState({ imageLoaded: true }))
      .then(() => this.startAnimations())
  }

  waitForImage = imageUrl => {
    if (!imageUrl) {
      return Promise.reject(`'imageUrl' not supplied`)
    }
    const img = document.createElement('img')
    return new Promise((resolve, reject) => {
      img.onload = function() {
        resolve()
      }
      img.onerror = function() {
        reject()
      }
      img.src = imageUrl
    })
  }

  startAnimations = () => {
    const texts = Array.from(this.container.querySelectorAll('.hero-text'))
    const image = this.container.querySelector('.profile-image')

    texts.map(x => x.classList.add('will-animate'))
    image.classList.add('will-animate')
  }

  render() {
    const cx = classnames(
      s.container,
      'hero-section bg-dark',
      this.props.className
    )

    const imageStyle = this.state.imageLoaded
      ? { backgroundImage: `url(${PROFILE_IMAGE})` }
      : {}

    return (
      <div className={cx} ref={node => (this.container = node)}>
        <Sidebar hasLogo white>
          <SidebarLinks />
        </Sidebar>
        <div className="container hero-text-container">
          <span className="hero-text">
            <div class="text-inner">I’m a designer who believes design</div>
          </span>
          <span className="hero-text">
            <div class="text-inner">thinking can solve most problems.</div>
          </span>
          <span className="hero-text">
            <div class="text-inner">
              Philosophy:&nbsp;
              <span className="highlight">Good design is obvious.</span>
            </div>
          </span>
        </div>
        <div className="profile-image" style={imageStyle} />
        <div className="go-down-button hide-offscreen">
          <img className="img-fluid" alt="" src="/public/img/arrow-down.gif" />
        </div>
        <Sidebar right white>
          <Link to="/live" className="live-button">
            LIVE
          </Link>
        </Sidebar>
      </div>
    )
  }
}
