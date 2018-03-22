import React, { Component } from 'react'
import classnames from 'classnames'

import Sidebar, { SidebarLinks } from 'components/Sidebar'
import { getBrowserWidth, getBrowserHeight } from 'utils/dom'
import { MOBILE_BREAKPOINT } from 'utils/constants'

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
    const dh = getBrowserHeight()
    const dw = getBrowserWidth()

    const isvisible =
      bounds.top < dh && bounds.bottom > 0 && bounds.bottom - bounds.height < dh
    image.classList.toggle('is-hidden', !isvisible)

    // Fix sidebar when in view
    // we'll skip this on mobile devices
    if (dw >= MOBILE_BREAKPOINT) {
      const containerBounds = this.container.getBoundingClientRect()
      const sidebars = Array.from(
        this.container.querySelectorAll('.app-sidebar')
      )
      const shouldFixSidebar =
        containerBounds.top <= 0 && containerBounds.bottom >= dh
      sidebars.forEach(s => s.classList.toggle('is-fixed', shouldFixSidebar))
    }

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
            Hi I'm Rahul Bhosale, a multidisciplinary designer from Mumbai. I
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
              <span className="first-split">Someone solved</span>
              <span>the problem of holding cups</span>
            </div>
            <div className="content-p">
              <span role="img" aria-label="holdingcups" className="quote-icon">
                🕹
              </span>
              <span className="first-split">Someone solved</span>
              <span>the problem of light switch</span>
            </div>
            <div className="content-p">
              <span role="img" aria-label="holdingcups" className="quote-icon">
                ☎️
              </span>
              <span className="first-split">Someone solved</span>
              <span>the problem of communication</span>
            </div>
            <div className="content-p">
              <span role="img" aria-label="holdingcups" className="quote-icon">
                🏂
              </span>
              <span className="first-split">Someone solved</span>
              <span>the problem of daily commute</span>
            </div>
            <div className="content-p last-split">
              <span role="img" aria-label="holdingcups" className="quote-icon">
                🦄
              </span>
              <span>I’m one of that someone.</span>
            </div>
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
            More thoughts & work on&nbsp;
            <a
              className="dribble-link"
              href="https://dribbble.com/rahulbhosale"
              rel="noopener noreferrer"
              target="_blank">
              Dribbble
            </a>,&nbsp;
            <a
              className="behance-link"
              href="https://www.behance.net/rahulbhosale"
              rel="noopener noreferrer"
              target="_blank">
              Behance
            </a>,&nbsp;
            <a
              className="medium-link"
              href="https://medium.com/@rahul.design"
              rel="noopener noreferrer"
              target="_blank">
              Medium
            </a>&nbsp;and&nbsp;
            <a
              className="linkedin-link"
              href="https://www.linkedin.com/in/iamrahulbhosale"
              rel="noopener noreferrer"
              target="_blank">
              Linkedin
            </a>.
          </div>
        </div>

        <Sidebar right>
          <div className="top-right-info">SINCE 1990</div>
        </Sidebar>
      </div>
    )
  }
}
