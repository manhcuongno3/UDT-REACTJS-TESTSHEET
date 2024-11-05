import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../client/App';
import { StaticRouter } from 'react-router-dom/server';

const app = express();

app.use(express.static(path.resolve(__dirname, '../client')));

app.get('*', (req, res) => {
    const appHTML = renderToString(
        <StaticRouter location={req.url}>
            <App />
        </StaticRouter>
    );

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>SSR React App</title>
      </head>
      <body>
          <div id="root">${appHTML}</div>
          <script src="/bundle.js"></script>
      </body>
      </html>
    `;

    res.send(html);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
