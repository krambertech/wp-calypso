/**
 * Internal dependencies
 */
import {
	SELECTED_SITE_SET,
	SECTION_SET,
	PREVIEW_IS_SHOWING,
	SERIALIZE,
	DESERIALIZE,
	NOTIFICATIONS_PANEL_TOGGLE,
} from 'state/action-types';
import { combineReducersWithPersistence, createReducer } from 'state/utils';
import editor from './editor/reducer';
import dropZone from './drop-zone/reducer';
import guidedTour from './guided-tours/reducer';
import queryArguments from './query-arguments/reducer';
import reader from './reader/reducer';
import olark from './olark/reducer';
import actionLog from './action-log/reducer';
import layoutFocus from './layout-focus/reducer';
import preview from './preview/reducer';
import happychat from './happychat/reducer';
import mediaModal from './media-modal/reducer';
import themeSetup from './theme-setup/reducers';
import npsSurveyNotice from './nps-survey-notice/reducer';

/**
 * Tracks the currently selected site ID.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function selectedSiteId( state = null, action ) {
	switch ( action.type ) {
		case SELECTED_SITE_SET:
			return action.siteId || null;
	}

	return state;
}

//TODO: do we really want to mix strings and booleans?
export function section( state = false, action ) {
	switch ( action.type ) {
		case SECTION_SET:
			return ( action.section !== undefined ) ? action.section : state;
	}
	return state;
}

export function hasSidebar( state = true, action ) {
	switch ( action.type ) {
		case SECTION_SET:
			return ( action.hasSidebar !== undefined ) ? action.hasSidebar : state;
	}
	return state;
}

export function isLoading( state = false, action ) {
	switch ( action.type ) {
		case SECTION_SET:
			return ( action.isLoading !== undefined ) ? action.isLoading : state;
	}
	return state;
}

export const isPreviewShowing = createReducer( false, {
	[ PREVIEW_IS_SHOWING ]: ( state, { isShowing } ) =>
		isShowing !== undefined ? isShowing : state,
} );

/**
 * Tracks if the notifications panel is open
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export const isNotificationsOpen = function( state = false, { type } ) {
	if ( type === NOTIFICATIONS_PANEL_TOGGLE ) {
		return ! state;
	}
	return state;
};

const reducer = combineReducersWithPersistence( {
	section,
	isLoading,
	layoutFocus,
	hasSidebar,
	isPreviewShowing,
	queryArguments,
	selectedSiteId,
	dropZone,
	guidedTour,
	editor,
	reader,
	olark,
	preview,
	actionLog,
	happychat,
	mediaModal,
	themeSetup,
	npsSurveyNotice,
	isNotificationsOpen,
} );

const ui = function( state, action ) {
	if ( SERIALIZE === action.type || DESERIALIZE === action.type ) {
		return {};
	}

	return reducer( state, action );
};
ui.hasCustomPersistence = true;

export default ui;
