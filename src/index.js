import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {TwitterTweetUrl} from './twitter-tweet-url'

class ShareLink extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			link: props.link,
			text: props.text,
			hashtags: props.hashtags,
			via: props.via,
			related: props.related,
			customQueryParams: props.customQueryParams
		}
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(this.props.link, prevProps.link)) {
			this.setState({
				link: this.props.link
			})
		}
		if (!_.isEqual(this.props.text, prevProps.text)) {
			this.setState({
				text: this.props.text
			})
		}
		if (!_.isEqual(this.props.hashtags, prevProps.hashtags)) {
			this.setState({
				hashtags: this.props.hashtags
			})
		}
		if (!_.isEqual(this.props.via, prevProps.via)) {
			this.setState({
				via: this.props.via
			})
		}
		if (!_.isEqual(this.props.related, prevProps.related)) {
			this.setState({
				related: this.props.related
			})
		}
		if (!_.isEqual(this.props.customQueryParams, prevProps.customQueryParams)) {
			this.setState({
				customQueryParams: this.props.customQueryParams
			})
		}
	}

	render() {
		// TODO: Add a way for users to provide their own url?
		const url = new TwitterTweetUrl({
			link: this.state.link,
			text: this.state.text,
			hashtags: this.state.hashtags,
			via: this.state.via,
			related: this.state.related,
			customQueryParams: this.state.customQueryParams
		}).toUrl();

		return this.props.children(url)
	}
}

ShareLink.propTypes = {
	link: PropTypes.string,
	text: PropTypes.string,
	hashtags: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.string)
	]),
	via: PropTypes.string,
	related: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.string)
	]),
	customQueryParams: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string
	])
};

ShareLink.defaultProps = {
	link: null,
	text: null,
	hashtags: null,
	via: null,
	related: null,
	customQueryParams: null
};

export default ShareLink
