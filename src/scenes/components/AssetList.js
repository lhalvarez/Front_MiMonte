import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading';

class AssetList extends Component {
	constructor(props) {
		super(props);
		this.filter = this.filter.bind(this);
		this.setValue = this.setValue.bind(this);
	}
	componentDidMount() {
		this.setState({});
	}
	filter() {
		if (this.state.filterPhase)
		{
			
		}
	}
	setValue(event) {
		var object = {};
		object[event.target.id] = event.target.value;
		this.setState(object);
	}
	render() {
		const dateOptions = { year: "numeric", month: "long", day: "numeric" };
		const tableOptions = {
			page: 1,  // which page you want to show as default
			sizePerPage: 5,  // which size per page you want to locate as default
			pageStartIndex: 1, // where to start counting the pages
			paginationSize: 3,  // the pagination bar size.
			prePage: 'Anterior', // Previous page button text
			nextPage: 'Siguiente', // Next page button text
			firstPage: 'Primera', // First page button text
			lastPage: 'Última', // Last page button text
			paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
			paginationPosition: 'bottom'  // default is bottom, top and both is all available
		};

		return (
			<div>
				{
					this.props.showSearch &&
					<div className="panel-header nomargin-top nopadding-top">
						<div className="row">
							<div className="col-md-4 col-md-offset-8">
								<div className="form-group">
									<div className="input-group">
										<div className="input-group-addon"><i className="material-icons">search</i></div>
										<input type="text" id="filterPhase" className="form-control" placeholder="Filtrar resultados" onChange={this.setValue} />
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
							<Loading visible={this.props.loading} text="cargando información de boletas" />
							{this.props.loading == false && this.props.assets && (
								<BootstrapTable data={this.props.assets} pagination={true} options={tableOptions}	>
									<TableHeaderColumn isKey dataField='prenda.folio' headerAlign='left' dataAlign='left' width="300" dataFormat={(cell, row) =>
										(
											<div>
												<span className="col-003">{row.prenda.folio}</span>
												<div>{row.prenda.descripcion}</div>
												<div>Sucursal: {row.prenda.sucursal}</div>
											</div>
										)}>Prenda</TableHeaderColumn>
									<TableHeaderColumn headerAlign='left' dataAlign='left' width="200" dataFormat={(cell, row) => (

										<div>
											{row.saldos && (row.saldos.saldoRefrendo || row.saldos.saldoDesempeno) && (
												<div>
													<div className="radio radio-primary">
														<label className="col-001">
															<input name="grp10602346" type="radio" id="10602346OpcR" />
															Refrendo - ${row.saldos.saldoRefrendo}</label>
													</div>
													<div className="radio radio-primary">
														<label>
															<input name="grp10602346" type="radio" id="10602346OpcD" />
															Desempeño - ${row.saldos.saldoDesempeno}
														</label>
													</div>
												</div>)
											}

											{row.saldos && row.saldos.failed && (
												<div>
													no disponible
													</div>
												)
											}

											<Loading visible={!row.saldos} text="cargando saldos" />
										</div>

									)}
									>Operacion y Monto</TableHeaderColumn>
									<TableHeaderColumn headerAlign='left' dataAlign='left' width="100" dataFormat={(cell, row) => new Date(row.condiciones.fechaLimitePago).toLocaleString("es-MX", dateOptions)}>Fecha Limite</TableHeaderColumn>
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