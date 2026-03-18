import { db } from "@/lib/db/client";
import { libraryItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getAuthSession } from "@/lib/auth/session";
import LibrarySeriesClient from "./client";

export const dynamic = "force-dynamic";

export default async function SeriesPage() {
  const session = await getAuthSession();
  if (!session) return null;

  const userTeamMember = await db.query.teamMembers.findFirst({
    where: (tm, { eq }) => eq(tm.userId, session.userId),
    with: { team: true },
  });

  if (!userTeamMember || !userTeamMember.team) {
    return <div>No team access.</div>;
  }
  const teamId = userTeamMember.teamId;

  // Series only
  const items = await db.query.libraryItems.findMany({
    where: (li, { eq, and }) => and(eq(li.teamId, teamId), eq(li.type, "series")),
    orderBy: (li, { desc }) => desc(li.dateAdded),
  });

  return (
    <LibrarySeriesClient items={items} teamId={teamId} sessionUserId={session.userId} />
  );
}