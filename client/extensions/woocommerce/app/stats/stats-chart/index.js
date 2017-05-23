/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import QuerySiteStats from 'components/data/query-site-stats';
import { getSiteStatsNormalizedData, isRequestingSiteStatsForQuery } from 'state/stats/lists/selectors';
import ElementChart from 'components/chart';
import Legend from 'components/chart/legend';

class StatsChart extends Component {
	state = {
		selectedTab: 'total_sales'
	}

	buildChartData = ( item ) => {
		const className = classnames( item.classNames.join( ' ' ), {
			'is-selected': item.period === this.props.startDate,
		} );
		return {
			label: item.labelDay,
			value: item.total_sales,
			nestedValue: null,
			data: item,
			tooltipData: [],
			className,
		};
	}

	render() {
		const { siteId, query, data } = this.props;
		const tabs = [
			{ label: 'Gross Sales', attr: 'total_sales' },
			{ label: 'Net Sales', attr: 'net_sales' },
			{ label: 'Orders', attr: 'orders' },
			{ label: 'Order Average', attr: 'order_average' },
		];
		const isLoading = ! ! data.length;
		const chartData = data.map( this.buildChartData );
		return (
			<Card className="stats-module">
				{ siteId && <QuerySiteStats
					siteId={ siteId }
					statType="statsOrders"
					query={ query }
				/> }
				<Legend
					tabs={ tabs }
					activeTab={ tabs[ 0 ] }
					availableCharts={ [] }
					activeCharts={ [] }
					clickHandler={ () => {} }
				/>
				<ElementChart loading={ isLoading } data={ chartData } barClick={ () => {} } />
			</Card>
		);
	}
}

export default connect(
	( state, { query, siteId } ) => {
		return {
			data: getSiteStatsNormalizedData( state, siteId, 'statsOrders', query ),
			isRequesting: isRequestingSiteStatsForQuery( state, siteId, 'statsOrders', query ),
			startDate: 'a string from the url'
		};
	}
)( StatsChart );
