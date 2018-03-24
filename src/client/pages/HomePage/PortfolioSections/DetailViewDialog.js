import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import PortfolioDetailView from './PortfolioDetailView'
import s from './PortfolioSection.styl'

export default class DetailViewDialog extends Component {
  componentDidMount = () => {
    const isOpen = Number.isInteger(this.props.caseStudyIndex)
    document.body.classList.toggle('no-scroll', isOpen)
    if (isOpen) window.scrollTo(0, 0)
  }

  componentDidUpdate = () => {
    const isOpen = Number.isInteger(this.props.caseStudyIndex)
    document.body.classList.toggle('no-scroll', isOpen)
  }

  componentWillUnmount = () => {
    if (!__SERVER__) {
      document.body.classList.remove('no-scroll')
    }
  }

  render() {
    const { list = [], caseStudyIndex, nextCaseStudyName } = this.props

    const isValidCaseStudy = Number.isInteger(caseStudyIndex)

    const cx = classnames('detail-view-wrapper', s.detailViewWrapper, {
      'is-open': isValidCaseStudy
    })

    const currentCaseStudy = isValidCaseStudy
      ? list[caseStudyIndex]
      : { detailView: {} }

    // console.log('current study: ', caseStudyIndex, currentCaseStudy)

    const element = (
      <div className={cx}>
        <div className="back-button" onClick={this.props.onRequestClose}>
          <div className="back-button-inner">←</div>
        </div>
        <div
          className={classnames(
            'detail-view-inner',
            currentCaseStudy.className
          )}>
          {isValidCaseStudy && (
            <PortfolioDetailView
              onRequestClose={this.props.onRequestClose}
              title={currentCaseStudy.title}
              description={currentCaseStudy.detailView.description}
              objective={currentCaseStudy.detailView.objective}
              solution={currentCaseStudy.detailView.solution}
              links={currentCaseStudy.detailView.links}
              nextCaseStudyName={nextCaseStudyName}
              onNextCaseStudyClick={this.props.onNextCaseStudyClick}
              testimonials={currentCaseStudy.detailView.testimonials}
              heroImage={currentCaseStudy.detailView.heroImage}
              images={currentCaseStudy.detailView.images}
              videosBeforeImages={
                currentCaseStudy.detailView.videosBeforeImages
              }
              videosAfterImages={currentCaseStudy.detailView.videosAfterImages}
            />
          )}
        </div>
        <div
          className="detail-view-backdrop"
          onClick={this.props.onRequestClose}
        />
      </div>
    )

    if (__SERVER__) {
      return element
    }

    return ReactDOM.createPortal(
      element,
      document.getElementById('overlay-root')
    )
  }
}
