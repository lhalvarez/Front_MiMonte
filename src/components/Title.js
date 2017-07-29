import React, { Component } from 'react';
import UserInfo from './UserInfo';

class Title extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="spacer-24"></div>
						<p className="s1 col-005 w400 cond">{this.props.title}</p>
						<div className="spacer-24"></div>
					</div>
				</div>
			</div>
		)
	}
}

export default Title;