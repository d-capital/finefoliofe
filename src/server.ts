import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const app = express();

// Initialize AngularNodeAppEngine
const angularApp = new AngularNodeAppEngine();

console.log('Server starting up...');
console.log('Server dist folder:', serverDistFolder);
console.log('Browser dist folder:', browserDistFolder);

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  console.log('Handling request:', req.path);
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch((error) => {
      console.error('Error handling request:', error);
      next(error);
    });
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
// Always start the server since this is the SSR entry point
const port = parseInt(process.env['PORT'] || '4000', 10);
console.log('Starting Express server on port:', port);

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`✓ Node Express server listening on http://localhost:${port}`);
  console.log(`✓ Press Ctrl+C to stop the server`);
});

server.on('error', (error: any) => {
  console.error('✗ Server error:', error);
  process.exit(1);
});

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
