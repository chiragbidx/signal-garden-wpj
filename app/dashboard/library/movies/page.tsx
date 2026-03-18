import { db } from "@/lib/db/client";
import { libraryItems, teamMembers, teams } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getAuthSession } from "@/lib/auth/session";
import LibraryMoviesClient from "./client";

export const dynamic = "force-dynamic";

export default async function MoviesPage() {
  const session = await getAuthSession();
  if (!session) return null;

  // Fetch the team membership using Drizzle select().from().where() method
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

  // Movies only
  const items = await db
    .select()
    .from(libraryItems)
    .where(and(eq(libraryItems.teamId, teamId), eq(libraryItems.type, "movie")))
    .orderBy(libraryItems.dateAdded && { desc: libraryItems.dateAdded });

  return (
    <LibraryMoviesClient items={items} teamId={teamId} sessionUserId={session.userId} />
  );
}