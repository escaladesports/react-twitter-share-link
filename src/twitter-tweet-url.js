import _ from 'lodash';
import queryString from 'query-string';

export const defaultTwitterUrlOptions = {
	link: document.location.href,
	text: null,
	hashtags: null,
	via: null,
	related: null,
	customQueryParams: null
};
export const defaultTwitterBaseUrl = 'https://twitter.com/intent/tweet';

export class TwitterTweetUrl {

	constructor(options = {}, baseUrl = defaultTwitterBaseUrl) {
		if (!_.isObject(options) || _.isArray(options)) {
			throw new Error('Provided options can only be of type object');
		}

		this.options = Object.assign({}, defaultTwitterUrlOptions, options);

		if (!_.isString(baseUrl)) {
			throw new Error('Provided baseUrl can only be of type string');
		}

		// Changed the base url to 'https://twitter.com/intent/tweet' instead of 'https://twitter.com/share'
		// Because /share adds the 'original_referer' param and forwards it to 'https://twitter.com/intent/tweet'
		this.baseUrl = baseUrl;
	}

	/**
	 * Converts an array into a comma separated list.
	 *
	 * format: input => output
	 * e.g ['test', 'test ', ''] => 'test,test'
	 * or ['test'] => 'test'
	 *
	 * @param strOrArr
	 * @returns {string}
	 */
	static arrayToCommaSeparatedList(strOrArr = []) {
		if (!(_.isArray(strOrArr) || _.isString(strOrArr))) {
			throw new Error('Can only provide string or array');
		}

		if (_.isString(strOrArr)) {
			strOrArr = [strOrArr];
		}

		const str = strOrArr
			.filter((item) => _.isString(item) || _.isNumber(item))
			.map((item) => item.toString().trim())
			.filter((item) => item !== '')
			.join(',');

		return str;
	}

	/**
	 * Converts a string into a comma separated list
	 *
	 * format: input => output
	 * e.g 'test, test,' => 'test,test'
	 * or 'test, test' => 'test,test'
	 * or 'test test' => 'test,test'
	 * or 'test' => 'test'
	 *
	 * @param str
	 * @returns {string}
	 */
	static stringToCommaSeparatedList(str = '') {
		if (!_.isString(str)) {
			throw new Error('Can only provide string');
		}

		str = str
			.trim()
			.split(',')
			.join(' ')
			.split(' ')
			.filter((item) => item.trim() !== '')
			.map((item) => item.trim())
			.join(',');

		return str;
	}

	/**
	 * Converts the options into a url based on the button parameter reference:
	 * https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/parameter-reference1
	 *
	 * @returns {string}
	 */
	toUrl() {

		// Check if options.link is a string
		if (!_.isString(this.options.link)) {
			throw new Error('options.link can only be in string format');
		}

		let params = {
			url: this.options.link
		};

		// Set the baseUrl with the link url.
		let url = this.baseUrl;

		// Check if there is text and then adds that text as a param to the url.
		if (!_.isNil(this.options.text)) {
			// Check if options.text is a string.
			if (!_.isString(this.options.text)) {
				throw new Error('options.text can only be in string format');
			}

			params.text = this.options.text;
		}

		// Checks if hashtags are provided.
		if (!_.isNil(this.options.hashtags)) {
			// Check if options.hashtags has the correct type.
			if (!(_.isArray(this.options.hashtags) || _.isString(this.options.hashtags))) {
				throw new Error('options.hashtags can only be in array or string format');
			}

			let hashtags = null;
			if (_.isArray(this.options.hashtags)) {
				hashtags = TwitterTweetUrl.arrayToCommaSeparatedList(this.options.hashtags);
			} else if (_.isString(this.options.hashtags)) {
				hashtags = TwitterTweetUrl.stringToCommaSeparatedList(this.options.hashtags);
			}

			if (hashtags !== null) {
				params.hashtags = hashtags;
			}

		}

		// Check if options.via is provided.
		if (!_.isNil(this.options.via)) {
			// Check if via is of the correct type.
			if (!_.isString(this.options.via)) {
				throw new Error('options.via can only be in string format');
			}

			params.via = this.options.via;
		}

		// Check if options.related is provided.
		if (!_.isNil(this.options.related)) {
			// Check if options.related is a array or string.
			if (!(_.isArray(this.options.related) || _.isString(this.options.related))) {
				throw new Error('options.related can only be in array or string format');
			}

			let related = null;
			if (_.isArray(this.options.related)) {
				related = TwitterTweetUrl.arrayToCommaSeparatedList(this.options.related);
			} else if (_.isString(this.options.related)) {
				related = TwitterTweetUrl.stringToCommaSeparatedList(this.options.related);
			}

			if (related !== null) {
				params.related = related;
			}
		}

		let other = '';
		// Check if other is provided.
		if (!_.isNil(this.options.customQueryParams)) {
			// Check if the options.customQueryParams is a object or a string
			if (
				!(_.isObject(this.options.customQueryParams) || _.isString(this.options.customQueryParams)) ||
				_.isArray(this.options.customQueryParams)
			) {
				throw new Error('options.customQueryParams can only be in object or string format');
			}

			if (_.isObject(this.options.customQueryParams)) {
				other = queryString.stringify(this.options.customQueryParams);
			} else if (_.isString(this.options.customQueryParams)) {
				other = queryString.stringify(queryString.parse(this.options.customQueryParams));
			}
		}

		if (Object.keys(params).length > 0) {
			url += `?${queryString.stringify(params)}`;

			if (other.trim() !== '') {
				url += `&${other}`;
			}
		} else if (other.trim() !== '') {
			url += `?${other}`;
		}
		
		return url;
	}
}
