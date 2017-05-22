/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import QuerySiteStats from 'components/data/query-site-stats';
import { getSiteStatsNormalizedData, isRequestingSiteStatsForQuery } from 'state/stats/lists/selectors';

const StatsChart = ( { siteId, query, data } ) => {
	return (
		<div>
			{ siteId && <QuerySiteStats
				siteId={ siteId }
				statType="statsOrders"
				query={ query }
			/> }
			{ data && data.map( ( d, i ) => (
				<div key={ i } >{ `${ d.labelDay } Sales: ${ d.total_sales }` }</div>
			) ) }
		</div>
	);
};

export default connect(
	( state, { query, siteId } ) => {
		return {
			data: getSiteStatsNormalizedData( state, siteId, 'statsOrders', query ),
			isRequesting: isRequestingSiteStatsForQuery( state, siteId, 'statsOrders', query ),
		};
	}
)( StatsChart );
