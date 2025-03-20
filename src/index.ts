import { Elysia } from 'elysia';
import { Application } from './core/server/application';

async function start() {
  const server = new Application();

  await server.start();
}

start();
