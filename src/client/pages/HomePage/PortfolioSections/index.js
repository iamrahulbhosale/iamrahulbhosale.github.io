import React, { Fragment, Component } from 'react'
import classnames from 'classnames'

import PortfolioSection from './PortfolioSection'
import PortfolioDetailView from './PortfolioDetailView'
import LIST from './portfolio.data'

import s from './PortfolioSection.styl'

export default class PortfolioSections extends Component {
  state = {
    caseStudyIndex: null
  }

  closeCaseStudy = () => {
    this.setState({ caseStudyIndex: null })
  }

  openCaseStudy = caseStudyIndex => {
    this.setState({ caseStudyIndex })
  }

  componentDidUpdate = () => {
    document.body.classList.toggle(
      'no-scroll',
      Number.isInteger(this.state.caseStudyIndex)
    )
  }

  getDescription = description => {
    return description.map((str, i) => <div key={i}>{str}</div>)
  }

  getNextCaseStudyLink = index => {
    if (LIST.length === index + 1) {
      return null
    }
    return index + 1
  }

  render() {
    const shouldOpenCaseStudy = Number.isInteger(this.state.caseStudyIndex)

    const detailCx = classnames('detail-view-wrapper', s.detailViewWrapper, {
      'is-open': shouldOpenCaseStudy
    })

    const currentCaseStudy = shouldOpenCaseStudy
      ? LIST[this.state.caseStudyIndex]
      : { detailView: {} }

    return (
      <Fragment>
        <div className={detailCx}>
          <div className="detail-view-inner">
            <div className="back-button" onClick={this.closeCaseStudy}>
              ←
            </div>
            {shouldOpenCaseStudy && (
              <PortfolioDetailView
                onRequestClose={this.closeCaseStudy}
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
            )}
          </div>
          <div className="detail-view-backdrop" onClick={this.closeCaseStudy} />
        </div>

        {LIST.map((portfolio, index) => (
          <div className="cd-section" key={index}>
            <PortfolioSection
              title={portfolio.title}
              description={this.getDescription(portfolio.description)}
              webLink={portfolio.webLink || '#'}
              mobileLink={portfolio.mobileLink || '#'}
              onCaseStudyClick={e => this.openCaseStudy(index)}
              hasCaseStudy={!!Object.keys(portfolio.detailView).length}
              image={portfolio.image}
              className={classnames('page-section', portfolio.className)}
            />
          </div>
        ))}
      </Fragment>
    )
  }
}
