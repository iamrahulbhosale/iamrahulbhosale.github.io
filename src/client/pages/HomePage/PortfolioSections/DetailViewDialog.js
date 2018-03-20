import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import PortfolioDetailView from './PortfolioDetailView'
import s from './PortfolioSection.styl'

export default class DetailViewDialog extends Component {
  render() {
    const { list = [], caseStudyIndex } = this.props

    const cx = classnames('detail-view-wrapper', s.detailViewWrapper, {
      'is-open': Number.isInteger(caseStudyIndex)
    })

    const currentCaseStudy = Number.isInteger(caseStudyIndex)
      ? list[caseStudyIndex]
      : { detailView: {} }

    console.log('current study: ', caseStudyIndex, currentCaseStudy)

    const element = (
      <div className={cx}>
        <div className="detail-view-inner">
          <div className="back-button" onClick={this.props.onRequestClose}>
            ←
          </div>
          <PortfolioDetailView
            onRequestClose={this.props.onRequestClose}
            title={currentCaseStudy.title}
            description={currentCaseStudy.detailView.description}
            objective={currentCaseStudy.detailView.objective}
            solution={currentCaseStudy.detailView.solution}
            links={currentCaseStudy.detailView.links}
            testimonials={currentCaseStudy.detailView.testimonials}
            heroImage={currentCaseStudy.detailView.heroImage}
            images={currentCaseStudy.detailView.images}
            videos={currentCaseStudy.detailView.videos}
          />
        </div>
        <div
          className="detail-view-backdrop"
          onClick={this.props.onRequestClose}
        />
      </div>
    )

    return ReactDOM.createPortal(
      element,
      document.getElementById('overlay-root')
    )
  }
}
