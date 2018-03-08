import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = props => (
  <div className="header-navigation">
    <Link to="/about">ABOUT</Link>
    <Link to="/contact">CONTACT</Link>
  </div>
)

export default Navigation
