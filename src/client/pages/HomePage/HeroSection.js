import React, { Component } from 'react'
import classnames from 'classnames'

import { Link } from 'react-router-dom'

import Sidebar, { SidebarLinks } from 'components/Sidebar'

export default class HeroSection extends Component {
  componentDidMount = () => {
    setTimeout(this.animate, 400)
  }

  animate = () => {
    this.container.classList.add('will-animate')
  }

  render() {
    const cx = classnames('hero-section bg-dark', this.props.className)
    return (
      <div className={cx} ref={node => (this.container = node)}>
        <Sidebar hasLogo white>
          <SidebarLinks />
        </Sidebar>
        <div className="container hero-text-container">
          <h2 className="hero-text">I’m a designer who believes design</h2>
          <h2 className="hero-text">thinking can solve most problems.</h2>
          <h2 className="hero-text">
            Philosophy:&nbsp;
            <span className="highlight">Good design is obvious.</span>
          </h2>
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
