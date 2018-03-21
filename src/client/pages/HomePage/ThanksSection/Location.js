import React from 'react'

import Logo from 'components/ui/Logo'

export const Location = props => (
  <div className="location-container">
    <div className="logo-wrapper">
      <Logo white />
    </div>
    <div className="location-details">
      <div className="location-label">Let's meet, i'm currently in</div>
      <div className="location-value">
        Mumbai
        <span className="location-emoji">🌤</span>
      </div>
    </div>
  </div>
)
