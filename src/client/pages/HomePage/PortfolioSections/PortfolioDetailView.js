import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import Logo from 'components/ui/Logo'
import Embed, { VimeoEmbed } from 'components/ui/Embed'
import ParallaxContainer from 'components/ui/ParallaxContainer'

class PortfolioDetailView extends Component {
  renderLinks = links => {
    return (
      <div className="information-section margin-x-box">
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
      <div className="information-section margin-x-box">
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
      <div className="project-image" key={index}>
        <img className="img-fluid" alt="" src={image} />
      </div>
    ))
  }

  renderOneVideo = (video, index) => {
    return (
      <div className="project-video-container" key={index}>
        <div className="margin-x-box">
          <Embed key={index} ratio={video.ratio || '16x9'}>
            <VimeoEmbed title="project-video" url={video.link} />
          </Embed>
        </div>
      </div>
    )
  }

  renderFooterLinks = links => {
    const names = Object.keys(links)
    return (
      <div className="footer-links">
        {names.map((name, index) => (
          <a className="footer-link" href={links[name].url} key={index}>
            {links[name].label}
          </a>
        ))}
      </div>
    )
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
      images = [],
      nextCaseStudyName,
      videosBeforeImages = [],
      videosAfterImages = []
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
        <div className="information-section margin-x-box">
          <div className="label">Objective</div>
          <div className="value">{objective}</div>
        </div>
        <div className="information-section margin-x-box">
          <div className="label">Solution</div>
          <div className="value">{solution}</div>
        </div>

        {!!links.length && this.renderLinks(links || [])}

        {!!testimonials.length && this.renderTestimonials(testimonials || [])}

        {videosBeforeImages.map(this.renderOneVideo)}

        {!!images.length && this.renderImages(images || [])}

        {videosAfterImages.map(this.renderOneVideo)}

        {!!nextCaseStudyName && (
          <div className="next-case-section">
            <div className="margin-x-box">
              <div className="next-case-label">Next Case Study</div>
              <div className="next-study-bg" />
              <div
                className="next-case-button"
                onClick={this.props.onNextCaseStudyClick}>
                <div className="btn-text">{nextCaseStudyName}</div>
                <div className="btn-icon">→</div>
                <div className="btn-overlay" />
              </div>
            </div>
          </div>
        )}
        <div className="footer-section">
          <div className="margin-x-box">
            <Logo white className="black-square" />
            <div className="flex-1" />
            {this.renderFooterLinks(this.props.footerLinks)}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  footerLinks: state.Social.links
})

export default connect(mapStateToProps)(PortfolioDetailView)
