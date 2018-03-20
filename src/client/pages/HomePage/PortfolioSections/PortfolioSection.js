import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import Sidebar, { SidebarLinks } from 'components/Sidebar'
import Button from 'components/ui/Button'

import round from 'lodash/round'

import s from './PortfolioSection.styl'

export default class PortfolioSection extends Component {
  componentDidMount = () => {
    this._scalePortfolioImage = e => {
      !this.isScaleImageBusy &&
        window.requestAnimationFrame(() => {
          this.isScaleImageBusy = true
          this.scalePortfolioImage(e)
        })
    }
    this._handleMouseMove = e => {
      !this.isMouseMoveBusy &&
        window.requestAnimationFrame(() => {
          this.isMouseMoveBusy = true
          this.handleMouseMove(e)
        })
    }

    this.container.addEventListener('mousemove', this._handleMouseMove)
    window.addEventListener('scroll', this._scalePortfolioImage)
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this._scalePortfolioImage)
    this.container.removeEventListener('mousemove', this._handleMouseMove)
  }

  handleMouseMove = e => {
    const dw = document.documentElement.clientWidth || window.innerWidth
    const buttonBounds = this.caseStudyButton.getBoundingClientRect()
    const bar = this.caseStudyButton.querySelector('.white-bg-bar')

    if (dw < 768) {
      return
    }

    var perc = Math.floor(e.pageX - buttonBounds.left) / 200
    perc = perc < 0 ? 0 : perc > 1 ? 1 : perc
    // console.log(perc)

    bar.style.width = `${perc * 100}%`

    this.isMouseMoveBusy = false
  }

  scalePortfolioImage = () => {
    const dw = document.documentElement.clientWidth || window.innerWidth
    const dh = document.documentElement.clientHeight || window.innerHeight
    const bounds = this.container.getBoundingClientRect()
    const factor = 1.24

    if (dw < 768) {
      return
    }

    var perc
    if (bounds.top >= 0 && bounds.top < dh) {
      perc = round(bounds.top / dh, 2)
    } else {
      perc = 0
    }

    const scale = 1 + perc * factor
    const scaleString = `scale(${scale}) translate3d(0,0,0)`
    // console.log(bounds.top, dh, perc, scale)
    this.container.classList.toggle('show-details', perc < 0.5)

    const image = this.container.querySelector('.portfolio-item-image')
    if (image.style.transform !== scaleString) {
      image.style.transform = scaleString
    }

    this.isScaleImageBusy = false
  }

  render() {
    const {
      className,
      white,
      title,
      description,
      webLink,
      mobileLink,
      caseStudyLink,
      hasCaseStudy,
      image
    } = this.props

    const cx = classnames(s.container, 'portfolio-section', className)
    return (
      <div className={cx} ref={node => (this.container = node)}>
        <Sidebar hasLogo white={white}>
          <SidebarLinks />
        </Sidebar>
        <div className="portfolio-item-details">
          <div className="item-details">
            <div className="portfolio-title">{title}</div>
            <div className="portfolio-description">{description}</div>
            <div className="demo-links">
              <a href={webLink} className="demo-link">
                Web
              </a>
              <a href={mobileLink} className="demo-link">
                Mobile
              </a>
            </div>
            <Link to={caseStudyLink}>
              <Button
                className="case-study-button"
                innerRef={node => (this.caseStudyButton = node)}
                onClick={e => hasCaseStudy && this.props.onCaseStudyClick()}>
                <span className="btn-text">Case Study</span>
                <span className="btn-icon">→</span>
                <div className="white-bg-bar" style={{ width: '0%' }} />
              </Button>
            </Link>
          </div>
        </div>
        <div className="portfolio-item-image">
          <img className="item-img img-fluid" alt="" src={image} />
        </div>
      </div>
    )
  }
}
