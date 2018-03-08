import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Logo from 'components/ui/Logo'
import Navigation from './Navigation'

import s from './Header.styl'

class Header extends Component {
  static propTypes = {
    sticky: PropTypes.bool,
    fixed: PropTypes.bool
  }

  static defaultProps = {
    sticky: false,
    fixed: false
  }

  render() {
    const { className, fixed, transparent } = this.props

    const cx = classnames(
      s.container,
      'app-header flex-horizontal a-center',
      className,
      {
        'is-fixed': fixed,
        'is-transparent': transparent
      }
    )

    return (
      <header className={cx}>
        <Link className="header-logo" to="/">
          <Logo />
        </Link>
        <div className="flex-1" />
        <Navigation />
      </header>
    )
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
