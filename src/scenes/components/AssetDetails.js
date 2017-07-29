import React, { Component } from 'react';

class AssetDetails extends Component {
	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="spacer-24"></div>
							<p className="s1 col-005 w400 cond">Boleta No. {this.props.match.params.id}</p>
							<div className="spacer-24"></div>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="panel panel-default well nopadding-bottom">
								<div className="panel-body">
									<div className="col-md-4">
										<p className="col-005">Prenda</p>
										<p></p>
										<p className="col-005">Fecha de Empeño</p>
										<p>01/Marzo/2017</p>
										<p className="col-005">Tipo de Empeño</p>
										<p>Pagos Libres</p>
										<p className="col-005">Fecha de Comercialización (Desempeño)</p>
										<p>31/Marzo/2017</p>
										<p className="col-005">Monto de desempeño</p>
										<p>$719.14</p>
									</div>
									<div className="col-md-8">
										<p className="w700">FECHAS Y MONTOS DE PAGO</p>
										<div className="table-responsive">
											<table className="table nopadding-bottom nomargin-bottom">
												<thead>
													<tr>
														<th className="text-center"></th>
														<th>Fecha de Pago</th>
														<th >Operación</th>
														<th className="text-right">Monto</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>
															<div className="radio radio-primary">
																<label className="col-001">
																	<input name="grp10602346" type="radio" id="10602346OpcR" />
																</label>
															</div>
														</td>
														<td>31/Abril/2017</td>
														<td>Refrendo</td>
														<td className="text-right">$174.00</td>
													</tr>
													<tr>
														<td>
															<div className="radio radio-primary">
																<label>
																	<input name="grp10602346" type="radio" id="10602346OpcD" />
																</label>
															</div>
														</td>
														<td>31/Abril/2017</td>
														<td>Desempeño</td>
														<td className="text-right">$1,174.00</td>
													</tr>
												</tbody>
											</table>
											<hr className="nopadding nomargin" />
											<p className="text-right">
												<a className="btn btn-default btn-raised btn-line btn-sm">&nbsp;&nbsp;&nbsp;&nbsp;PAGAR&nbsp;&nbsp;&nbsp;&nbsp;</a>
											</p>
										</div>
										<p className="w700">PAGOS PARCIALES</p>

									</div>
								</div>
							</div>
						</div>
					</div>

				</div >
			</div>
		);
	}
}

export default AssetDetails;