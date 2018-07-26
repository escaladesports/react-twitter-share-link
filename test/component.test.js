import puppeteer from 'puppeteer'
import getPort from 'get-port'
import Server from 'static-server'

jest.setTimeout(60 * 1000);

describe(`React component inject`, () => {
	let server;
	let browser;
	let page;
	beforeAll(async () => {
		server = new Server({
			rootPath: `dist-test`,
			port: await getPort(),
		});
		server.start();
		browser = await puppeteer.launch({args: ['--no-sandbox']});
		page = await browser.newPage();
		await page.goto(`http://localhost:${server.port}`);
		await page.waitForSelector(`.sharelink-container`);
	});
	it(`link should have text content`, async () => {
		let text = await page.$eval(`a#link`, e => e.textContent);
		expect(text.trim()).toEqual(`Share link`)
	});
	it(`link should have correct href`, async () => {
		let href = await page.$eval(`a#link`, e => e.href);
		expect(href).toEqual(`https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.google.com%2F`)
	});
	it(`link-text should have text content`, async () => {
		let text = await page.$eval(`a#link-text`, e => e.textContent);
		expect(text.trim()).toEqual(`Share link with text`)
	});
	it(`link-text should have correct href`, async () => {
		let href = await page.$eval(`a#link-text`, e => e.href);
		expect(href).toEqual(`https://twitter.com/intent/tweet?text=Hello%20World&url=https%3A%2F%2Fwww.google.com%2F`)
	});
	it(`link-hashtag should have text content`, async () => {
		let text = await page.$eval(`a#link-hashtag`, e => e.textContent);
		expect(text.trim()).toEqual(`Share link with a hashtag`)
	});
	it(`link-hashtag should have correct href`, async () => {
		let href = await page.$eval(`a#link-hashtag`, e => e.href);
		expect(href).toEqual(`https://twitter.com/intent/tweet?hashtags=twitter&url=https%3A%2F%2Fwww.google.com%2F`)
	});
	it(`link-hashtags-multi-string should have text content`, async () => {
		let text = await page.$eval(`a#link-hashtags-multi-string`, e => e.textContent);
		expect(text.trim()).toEqual(`Share link with multiple hashtags (string)`)
	});
	it(`link-hashtags-multi-string should have correct href`, async () => {
		let href = await page.$eval(`a#link-hashtags-multi-string`, e => e.href);
		expect(href).toEqual(`https://twitter.com/intent/tweet?hashtags=twitter%2Ctwitterdev&url=https%3A%2F%2Fwww.google.com%2F`)
	});
	it(`link-hashtags-multi-array should have text content`, async () => {
		let text = await page.$eval(`a#link-hashtags-multi-array`, e => e.textContent);
		expect(text.trim()).toEqual(`Share link with multiple hashtags (array)`)
	});
	it(`link-hashtags-multi-array should have correct href`, async () => {
		let href = await page.$eval(`a#link-hashtags-multi-array`, e => e.href);
		expect(href).toEqual(`https://twitter.com/intent/tweet?hashtags=twitter%2Ctwitterdev&url=https%3A%2F%2Fwww.google.com%2F`)
	});
	it(`link-via should have text content`, async () => {
		let text = await page.$eval(`a#link-via`, e => e.textContent);
		expect(text.trim()).toEqual(`Share link with via`)
	});
	it(`link-via should have correct href`, async () => {
		let href = await page.$eval(`a#link-via`, e => e.href);
		expect(href).toEqual(`https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.google.com%2F&via=twitter`)
	});
	it(`link-related should have text content`, async () => {
		let text = await page.$eval(`a#link-related`, e => e.textContent);
		expect(text.trim()).toEqual(`Share link with related accounts`)
	});
	it(`link-related should have correct href`, async () => {
		let href = await page.$eval(`a#link-related`, e => e.href);
		expect(href).toEqual(`https://twitter.com/intent/tweet?related=twitter&url=https%3A%2F%2Fwww.google.com%2F`)
	});
	it(`link-related-multi-string should have text content`, async () => {
		let text = await page.$eval(`a#link-related-multi-string`, e => e.textContent);
		expect(text.trim()).toEqual(`Share link with multiple related accounts (string)`)
	});
	it(`link-related-multi-string should have correct href`, async () => {
		let href = await page.$eval(`a#link-related-multi-string`, e => e.href);
		expect(href).toEqual(`https://twitter.com/intent/tweet?related=twitter%2Ctwitterdev&url=https%3A%2F%2Fwww.google.com%2F`)
	});
	it(`link-related-multi-array should have text content`, async () => {
		let text = await page.$eval(`a#link-related-multi-array`, e => e.textContent);
		expect(text.trim()).toEqual(`Share link with multiple related accounts (array)`)
	});
	it(`link-related-multi-array should have correct href`, async () => {
		let href = await page.$eval(`a#link-related-multi-array`, e => e.href);
		expect(href).toEqual(`https://twitter.com/intent/tweet?related=twitter%2Ctwitterdev&url=https%3A%2F%2Fwww.google.com%2F`)
	});
	it(`link-other-object should have text content`, async () => {
		let text = await page.$eval(`a#link-query-params-object`, e => e.textContent);
		expect(text.trim()).toEqual(`Share link with custom query params (object)`)
	});
	it(`link-query-params-object should have correct href`, async () => {
		let href = await page.$eval(`a#link-query-params-object`, e => e.href);
		expect(href).toEqual(`https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.google.com%2F&hello=world&test=test`)
	});
	it(`link-query-params-string should have text content`, async () => {
		let text = await page.$eval(`a#link-query-params-string`, e => e.textContent);
		expect(text.trim()).toEqual(`Share link with custom query params (string)`)
	});
	it(`link-query-params-string should have correct href`, async () => {
		let href = await page.$eval(`a#link-query-params-string`, e => e.href);
		expect(href).toEqual(`https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.google.com%2F&string=string`)
	});
	afterAll(async () => {
		server.stop();
		await browser.close()
	})
});
