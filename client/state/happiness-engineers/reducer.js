/**
 * External dependencies
 */
import { map } from 'lodash';

/**
 * Internal dependencies
 */
import { combineReducersWithPersistence, createReducer } from 'state/utils';

import { itemsSchema } from './schema';
import {
	HAPPINESS_ENGINEERS_FETCH,
	HAPPINESS_ENGINEERS_RECEIVE,
	HAPPINESS_ENGINEERS_FETCH_FAILURE,
	HAPPINESS_ENGINEERS_FETCH_SUCCESS
} from 'state/action-types';

/**
 * Returns the updated requesting state after an action has been dispatched.
 * Requesting state tracks whether a network request is in progress for a site.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action object
 * @return {Object}        Updated state
 */
export const requesting = createReducer( false, {
	[ HAPPINESS_ENGINEERS_FETCH ]: () => true,
	[ HAPPINESS_ENGINEERS_FETCH_FAILURE ]: () => false,
	[ HAPPINESS_ENGINEERS_FETCH_SUCCESS ]: () => false
} );

/**
 * Returns the updated items state after an action has been dispatched. Items
 * state tracks an array of happiness engineers. Receiving happiness engineers
 * for a site will replace the existing set.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action object
 * @return {Array}         Updated state
 */
export const items = createReducer( null, {
	[ HAPPINESS_ENGINEERS_RECEIVE ]: ( state, { happinessEngineers } ) => {
		return map( happinessEngineers, 'avatar_URL' );
	}
}, itemsSchema );

export default combineReducersWithPersistence( {
	requesting,
	items
} );
