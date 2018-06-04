# react-twitter-share-link

Create "share this on Twitter" links in React.

## Installation

With npm:

```bash
npm install --save react-twitter-share-link
```

Or with Yarn:

```bash
yarn add react-twitter-share-link
```

## Usage

```jsx
import ShareLink from 'react-twitter-share-link'

...

<ShareLink link='https://your-site.com/some-page'>
   {link => (
      <a href={link} target='_blank'>Share this on Twitter</a>
   )}
</ShareLink>
```

If you don't pass in a `link` prop, it will use the current page (`window.location.href`).