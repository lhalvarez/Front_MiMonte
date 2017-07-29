import React, { Component } from 'react';
import Title from '../../components/Title';
import AssetList from '../components/AssetList';
import AssetListB from '../components/AssetListB';
import AssetTab from '../components/AssetTab';
import Actions from '../../flux/Actions';
import AssetStore from '../../flux/stores/AssetStore'
import connectToStores from 'alt-utils/lib/connectToStores';

class Assets extends Component {
	constructor(props) {
		super(props);
		this.currentTab = 1;
	}
	componentDidMount() {

	}
	prevTab() {
		this.currentTab = 1;
	}
	nextTab() {
		this.currentTab = 2;
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
				<Title title="Boletas" />{this.currentTab}

				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="panel panel-default">
								<div className="panel-body">
									<div className="col-md-12">
										<ul className="nav nav-pills " id="tabBoletas">
											<li role="presentation" className="active cond w400"><a onClick={this.prevTab} aria-controls="bol1" role="tab" >Prendas en Empe&Ntilde;o</a></li>
											<li role="presentation" className="cond w400"><a onClick={this.nextTab} aria-controls="bol2" role="tab" >Prendas en Comercializaci&oacute;n</a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="tab-content">
								<div role="tabpanel" className="tab-pane fade in active" id="bol1">
									<div className="panel panel-default well nopadding-bottom">
										<AssetList showSearch={true} loading={this.props.loading} assets={this.props.assetsA} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="tab-content">
								<div role="tabpanel" className="tab-pane fade in active" id="bol2">
									<div className="panel panel-default well nopadding-bottom">
										<div class="panel-body">
											<div class="col-md-8">
												<AssetListB showSearch={true} loading={this.props.loading} assets={this.props.assetsB} />
											</div>
											<div class="col-md-4">
												<p>Recupera tu prenda</p>
												<p>Acude a la sucursal de Nacional Monte de Piedad en donde realizaste tu empeño y realiza tu <a href="#">Desempeño Extemporáneo</a>.</p>
												<p>Deberás presentar tu identificación oficial y boleta original, asó como realizar el pago de tu préstamo otorgado más intereses, y se te pueda entregar tu prenda en ventanilla.</p>
												<p>Si tu prenda ya no aparece en el listado es probable que se haya comercializado.</p>
												<p>Corrobora esta información en la sucursal en donde la empeñaste y pide más información en ventanilla.</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>

			</div>
		)
	}
}

export default connectToStores(Assets);