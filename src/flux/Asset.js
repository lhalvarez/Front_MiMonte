import Immutable from 'immutable';

const Asset = Immutable.Record({
	id: '',
	complete: false,
	text: '',
});

export default Asset;