import Elysia, { type DocumentDecoration } from 'elysia';
import type { IController } from '../interfaces/controller-interface';

export abstract class BaseController implements IController {
  protected router;

  constructor({ prefix, tags }: { prefix: string; tags?: string[] }) {
    this.router = new Elysia({ prefix, tags });
  }

  abstract setup(): void;
}
