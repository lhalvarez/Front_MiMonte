import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import dateFormat from 'dateformat';
import Loading from '../../components/Loading';

class AssetListB extends Component {
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
							<div className="col-md-6 col-md-offset-6">
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

							<Loading visible={this.props.loading} text="cargando información de prendas en comercialización" />

							{this.props.loading == false && this.props.assets && (

								<BootstrapTable data={this.props.assets} tableContainerClass="table-responsive" className="table-collapse" pagination={true} options={tableOptions}
									ref='table'>

									<TableHeaderColumn headerAlign='left' isKey={true} dataField='folio' dataAlign='left' width="50%" dataFormat={(cell, row) =>
										(
											<div>
												<span className="col-003">{row.prenda.folio}</span>
												<div>{row.prenda.descripcion}</div>
												<div>Sucursal: {row.prenda.sucursal}</div>
												<div className="visible-sm visible-xs">A la venta: {new Date(row.condiciones.fechaLimitePago).toLocaleString("es-MX", dateOptions)}</div>
											</div>
										)}>Prenda</TableHeaderColumn>
									<TableHeaderColumn isKey={false} className="hidden-xs hidden-sm" columnClassName="hidden-xs hidden-sm" headerAlign='left' dataAlign='left' width="20%" dataFormat={(cell, row) => (<span>{row.prenda.sucursal}</span>)}>Sucursal</TableHeaderColumn>
									<TableHeaderColumn isKey={false} className="hidden-xs hidden-sm" columnClassName="hidden-xs hidden-sm" headerAlign='left' dataAlign='left' width="30%" dataFormat={(cell, row) => new Date(row.condiciones.fechaComercializacion).toLocaleString("es-MX", dateOptions)}>A la Venta</TableHeaderColumn>
								</BootstrapTable>
							)}
						</div>

					</div>
				</div>
			</div>
		);
	}
}

export default AssetListB;