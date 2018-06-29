import React from 'react'
import { render } from 'react-dom'
import Share from '../src'

render(
	<Share>{link => (
		<div>{link}</div>
	)}</Share>,
	document.querySelector('#container')
)