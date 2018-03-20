import React, { Component } from 'react'
import classnames from 'classnames'

import ParallaxContainer from 'components/ui/ParallaxContainer'

export default class PortfolioDetailView extends Component {
  renderLinks = links => {
    return (
      <div className="information-section">
        <div className="label" />
        <div className="value">
          {links.map((link, index) => (
            <a className="info-link" href={link.href} key={index}>
              <div className="info-icon">{link.icon}</div>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    )
  }
  renderTestimonials = testimonials => {
    return (
      <div className="information-section">
        <div className="label" />
        <div className="value">
          {testimonials.map((testimonial, index) => (
            <div className="info-testimonial" key={index}>
              {testimonial.label}
            </div>
          ))}
        </div>
      </div>
    )
  }

  renderImages = images => {
    return images.map((image, index) => (
      <img className="img-fluid detail-image" key={index} alt="" src={image} />
    ))
  }

  render() {
    const {
      className,
      isOpen,
      title,
      description,
      heroImage,
      objective,
      solution,
      links = [],
      testimonials = [],
      images = []
      // videos = []
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
        {!!links.length && this.renderLinks(links || [])}
        {!!testimonials.length && this.renderTestimonials(testimonials || [])}
        {!!images.length && this.renderImages(images || [])}
      </div>
    )
  }
}
