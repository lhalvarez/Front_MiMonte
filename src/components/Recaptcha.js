import React, { Component, PropTypes } from 'react';

class Recaptcha extends Component {
	//TODO: retrieve sitekey from env.
	render() {
		return (
			<div>
				<div className="spacer-12"></div>
				<div className="g-recaptcha center-block" data-sitekey="6LdjGiMUAAAAAL4-XZ-ONukUQrA2OWaz3MUHWKcF"></div>
				<div className="spacer-12"></div>
			</div>
		)
	}
}

export default Recaptcha;