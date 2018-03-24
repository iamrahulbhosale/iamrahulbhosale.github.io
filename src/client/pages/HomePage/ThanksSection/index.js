import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { SocialIcons } from './SocialIcons'
import { Location } from './Location'
import s from './ThanksSection.styl'

class ThanksSection extends Component {
  componentDidMount = () => {
    setTimeout(this.animate, 400)
  }

  animate = () => {
    this.container.classList.add('will-animate')
  }

  render() {
    const cx = classnames(
      s.container,
      'thanks-section bg-dark',
      this.props.className
    )
    return (
      <div className={cx} ref={node => (this.container = node)}>
        {/* <Sidebar hasLogo white>
          <SidebarLinks />
        </Sidebar> */}
        <div className="thanks-content">
          <div className="container thanks-inner">
            <div className="thanks-title">
              Thanks
              <span className="thanks-heart">❤</span>
            </div>
            <div className="thanks-sub-text">
              I look forward to making great things with you in 2018
            </div>
            <SocialIcons links={this.props.links} />
            <div className="flex-1" />
            <Location />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  links: state.Social.links
})

export default connect(mapStateToProps)(ThanksSection)
