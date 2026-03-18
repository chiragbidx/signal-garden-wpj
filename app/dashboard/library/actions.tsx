"use server";

import { z } from "zod";
import { db } from "@/lib/db/client";
import {
  libraryItems,
  watchedStatuses,
  libraryReviews,
} from "@/lib/db/schema";
import { getAuthSession } from "@/lib/auth/session";
import { and, eq } from "drizzle-orm";

const addLibraryItemSchema = z.object({
  teamId: z.string(),
  type: z.enum(["movie", "series"]),
  externalId: z.string(),
  title: z.string().min(1),
  description: z.string().max(1024),
  year: z.string().optional(),
  genre: z.string().optional(),
  posterUrl: z.string().optional(),
});

// This is the main create action used from library Add modal.
export async function addLibraryItemAction(input: z.input<typeof addLibraryItemSchema>) {
  const session = await getAuthSession();
  if (!session) throw new Error("Not authenticated.");

  const data = addLibraryItemSchema.parse(input);

  // Check duplicate (by externalId and team)
  const exists = await db.query.libraryItems.findFirst({
    where: (item, { eq, and }) => and(eq(item.teamId, data.teamId), eq(item.externalId, data.externalId)),
  });
  if (exists) throw new Error("This title is already in your team's library.");

  const item = await db
    .insert(libraryItems)
    .values({
      teamId: data.teamId,
      type: data.type,
      externalId: data.externalId,
      title: data.title,
      description: data.description,
      year: data.year || null,
      genre: data.genre || null,
      posterUrl: data.posterUrl || null,
    })
    .returning()
    .then((rows) => rows[0]);

  return item;
}

// Remove a title from the library
export async function removeLibraryItemAction(libraryItemId: string) {
  const session = await getAuthSession();
  if (!session) throw new Error("Not authenticated.");

  // Tenant safety: must only delete from user's team
  // [TODO] Guard with teamId check if needed
  await db.delete(libraryItems).where(eq(libraryItems.id, libraryItemId));
  return true;
}

// Mark watched/unwatched by the current user
export async function markWatchedStatusAction({
  libraryItemId,
  watched,
}: {
  libraryItemId: string;
  watched: boolean;
}) {
  const session = await getAuthSession();
  if (!session) throw new Error("Not authenticated.");

  if (watched) {
    // Upsert watchedStatuses for this user/item
    await db
      .insert(watchedStatuses)
      .values({
        libraryItemId,
        userId: session.userId,
        watchedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [watchedStatuses.userId, watchedStatuses.libraryItemId],
        set: { watchedAt: new Date() },
      });
  } else {
    // Remove watched status
    await db
      .delete(watchedStatuses)
      .where(
        and(
          eq(watchedStatuses.libraryItemId, libraryItemId),
          eq(watchedStatuses.userId, session.userId),
        ),
      );
  }
  return true;
}

// Add, edit, or delete a review
const reviewSchema = z.object({
  libraryItemId: z.string(),
  rating: z.number().int().min(1).max(5),
  reviewText: z.string().max(500),
});

export async function upsertLibraryReviewAction(input: z.input<typeof reviewSchema>) {
  const session = await getAuthSession();
  if (!session) throw new Error("Not authenticated.");
  const data = reviewSchema.parse(input);

  // See if review exists
  const existing = await db.query.libraryReviews.findFirst({
    where: (r, { eq, and }) => and(
      eq(r.libraryItemId, data.libraryItemId),
      eq(r.userId, session.userId)
    ),
  });

  if (existing) {
    // Update
    await db
      .update(libraryReviews)
      .set({
        rating: data.rating,
        reviewText: data.reviewText,
      })
      .where(eq(libraryReviews.id, existing.id));
    return { ...existing, ...data };
  } else {
    // Create
    const row = await db
      .insert(libraryReviews)
      .values({
        libraryItemId: data.libraryItemId,
        userId: session.userId,
        rating: data.rating,
        reviewText: data.reviewText,
      })
      .returning()
      .then((rows) => rows[0]);
    return row;
  }
}

// Delete a review
export async function deleteLibraryReviewAction(reviewId: string) {
  const session = await getAuthSession();
  if (!session) throw new Error("Not authenticated.");

  // Delete where review matches and is by current user
  await db
    .delete(libraryReviews)
    .where(
      and(
        eq(libraryReviews.id, reviewId),
        eq(libraryReviews.userId, session.userId),
      ),
    );
  return true;
}