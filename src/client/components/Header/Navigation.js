import React from 'react'
import { Link } from 'react-router-dom'

const NAVIGATION_ITEMS = [
  { href: '/about', label: 'ABOUT' },
  { href: '/contact', label: 'CONTACT' }
]

const Navigation = props => (
  <div className="header-navigation">
    {NAVIGATION_ITEMS.map((item, index) => (
      <Link key={index} className="header-link" to={item.href}>
        {item.label}
      </Link>
    ))}
  </div>
)

export default Navigation
