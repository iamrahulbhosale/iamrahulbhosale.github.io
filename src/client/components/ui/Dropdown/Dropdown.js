import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import take from 'lodash/take'

import Button from 'components/ui/Button'

import s from './Dropdown.styl'

export class DropdownItem extends Component {
  render() {
    const { className, children, ...others } = this.props
    const cx = classnames(s.item, 'ui-dropdown-item', className)
    return (
      <div className={cx} {...others}>
        {children}
      </div>
    )
  }
}

/**
 * Dropdown Component
 * Can be used with an items array or children itself in case of additional customization
 * @example
 * import Dropdown, {DropdownItem} from 'components/ui/Dropdown'
 * const items = [
 *  'foo', 'bar'
 * ]
 *
 *
 * <Dropdown items={items} onItemClick={this.onDropdownItemClick}/>
 * //or
 * <Dropdown>
 *  <DropdownItem onClick={this.doFoo}>foo</DropdownItem>
 *  <DropdownItem onClick={this.doBar}>bar</DropdownItem>
 * </Dropdown>
 * When using with children you need to add click handlers explicitly
 */
export default class Dropdown extends Component {
  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
    additionalMenuContent: PropTypes.node,
    onItemClick: PropTypes.func,
    limit: PropTypes.number,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
  }

  static defaultProps = {
    items: [],
    limit: 0,
    title: 'Dropdown',
    itemTextKey: 'text',
    alignRight: false
  }

  onItemClick = e => {
    const index = Number(e.target.dataset.index)
    if (typeof this.props.onItemClick === 'function') {
      this.props.onItemClick(this.props.items[index], index)
    }
  }

  renderOneItem = (item, index) => {
    // If an item renderer is supplied use that
    if (typeof this.props.renderOneItem === 'function') {
      return this.props.renderOneItem(item, index)
    }
    // Otherwise, use this default item renderer
    return (
      <DropdownItem key={index} data-index={index} onClick={this.onItemClick}>
        {item[this.props.itemTextKey]}
      </DropdownItem>
    )
  }

  render() {
    const {
      limit,
      title,
      className,
      buttonClassName,
      items,
      alignRight,
      children
    } = this.props
    const cx = classnames(s.container, 'ui-dropdown', className, {
      'align-menu-right': alignRight
    })

    const buttonClass = classnames('ui-dropdown-button', buttonClassName)

    const itemsToRender = limit
      ? take(items, limit).map(this.renderOneItem)
      : items.map(this.renderOneItem)

    return (
      <div className={cx}>
        <Button link className={buttonClass}>
          {title}
        </Button>
        <div className="ui-dropdown-menu">
          {children}
          <div className="ui-dropdown-menu-inner">{itemsToRender}</div>
        </div>
      </div>
    )
  }
}
