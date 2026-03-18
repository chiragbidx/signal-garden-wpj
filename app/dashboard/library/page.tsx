import { db } from "@/lib/db/client";
import { libraryItems, libraryReviews, watchedStatuses, users } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getAuthSession } from "@/lib/auth/session";
import LibraryClient from "./client";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  // Require active user & team (same pattern as dashboard)
  const session = await getAuthSession();
  if (!session) {
    return null;
  }

  // Find user's team (fetch first team they belong to - single-tenant per UI)
  // Drizzle does not have findFirst; use findMany and take [0]
  const userTeamMembers = await db.query.teamMembers.findMany({
    where: (tm, { eq }) => eq(tm.userId, session.userId),
    with: {
      team: true,
    },
    limit: 1,
  });

  const userTeamMember = userTeamMembers[0];

  if (!userTeamMember || !userTeamMember.team) {
    return <div>No team access.</div>;
  }
  const teamId = userTeamMember.teamId;

  // Fetch library items (default all, ordered by most recent)
  // Pre-fetch watched/review status for current user
  const items = await db.query.libraryItems.findMany({
    where: (li, { eq }) => eq(li.teamId, teamId),
    with: {
      reviews: {
        with: { user: true },
      },
      watched: {
        where: (w, { eq }) => eq(w.userId, session.userId),
      },
    },
    orderBy: (li, { desc }) => desc(li.dateAdded),
  });

  // User info
  const userArr = await db.query.users.findMany({
    where: (u, { eq }) => eq(u.id, session.userId),
    limit: 1,
  });
  const user = userArr[0] ?? null;

  return (
    <LibraryClient
      items={items}
      user={user}
      teamId={teamId}
      sessionUserId={session.userId}
    />
  );
}