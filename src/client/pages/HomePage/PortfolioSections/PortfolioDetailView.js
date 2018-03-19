import React, { Component } from 'react'
import classnames from 'classnames'

import ParallaxContainer from 'components/ui/ParallaxContainer'

export default class PortfolioDetailView extends Component {
  render() {
    const {
      className,
      isOpen,
      title,
      description,
      heroImage,
      objective,
      solution
    } = this.props

    const cx = classnames(className, 'detail-view', {
      'is-open': isOpen
    })

    return (
      <div className={cx}>
        <ParallaxContainer
          scrollParent=".detail-view-inner"
          className="detail-view-hero"
          backgroundImage={heroImage}>
          <div className="hero-content">
            <div className="hero-title">{title}</div>
            <div className="hero-description">{description}</div>
          </div>
        </ParallaxContainer>
        <div className="information-section">
          <div className="label">Objective</div>
          <div className="value">{objective}</div>
        </div>
        <div className="information-section">
          <div className="label">Solution</div>
          <div className="value">{solution}</div>
        </div>
      </div>
    )
  }
}
