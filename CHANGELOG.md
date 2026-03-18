# Changelog
<!--
  Purpose:
  - Track project change history over time.
  - Record date, summary, and key files touched for each change set.
  - Keep entries append-only (do not delete past entries).
-->

## [2026-04-29] StreamPilot — Core Branding + Library Feature Bootstrap

- Updated brand, footer, navbar, meta, and dashboard sidebar for StreamPilot launch.
- Added StreamPilot team/collaboration and streaming-focused landing content.
- Extended database schema:
  - Added tables: `library_items`, `watched_statuses`, `library_reviews` for collaborative team libraries.
- Added Drizzle migration (`0003_streampilot_library.sql`) and journal entry.
- Added initial TMDb API adapter (`lib/tmdb/api.ts`, `lib/tmdb/types.ts`) for universal movie/series search.
- Updated dashboard navigation and layout to reference "Library," "Movies," "Series".
- [Pending in next commits:] Implement UI for collaborative library dashboard and CRUD lifecycle.

**Key files:**
- `content/home.ts`
- `components/layout/navbar.tsx`
- `components/home/LayoutFooterSection.tsx`
- `components/dashboard/sidebar-nav.tsx`
- `lib/db/schema.ts`
- `drizzle/0003_streampilot_library.sql`
- `drizzle/meta/_journal.json`
- `lib/tmdb/types.ts`
- `lib/tmdb/api.ts`
- `CHANGELOG.md`