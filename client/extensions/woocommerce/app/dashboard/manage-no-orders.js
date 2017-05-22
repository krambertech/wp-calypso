/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import BasicWidget from '../../components/basic-widget';
import ExtensionsWidget from '../../components/extensions-widget';
import ReadingWidget from '../../components/reading-widget';
import ShareWidget from '../../components/share-widget';
import WidgetGroup from '../../components/widget-group';

class ManageNoOrders extends Component {
	static propTypes = {
		site: PropTypes.shape( {
			slug: PropTypes.string.isRequired,
		} ),
	};

	itemLink = ( path ) => {
		const link = path.replace( ':site', this.props.site.slug );
		return link;
	}

	renderShareWidget = () => {
		const { translate } = this.props;
		return (
			<ShareWidget
				text={ translate( 'Now that your setup is complete it\'s time to spread the word' +
					' and get those first orders rolling in. Share a link with your friends,' +
					' family & followers now.' ) }
				title={ translate( 'Your store is ready & the world is waiting!' ) }
				urlToShare={ this.itemLink( 'https://:site' ) }
			/>
		);
	}

	renderThemeWidget = () => {
		const { translate } = this.props;
		return (
			<BasicWidget
				className="dashboard__theme-widget"
				buttonLabel={ translate( 'View themes' ) }
				buttonLink="https://woocommerce.com/product-category/themes/storefront-child-theme-themes/"
				imageSource="/calypso/images/extensions/woocommerce/themes.svg"
				text={ translate( 'Want to change how your store looks? Choose a different theme.' ) }
				title={ translate( 'Fine-tune the appearance of your store' ) }
			/>
		);
	}

	renderPlansWidget = () => {
		const { translate } = this.props;
		return (
			<BasicWidget
				className="dashboard__plans-widget"
				buttonLabel={ translate( 'View info & plans' ) }
				buttonLink={ this.itemLink( '/plans/:site' ) }
				imageSource="/calypso/images/extensions/woocommerce/plans.svg"
				text={ translate( 'World-class Backups & Security for WordPress.' ) }
				title={ translate( 'Secure your store with VaultPress' ) }
			/>
		);
	}

	renderReadingWidget = () => {
		return (
			<ReadingWidget className="dashboard__reading-widget" />
		);
	}

	renderExampleOrderWidget = () => {
		const { translate } = this.props;
		return (
			<BasicWidget
				buttonLabel={ translate( 'View an example order' ) }
				buttonLink={ this.itemLink( '/store/orders/:site/example' ) }
				className="dashboard__example-order-widget"
				title={ translate( 'Looking for orders and reports?' ) }
			>
				{ translate( 'This dashboard will evolve as your store grows.' +
					' Statistics will form and order overviews will display when your' +
					' first orders start arriving.' ) }
			</BasicWidget>
		);
	}

	renderViewAndTestWidget = () => {
		const { translate } = this.props;
		return (
			<BasicWidget
				buttonLabel={ translate( 'View & test your store' ) }
				buttonLink={ this.itemLink( 'https://:site' ) }
				className="dashboard__view-and-test-widget"
				title={ translate( 'Test all the things' ) }
			>
				{
					translate( 'Your store is live. You may want to double check' +
						'your tax, shipping and payment configuration are set up correctly.' )
				}
				{
					translate( 'The easiest way to do this is to view your store, add' +
						'a product to your cart and attempt to check out using different addresses.' )
				}
			</BasicWidget>
		);
	}

	renderExtensionsWidget = () => {
		const { site } = this.props;
		return (
			<ExtensionsWidget className="dashboard__extensions-widget" site={ site } />
		);
	}

	render = () => {
		return (
			<div className="dashboard__manage-no-orders">
				{ this.renderShareWidget() }
				<WidgetGroup>
					{ this.renderThemeWidget() }
					{ this.renderPlansWidget() }
				</WidgetGroup>
				{ this.renderReadingWidget() }
				<WidgetGroup>
					{ this.renderExampleOrderWidget() }
					{ this.renderViewAndTestWidget() }
				</WidgetGroup>
				{ this.renderExtensionsWidget() }
			</div>
		);
	}
}

export default localize( ManageNoOrders );
