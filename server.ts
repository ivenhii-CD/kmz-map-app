import 'zone.js/node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import { existsSync } from 'fs';
import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';

export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/kmz-map-app/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // ✅ Set KMZ headers
  server.use('/assets/kmz', express.static(join(distFolder, 'assets/kmz'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.kmz')) {
        res.setHeader('Content-Type', 'application/vnd.google-earth.kmz');
        res.setHeader('Access-Control-Allow-Origin', '*');
      }
    }
  }));

  // Serve static files
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Static files
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
declare const __non_webpack_require__: NodeRequire;
const mainModule = typeof __non_webpack_require__ !== 'undefined' ? __non_webpack_require__.main : require.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
