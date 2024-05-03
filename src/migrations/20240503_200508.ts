import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_events_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__events_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "_events_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_title" varchar,
	"version_start_date" timestamp(3) with time zone,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__events_v_version_status",
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean,
	"autosave" boolean
);

CREATE TABLE IF NOT EXISTS "_events_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"events_id" integer
);

ALTER TABLE "events" ALTER COLUMN "title" DROP NOT NULL;
ALTER TABLE "events" ALTER COLUMN "start_date" DROP NOT NULL;
ALTER TABLE "events" ADD COLUMN "_status" "enum_events_status";
CREATE INDEX IF NOT EXISTS "_events_v_version_version_created_at_idx" ON "_events_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_events_v_created_at_idx" ON "_events_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_events_v_updated_at_idx" ON "_events_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_events_v_latest_idx" ON "_events_v" ("latest");
CREATE INDEX IF NOT EXISTS "_events_v_autosave_idx" ON "_events_v" ("autosave");
CREATE INDEX IF NOT EXISTS "_events_v_rels_order_idx" ON "_events_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_events_v_rels_parent_idx" ON "_events_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_events_v_rels_path_idx" ON "_events_v_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_events_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "_events_v";
DROP TABLE "_events_v_rels";
ALTER TABLE "events" ALTER COLUMN "title" SET NOT NULL;
ALTER TABLE "events" ALTER COLUMN "start_date" SET NOT NULL;
ALTER TABLE "events" DROP COLUMN IF EXISTS "_status";`);

};
