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

			if (state.result.respuesta.codigo == 0)
			{
				if (state.result.cliente.estadoRegistro.toLowerCase() == 'preregistro')
				{
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
					Actions.error("Respuesta inesperada.");
				}
			}
			
		}
	}
	
}

export default alt.createStore(RegisterStore, 'RegisterStore');