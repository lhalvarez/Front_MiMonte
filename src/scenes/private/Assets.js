import React, { Component } from 'react';
import Actions from '../../flux/Actions';
import Title from '../../components/Title';
import AssetList from '../components/AssetList';
import AssetListB from '../components/AssetListB';
import AssetStore from '../../flux/stores/AssetStore'
import connectToStores from 'alt-utils/lib/connectToStores';

class Assets extends Component {
	constructor(props) {
		super(props);
		this.state = { tab: 1 };
		this.prevTab = this.prevTab.bind(this);
		this.nextTab = this.nextTab.bind(this);
	}
	componentDidMount() {

	}
	prevTab() {
		this.state.tab = 1;
	}
	nextTab() {
		this.state.tab = 2;
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
				<Title title="Boletas" />

				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="panel panel-default">
								<div className="panel-body">
									<div className="col-md-12">
										<ul className="nav nav-pills " id="tabBoletas">
											<li role="presentation" className={'cond w400 ' + (this.state.tab == 1 && 'active')}><a href="#" onClick={this.prevTab}  >Prendas en Empe&Ntilde;o</a></li>
											<li role="presentation" className={'cond w400 ' + (this.state.tab == 2 && 'active')}><a href="#" onClick={this.nextTab}  >Prendas en Comercializaci&oacute;n</a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{this.state.tab == 1 && (
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="tab-content">
									<div role="tabpanel" className="tab-pane active" id="bol1">
										<div className="panel panel-default well nopadding-bottom">
											<AssetList showSearch={true} loading={this.props.loading} assets={this.props.assetsA} onFilter={(filter) => Actions.fetchAssets(filter, this.props.assetsA)} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				{this.state.tab == 2 && (
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="tab-content">
									<div role="tabpanel" className="tab-pane active" id="bol2">
										<div className="panel panel-default well nopadding-bottom">
											<div className="panel-body">
												<div className="col-md-8">
													<AssetListB showSearch={true} loading={this.props.loading} assets={this.props.assetsC} />
												</div>
												<div className="col-md-4">
													<p>Recupera tu prenda</p>
													<p>Acude a la sucursal de Nacional Monte de Piedad en donde realizaste tu empeño y realiza tu <a>Desempeño Extemporáneo</a>.</p>
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
				)}
			</div>
		)
	}
}

export default connectToStores(Assets);