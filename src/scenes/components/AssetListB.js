import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import dateFormat from 'dateformat';
import Loading from '../../components/Loading';

class AssetListB extends Component {
	componentDidMount() {
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

							<Loading visible={this.props.loading} text="cargando información de prendas en comercialización" />

							{this.props.loading == false && this.props.assets && (

								<BootstrapTable data={this.props.assets} pagination={true} options={tableOptions}>
									<TableHeaderColumn headerAlign='left' isKey dataField='prenda.folio'  dataAlign='left' width="300" dataFormat={(cell, row) =>
										(
											<div>
												<span className="col-003">{row.prenda.folio}</span>
												<div>{row.prenda.descripcion}</div>
												<div>Sucursal: {row.prenda.sucursal}</div>
											</div>
										)}>Prenda</TableHeaderColumn>
									<TableHeaderColumn headerAlign='left' dataAlign='left' width="200" dataFormat={(cell, row) => (<span>no existe el dato</span>)}>Sucursal</TableHeaderColumn>
									<TableHeaderColumn headerAlign='left' dataAlign='left' width="200" dataFormat={(cell, row) => new Date(row.condiciones.fechaLimitePago).toLocaleString("es-MX", dateOptions) }>A la Venta</TableHeaderColumn>
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