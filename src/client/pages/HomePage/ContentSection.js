import React, { Component } from 'react'
import classnames from 'classnames'

// import { Link } from 'react-router-dom'

import Sidebar, { SidebarLinks, SidebarLink } from 'components/Sidebar'

export default class ContentSection extends Component {
  componentDidMount = () => {
    setTimeout(this.animate, 400)
  }

  animate = () => {
    this.container.classList.add('will-animate')
  }

  renderHeadline = str => {
    return (str + '').split(' ').map((x, i) => (
      <div key={i} className="split-word">
        {x}
      </div>
    ))
  }

  render() {
    const cx = classnames('content-section', this.props.className)
    return (
      <div className={cx} ref={node => (this.container = node)}>
        <Sidebar hasLogo>
          <SidebarLinks />
        </Sidebar>
        <div className="container">
          <p className="content-p">
            Hi I ‘m Rahul Bhosale, a multidisciplinary designer from Mumbai. I
            believe good design can make the positive impact on people’s daily
            lives. It can solve most problems. Design can unite people without
            any language or cultural barrier.
          </p>
          <div className="content-h1 w-75">
            {this.renderHeadline('Good design can save the world')}
          </div>
        </div>

        <Sidebar right>
          <div className="top-right-info">SINCE 1990</div>
        </Sidebar>
      </div>
    )
  }
}
