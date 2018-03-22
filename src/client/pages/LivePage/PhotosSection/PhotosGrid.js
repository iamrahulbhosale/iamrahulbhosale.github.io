import React, { Component } from 'react'
import classnames from 'classnames'
import debounce from 'lodash/debounce'
import Masonry from 'react-masonry-component'

import LIST from './grid.data'

export default class PhotosGrid extends Component {
  componentDidMount = () => {
    this._handleResize = debounce(this.handleResize, 100)
    window.addEventListener('resize', this._handleResize)
  }

  handleResize = () => {
    console.log('resized')
    this.container.masonry.layout()
  }

  handleImagesLoaded = () => {
    console.log('images loaded')
    this.container.masonry.layout()
  }

  getItemClassName = item => {
    const { rows = 1, cols = 1 } = item
    return classnames('photo-item', {
      'item-1-1': rows === 1 && cols === 1,
      'item-2-1': rows === 2 && cols === 1,
      'item-1-2': rows === 1 && cols === 2
    })
  }
  getOptions = () => {
    return {
      columnWidth: '.grid-sizer',
      itemSelector: '.photo-item',
      percentPosition: true
    }
  }
  render() {
    return (
      <Masonry
        ref={node => (this.container = node)}
        className="photos-grid"
        onImagesLoaded={this.handleImagesLoaded}
        options={this.getOptions()}>
        {LIST.map((item, index) => (
          <div className={this.getItemClassName(item)} key={index}>
            <div
              className="photo-inner"
              title={item.title}
              style={{ backgroundImage: `url(${item.src})` }}
            />
            {/* <div className="photo-name">{item.title}</div> */}
          </div>
        ))}
        <div className="grid-sizer" />
      </Masonry>
    )
  }
}
