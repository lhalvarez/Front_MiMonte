import alt from '../../Alt';
import Actions from '../Actions';

class RegisterStore {
	constructor() {
		this.state = { currentStep: 1, loading: false };

		this.bindListeners({
			onTokenIssued: Actions.appTokenIssued,
			onStepOneStarted: Actions.registerStepOne,
			onStepTwoStarted: Actions.registerStepTwo,
			onRegisterStepCompleted: Actions.registerStepCompleted,
			onRegisterStepFailed: Actions.registerFailed,
			onRegisterResendActivationCode: Actions.registerResendActivationCode,
			onRegisterResendEmail: Actions.registerResendEmail
		});
	}
	onTokenIssued(token)
	{
		this.state['appToken'] = token;
	}
	onStepOneStarted(state)	{ this.state['loading'] = true;	}
	onStepTwoStarted(state) { this.state['loading'] = true; }
	onRegisterStepFailed(state) { this.state['loading'] = false; }
	onRegisterResendActivationCode(state) { this.state['loading'] = true; }
	onRegisterResendEmail(sate) { this.state['loading'] = true; }
	onRegisterStepCompleted(state) {
		if (state)
		{
			this.state['loading'] = false;

			if (state.result.respuesta && (state.result.respuesta.codigo == 0 || state.result.respuesta.codigo == "NMP-3002"))
			{
				if (state.result.cliente.estadoRegistro.toLowerCase() == 'preregistro')
				{
					state.info.cliente.telefono.maskedTelefono = "*******" + state.info.cliente.telefono.numeroTelefono.substring(state.info.cliente.telefono.numeroTelefono.length - 4);
					this.state["contractInfo"] = state.info;
					this.state["stepOneResult"] = state.result;
					this.state.currentStep = 2;
				}
				else if (state.result.cliente.estadoRegistro.toLowerCase() == 'pendiente')
				{
					this.state["createUserInfo"] = state.info;
					this.state["stepTwoResult"] = state.result;
					this.state.currentStep = 3;
				}
				else if (state.result.cliente.estadoRegistro.toLowerCase() == 'validacion')
				{
					this.state.currentStep = 2;
				}
				else 
				{
					
				}
			}
			else if (state.result.codigoError == "NMP-3002")
			{
				this.state["contractInfo"] = state.info;
				this.state.currentStep = 2;
			}
			
		}
	}
	
}

export default alt.createStore(RegisterStore, 'RegisterStore');