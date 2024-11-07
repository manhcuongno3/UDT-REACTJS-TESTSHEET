import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { persistor, store } from '../client/store/store';
import App from '../client/App';
import { PersistGate } from 'redux-persist/integration/react';

const app = express();

app.use(express.static(path.resolve(__dirname, '../client')));

app.get('*', (req, res) => {
  const appMarkup = renderToString(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </PersistGate>
    </Provider>,
  );

  const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Calculator App</title>
        </head>
        <body>
            <div id="root">${appMarkup}</div>
            <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())};
            </script>
            <script src="/bundle.js"></script>
        </body>
        </html>
    `;

  res.send(html);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
