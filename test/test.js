import puppeteer from 'puppeteer'
import getPort from 'get-port'
import Server from 'static-server'

jest.setTimeout(60 * 1000)

describe(`React component inject`, () => {
	let server
	let browser
	let page
	beforeAll(async () => {
		server = new Server({
			rootPath: `dist-test`,
			port: await getPort(),
		})
		server.start()
		browser = await puppeteer.launch({ args: ['--no-sandbox'] })
		page = await browser.newPage()
		await page.goto(`http://localhost:${server.port}`)
		await page.waitForSelector(`a`)
	})
	it(`Should have text content`, async () => {
		let text = await page.$eval(`a`, e => e.textContent)
		expect(text.trim()).toEqual(`Share link`)
	})
	it(`Should behave a link`, async () => {
		let href = await page.$eval(`a`, e => e.href)
		expect(href).toEqual(`https://www.facebook.com/sharer.php?u=https%3A%2F%2Fwww.google.com%2F`)
	})
	afterAll(async () => {
		server.stop()
		await browser.close()
	})
})