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
- [REMOVED] TMDb API adapter and all TMDb-powered search/lookup UI and integrations; now supports manual entry only for movies and series.
- Updated dashboard navigation and layout to reference "Library," "Movies," "Series".
- [Pending in next commits:] Implement UI for collaborative library dashboard and CRUD lifecycle.

## [2026-04-29] StreamPilot — Library UI list and manual add

- Implemented dashboard Library root page (`/dashboard/library`), and subpages for Movies and Series.
- Library UI: all items view, movies list, series list; add modal for manual entry only (no TMDb search integration).
- Server data load and client-side skeleton for CRUD interfaces.
- Prepares ground for details, CRUD, watched status, and review/rating flows.

**Key files:**
- `app/dashboard/library/page.tsx`
- `app/dashboard/library/client.tsx`
- `app/dashboard/library/actions.tsx`
- `app/dashboard/library/movies/page.tsx`
- `app/dashboard/library/movies/client.tsx`
- `app/dashboard/library/series/page.tsx`
- `app/dashboard/library/series/client.tsx`