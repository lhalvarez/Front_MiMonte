import React, { Component } from 'react';

class Loading extends Component {

	render() {
		return (
			<div>
				{this.props.visible && (

					<div className="loading">
						<div className="loading-bar"></div>
						<div className="loading-bar"></div>
						<div className="loading-bar"></div>
						<div className="loading-bar"></div>
						<div className="loading-text">aguarde...</div>
					</div>

				)
				}
			</div>
		);
	}
}

export default Loading;