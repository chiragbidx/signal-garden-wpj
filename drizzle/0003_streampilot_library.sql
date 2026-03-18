-- StreamPilot Library -- Add library_items, watched_statuses, and library_reviews tables

CREATE TABLE IF NOT EXISTS "library_items" (
  "id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "team_id" text NOT NULL REFERENCES "teams" ("id") ON DELETE CASCADE,
  "type" text NOT NULL,
  "external_id" text NOT NULL,
  "title" text NOT NULL,
  "description" text DEFAULT '' NOT NULL,
  "year" text,
  "genre" text,
  "poster_url" text,
  "date_added" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT "library_item_unique_team_extid_idx" UNIQUE ("team_id", "external_id")
);

CREATE TABLE IF NOT EXISTS "watched_statuses" (
  "id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "library_item_id" text NOT NULL REFERENCES "library_items" ("id") ON DELETE CASCADE,
  "user_id" text NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
  "watched_at" timestamptz,
  CONSTRAINT "watched_status_user_item_idx" UNIQUE ("user_id", "library_item_id")
);

CREATE TABLE IF NOT EXISTS "library_reviews" (
  "id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "library_item_id" text NOT NULL REFERENCES "library_items" ("id") ON DELETE CASCADE,
  "user_id" text NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
  "rating" integer NOT NULL,
  "review_text" text DEFAULT '' NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT "library_review_user_item_idx" UNIQUE ("user_id", "library_item_id")
);