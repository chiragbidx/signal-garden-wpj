import { db } from "@/lib/db/client";
import {
  libraryItems,
  libraryReviews,
  watchedStatuses,
  users,
  teamMembers,
  teams,
} from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm";
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
  const userTeamRows = await db
    .select({
      ...teamMembers,
      team: { id: teams.id, name: teams.name },
    })
    .from(teamMembers)
    .innerJoin(teams, eq(teamMembers.teamId, teams.id))
    .where(eq(teamMembers.userId, session.userId))
    .limit(1);

  const userTeamMember = userTeamRows[0];

  if (!userTeamMember || !userTeamMember.team) {
    return <div>No team access.</div>;
  }
  const teamId = userTeamMember.teamId;

  // Fetch library items for this team
  const items = await db
    .select()
    .from(libraryItems)
    .where(eq(libraryItems.teamId, teamId))
    .orderBy(desc(libraryItems.dateAdded));

  // Pre-fetch watched/review status for current user
  const itemIds = items.map(item => item.id);
  const reviews = [];
  const watched = [];

  const userRows = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);
  const user = userRows[0] ?? null;

  return (
    <LibraryClient
      items={items}
      user={user}
      teamId={teamId}
      sessionUserId={session.userId}
      reviews={reviews}
      watched={watched}
    />
  );
}