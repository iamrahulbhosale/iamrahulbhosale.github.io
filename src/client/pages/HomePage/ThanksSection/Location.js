import React from 'react'

import Logo from 'components/ui/Logo'

export const Location = props => (
  <div className="location-container">
    <div className="logo-wrapper">
      <Logo white className='black-square' />
    </div>
    <div className="location-details">
      <div className="location-label">Let's meet, I'm currently in</div>
      <div className="location-value">
        Pune
        <span className="location-emoji">🌤</span>
      </div>
    </div>
  </div>
)
