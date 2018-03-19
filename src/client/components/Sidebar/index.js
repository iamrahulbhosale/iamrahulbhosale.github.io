import React, { Component } from 'react'
import classnames from 'classnames'

import { Link } from 'react-router-dom'

import Logo from 'components/ui/Logo'

import s from './Sidebar.styl'

export const SidebarLink = ({
  inverted,
  href = '',
  className,
  children,
  ...otherProps
}) => {
  const extraProps = {
    className: classnames('sidebar-link', className, { inverted }),
    children
  }

  if (href.startsWith('/')) {
    return (
      <Link to={href} {...extraProps} {...otherProps}>
        {children}
      </Link>
    )
  }

  extraProps.rel = 'noopener noreferrer'
  extraProps.target = '_blank'

  return (
    <a href={href} {...extraProps} {...otherProps}>
      {children}
    </a>
  )
}

export const SidebarLinks = () => (
  <div className="sidebar-links">
    <SidebarLink
      href="https://www.behance.net/rahulbhosale"
      className="behance-link">
      BEHANCE
    </SidebarLink>
    <SidebarLink
      href="https://dribbble.com/rahulbhosale"
      className="dribble-link">
      DRIBBBLE
    </SidebarLink>
  </div>
)

export default class Sidebar extends Component {
  render() {
    const { className, hasLogo, white, children, right } = this.props

    const cx = classnames(s.container, 'app-sidebar', className, {
      'is-white': white,
      'in-right': right
    })

    return (
      <div className={cx}>
        {hasLogo && (
          <Link to="/">
            <Logo className="sidebar-logo" white={white} />
          </Link>
        )}
        {children}
      </div>
    )
  }
}
