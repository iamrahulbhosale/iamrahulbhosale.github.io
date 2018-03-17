import React, { Component } from 'react'
import classnames from 'classnames'

// import { Link } from 'react-router-dom'

import Sidebar, { SidebarLinks } from 'components/Sidebar'

export default class AwardsSection extends Component {
  componentDidMount = () => {
    setTimeout(this.animate, 400)
  }

  animate = () => {
    this.container.classList.add('will-animate')
  }

  render() {
    const cx = classnames('awards-section bg-dark', this.props.className)
    return (
      <div className={cx} ref={node => (this.container = node)}>
        <Sidebar hasLogo white>
          <SidebarLinks />
        </Sidebar>
      </div>
    )
  }
}
