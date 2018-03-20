import React, { Fragment, Component } from 'react'
import classnames from 'classnames'

import PortfolioSection from './PortfolioSection'
import DetailViewDialog from './DetailViewDialog'
import LIST from './portfolio.data'

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
    // const shouldOpenCaseStudy = Number.isInteger(this.state.caseStudyIndex)

    return (
      <Fragment>
        <DetailViewDialog
          caseStudyIndex={this.state.caseStudyIndex}
          list={LIST}
          onRequestClose={this.closeCaseStudy}
        />

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
