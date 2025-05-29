import { BaseController } from "@/core/abstracts/base-controller";
import { clerkMiddleware } from "@/middlewares/clerk";
import { userWebhookMidleware } from "@/middlewares/user-webhook";
import ClerkService from "@services/clerk.service";

export class UserController extends BaseController {
  private _clerkService: ClerkService;

  constructor() {
    super({
      prefix: "/users",
      tags: ["User"],
    });

    this._clerkService = new ClerkService();
  }

  routes() {
    this.router.post(
      "/webhook",
      async (c) => {
        try {
          const { clerkEvent } = c.store as { clerkEvent: unknown };

          await this._clerkService.handleWebhook(
            clerkEvent as
              | UserCreatedWebhook
              | UserUpdatedWebhook
              | UserDeletedWebhook,
          );

          c.set.status = 200;
          return {
            success: true,
            message: "Webhook received",
          };
        } catch (error) {
          console.log(error);

          c.set.status = 500;
          return { error };
        }
      },
      {
        beforeHandle: userWebhookMidleware,
      },
    );

    this.router.get(
      "/test",
      async (c) => {
        try {
          const store = c.store;

          return {
            success: true,
            payload: store,
          };
        } catch (error) {
          console.log(error);

          c.set.status = 500;
          return { error };
        }
      },
      {
        beforeHandle: clerkMiddleware,
      },
    );
  }

  setup() {
    this.routes();
    return this.router;
  }
}

export default UserController;
