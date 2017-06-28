import React, { Component } from 'react';
import { Container } from 'flux/utils';

import AppView from './scenes/AppView';
import AssetStore from './flux/AssetStore';
import SessionInfoStore from './flux/SessionInfoStore';

//TODO: Not implemented yet.
function getStores() {
	return [
		AssetStore,
		SessionInfoStore
	];
}

function getState() {
	return {
		assets: AssetStore.getState(),
		sessionInfo: SessionInfoStore.getState()
	}
}

export default Container.createFunctional(AppView, getStores, getState);