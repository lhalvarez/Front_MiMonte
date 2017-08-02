import React from 'react';
import ReactDOM from 'react-dom';
import AppView from './scenes/AppView';
import Actions from './flux/Actions';

let savedSessionInfo = localStorage.getItem('sessionInfo');
if (savedSessionInfo)
{
	try {
		let sessionInfo = JSON.parse(savedSessionInfo);
		if (sessionInfo && sessionInfo.loggedIn) {
			Actions.loggedIn(sessionInfo);
			Actions.appToken();
		}
	}catch(e) { console.error("Invalid session info") }
}

ReactDOM.render(<AppView />, document.getElementById('root'));

