import React from 'react'

class TwitterShare extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			link: props.link
		}
	}
	componentDidMount() {
		if (!this.state.link) {
			this.setState({
				link: document.location.href
			})
		}
	}
	componentDidReceiveProps() {
		if (this.props.link) {
			this.setState({
				link: this.props.link
			})
		}
	}
	render() {
		return this.props.children(`http://twitter.com/share?url=${encodeURIComponent(this.state.link)}`)
	}
}

export default TwitterShare
