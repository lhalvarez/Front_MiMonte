import React, { Component } from 'react';
import AssetStore from '../../flux/stores/AssetStore'
import connectToStores from 'alt-utils/lib/connectToStores';
import Loading from '../../components/Loading';
import Actions from '../../flux/Actions';

class AssetDetails extends Component {
	componentDidMount() {
		this.state = {
			asset: {}
		}
		this.state.asset = this.props.assetsA.find((asset) => {
			return (asset.prenda.folio == this.props.match.params.id);
		});
		Actions.fetchAssetDetail(this.props.match.params.id);
	}
	static getStores() {
		return [AssetStore];
	}
	static getPropsFromStores() {
		return AssetStore.getState();
	}
	render() {
		return (
			<div>

				<Loading visible={!(this.state && this.state.asset)} />

				{this.state && this.state.asset && (
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
												<p></p>
												<p className="col-005">Fecha de Empeño</p>
												<p>...</p>
												<p className="col-005">Tipo de Empeño</p>
												<p>...</p>
												<p className="col-005">Fecha de Comercialización (Desempeño)</p>
												<p>{this.state.asset.condiciones.fechaComercializacion}</p>
												{this.state.asset.saldos && this.state.asset.saldos.saldoRefrendo && (
													<div>
														<p className="col-005">Monto de desempeño</p>
														<p>${this.state.asset.saldos.saldoRefrendo}</p>
													</div>
												)}
											</div>
											<div className="col-md-8">
												<p className="w700">FECHAS Y MONTOS DE PAGO</p>
												<div className="table-responsive">

													<hr className="nopadding nomargin" />
													<p className="text-right">
														<a className="btn btn-default btn-raised btn-line btn-sm">&nbsp;&nbsp;&nbsp;&nbsp;PAGAR&nbsp;&nbsp;&nbsp;&nbsp;</a>
													</p>
												</div>
												<p className="w700">PAGOS PARCIALES</p>

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