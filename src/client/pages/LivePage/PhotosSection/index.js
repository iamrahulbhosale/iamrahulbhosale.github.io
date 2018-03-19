import React, { Component } from 'react'
import classnames from 'classnames'

import round from 'lodash/round'

import Sidebar, { SidebarLinks } from 'components/Sidebar'

import s from './PhotosSection.styl'

export default class LivePhotosSection extends Component {
  componentDidMount = () => {
    this._scalePortfolioImage = e => {
      !this.isScaleImageBusy &&
        window.requestAnimationFrame(() => {
          this.isScaleImageBusy = true
          this.scalePortfolioImage(e)
        })
    }
    window.addEventListener('scroll', this._scalePortfolioImage)
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this._scalePortfolioImage)
  }
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
        <Sidebar hasLogo>
          <SidebarLinks />
        </Sidebar>
        <div className="sp-100" />
        <div className="container">
          <div className="page-title">
            <span className="sw-rahul">RAHUL</span>
            <span className="sw-dot">.</span>
            <span className="sw-live">LIVE</span>
          </div>
          <div className="y-400" />
          <div className="photo-item">
            <div className="photo-inner">
              <img
                className="img-fluid"
                alt=""
                src="/public/img/live/image-1.jpg"
              />
            </div>
            <div className="photo-name">Orange & Teal</div>
          </div>
          <div className="photo-item">
            <div className="photo-inner">
              <img
                className="img-fluid"
                alt=""
                src="/public/img/live/image-2.jpg"
              />
            </div>
            <div className="photo-name">Bouncing Sun</div>
          </div>
          <div className="photo-item">
            <div className="photo-inner">
              <img
                className="img-fluid"
                alt=""
                src="/public/img/live/image-3.jpg"
              />
            </div>
            <div className="photo-name">Bouncing Sun</div>
          </div>
          <div className="photo-item">
            <div className="photo-inner">
              <img
                className="img-fluid"
                alt=""
                src="/public/img/live/image-4.jpg"
              />
            </div>
            <div className="photo-name">Study</div>
          </div>
        </div>
        <div className="sp-100" />
      </div>
    )
  }
}
