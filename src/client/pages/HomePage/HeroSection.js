import React from 'react'
import ParallaxContainer from 'components/ui/ParallaxContainer'

const HeroSection = props => {
  return (
    <ParallaxContainer
      className="hero-section"
      backgroundImage="/public/img/sample-bg-3.jpg">
      <div className="container">
        <h2>Something incontainer </h2>
      </div>
    </ParallaxContainer>
  )
}

export default HeroSection
