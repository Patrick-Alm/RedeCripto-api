import { BaseController } from "@/core/abstracts/base-controller";

export class ExampleController extends BaseController {
  constructor() {
    super({
      prefix: '/example',
      tags: ['Example'],
    });
  }

  routes() {
    this.router
      .get('/', () => 'Hello World from Example!', {})
      .get('/:id', ({ params: { id } }) => `Order ${id}`, {})
      .post('/', ({ body }) => ({
        message: 'Example created',
        order: body,
      }));
  }

  setup() {
    this.routes();
    return this.router;
  }
}

export default ExampleController;
