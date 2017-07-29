import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom'
import AssetStore from '../../flux/stores/AssetStore';
import Actions from '../../flux/Actions';

class AssetList extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
	}
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="tab-content">
							<div role="tabpanel" className="tab-pane fade in active" id="bol1">
								<div className="panel panel-default well nopadding-bottom">
									{
										this.props.showSearch &&
										<div className="panel-header nomargin-top nopadding-top">
											<div className="row">
												<div className="col-md-4 col-md-offset-8">
													<div className="form-group">
														<div className="input-group">
															<div className="input-group-addon"><i className="material-icons">search</i></div>
															<input type="text" className="form-control" placeholder="Filtrar resultados" />
														</div>
													</div>
												</div>
											</div>
										</div>

									}
									<div className="panel-header">
										<p className="s1 cond w400 col-005 nomargin-bottom nopadding-bottom">{this.props.title}</p>
									</div>
									<div className="panel-body">
										<div className="row">
											<div className="col-md-12">

												{AssetStore.isLoading() && (
													<div className="loading">
														<div className="loading-bar"></div>
														<div className="loading-bar"></div>
														<div className="loading-bar"></div>
														<div className="loading-bar"></div>
														<div className="loading-text">cargando...</div>
													</div>
												)}

															<BootstrapTable data={this.props.assets} >
															<TableHeaderColumn isKey dataField='prenda.folio' dataAlign="center" dataFormat={(cell, row) =>
																(
																	<input type="checkbox" id="chk10602346" />
																)}></TableHeaderColumn>
															<TableHeaderColumn headerAlign='left' dataAlign='left' width="300" dataFormat={(cell, row) =>
																(
																	<div>
																		<span className="col-003">{row.prenda.folio}</span>
																		<div>{row.prenda.descripcion}</div>
																		<span className="col-012 italic">falta el dato</span>
																	</div>
																)}>Prenda</TableHeaderColumn>
															<TableHeaderColumn headerAlign='left' dataAlign='left' width="200" dataFormat={(cell, row) => {

																<div className="radio radio-primary">
																	<input name="grp10602346" type="radio" />
																	<label className="col-001" >
																		pendiente</label>
																</div>
															}}
															>Operacion y Monto</TableHeaderColumn>
															<TableHeaderColumn headerAlign='left' dataAlign='left' width="200" dataFormat={(cell, row) => dateFormat(row.condiciones.fechaLimitePago, "dd/mmmm/yyyy")}>Fecha Limite</TableHeaderColumn>
															<TableHeaderColumn headerAlign='left' dataAlign='left' width="200" dataFormat={(cell, row) =>
																(
																	<div>
																		<Link to={'/asset/details/' + row.prenda.folio} className="btn btn-primary btn-fab btn-fab-mini bkg-002">
																			<i className="material-icons col-001"></i></Link>
																		<Link to={'/asset/details/' + row.prenda.folio} className="btn btn-danger btn-raised btn-sm">PAGAR</Link>
																	</div>
																)}></TableHeaderColumn>
														</BootstrapTable>
												
											</div>

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default AssetList;