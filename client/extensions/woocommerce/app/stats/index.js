/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Main from 'components/main';
import StatsNavigation from './stats-navigation';
import QuerySiteStats from 'components/data/query-site-stats';
import { getSelectedSiteId, getSelectedSiteSlug } from 'state/ui/selectors';

class Stats extends Component {
	createQuery( unit ) {
		return {
			unit,
			date: this.props.moment().format( 'YYYY-MM-DD' ),
			quantity: '30'
		};
	}
	render() {
		const { siteId, unit, slug } = this.props;
		return (
			<Main className="woocommerce stats" wideLayout={ true }>
				{ siteId && <QuerySiteStats
					siteId={ siteId }
					statType="statsOrders"
					query={ this.createQuery( unit ) }
				/> }
				<StatsNavigation unit={ unit } slug={ slug } type="orders" />
			</Main>
		);
	}
}

const localizedStats = localize( Stats );

export default connect(
	state => {
		return {
			siteId: getSelectedSiteId( state ),
			slug: getSelectedSiteSlug( state ),
		};
	}
)( localizedStats );
