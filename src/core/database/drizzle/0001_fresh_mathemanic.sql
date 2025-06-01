CREATE TABLE "transfers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "transfers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"block_num" text,
	"unique_id" text,
	"hash" text,
	"from" text,
	"to" text,
	"value" numeric(78, 30),
	"tokenId" text,
	"asset" text,
	"category" text,
	"wallet_id" integer,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "transfers_unique_id_unique" UNIQUE("unique_id")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "deleted_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "wallets" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "wallets" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "wallets" ADD COLUMN "deleted_at" timestamp DEFAULT now() NOT NULL;