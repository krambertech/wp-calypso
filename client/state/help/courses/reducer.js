/**
 * Internal dependencies
 */
import { combineReducersWithPersistence, createReducer } from 'state/utils';

import {
	HELP_COURSES_RECEIVE,
} from 'state/action-types';

export const items = createReducer( null, {
	[ HELP_COURSES_RECEIVE ]: ( state, { courses } ) => courses
} );

export default combineReducersWithPersistence( {
	items
} );
