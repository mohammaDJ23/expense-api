CREATE TYPE "public"."oauth_provider" AS ENUM('google');--> statement-breakpoint
CREATE TYPE "public"."user_roles" AS ENUM('owner', 'user');--> statement-breakpoint
CREATE TABLE "email_identities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(150) NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "email_identities_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "local_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hashed_password" varchar(255) NOT NULL,
	"email_id" uuid NOT NULL,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "local_accounts_email_id_unique" UNIQUE("email_id")
);
--> statement-breakpoint
CREATE TABLE "oauth_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider" "oauth_provider" NOT NULL,
	"provider_id" varchar(255) NOT NULL,
	"email_id" uuid NOT NULL,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"amount" varchar(12) NOT NULL,
	"description" varchar(500) NOT NULL,
	"purchased_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL,
	"receiver_id" uuid NOT NULL,
	"location_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bills_consumers" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"bill_id" uuid NOT NULL,
	"consumer_id" uuid NOT NULL,
	CONSTRAINT "bills_consumers_bill_id_consumer_id_pk" PRIMARY KEY("bill_id","consumer_id")
);
--> statement-breakpoint
CREATE TABLE "consumers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "outbox_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"aggregate_type" varchar(100) NOT NULL,
	"aggregate_id" uuid NOT NULL,
	"event_type" varchar(150) NOT NULL,
	"payload" jsonb NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "receivers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" "user_roles" DEFAULT 'user' NOT NULL,
	"first_name" varchar(50),
	"last_name" varchar(50),
	"avatar" varchar(500),
	"phone" varchar(20),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "email_identities" ADD CONSTRAINT "email_identities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "local_accounts" ADD CONSTRAINT "local_accounts_email_id_email_identities_id_fk" FOREIGN KEY ("email_id") REFERENCES "public"."email_identities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oauth_accounts" ADD CONSTRAINT "oauth_accounts_email_id_email_identities_id_fk" FOREIGN KEY ("email_id") REFERENCES "public"."email_identities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bills" ADD CONSTRAINT "bills_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bills" ADD CONSTRAINT "bills_receiver_id_receivers_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."receivers"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bills" ADD CONSTRAINT "bills_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bills_consumers" ADD CONSTRAINT "bills_consumers_bill_id_bills_id_fk" FOREIGN KEY ("bill_id") REFERENCES "public"."bills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bills_consumers" ADD CONSTRAINT "bills_consumers_consumer_id_consumers_id_fk" FOREIGN KEY ("consumer_id") REFERENCES "public"."consumers"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consumers" ADD CONSTRAINT "consumers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receivers" ADD CONSTRAINT "receivers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_email_identities_user_id" ON "email_identities" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_oauth_accounts_provider_id_provider" ON "oauth_accounts" USING btree ("provider_id","provider");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_oauth_accounts_email_id_provider" ON "oauth_accounts" USING btree ("email_id","provider");--> statement-breakpoint
CREATE INDEX "idx_bills_user_id_created_at_id" ON "bills" USING btree ("user_id","created_at","id");--> statement-breakpoint
CREATE INDEX "idx_bills_user_id_id" ON "bills" USING btree ("user_id","id");--> statement-breakpoint
CREATE INDEX "idx_bills_user_id_location_id" ON "bills" USING btree ("user_id","location_id");--> statement-breakpoint
CREATE INDEX "idx_bills_user_id_receiver_id" ON "bills" USING btree ("user_id","receiver_id");--> statement-breakpoint
CREATE INDEX "idx_bills_user_id_purchased_at" ON "bills" USING btree ("user_id","purchased_at");--> statement-breakpoint
CREATE INDEX "idx_bills_consumers_consumer_id" ON "bills_consumers" USING btree ("consumer_id");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_consumers_user_id_name" ON "consumers" USING btree ("user_id","name");--> statement-breakpoint
CREATE INDEX "idx_consumers_user_id_id" ON "consumers" USING btree ("user_id","id");--> statement-breakpoint
CREATE INDEX "idx_consumers_user_id_created_at_id" ON "consumers" USING btree ("user_id","created_at","id");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_locations_user_id_name" ON "locations" USING btree ("user_id","name");--> statement-breakpoint
CREATE INDEX "idx_locations_user_id_id" ON "locations" USING btree ("user_id","id");--> statement-breakpoint
CREATE INDEX "idx_locations_user_id_created_at_id" ON "locations" USING btree ("user_id","created_at","id");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_receivers_user_id_name" ON "receivers" USING btree ("user_id","name");--> statement-breakpoint
CREATE INDEX "idx_receivers_user_id_id" ON "receivers" USING btree ("user_id","id");--> statement-breakpoint
CREATE INDEX "idx_receivers_user_id_created_at_id" ON "receivers" USING btree ("user_id","created_at","id");--> statement-breakpoint
CREATE INDEX "idx_users_created_at_id" ON "users" USING btree ("created_at","id");