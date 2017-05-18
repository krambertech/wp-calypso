/**
 * External dependencies
 */
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { partial } from 'lodash';

/**
 * Internal dependencies
 */
import EditorDrawer from 'post-editor/editor-drawer';
import EditorSidebarHeader from './header';
import SidebarFooter from 'layout/sidebar/footer';
import SidebarRegion from 'layout/sidebar/region';
import EditorActionBar from 'post-editor/editor-action-bar';
import EditorDeletePost from 'post-editor/editor-delete-post';
import { NESTED_SIDEBAR_NONE, NestedSidebarPropType } from './util';

const EditorSidebar = ( {
	isNew,
	isPostPrivate,
	nestedSidebar,
	onPublish,
	onSave,
	onTrashingPost,
	post,
	savedPost,
	setPostDate,
	site,
	toggleNestedSidebar,
	toggleSidebar,
	type,
} ) => {
	const headerToggleSidebar = nestedSidebar === NESTED_SIDEBAR_NONE
		? toggleSidebar
		: partial( toggleNestedSidebar, NESTED_SIDEBAR_NONE );

	const sidebarClassNames = classNames(
		'post-editor__sidebar',
		{ 'is-nested-sidebar-focused': nestedSidebar !== NESTED_SIDEBAR_NONE }
	);

	return (
		<div className={ sidebarClassNames } >
			<EditorSidebarHeader nestedSidebar={ nestedSidebar } toggleSidebar={ headerToggleSidebar } />
			<EditorActionBar
				isNew={ isNew }
				post={ post }
				savedPost={ savedPost }
				site={ site }
				type={ type }
			/>
			<SidebarRegion className="editor-sidebar__parent-region">
				<EditorDrawer
					isNew={ isNew }
					isPostPrivate={ isPostPrivate }
					onPrivatePublish={ onPublish }
					onSave={ onSave }
					post={ post }
					savedPost={ savedPost }
					setPostDate={ setPostDate }
					site={ site }
					toggleNestedSidebar={ toggleNestedSidebar }
					type={ type }
				/>
			</SidebarRegion>
			<SidebarRegion className="editor-sidebar__nested-region" />
			<SidebarFooter>
				{ nestedSidebar === NESTED_SIDEBAR_NONE && (
					<EditorDeletePost post={ post } onTrashingPost={ onTrashingPost } />
				) }
			</SidebarFooter>
		</div>
	);
};

EditorSidebar.propTypes = {
	isNew: PropTypes.bool,
	isPostPrivate: PropTypes.bool,
	nestedSidebar: NestedSidebarPropType,
	onSave: PropTypes.func,
	onPublish: PropTypes.func,
	onTrashingPost: PropTypes.func,
	post: PropTypes.object,
	savedPost: PropTypes.object,
	setPostDate: PropTypes.func,
	site: PropTypes.object,
	toggleNestedSidebar: PropTypes.func,
	toggleSidebar: PropTypes.func,
	type: PropTypes.string,
};

export default EditorSidebar;
