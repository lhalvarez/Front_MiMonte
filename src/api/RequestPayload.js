import Immutable from 'immutable';

class ValidarDatosPayload {
	foo: string
	cliente: {
		numCredencial: '',
		apellidoPaterno: '',
		nombres: '',
		fechaNacimiento: '1900-01-01T01:00:00',
		correoElectronico: '',
		telefono: {
			numeroTelefono: ''
		},
		medioValidacion: 1,
		datosPrendarios: {
			numContrato: ''
		}
	}
}
export default ValidarDatosPayload;