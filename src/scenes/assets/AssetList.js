import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom'
import AssetStore from '../../flux/AssetStore';

class AssetList extends Component {
	constructor(props) {
		super(props);
		this.state = AssetStore.getState();
	}
	componentDidMount() {

	}
	componentWillUnmount() {
	}
	onChange(state) {
		this.setState(state);
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
									<div className="panel-body">
										<div className="container">
											<div className="row">
												<div className="col-md-12">
													<BootstrapTable data={this.state.assets} >
														<TableHeaderColumn isKey dataField='prenda.folio' hidden></TableHeaderColumn>
														<TableHeaderColumn headerAlign='left' dataAlign='left' width="300" dataFormat={(cell, row) =>
															(
																<div>
																	<span className="col-003">{row.prenda.folio}</span>
																	<div>{row.prenda.descripcion}</div>
																	<span className="col-012 italic">falta el dato</span>
																</div>
															)}>Prenda</TableHeaderColumn>
														<TableHeaderColumn headerAlign='left' dataAlign='left' width="200" dataFormat={(cell, row) => {
															var operaciones = row.operaciones.operacion.map((operacion) =>
																<div className="radio radio-primary">
																	<input name="grp10602346" type="radio" />
																	<label className="col-001" >
																		{operacion.tipoOperacion} ${operacion.monto} </label>
																</div>
															);

															return (<div>{operaciones}</div>)
														}
														}>Operacion y Monto</TableHeaderColumn>
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

			</div>
		);
	}
}

export default AssetList;