import React, { Component } from 'react'
import classnames from 'classnames'

import round from 'lodash/round'

import { Link } from 'react-router-dom'
import Logo from 'components/ui/Logo'

import PhotosGrid from './PhotosGrid'

import s from './PhotosSection.styl'

export default class LivePhotosSection extends Component {
  // componentDidMount = () => {
  //   window.addEventListener('scroll', this._scalePortfolioImage)
  // }

  // componentWillUnmount = () => {
  //   window.removeEventListener('scroll', this._scalePortfolioImage)
  // }
  scalePortfolioImage = () => {
    const dw = document.documentElement.clientWidth || window.innerWidth
    const dh = document.documentElement.clientHeight || window.innerHeight
    const bounds = this.container.getBoundingClientRect()
    // const factor = 0.8

    if (dw < 768) {
      return
    }

    var perc
    if (bounds.top >= 0 && bounds.top < dh) {
      perc = round(bounds.top / dh, 2)
    } else {
      perc = 0
    }

    const images = this.container.querySelectorAll('.photo-inner')

    images.forEach(
      (image, index) => (image.style.transform = `scale(${1 + perc})`)
    )

    this.isScaleImageBusy = false
  }

  render() {
    const cx = classnames(s.container, 'photos-section', this.props.className)
    return (
      <div className={cx} ref={node => (this.container = node)}>
        <Link to="/" className="live-logo-link">
          <Logo white className="live-logo" />
        </Link>
        <div className="horizontal-text">
          <div className="horizontal-text-inner">
            DIGITAL SKETCHBOOK/ LOVE FOR CINEMA/ ORANGE AND TEAL COLOUR THINGY/
            COLLECTION OF PET PROJECTS/ REJECTS/ DOODLES/ & LOTS OF IDEAS.
          </div>
        </div>
        {/* <div className="page-title">
            <span className="sw-rahul">RAHUL</span>
            <span className="sw-dot">.</span>
            <span className="sw-live">LIVE</span>
            </div> */}

        <div className="photos-grid-container">
          <PhotosGrid />
        </div>
      </div>
    )
  }
}
