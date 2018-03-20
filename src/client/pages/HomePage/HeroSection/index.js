import React, { Component } from 'react'
import classnames from 'classnames'

import { Link } from 'react-router-dom'

import Sidebar, { SidebarLinks } from 'components/Sidebar'

import { TRANSITION_END_EVENT } from 'utils/constants'

import s from './HeroSection.styl'

export default class HeroSection extends Component {
  componentDidMount = () => {
    setTimeout(this.animate, 400)
    console.log('will use event: ', TRANSITION_END_EVENT)
  }

  animate = () => {
    const texts = Array.from(this.container.querySelectorAll('.hero-text'))
    const lastText = texts[texts.length - 1]

    TRANSITION_END_EVENT.split(' ').forEach(evt => {
      lastText.addEventListener(evt, this.onTextAnimationComplete)
    })

    texts.forEach(x => x.classList.add('will-animate'))
  }

  onTextAnimationComplete = e => {
    console.log('transition done')
    this.container.querySelector('.profile-image').classList.add('will-animate')
  }

  render() {
    const cx = classnames(
      s.container,
      'hero-section bg-dark',
      this.props.className
    )
    return (
      <div className={cx} ref={node => (this.container = node)}>
        <Sidebar hasLogo white>
          <SidebarLinks />
        </Sidebar>
        <div className="container hero-text-container">
          <span className="hero-text">I’m a designer who believes design</span>
          <span className="hero-text">thinking can solve most problems.</span>
          <span className="hero-text">
            Philosophy:&nbsp;
            <span className="highlight">Good design is obvious.</span>
          </span>
        </div>
        <div className="profile-image" />
        <div className="go-down-button">
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
