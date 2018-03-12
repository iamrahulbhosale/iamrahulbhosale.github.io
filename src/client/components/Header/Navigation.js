import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const NAVIGATION_ITEMS = [
  { href: '/about', label: 'ABOUT' },
  { href: '/contact', label: 'CONTACT' }
]

const Navigation = props => (
  <Fragment>
    {NAVIGATION_ITEMS.map((item, index) => (
      <Link
        key={index}
        className={`header-link ${props.itemClassName}`.trim()}
        to={item.href}>
        {item.label}
      </Link>
    ))}
  </Fragment>
)

export default Navigation
