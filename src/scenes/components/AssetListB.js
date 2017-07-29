import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom'
import AssetStore from '../../flux/stores/AssetStore';
import Actions from '../../flux/Actions';
import Loading from '../../components/Loading';

class AssetListB extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
	}
	render() {
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

							<Loading visible={this.props.Loading} />

							{this.props.loading == false && this.props.assets && (
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
											</div>
										)}>Prenda</TableHeaderColumn>
									<TableHeaderColumn headerAlign='left' dataAlign='left' width="200" dataFormat={(cell, row) => (<span>no existe el dato</span>)}>Sucursal</TableHeaderColumn>
									<TableHeaderColumn headerAlign='left' dataAlign='left' width="200" dataFormat={(cell, row) => dateFormat(row.condiciones.fechaLimitePago, "dd/mmmm/yyyy")}>A la Venta</TableHeaderColumn>
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