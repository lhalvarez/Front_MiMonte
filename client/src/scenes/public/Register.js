import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import Title from '../../components/Title'
import Loading from '../../components/Loading'
import FormInput from '../../components/FormInput'
import RegisterStore from '../../flux/stores/RegisterStore';
import Actions from '../../flux/Actions';
import RegisterStepOne from './RegisterStepOne'
import RegisterStepTwo from './RegisterStepTwo'
import RegisterStepThree from './RegisterStepThree'

class Register extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		Actions.appToken();
	}
	static getStores() {
		return [RegisterStore];
	}
	static getPropsFromStores() {
		return RegisterStore.getState();
	}
	render() {
		return (
			<div>
				<Title title="Registro" />
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="panel panel-default">
								<div className="panel-body">
									<div className="col-md-5 col-md-offset-3 col-xs-12">
										<ul className="nav nav-pills nav-justified" id="tabStep">
											<li role="presentation" className={"cond w400 " + (this.props.currentStep == 1 ? 'active' : 'disabled')}><a href="#stp1" aria-controls="stp1" role="tab">Paso 1</a></li>
											<li role="presentation" className={"cond w400 " + (this.props.currentStep == 2 ? 'active' : 'disabled')}><a href="#stp2" aria-controls="stp2" role="tab">Paso 2</a></li>
											<li role="presentation" className={"cond w400 " + (this.props.currentStep == 3 ? 'active' : 'disabled')}><a href="#stp3" aria-controls="stp3" role="tab">Paso 3</a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12">
							<div className="tab-content">

								<Loading visible={(this.props.appToken == null || this.props.loading)}/>

								{this.props.appToken && this.props.loading == false && (
									<div>
										{this.props.currentStep == 1 && <RegisterStepOne />}
										{this.props.currentStep == 2 && <RegisterStepTwo />}
										{this.props.currentStep == 3 && <RegisterStepThree />}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default connectToStores(Register);