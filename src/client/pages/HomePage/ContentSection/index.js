import React, { Component } from 'react'
import classnames from 'classnames'

// import { Link } from 'react-router-dom'

// import debounce from 'lodash/debounce'

import Sidebar, { SidebarLinks } from 'components/Sidebar'
import s from './ContentSection.styl'

export default class ContentSection extends Component {
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    if (this.isLayoutBusy) {
      return
    }
    window.requestAnimationFrame(this.handleLayoutOnScroll)
    this.isLayoutBusy = true
  }

  handleLayoutOnScroll = () => {
    const image = this.container.querySelector('.rahul-runs')
    const bounds = image.getBoundingClientRect()

    // Hide gif image when not in viewport, increases scroll performance
    const dh = document.documentElement.clientHeight || window.innerHeight
    const isvisible =
      bounds.top < dh && bounds.bottom > 0 && bounds.bottom - bounds.height < dh
    image.classList.toggle('is-hidden', !isvisible)

    // Fix sidebar when in view
    const containerBounds = this.container.getBoundingClientRect()

    const sidebars = Array.from(this.container.querySelectorAll('.app-sidebar'))
    const shouldFixSidebar =
      containerBounds.top <= 0 && containerBounds.bottom >= dh
    sidebars.forEach(s => s.classList.toggle('is-fixed', shouldFixSidebar))
    // console.log(containerBounds)
    this.isLayoutBusy = false
  }

  renderHeadline = str => {
    return (str + '').split(' ').map((x, i) => (
      <div key={i} className="split-word">
        {x}
      </div>
    ))
  }

  render() {
    const cx = classnames(s.container, 'content-section', this.props.className)
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
          <br />
          <div className="content-h1 w-clamped">
            {this.renderHeadline('Good design can save the world')}
          </div>
          <br />
          <div className="rahul-runs">
            <img
              className="rahul-runs-img img-fluid"
              alt=""
              src="/public/img/run.gif"
            />
          </div>

          <div className="someone-quotes">
            <div className="content-p">
              <span role="img" aria-label="holdingcups" className="quote-icon">
                ☕
              </span>
              Someone solved the problem of holding cups
            </div>
            <div className="content-p">
              <span role="img" aria-label="holdingcups" className="quote-icon">
                🕹
              </span>
              Someone have solved the problem of light switch
            </div>
            <div className="content-p">
              <span role="img" aria-label="holdingcups" className="quote-icon">
                ☎️
              </span>
              Someone have solved the problem of communication
            </div>
            <div className="content-p">
              <span role="img" aria-label="holdingcups" className="quote-icon">
                🏂
              </span>
              Someone have solved the problem of daily commute
            </div>
            <div className="content-p">I’m one of that someone.</div>
          </div>

          <div className="content-p">
            <br />
            My work process is based on the combination of old school and
            contemporary mindset, a principle which I use to create conceptual
            and beautiful solutions through my artwork. A careful desire to
            solve everyday things.
            <span className="content-emoji" role="img" aria-label="brain">
              🧠
            </span>
            <br />
            <br />
            Love for design has always been there. With a background in fine
            arts and strong interest in digital technology, I have a constant
            hunger for learning new things.
            <span className="content-emoji" role="img" aria-label="glove">
              🧤
            </span>
            <br />
            <br />
            I have had the pleasure of working with most exciting companies,
            including Housing, Pupil, Indorse, Balkan Brothers, Wyre and Indiez.
            I’m currently working as a lead interaction designer at Housing.com
            Feel free to say hello.
            <span
              className="content-emoji"
              role="img"
              aria-label="raised-hands">
              🙌
            </span>
            <br />
            <br />
            More thoughts & work on Dribbble, Behance, Medium and Linkedin.
          </div>
        </div>

        <Sidebar right>
          <div className="top-right-info">SINCE 1990</div>
        </Sidebar>
      </div>
    )
  }
}
