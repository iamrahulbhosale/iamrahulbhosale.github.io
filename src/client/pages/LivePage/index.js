import React, { Component } from 'react'
import s from './LivePage.styl'

import PhotosSection from './PhotosSection'

export default class LivePage extends Component {
  componentDidMount = () => {
    window.scrollTo(0, 0, { behaviour: 'smooth' })
  }

  componentWillUnmount = () => {}

  render() {
    return (
      <div className={s.container}>
        <div className="cd-section">
          <PhotosSection className="page-section" />
        </div>
      </div>
    )
  }
}
