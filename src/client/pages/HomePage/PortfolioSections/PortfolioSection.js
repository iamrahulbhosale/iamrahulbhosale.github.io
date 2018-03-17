import React, { Component } from 'react'
import classnames from 'classnames'

import { Link } from 'react-router-dom'

import Sidebar, { SidebarLinks } from 'components/Sidebar'

import Button from 'components/ui/Button'

import debounce from 'lodash/debounce'
import round from 'lodash/round'

import s from './PortfolioSection.styl'

export default class PortfolioSection extends Component {
  componentDidMount = () => {
    this._scalePortfolioImage = debounce(this.scalePortfolioImage, 300)
    window.addEventListener('scroll', this.scalePortfolioImage)
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.scalePortfolioImage)
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

    const image = this.container.querySelector('.portfolio-item-image')
    image.style.transform = `scale(${1 + perc * factor})`
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
              <Button className="case-study-button">
                <span className="btn-text">Case Study</span>
                <span className="btn-icon">→</span>
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
