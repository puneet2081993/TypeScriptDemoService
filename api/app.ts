import 'reflect-metadata';
import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import * as httpContext from 'express-http-context';
import config from '../common/config';
import routes from './routes';
import apiDB from '../db';

const allowCrossDomain: express.RequestHandler = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, novo-uuid-token, platform, x-castle-client-id, timezone',
  );

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
};

const startServer = async () => {
  try {
    const app = express();
    const server = app.listen(config.port, config.host, () => {
      console.info(
        'APP_STARTED',
        `${config.appName} App is running on port ${config.port}`
      );
    });

    /** Increased the keep alive timeout to 45 seconds */
    server.keepAliveTimeout = 45000;

    // to check the connection
    apiDB.authenticate();

    app.get('/health', (_req, res) => res.send('OK'));

    app.use('/404', (_req, res) => {
      res.status(404).send('404 - Not found');
    });

    app.use(cors({ origin: '*' }));
    app.disable('x-powered-by');
    app.use(httpContext.middleware);

    app.use(allowCrossDomain);

    /* all other middleware and application routes go here */
    // server middlewares!
    app.enable('trust proxy');
    app.use((req, res, next) => {
      if (req.path.includes('/webhook')) {
        next();
      } else {
        bodyParser.json({ limit: '5mb' })(req, res, next);
      }
    });
    app.use((req, res, next) => {
      if (req.path.includes('/webhook')) {
        next();
      } else {
        bodyParser.urlencoded({ extended: true })(req, res, next);
      }
    });

    app.use('/api', routes);
    app.use('*', (_req, res) => { res.status(301).redirect('/404'); });

  } catch (err) {
    console.debug('APP_RESTART_ERROR', `Could not start ${config.appName}`, { error: err });
  }
};

startServer();