import React, { Component } from 'react';

class Promotions extends Component {
	render() {
		return (
			<div className="panel panel-default well nopadding-bottom" >
				<div className="panel-header">
					<p className="s1 cond w400 col-005 nomargin-bottom nopadding-bottom" >Promoción del mes</p>
				</div>
				<div className="panel-body">
					<img src="images/promo-01.jpg" className="img-responsive" alt="Promo" />
				</div>
				<div className="panel-footer text-right nopadding">
					<a className="btn btn-flat btn-default" href="https://tienda.montepiedad.com.mx/" target="_blank">Ir a la tienda<div className="ripple-container"></div></a>
					<a className="btn btn-flat btn-warning" href="https://www.montepiedad.com.mx/portal/tienda-monte-sucursal.html" target="_blank">Ver todas las promociones<div className="ripple-container"></div></a>
				</div>
			</div>
		)
	}
}

export default Promotions;