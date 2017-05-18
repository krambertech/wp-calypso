/**
 * External dependencies
 */
import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import Gridicon from 'gridicons';

/**
 * Internal dependencies
 */
import {
	getPostShareScheduledActions,
	getPostSharePublishedActions,
} from 'state/selectors';
import QuerySharePostActions from 'components/data/query-share-post-actions/index.jsx';
import CompactCard from 'components/card/compact';
import SocialLogo from 'social-logos';
import EllipsisMenu from 'components/ellipsis-menu';
import PopoverMenuItem from 'components/popover/menu-item';
import {
	SCHEDULED,
	PUBLISHED,
} from './constants';
import SectionNav from 'components/section-nav';
import NavTabs from 'components/section-nav/tabs';
import NavItem from 'components/section-nav/item';

class PublicizeActionsList extends PureComponent {
	static propTypes = {
		siteId: PropTypes.number,
		postId: PropTypes.number,
	};

	static defaultProps = {
		publishedActions: [],
		scheduledActions: [],
	};

	state = {
		currentSection: SCHEDULED,
	};

	setSection = currentSection => () => this.setState( { currentSection } );

	renderActionItem( {
		connectionName,
		message,
		shareDate,
		service,
	}, index ) {
		const { translate } = this.props;

		return (
			<CompactCard className="post-share__footer-items" key={ index }>
				<div className="post-share__footer-item">
					<div className="post-share__handle">
						<SocialLogo icon={ service === 'google_plus' ? 'google-plus' : service } />
						<span className="post-share__handle-value">
							{ connectionName }
						</span>
					</div>
					<div className="post-share__timestamp">
						<Gridicon icon="time" size={ 18 } />
						<span className="post-share__timestamp-value">
							{ shareDate }
						</span>
					</div>
					<div className="post-share__message">
						{ message }
					</div>
				</div>

				<EllipsisMenu>
					<PopoverMenuItem icon="visible">
						{ translate( 'Preview' ) }
					</PopoverMenuItem>
					<PopoverMenuItem icon="pencil">
						{ translate( 'Edit' ) }
					</PopoverMenuItem>
					<PopoverMenuItem icon="trash">
						{ translate( 'Trash' ) }
					</PopoverMenuItem>
				</EllipsisMenu>
			</CompactCard>
		);
	}

	renderActionsList() {
		const {
			postId,
			scheduledActions,
			publishedActions,
			siteId,
		} = this.props;

		const status = this.state.currentSection;
		const actions = status === SCHEDULED ? scheduledActions : publishedActions;

		return (
			<div>
				<QuerySharePostActions siteId={ siteId } postId={ postId } status={ status } />
				{ actions.map( ( item, index ) => this.renderActionItem( item, index ) ) }
			</div>
		);
	}

	render() {
		const { currentSection } = this.state;
		const {
			scheduledActions,
			publishedActions,
		} = this.props;

		return (
			<div className="post-share__actions-list">
				<SectionNav className="post-share__footer-nav" selectedText={ 'some text' }>
					<NavTabs label="Status" selectedText="Published">
						<NavItem
							selected={ currentSection === SCHEDULED }
							count={ scheduledActions.length }
							onClick={ this.setSection( SCHEDULED ) }
						>
							{ this.props.translate( 'Scheduled' ) }
						</NavItem>

						<NavItem
							selected={ currentSection === PUBLISHED }
							count={ publishedActions.length }
							onClick={ this.setSection( PUBLISHED ) }
						>
							{ this.props.translate( 'Published' ) }
						</NavItem>
					</NavTabs>
				</SectionNav>

				<div className="post-share__actions-list">
					{ this.renderActionsList() }
				</div>
			</div>
		);
	}
}

export default connect(
	( state, { postId, siteId } ) => {
		return {
			scheduledActions: getPostShareScheduledActions( state, siteId, postId ),
			publishedActions: getPostSharePublishedActions( state, siteId, postId ),
		};
	},
)( localize( PublicizeActionsList ) );
