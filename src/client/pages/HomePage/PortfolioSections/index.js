import React, { Fragment, Component } from 'react'
import classnames from 'classnames'

import PortfolioSection from './PortfolioSection'
import LIST from './portfolio.data'

export default class PortfolioSections extends Component {
  render() {
    return (
      <Fragment>
        {LIST.map((portfolio, index) => (
          <div className="cd-section" key={index}>
            <PortfolioSection
              title={portfolio.title}
              description={
                <div>
                  {portfolio.description.map((str, i) => (
                    <div key={i}>{str}</div>
                  ))}
                </div>
              }
              webLink={portfolio.webLink || '#'}
              mobileLink={portfolio.mobileLink || '#'}
              caseStudyLink={portfolio.caseStudyLink || '#'}
              image={portfolio.image}
              className={classnames('page-section', portfolio.className)}
            />
          </div>
        ))}
      </Fragment>
    )
  }
}
