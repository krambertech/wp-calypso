/**
 * Internal dependencies
 */
import { mergeHandlers } from 'state/data-layer/utils';
import devices from './devices';
import settings from './settings';
import sendVerificationEmail from './send-verification-email';

export default mergeHandlers(
	devices,
	settings,
	sendVerificationEmail,
);
