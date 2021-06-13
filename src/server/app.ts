import express, { Express } from 'express';
import next from 'next';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import ping from './routes/ping';
import api from './routes/api';

const dev = process.env.NODE_ENV === 'development';

export default async function app(): Promise<Express> {
  const nextApp = next({
    dev: dev,
    quiet: dev,
  });
  const handle = nextApp.getRequestHandler();
  await nextApp.prepare();
  const app = express();

  app.use(cors());
  app.use(express.static('public'));
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.use(
    helmet({
      hsts: false,
      contentSecurityPolicy: false,
    }),
  );
  app.use(compression());
  app.use(cookieParser());
  app.use(morgan('combined'));

  app.use(ping);
  app.use(api);

  app.get('*', async (req, res) => {
    await handle(req, res);
  });

  return app;
}
