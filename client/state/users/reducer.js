/**
 * Internal dependencies
 */
import suggestions from './suggestions/reducer';
import { combineReducersWithPersistence } from 'state/utils';
import {
	USER_RECEIVE,
} from 'state/action-types';

/**
 * Tracks all known user objects, indexed by user ID.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function items( state = {}, action ) {
	switch ( action.type ) {
		case USER_RECEIVE:
			return Object.assign( {}, state, {
				[ action.user.ID ]: action.user
			} );
	}

	return state;
}

export default combineReducersWithPersistence( {
	items,
	suggestions,
} );
