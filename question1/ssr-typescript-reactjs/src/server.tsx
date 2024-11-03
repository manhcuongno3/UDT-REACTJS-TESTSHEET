import express, { Request, Response } from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './components/App';

const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/', (req: Request, res: Response) => {
  const appHTML = renderToString(<App />);

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SSR with React and TypeScript</title>
      </head>
      <body>
        <div id="root">${appHTML}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
