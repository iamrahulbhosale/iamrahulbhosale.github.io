import React from 'react'

const FontIcon = ({ icon }) => {
  if ((icon + '').endsWith('svg')) {
    return <img className="svg-icon-img" alt="" src={icon} />
  }
  return <i className="material-icons">{icon}</i>
}

export default FontIcon
