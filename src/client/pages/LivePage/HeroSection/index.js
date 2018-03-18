import React, { Component } from 'react'
import classnames from 'classnames'

import s from './HeroSection.styl'

import { Link } from 'react-router-dom'
import Logo from 'components/ui/Logo'

export default class LivePageHeroSection extends Component {
  render() {
    const cx = classnames(s.container, 'hero-section', this.props.className)
    return (
      <div className={cx}>
        <Link to="/" className="live-logo-link">
          <Logo white className="live-logo" />
        </Link>
        <div className="hero-row">
          <div className="hero-word w-digi">DIGITAL SKETCHBOOK</div>
          <div className="hero-word w-cine">CINEMAGRAPHS</div>
        </div>
        <div className="hero-row">
          <div className="hero-word w-trav">TRAVEL DIARY</div>
          <div className="hero-word w-dood">DOODLES</div>
        </div>
        <div className="hero-row">
          <div className="hero-word w-gif">GIF HACKS</div>
          <div className="hero-word w-mogr">MOGRAPHS</div>
          <div className="hero-word w-colo">COLOUR PALETTE</div>
        </div>
        <div className="hero-row in-center">
          <div className="hero-word in-left w-hack">HACKS</div>
          <div className="hero-word in-center">
            <div className="subword-live">LIVE</div>
            <div className="subword-dot">.</div>
            <div className="subword-soon">SOON</div>
          </div>
          <div className="hero-word w-medi">MEDIUM</div>
        </div>
        <div className="hero-row">
          <div className="hero-word w-blog">BLOGS</div>
          <div className="hero-word w-cine2">CINEMAGRAPHS</div>
          <div className="hero-word w-yout">YOUTUBE</div>
        </div>
        <div className="hero-row">
          <div className="hero-word w-lots">LOTS N LOTS OF IDEAS</div>
          <div className="hero-word w-reje">REJECTS</div>
        </div>
        <div className="hero-row">
          <div className="hero-word w-oran">ORANGE &</div>
          <div className="hero-word w-teal">TEAL</div>
          <div className="hero-word w-tuto">TUTORIALS</div>
        </div>
        <div className="hero-row">
          <div className="hero-word w-hand">HAND LETTERING</div>
          <div className="hero-word w-pet">PET PROJECTS</div>
        </div>
      </div>
    )
  }
}
