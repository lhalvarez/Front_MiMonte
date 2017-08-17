import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading';
import NumberFormat from 'react-number-format';
import History from '../../components/History';


class AssetList extends Component {
	constructor(props) {
		super(props);
		this.filter = this.filter.bind(this);
	}
	componentDidMount() {
		this.setState({});
	}
	filter(event) {
		var object = {};
		object[event.target.id] = event.target.value;
		this.setState(object);

		if (this.state.filterPhase && this.refs.table) {
			setTimeout(this.refs.table.handleFilterData({ descripcion: { value: this.state.filterPhase, type: 'RegexFilter' } }), 2000);
		}
	}
	onViewDetails(number) {
		History.replace('/asset/details/' + number);
	}
	render() {
		const dateOptions = { year: "numeric", month: "long", day: "numeric" };
		const tableOptions = {
			page: 1,
			sizePerPage: 10,
			pageStartIndex: 1,
			paginationSize: 8,
			prePage: 'Anterior',
			nextPage: 'Siguiente',
			firstPage: 'Primera',
			lastPage: 'Última',
			paginationShowsTotal: this.renderShowsTotal,
			paginationPosition: 'bottom',
			withoutNoDataText: true,
			noDataText: 'no hay información de boletas disponible',

			hideSizePerPage: true
		};

		return (
			<div>
				<div className="panel-header">
					<p className="s1 cond w400 col-005 nomargin-bottom nopadding-bottom">{this.props.title}</p>
				</div>
				{
					this.props.showSearch &&
					<div className="panel-header nomargin-top nopadding-top">
						<div className="row">
							<div className="col-md-4 col-md-offset-8">
								<div className="form-group">
									<div className="input-group">
										<div className="input-group-addon"><i className="material-icons" >search</i></div>
										<input type="text" id="filterPhase" className="form-control" placeholder="Filtrar resultados" onChange={this.filter} />
									</div>
								</div>
							</div>
						</div>
					</div>

				}
				<div className="panel-body">
					<div className="row">
						<div className="col-md-12">
							<Loading visible={this.props.loading} text="cargando información de boletas" />
							{this.props.loading == false && this.props.assets && (

								<BootstrapTable tableContainerClass="table-responsive" data={this.props.assets} pagination={true} options={tableOptions} remote={false} keyField='folio' ref='table' >

									<TableHeaderColumn dataField='descripcion' headerAlign='left' dataAlign='left' className="assets-table-description" columnClassName="assets-table-description" dataFormat={(cell, row) =>
										(
											<div>
												<span className="col-003">{row.prenda.folio}</span>
												<div><Link to={'/asset/details/' + row.prenda.folio} >{row.prenda.descripcion}</Link></div>
												<div><span className="col-012 italic">{row.prenda.tipoContrato}</span></div>
												<div>Sucursal: {row.prenda.sucursal}</div>
												<div className="visible-sm visible-xs">Fecha Limite: {new Date(row.condiciones.fechaLimitePago).toLocaleString("es-MX", dateOptions)}</div>
												<div className="visible-sm visible-xs">[<Link to={'/asset/details/' + row.prenda.folio} >Ver Detalle</Link>]</div>
											</div>
										)}>Prenda</TableHeaderColumn>
									<TableHeaderColumn isKey={false} headerAlign='left' dataAlign='left' className="assets-table-balance" columnClassName="assets-table-balance" dataFormat={(cell, row) => (

										<div>
											{row.prenda.operable && (
												<div>
													{row.saldos && (row.saldos.saldoRefrendo || row.saldos.saldoDesempeno) && (
														<div>

															{row.saldos.saldoDesempeno && (
																<div>
																	Desempeño - <NumberFormat value={row.saldos.saldoDesempeno} displayType={'text'} thousandSeparator={true} prefix={'$'} />
																</div>
															)}
															{row.saldos.saldoRefrendo && (
																<div>
																	Refrendo - <NumberFormat value={row.saldos.saldoRefrendo} displayType={'text'} thousandSeparator={true} prefix={'$'} />
																</div>
															)}
															<div>
																Abonos desde - $1.00
														</div>
														</div>)
													}

													{row.saldos && row.saldos.failed && (
														<div>
															no disponible
														</div>
													)
													}

													{!row.saldos && (
														<span>cargando saldos...</span>
													)}
												</div>
											)}
											{row.prenda.operable == false && (
												<div>La prenda aún no es candidata para el desempeño, no cumple con los días especificados en depósito
													</div>
											)}
										</div>

									)}
									>Operacion y Monto</TableHeaderColumn>
									<TableHeaderColumn isKey={false} className="hidden-xs hidden-sm" columnClassName="hidden-xs hidden-sm" headerAlign='left' dataAlign='left' dataFormat={(cell, row) => new Date(row.condiciones.fechaLimitePago).toLocaleString("es-MX", dateOptions)}>Fecha Limite Pago</TableHeaderColumn>
									<TableHeaderColumn isKey={false} className="hidden-xs hidden-sm assets-table-commands" columnClassName="hidden-xs hidden-sm assets-table-commands" headerAlign='center' dataAlign='center' dataFormat={(cell, row) =>
										(
											<div>
												<Link to={'/asset/details/' + row.prenda.folio} className="btn btn-primary btn-fab btn-fab-mini bkg-002">
													<i className="material-icons col-001">search</i></Link>
											</div>
										)}></TableHeaderColumn>
								</BootstrapTable>
							)}
						</div>

					</div>
				</div>
			</div>
		)
	}
}

export default AssetList;
