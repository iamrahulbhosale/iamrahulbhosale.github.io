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

  getNextCaseStudyName = () => {
    const index = this.state.caseStudyIndex
    if (LIST.length === index + 1) {
      return null
    }
    return LIST[index + 1].title
  }

  onNextCaseStudyClick = () => {
    const index = this.state.caseStudyIndex
    if (LIST.length === index + 1) {
      return
    }

    this.setState({ caseStudyIndex: index + 1 })
  }

  render() {
    // const shouldOpenCaseStudy = Number.isInteger(this.state.caseStudyIndex)

    return (
      <Fragment>
        <DetailViewDialog
          caseStudyIndex={this.state.caseStudyIndex}
          nextCaseStudyName={this.getNextCaseStudyName()}
          onNextCaseStudyClick={this.onNextCaseStudyClick}
          list={LIST}
          onRequestClose={this.closeCaseStudy}
        />

        {LIST.map((portfolio, index) => (
          <div className="cd-section" key={index}>
            <PortfolioSection
              title={portfolio.title}
              description={this.getDescription(portfolio.description)}
              workedOn={portfolio.workedOn}
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
