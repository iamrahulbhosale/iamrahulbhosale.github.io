import React, { Component } from 'react'
import Header from 'components/Header'

export default class AboutPage extends Component {
  render() {
    return (
      <div className="app-page about-page">
        <Header />
        <div className="container">
          <h2> About US </h2>
        </div>
      </div>
    )
  }
}
