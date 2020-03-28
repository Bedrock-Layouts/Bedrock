import * as React from 'react';
import { Helmet } from 'react-helmet-async';

// The doc prop contains some metadata about the page being rendered that you can use.
const Wrapper = ({ children, doc }) => (
  <React.Fragment>
    <Helmet>
      <meta charSet='utf-8' />
      <meta
        name='description'
        content='Layout Primitives for your React App'
      ></meta>
      <meta
        name='og:description'
        content='Layout Primitives for your React App'
      ></meta>
      <meta
        property='og:description'
        content='Layout Primitives for your React App'
      ></meta>
      <meta
        name='twitter:description'
        content='Layout Primitives for your React App'
      ></meta>
      <title>Bedrock Layout Primitives</title>
      <link
        rel='apple-touch-icon'
        sizes='57x57'
        href='/public/apple-icon-57x57.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='60x60'
        href='/public/apple-icon-60x60.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='72x72'
        href='/public/apple-icon-72x72.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='76x76'
        href='/public/apple-icon-76x76.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='114x114'
        href='/public/apple-icon-114x114.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='120x120'
        href='/public/apple-icon-120x120.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='144x144'
        href='/public/apple-icon-144x144.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='152x152'
        href='/public/apple-icon-152x152.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/public/apple-icon-180x180.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='192x192'
        href='/public/android-icon-192x192.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/public/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='96x96'
        href='/public/favicon-96x96.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/public/favicon-16x16.png'
      />
      <link rel='manifest' href='/public/manifest.json' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta
        name='msapplication-TileImage'
        content='/public/ms-icon-144x144.png'
      />
      <meta name='theme-color' content='#ffffff' />
    </Helmet>
    {children}
  </React.Fragment>
);
export default Wrapper;
