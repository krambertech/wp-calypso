/**
 * Internal dependencies
 */
import {
	TWO_FACTOR_AUTHENTICATION_PUSH_UPDATE_NONCE,
} from 'state/action-types';
import {
	getTwoFactorAuthNonce,
} from 'state/login/selectors';

const tryGetNonce = store => {
	const nonce = getTwoFactorAuthNonce( store.getState() );
	if ( nonce ) {
		store.dispatch( {
			type: TWO_FACTOR_AUTHENTICATION_PUSH_UPDATE_NONCE,
			twoStepNonce: null
		} );

		return nonce;
	}
};

const waitForTwoStepNonce = store => new Promise( ( resolve ) => {
	const nonce = tryGetNonce( store );

	if ( nonce ) {
		return resolve( nonce );
	}

	const unsubscribe = store.subscribe( () => {
		const newNonce = tryGetNonce( store );

		if ( newNonce && newNonce !== nonce ) {
			unsubscribe();
			resolve( nonce );
		}
	} );
} );

const queue = [];
const getNonceResolver = store => nonce => {
	const firstInQueue = queue.shift();

	firstInQueue.resolve( nonce );

	if ( queue.length > 0 ) {
		waitForTwoStepNonce( store ).then( getNonceResolver( store ) );
	}
};

export const getSafeTwoFactorAuthNonce = store => {
	const promiseCallbacks = {
		resolve: null,
		reject: null
	};

	const p = new Promise( ( resolve, reject ) => {
		promiseCallbacks.resolve = resolve;
		promiseCallbacks.reject = reject;
	} );

	queue.push( promiseCallbacks );

	waitForTwoStepNonce( store ).then( getNonceResolver( store ) );

	return p;
};
