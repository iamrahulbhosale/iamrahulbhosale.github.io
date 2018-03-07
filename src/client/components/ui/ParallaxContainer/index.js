import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './ParallaxContainer.styl'

export default class ParallaxContainer extends Component {
  static propTypes = {
    backgroundImage: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node
  }

  componentDidMount = () => {
    this.lastPosition = 0
    this.isTicking = false
    this.speedFactor = 2

    window.addEventListener('scroll', this.handleScroll, false)
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll, false)
  }

  handleScroll = () => {
    this.lastPosition = window.pageYOffset

    if (!this.isTicking) {
      window.requestAnimationFrame(this.updatePosition)
      this.isTicking = true
    }
  }

  updatePosition = () => {
    var shift = this.lastPosition / this.speedFactor

    if (shift < 0) shift = 0

    this.backgroundElement.style.transform = `translate3d(0px, ${shift}px, 0px)`
    this.isTicking = false
  }

  render() {
    const { backgroundImage, className, children, ...others } = this.props

    const cx = classnames('ui-parallax-container', className)

    return (
      <div className={cx} {...others}>
        <div
          className="ui-parallax-background"
          ref={node => (this.backgroundElement = node)}
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
        {children}
      </div>
    )
  }
}
