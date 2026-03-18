import { notFound } from "next/navigation";
import { db } from "@/lib/db/client";
import {
  libraryItems,
  libraryReviews,
  watchedStatuses,
  users,
  teamMembers,
  teams,
} from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getAuthSession } from "@/lib/auth/session";
import LibraryItemDetailClient from "./client";

export const dynamic = "force-dynamic";

// Helper to get reviews and watched status for one item
async function getItemReviewsAndWatched(itemId: string, sessionUserId: string) {
  const reviews = await db
    .select()
    .from(libraryReviews)
    .where(eq(libraryReviews.libraryItemId, itemId));
  const watched = await db
    .select()
    .from(watchedStatuses)
    .where(and(eq(watchedStatuses.libraryItemId, itemId), eq(watchedStatuses.userId, sessionUserId)));
  return { reviews, watched };
}

export default async function LibraryItemDetailPage({ params }: { params: { itemId: string } }) {
  const session = await getAuthSession();
  if (!session) return notFound();

  const item = await db.query.libraryItems.findFirst({
    where: (li, { eq }) => eq(li.id, params.itemId),
  });

  if (!item) return notFound();

  // Confirm user has team access for this item
  const teamMember = await db.query.teamMembers.findFirst({
    where: (tm, { eq }) => eq(tm.userId, session.userId),
    with: { team: true }
  });

  if (!teamMember || teamMember.teamId !== item.teamId) return notFound();

  const { reviews, watched } = await getItemReviewsAndWatched(item.id, session.userId);

  return (
    <LibraryItemDetailClient
      item={item}
      reviews={reviews}
      watched={watched}
      sessionUserId={session.userId}
    />
  );
}