import { db } from "@/lib/db/client";
import { libraryItems, teamMembers, teams } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getAuthSession } from "@/lib/auth/session";
import LibrarySeriesClient from "./client";

export const dynamic = "force-dynamic";

export default async function SeriesPage() {
  const session = await getAuthSession();
  if (!session) return null;

  // Fetch the team membership using Drizzle select().from().where()
  const userTeamRows = await db
    .select({
      ...teamMembers,
      team: { id: teams.id, name: teams.name }
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

  // Series only
  const items = await db
    .select()
    .from(libraryItems)
    .where(and(eq(libraryItems.teamId, teamId), eq(libraryItems.type, "series")))
    .orderBy(libraryItems.dateAdded && { desc: libraryItems.dateAdded });

  return (
    <LibrarySeriesClient items={items} teamId={teamId} sessionUserId={session.userId} />
  );
}