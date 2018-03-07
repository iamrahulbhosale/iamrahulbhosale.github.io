import React, {PureComponent} from 'react'

import {Route} from 'react-router-dom'

export default class NotFoundPage extends PureComponent {
	render(){
		return (
			<Route render={ ({staticContext})=> {
				if (staticContext)
					staticContext.status = 404
				return (
					<div className='flex-vertical a-center j-center not-found-page'>
						<h1> 404 </h1>
						<h4> {this.props.location.pathname} </h4>
					</div>
				)
			}}/>
		)
	}
}
