"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { upsertLibraryReviewAction, deleteLibraryReviewAction, markWatchedStatusAction } from "../actions";

type LibraryItemDetailClientProps = {
  item: any;
  reviews: any[];
  watched: any[];
  sessionUserId: string;
};

function averageRating(reviews: any[]) {
  if (!reviews.length) return null;
  const avg = reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;
  return avg.toFixed(1);
}

export default function LibraryItemDetailClient({ item, reviews, watched, sessionUserId }: LibraryItemDetailClientProps) {
  const [watchedState, setWatchedState] = useState(!!watched?.length);

  async function toggleWatched() {
    await markWatchedStatusAction({ libraryItemId: item.id, watched: !watchedState });
    setWatchedState(!watchedState);
  }

  // Review helpers
  const userReview = reviews.find(r => r.userId === sessionUserId);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <Card className="flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-40 flex-shrink-0">
          {item.posterUrl ? (
            <img src={item.posterUrl} alt={item.title} className="rounded w-full sm:w-40 sm:h-56 object-cover" />
          ) : (
            <div className="rounded bg-primary/10 flex items-center justify-center text-xs w-full sm:w-40 sm:h-56">No Image</div>
          )}
        </div>
        <div className="flex-1 px-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{item.title}</CardTitle>
            <CardDescription>
              {item.year} • {item.type?.toUpperCase()}
              {item.genre && ` • ${item.genre}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-muted-foreground text-sm">{item.description}</p>
            <div className="mt-4 flex gap-3">
              <Badge variant={watchedState ? "default" : "outline"}>
                {watchedState ? "Watched" : "Not watched"}
              </Badge>
              <Button
                size="sm"
                variant={watchedState ? "outline" : "secondary"}
                onClick={toggleWatched}
              >
                {watchedState ? "Mark as Unwatched" : "Mark as Watched"}
              </Button>
              {reviews.length > 0 && (
                <Badge variant="secondary">
                  {reviews.length} review{reviews.length !== 1 && "s"}, Avg {averageRating(reviews)}/5
                </Badge>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start space-y-2">
            <h3 className="font-semibold text-lg mt-4 mb-2">Reviews</h3>
            {/* User review */}
            <div className="mb-4 border-b pb-4 w-full">
              {userReview ? (
                <form
                  className="flex flex-col gap-2"
                  action={async (formData) => {
                    "use server";
                    if (formData.get("delete")) {
                      await deleteLibraryReviewAction(userReview.id);
                    } else {
                      await upsertLibraryReviewAction({
                        libraryItemId: item.id,
                        rating: Number(formData.get("rating")),
                        reviewText: String(formData.get("reviewText") || ""),
                      });
                    }
                  }}
                >
                  <label className="text-sm font-medium">Your Rating</label>
                  <select
                    name="rating"
                    defaultValue={userReview.rating}
                    className="w-24 rounded border bg-background px-2 py-1 text-sm"
                    required
                  >
                    <option value="1">1 ⭐</option>
                    <option value="2">2 ⭐</option>
                    <option value="3">3 ⭐</option>
                    <option value="4">4 ⭐</option>
                    <option value="5">5 ⭐</option>
                  </select>
                  <textarea
                    name="reviewText"
                    className="w-full rounded border bg-background px-2 py-1 text-sm"
                    placeholder="Share your thoughts..."
                    defaultValue={userReview.reviewText}
                    maxLength={500}
                  />
                  <div className="flex gap-2">
                    <Button type="submit" variant="default" size="sm">
                      Update Review
                    </Button>
                    <Button type="submit" name="delete" value="1" variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </form>
              ) : (
                <form
                  className="flex flex-col gap-2"
                  action={async (formData) => {
                    "use server";
                    await upsertLibraryReviewAction({
                      libraryItemId: item.id,
                      rating: Number(formData.get("rating")),
                      reviewText: String(formData.get("reviewText") || ""),
                    });
                  }}
                >
                  <label className="text-sm font-medium">Your Rating</label>
                  <select
                    name="rating"
                    className="w-24 rounded border bg-background px-2 py-1 text-sm"
                    required
                  >
                    <option value="">Select…</option>
                    <option value="1">1 ⭐</option>
                    <option value="2">2 ⭐</option>
                    <option value="3">3 ⭐</option>
                    <option value="4">4 ⭐</option>
                    <option value="5">5 ⭐</option>
                  </select>
                  <textarea
                    name="reviewText"
                    className="w-full rounded border bg-background px-2 py-1 text-sm"
                    placeholder="Share your thoughts…"
                    maxLength={500}
                  />
                  <Button type="submit" variant="default" size="sm">
                    Add Review
                  </Button>
                </form>
              )}
            </div>
            {/* All reviews */}
            <div className="space-y-3 w-full">
              {reviews.length === 0 ? (
                <div className="text-muted-foreground text-sm">No reviews yet.</div>
              ) : (
                reviews.map((r, idx) => (
                  <div
                    key={r.id || idx}
                    className="rounded bg-muted/20 px-3 py-2 flex flex-col"
                  >
                    <div className="flex gap-2 items-center text-xs mb-1">
                      <span className="font-semibold">{r.rating} ⭐</span>
                      {r.userId === sessionUserId && (
                        <Badge variant="secondary">You</Badge>
                      )}
                    </div>
                    <div className="text-sm">{r.reviewText}</div>
                  </div>
                ))
              )}
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}