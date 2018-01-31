import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import AssetStore from '../../flux/stores/AssetStore'
import connectToStores from 'alt-utils/lib/connectToStores';
import Loading from '../../components/Loading';
import Actions from '../../flux/Actions';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom'



class AssetDetails extends Component {
	componentDidMount() {
		setTimeout(Actions.fetchAssetDetail(this.props.match.params.id), 1000);
	}
	static getStores() {
		console.log("--------- static getStores()");

		return [AssetStore];
	}
	static getPropsFromStores() {
		console.log("--------- static getPropsFromStores()");

		console.log("AssetStore.getState()");
		console.log(AssetStore.getState());
		

		return AssetStore.getState();
	}
	static componentDidConnect() {
		console.log('conected...');
	}
	render() {
		const dateOptions = { year: "numeric", month: "long", day: "numeric" };
		const tooltip = (
			<Tooltip id="tooltip">
			  <strong>Visualizar</strong> 
			</Tooltip>
		  );
		const tooltip2 = (
		<Tooltip id="tooltip">
			<strong>Descargar</strong> 
		</Tooltip>
		);
		const tableOptions = {
			page: 1,
			sizePerPage: 5,
			pageStartIndex: 1,
			paginationSize: 3,
			prePage: 'Anterior',
			nextPage: 'Siguiente',
			firstPage: 'Primera',
			lastPage: 'Última',
			paginationShowsTotal: this.renderShowsTotal,
			paginationPosition: 'bottom',
			onSearchChange: this.props.onFilter,
			withoutNoDataText: true,
			noDataText: 'no hay información de boletas disponible'
		};

		return (
			<div>

				<div>


					<div className="container">
						<div className="row">
							<div className="row">
								<div className="col-md-12">
									<div className="spacer-24"></div>
									<p className="s1 col-005 w400 cond">Boleta No. {this.props.match.params.id}</p>
									<div className="spacer-24"></div>
								</div>
							</div>



							<div className="col-md-12">
								<div className="panel panel-default well nopadding-bottom">
									<div className="panel-body">

										<Loading visible={this.props.asset == null} text="Cargando información de boleta" />

										{this.props.asset != null && this.props.asset.prenda && this.props.asset.prenda.folio == this.props.match.params.id && (
											<div>
												<div className="col-md-4">
													{this.props.asset.prenda && (
														<div>
															<p className="col-005">Prenda</p>
															<p>{this.props.asset.prenda.descripcion}</p>
															<p className="col-005">Fecha de Empeño</p>
															<p>{this.props.asset.condiciones && (<span>{new Date(this.props.asset.condiciones.fechaIngreso).toLocaleString("es-MX", dateOptions)}</span>)}</p>
															<p className="col-005">Tipo de Empeño</p>
															<p>{this.props.asset.prenda.tipoContrato}</p>
															<p className="col-005">Fecha Limite de Pago (Desempeño)</p>
															<p>{this.props.asset.condiciones && (<span>{new Date(this.props.asset.condiciones.fechaLimitePago).toLocaleString("es-MX", dateOptions)}</span>)}</p>
														</div>
													)}
												</div>
												<div className="col-md-8">
													<p className="w700">FECHAS Y MONTOS DE PAGO</p>

													<div className="table-responsive">
														{this.props.asset.prenda.operable && (
															<div>
																<BootstrapTable data={this.props.asset.operaciones.operacion} pagination={false} options={tableOptions} keyField="tipoOperacion">
																	<TableHeaderColumn headerAlign='left' dataAlign='left' width="33%" dataFormat={(cell, row) => (<span>{new Date(this.props.asset.condiciones.fechaLimitePago).toLocaleString("es-MX", dateOptions)}</span>)}>Fecha de Pago</TableHeaderColumn>
																	<TableHeaderColumn dataField='tipoOperacion' headerAlign='left' dataAlign='left' width="23%" dataFormat={(cell, row) => (<span>{row.tipoOperacion}</span>)}>Operación</TableHeaderColumn>
																	<TableHeaderColumn dataField='monto' headerAlign='left' dataAlign='left' width="23%"
																		dataFormat={(cell, row) => 
																			(<span> <NumberFormat value={row.monto} displayType={'text'} thousandSeparator={true} prefix={'$'} /></span>)}>
																		
																		Monto
																	</TableHeaderColumn>

																	<TableHeaderColumn dataField='tipoOperacion' headerAlign='center' dataAlign='center' width="20%"
																		dataFormat={(cell, row) => (
																		<div className="flex-display">
																			

																			<OverlayTrigger placement="bottom" overlay={tooltip}>
																				<div className="btn btn-purple btn-fab btn-fab-mini bkg-002">
																					<a onClick={ () => window.open( process.env.REACT_APP_BACKEND_SERVER +'/srv/online?cliente='+this.props.session.clientId+'&folio='+this.props.asset.prenda.folio+'&token='+this.props.session.token ) } >
																						
																							<i className="material-icons col-001">  visibility </i>
																					</a>
																				</div>
																			</OverlayTrigger>

																			<OverlayTrigger placement="bottom" overlay={tooltip2}>
																				<div className="btn btn-yellow btn-fab btn-fab-mini bkg-007">
																					<a href={ process.env.REACT_APP_BACKEND_SERVER +'/srv/download?cliente='+this.props.session.clientId+'&folio='+this.props.asset.prenda.folio+'&token='+this.props.session.token} >
																						<i className="material-icons col-001">  file_download  </i>
																					</a>
																				</div>
																			</OverlayTrigger>
																		</div>
																		)}>
																	ESTADO DE CUENTA PRENDARIO</TableHeaderColumn>


																	
																</BootstrapTable>
															</div>
														)}
														{this.props.asset.prenda.operable == false && (
															<div>La prenda aún no es candidata para el desempeño, no cumple con los días especificados en depósito
															</div>
														)}
													</div>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>

						</div>

					</div >

				</div>

			</div>
		);
	}
}

export default connectToStores(AssetDetails);
