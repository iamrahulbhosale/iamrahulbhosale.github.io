import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import uniqueId from 'lodash/uniqueId'

const NotificationItem = ({ title, action, onActionClick, onRequestClose }) => (
  <div className="app-notification" onClick={onRequestClose}>
    <div className="title">{title}</div>
    <div className="action" onClick={onActionClick}>
      {action}
    </div>
  </div>
)

NotificationItem.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.string,
  onActionClick: PropTypes.func,
  onRequestClose: PropTypes.func
}

export default class AppNotifications extends Component {
  state = {
    list: []
  }

  componentDidMount = () => {
    window.addEventListener('show-notification', this.showNotification)
  }

  componentWillUnmount = () => {
    if (__SERVER__) {
      return
    }
    window.removeEventListener('hide-notification', this.hideNotification)
  }

  showNotification = notificationData => {
    const id = uniqueId('app-notification-')
    const notification = {
      ...notificationData,
      id
    }
    this.setState({
      list: [notification, ...this.state.list]
    })
  }
}
