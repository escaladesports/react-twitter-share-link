import React from 'react'
import {render} from 'react-dom'
import ShareLink from '../../dist'

render(
	(
		<div className={"sharelink-container"}>
			<ShareLink link='https://www.google.com/'>
				{link => (
					<a id="link" href={link} target='_blank'>Share link</a>
				)}
			</ShareLink>
			<ShareLink link='https://www.google.com/' text="Hello World">
				{link => (
					<a id="link-text" href={link} target='_blank'>Share link with text</a>
				)}
			</ShareLink>
			<ShareLink link='https://www.google.com/' hashtags="twitter">
				{link => (
					<a id="link-hashtag" href={link} target='_blank'>Share link with a hashtag</a>
				)}
			</ShareLink>
			<ShareLink link='https://www.google.com/' hashtags="twitter twitterdev">
				{link => (
					<a id="link-hashtags-multi-string" href={link} target='_blank'>Share link with multiple hashtags (string)</a>
				)}
			</ShareLink>
			<ShareLink link='https://www.google.com/' hashtags={["twitter", "twitterdev"]}>
				{link => (
					<a id="link-hashtags-multi-array" href={link} target='_blank'>Share link with multiple hashtags (array)</a>
				)}
			</ShareLink>
			<ShareLink link='https://www.google.com/' via="twitter">
				{link => (
					<a id="link-via" href={link} target='_blank'>Share link with via</a>
				)}
			</ShareLink>
			<ShareLink link='https://www.google.com/' related="twitter">
				{link => (
					<a id="link-related" href={link} target='_blank'>Share link with related accounts</a>
				)}
			</ShareLink>
			<ShareLink link='https://www.google.com/' related="twitter twitterdev">
				{link => (
					<a id="link-related-multi-string" href={link} target='_blank'>Share link with multiple related accounts (string)</a>
				)}
			</ShareLink>
			<ShareLink link='https://www.google.com/' related={["twitter", "twitterdev"]}>
				{link => (
					<a id="link-related-multi-array" href={link} target='_blank'>Share link with multiple related accounts (array)</a>
				)}
			</ShareLink>
			<ShareLink link='https://www.google.com/' customQueryParams={{ test: "test", hello: "world" }}>
				{link => (
					<a id="link-query-params-object" href={link} target='_blank'>Share link with custom query params (object)</a>
				)}
			</ShareLink>
			<ShareLink link='https://www.google.com/' customQueryParams="string=string">
				{link => (
					<a id="link-query-params-string" href={link} target='_blank'>Share link with custom query params (string)</a>
				)}
			</ShareLink>
		</div>
	),
	document.querySelector('#container')
);
