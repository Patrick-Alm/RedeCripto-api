import ExampleController from '@controllers/example.controller';
import type { Elysia } from 'elysia';

export class ExampleModule {
  static setup(app: Elysia): void {
    const exampleController = new ExampleController();

    app.use(exampleController.setup());
  }
}
