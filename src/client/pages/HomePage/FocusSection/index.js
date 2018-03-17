import React, { Component } from 'react'
import classnames from 'classnames'

// import { Link } from 'react-router-dom'

import Sidebar, { SidebarLinks } from 'components/Sidebar'

import s from './FocusSection.styl'

export default class FocusSection extends Component {
  componentDidMount = () => {}

  animate = () => {}

  render() {
    const cx = classnames(s.container, 'focus-section', this.props.className)
    return (
      <div className={cx} ref={node => (this.container = node)}>
        <Sidebar hasLogo>
          <SidebarLinks />
        </Sidebar>
        <div className="page-title">FOCUS</div>
        <div className="container">
          <div className="focus-list">
            <div className="focus-item">
              <div className="focus-text">UI / UX DESIGN</div>
            </div>
            <div className="focus-item">
              <div className="focus-text">MOTION DESIGN</div>
            </div>
            <div className="focus-item">
              <div className="focus-text">ILLUSTRATIONS</div>
            </div>
            <div className="focus-item">
              <div className="focus-text">IDENTITY</div>
            </div>
            <div className="focus-item">
              <div className="focus-text">NETWORK BRANDING</div>
            </div>
            <div className="focus-item">
              <div className="focus-text">TYPOGRAPHY</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
