import {TwitterTweetUrl, defaultTwitterBaseUrl, defaultTwitterUrlOptions} from "../src/twitter-tweet-url";

jest.setTimeout(60 * 1000);

describe(`TwitterUrl`, () => {
	it('should create basic url', () => {
		const twitterUrl = new TwitterTweetUrl();
		expect(twitterUrl.options).toEqual(defaultTwitterUrlOptions);
		expect(twitterUrl.baseUrl).toEqual(defaultTwitterBaseUrl);
	});

	it('should create basic twitter url with different base url and default options', () => {
		const newBaseUrl = 'http://google.com/';
		const twitterUrl = new TwitterTweetUrl({}, newBaseUrl);
		expect(twitterUrl.options).toEqual(defaultTwitterUrlOptions);
		expect(twitterUrl.baseUrl).toEqual(newBaseUrl);
	});

	it('should not create basic twitter url with null as options', () => {
		expect(() => {
			expect(new TwitterTweetUrl(null).toUrl()).not.toBeDefined();
		}).toThrowError('Provided options can only be of type object');
	});

	it('should not create basic twitter url with array as options', () => {
		expect(() => {
			expect(new TwitterTweetUrl([]).toUrl()).not.toBeDefined();
		}).toThrowError('Provided options can only be of type object');
	});

	it('should not create basic twitter url with a number as options', () => {
		expect(() => {
			expect(new TwitterTweetUrl(1).toUrl()).not.toBeDefined();
		}).toThrowError('Provided options can only be of type object');
	});

	it('should not create basic twitter url with a null as baseUrl', () => {
		expect(() => {
			expect(new TwitterTweetUrl({}, null).toUrl()).not.toBeDefined();
		}).toThrowError('Provided baseUrl can only be of type string');
	});

	it('should not create basic twitter url with a object as baseUrl', () => {
		expect(() => {
			expect(new TwitterTweetUrl({}, {}).toUrl()).not.toBeDefined();
		}).toThrowError('Provided baseUrl can only be of type string');
	});

	it('should not create basic twitter url with a array as baseUrl', () => {
		expect(() => {
			expect(new TwitterTweetUrl({}, []).toUrl()).not.toBeDefined();
		}).toThrowError('Provided baseUrl can only be of type string');
	});

	it('should not create basic twitter url with a number as baseUrl', () => {
		expect(() => {
			expect(new TwitterTweetUrl({}, 1).toUrl()).not.toBeDefined();
		}).toThrowError('Provided baseUrl can only be of type string');
	});

	describe('TwitterUrl.toUrl', () => {
		it('default url should be with about:blank (in tests)', () => {
			const twitterUrl = new TwitterTweetUrl();
			expect(twitterUrl.toUrl()).toEqual(`${defaultTwitterBaseUrl}?url=about%3Ablank`)
		});
		it('should be able to add link to twitter url', () => {
			const link = 'https://google.com/';
			const twitterUrl = new TwitterTweetUrl({link});
			expect(twitterUrl.toUrl()).toBe(`${defaultTwitterBaseUrl}?url=https%3A%2F%2Fgoogle.com%2F`)
		});
		it('should be able to handle text option', () => {
			const twitterUrl = new TwitterTweetUrl({text: 'Hello World'});
			expect(twitterUrl.toUrl()).toBe(`${defaultTwitterBaseUrl}?text=Hello%20World&url=about%3Ablank`)
		});
		it('should not be able to handle text as number', () => {
			expect(() => {
				expect(new TwitterTweetUrl({text: 1}).toUrl()).not.toBeDefined();
			}).toThrowError('options.text can only be in string format')
		});
		it('should not be able to handle text as array', () => {
			expect(() => {
				expect(new TwitterTweetUrl({text: []}).toUrl()).not.toBeDefined();
			}).toThrowError('options.text can only be in string format')
		});
		it('should not be able to handle text as object', () => {
			expect(() => {
				expect(new TwitterTweetUrl({text: {}}).toUrl()).not.toBeDefined();
			}).toThrowError('options.text can only be in string format')
		});
		it('should be able to handle the hashtags as string', () => {
			const twitterUrl = new TwitterTweetUrl({hashtags: 'twitter twitterdev'});
			expect(twitterUrl.toUrl()).toBe(`${defaultTwitterBaseUrl}?hashtags=twitter%2Ctwitterdev&url=about%3Ablank`)
		});
		it('should be able to handle the hashtags as comma separated string', () => {
			const twitterUrl = new TwitterTweetUrl({hashtags: 'twitter,twitterdev'});
			expect(twitterUrl.toUrl()).toBe(`${defaultTwitterBaseUrl}?hashtags=twitter%2Ctwitterdev&url=about%3Ablank`)
		});
		it('should be able to handle the hashtags as array', () => {
			const twitterUrl = new TwitterTweetUrl({hashtags: ['twitter', 'twitterdev']});
			expect(twitterUrl.toUrl()).toBe(`${defaultTwitterBaseUrl}?hashtags=twitter%2Ctwitterdev&url=about%3Ablank`)
		});
		it('should not be able to handle hashtags as number', () => {
			expect(() => {
				expect(new TwitterTweetUrl({hashtags: 1}).toUrl()).not.toBeDefined();
			}).toThrowError('options.hashtags can only be in array or string format')
		});
		it('should not be able to handle hashtags as object', () => {
			expect(() => {
				expect(new TwitterTweetUrl({hashtags: {}}).toUrl()).not.toBeDefined();
			}).toThrowError('options.hashtags can only be in array or string format')
		});
		it('should be able to provide a via user handle', () => {
			const twitterUrl = new TwitterTweetUrl({via: 'twitter'});
			expect(twitterUrl.toUrl()).toBe(`${defaultTwitterBaseUrl}?url=about%3Ablank&via=twitter`)
		});
		it('should not be able to handle via as object', () => {
			expect(() => {
				expect(new TwitterTweetUrl({via: {}}).toUrl()).not.toBeDefined();
			}).toThrowError('options.via can only be in string format')
		});
		it('should not be able to handle via as number', () => {
			expect(() => {
				expect(new TwitterTweetUrl({via: 1}).toUrl()).not.toBeDefined();
			}).toThrowError('options.via can only be in string format')
		});
		it('should be able to provide related accounts as string', () => {
			const twitterUrl = new TwitterTweetUrl({related: 'twitter twitterdev'});
			expect(twitterUrl.toUrl()).toBe(`${defaultTwitterBaseUrl}?related=twitter%2Ctwitterdev&url=about%3Ablank`)
		});
		it('should be able to provide related accounts as comma separated string', () => {
			const twitterUrl = new TwitterTweetUrl({related: 'twitter,twitterdev'});
			expect(twitterUrl.toUrl()).toBe(`${defaultTwitterBaseUrl}?related=twitter%2Ctwitterdev&url=about%3Ablank`)
		});
		it('should be able to provide related accounts as array', () => {
			const twitterUrl = new TwitterTweetUrl({related: ['twitter', 'twitterdev']});
			expect(twitterUrl.toUrl()).toBe(`${defaultTwitterBaseUrl}?related=twitter%2Ctwitterdev&url=about%3Ablank`)
		});
		it('should not be able to handle related as number', () => {
			expect(() => {
				expect(new TwitterTweetUrl({related: 1}).toUrl()).not.toBeDefined();
			}).toThrowError('options.related can only be in array or string format')
		});
		it('should not be able to handle related as object', () => {
			expect(() => {
				expect(new TwitterTweetUrl({related: {}}).toUrl()).not.toBeDefined();
			}).toThrowError('options.related can only be in array or string format')
		});
		it('should be able to add custom query params', () => {
			const twitterUrl = new TwitterTweetUrl({customQueryParams: {hello: "world"}});
			expect(twitterUrl.toUrl()).toBe(`${defaultTwitterBaseUrl}?url=about%3Ablank&hello=world`);
		});
		it('should not be able to handle customQueryParams as array', () => {
			expect(() => {
				expect(new TwitterTweetUrl({customQueryParams: []}).toUrl()).not.toBeDefined();
			}).toThrowError('options.customQueryParams can only be in object or string format')
		});
		it('should not be able to handle customQueryParams as number', () => {
			expect(() => {
				expect(new TwitterTweetUrl({customQueryParams: 1}).toUrl()).not.toBeDefined();
			}).toThrowError('options.customQueryParams can only be in object or string format')
		});
	});

	describe('TwitterUrl.arrayToCommaSeparatedList', () => {
		it('should convert array into comma separated list with strings', () => {
			const commaList = TwitterTweetUrl.arrayToCommaSeparatedList(['test', 'test', 'test']);
			expect(commaList).toBe('test,test,test');
		});
		it('should convert array into comma separated list with spaced strings', () => {
			const commaList = TwitterTweetUrl.arrayToCommaSeparatedList(['    test', 'test  ', '  test  ']);
			expect(commaList).toBe('test,test,test');
		});
		it('should convert array into comma separated list with numbers', () => {
			const commaList = TwitterTweetUrl.arrayToCommaSeparatedList([1, 2, 3]);
			expect(commaList).toBe('1,2,3');
		});
		it('should convert array into comma separated list with strings/numbers', () => {
			const commaList = TwitterTweetUrl.arrayToCommaSeparatedList(['test', 'test', 'test', 1, 2, 3]);
			expect(commaList).toBe('test,test,test,1,2,3');
		});
		it('should convert array into comma separated list and discard empty array items', () => {
			const commaList = TwitterTweetUrl.arrayToCommaSeparatedList(['test', '', 1]);
			expect(commaList).toBe('test,1');
		});
		it('should convert array into comma separated list and discard anything other than strings/numbers', () => {
			const commaList = TwitterTweetUrl.arrayToCommaSeparatedList(['test', 1, [], {}, null, undefined]);
			expect(commaList).toBe('test,1');
		});
		it('should throw error when supplying anything other than a array', () => {
			expect(() => {
				const commaList = TwitterTweetUrl.arrayToCommaSeparatedList({});
				expect(commaList).not.toBeDefined();
			}).toThrowError('Can only provide string or array');
		});
		it('should throw error when supplying an object', () => {
			expect(() => {
				const commaList = TwitterTweetUrl.arrayToCommaSeparatedList({});
				expect(commaList).not.toBeDefined();
			}).toThrowError('Can only provide string or array');
		});
		it('should throw error when supplying a number', () => {
			expect(() => {
				const commaList = TwitterTweetUrl.arrayToCommaSeparatedList(1);
				expect(commaList).not.toBeDefined();
			}).toThrowError('Can only provide string or array');
		});
		it('should throw error when supplying null', () => {
			expect(() => {
				const commaList = TwitterTweetUrl.arrayToCommaSeparatedList(null);
				expect(commaList).not.toBeDefined();
			}).toThrowError('Can only provide string or array');
		});
	});

	describe('TwitterUrl.stringToCommaSeparatedList', () => {
		it('should convert string into comma separated list by a spaced string', () => {
			const commaList = TwitterTweetUrl.stringToCommaSeparatedList('a b c');
			expect(commaList).toBe('a,b,c');
		});
		it('should convert string into comma separated list with spaced strings and comma separated string', () => {
			const commaList = TwitterTweetUrl.stringToCommaSeparatedList('a,b c');
			expect(commaList).toBe('a,b,c');
		});
		it('should convert string into comma separated list with a combination of comma and space', () => {
			const commaList = TwitterTweetUrl.stringToCommaSeparatedList('a,b c, d e , f');
			expect(commaList).toBe('a,b,c,d,e,f');
		});
		it('should convert string into comma separated list with numbers', () => {
			const commaList = TwitterTweetUrl.stringToCommaSeparatedList('1,2,3,4,5');
			expect(commaList).toBe('1,2,3,4,5');
		});
		it('should throw error when supplying array', () => {
			expect(() => {
				const commaList = TwitterTweetUrl.stringToCommaSeparatedList([]);
				expect(commaList).not.toBeDefined();
			}).toThrowError('Can only provide string');
		});
		it('should throw error when supplying number', () => {
			expect(() => {
				const commaList = TwitterTweetUrl.stringToCommaSeparatedList(1);
				expect(commaList).not.toBeDefined();
			}).toThrowError('Can only provide string');
		});
		it('should throw error when supplying object', () => {
			expect(() => {
				const commaList = TwitterTweetUrl.stringToCommaSeparatedList({});
				expect(commaList).not.toBeDefined();
			}).toThrowError('Can only provide string');
		});
		it('should throw error when supplying null', () => {
			expect(() => {
				const commaList = TwitterTweetUrl.stringToCommaSeparatedList(null);
				expect(commaList).not.toBeDefined();
			}).toThrowError('Can only provide string');
		});
	});
});
