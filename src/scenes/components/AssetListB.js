import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import dateFormat from 'dateformat';
import Loading from '../../components/Loading';

class AssetListB extends Component {
	componentDidMount() {
		this.filter = this.filter.bind(this);
		this.setValue = this.setValue.bind(this);
	}
	filter() {
		if (this.state.filterPhase) {
			this.refs.descripcionColumn.applyFilter(this.state.filterPhase);
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
			paginationPosition: 'bottom',
			onSearchChange: this.onSearchChange,
			searchDelayTime: 1500,
			withoutNoDataText: true,
			noDataText: 'no hay información de boletas disponible'
		};
		return (

			<div>
				<div className="panel-header">
					<p className="s1 cond w400 col-005 nomargin-bottom nopadding-bottom">{this.props.title}</p>
				</div>
				<div className="panel-body">
					<div className="row">
						<div className="col-md-12">

							<Loading visible={this.props.loading} text="cargando información de prendas en comercialización" />

							{this.props.loading == false && this.props.assets && (

								<BootstrapTable data={this.props.assets} className="table-collapse" pagination={false} options={tableOptions}
									search={this.props.showSearch}
									searchPlaceholder='filtrar...'>

									<TableHeaderColumn headerAlign='left' isKey={true} dataField='prenda.folio' dataAlign='left' width="50%" dataFormat={(cell, row) =>
										(
											<div>
												<span className="col-003">{row.prenda.folio}</span>
												<div>{row.prenda.descripcion}</div>
												<div>Sucursal: {row.prenda.sucursal}</div>
											</div>
										)}>Prenda</TableHeaderColumn>
									<TableHeaderColumn isKey={false} headerAlign='left' dataAlign='left' width="20%" dataFormat={(cell, row) => (<span>{row.prenda.sucursal}</span>)}>Sucursal</TableHeaderColumn>
									<TableHeaderColumn isKey={false} headerAlign='left' dataAlign='left' width="30%" dataFormat={(cell, row) => new Date(row.condiciones.fechaLimitePago).toLocaleString("es-MX", dateOptions)}>A la Venta</TableHeaderColumn>
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