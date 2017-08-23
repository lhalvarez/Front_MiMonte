import React, { Component } from 'react';

class Loading extends Component {
	constructor(props) {
		if (!props)
		{
			props.text = 'aguarde...';
		}
		super(props);
	}
	render() {
		return (
			<div>
				{this.props.visible && (
					<div className="loading">
						<div className="loading-bar"></div>
						<div className="loading-bar"></div>
						<div className="loading-bar"></div>
						<div className="loading-bar"></div>
						<div className="loading-text">{this.props.text}</div>
					</div>
				)}
			</div>
		);
	}
}

export default Loading;