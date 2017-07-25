import React, { Component } from 'react';

class Promotions extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="panel panel-default well nopadding-bottom" >
				<div className="panel-header">
					<p className="s1 cond w400 col-005 nomargin-bottom nopadding-bottom" >Promoción del mes</p>
				</div>
				<div className="panel-body">
					<img src="images/promo-01.jpg" className="img-responsive" />
				</div>
				<div className="panel-footer text-right nopadding">
					<a className="btn btn-flat btn-default">Ir a la tienda<div className="ripple-container"></div></a>
					<a className="btn btn-flat btn-warning">Ver todas las promociones<div className="ripple-container"></div></a>
				</div>
			</div>
		)
	}
}

export default Promotions;