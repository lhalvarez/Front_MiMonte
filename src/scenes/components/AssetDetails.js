import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import AssetStore from '../../flux/stores/AssetStore'
import connectToStores from 'alt-utils/lib/connectToStores';
import Loading from '../../components/Loading';
import Actions from '../../flux/Actions';

class AssetDetails extends Component {
	componentDidMount() {
		setTimeout(Actions.fetchAssetDetail(this.props.match.params.id), 1000);
	}
	static getStores() {
		return [AssetStore];
	}
	static getPropsFromStores() {
		return AssetStore.getState();
	}
	render() {
		const dateOptions = { year: "numeric", month: "long", day: "numeric" };
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
				<Loading visible={this.props.loading || this.props.asset == null} text="cargando información de boleta" />

				{this.props.loading == false && this.props.asset && this.props.asset.prenda (
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
												<p>{this.props.asset.prenda.descripcion}</p>
												<p className="col-005">Fecha de Empeño</p>
												<p>{this.props.asset.condiciones && (<span>{new Date(this.props.asset.condiciones.fechaIngreso).toLocaleString("es-MX", dateOptions)}</span>)}</p>
												<p className="col-005">Tipo de Empeño</p>
												<p>{this.props.asset.prenda.tipoContrato}</p>
												<p className="col-005">Fecha Limite de Pago (Desempeño)</p>
												<p>{this.props.asset.condiciones && (<span>{new Date(this.props.asset.condiciones.fechaLimitePago).toLocaleString("es-MX", dateOptions)}</span>)}</p>
												
											</div>
											<div className="col-md-8">
												<p className="w700">FECHAS Y MONTOS DE PAGO</p>
												<div className="table-responsive">

													<BootstrapTable data={this.props.asset.operaciones.operacion} pagination={false} options={tableOptions} keyField="tipoOperacion">
														<TableHeaderColumn headerAlign='left' dataAlign='left' width="33%" dataFormat={(cell, row) => (<span>falta el dato</span>)}>Fecha de Pago</TableHeaderColumn>
														<TableHeaderColumn dataField='tipoOperacion' headerAlign='left' isKey={true} dataAlign='left' width="33%" dataFormat={(cell, row) => (<span>{row.tipoOperacion}</span>)}>Operación</TableHeaderColumn>
														<TableHeaderColumn dataField='monto' headerAlign='left' dataAlign='left' width="33%" dataFormat={(cell, row) => (<span>${row.monto}</span>)}>Monto</TableHeaderColumn>
													</BootstrapTable>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

						</div >
					</div>
				)}
			</div>
		);
	}
}

export default connectToStores(AssetDetails);