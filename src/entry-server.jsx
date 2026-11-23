import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export { ROUTES, resolveRoute, getHead, renderHeadTags } from './seo.js';
export { PACKAGES, SITE_URL } from './data/lab.js';

export function render(url) {
  return renderToString(
    <StrictMode>
      <App url={url} />
    </StrictMode>,
  );
}
