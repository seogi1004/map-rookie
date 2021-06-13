import app from './app';
import Graceful from 'node-graceful';
import http from 'http';

Graceful.captureExceptions = true;

let port = parseInt(process.env.PORT, 10);

if (!port) {
  port = 3000;
}

let server: http.Server;

app().then(app => {
  server = app.listen(port, () => console.log(`LABS listening on port ${port}!`));
});

Graceful.on('exit', async () => {
  if (server) {
    await server.close();
  }
  console.log(`Gracefully closed LABS listening port ${port}!`);
});

process.on('SIGINT', async () => {
  Graceful.exit(1);
});
