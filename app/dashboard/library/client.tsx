"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter as ModalFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Plus } from "lucide-react";
import { addLibraryItemAction } from "./actions";

const AddLibraryFormSchema = z.object({
  teamId: z.string(),
  type: z.enum(["movie", "series"]),
  title: z.string().min(1),
  description: z.string().max(1024),
  year: z.string().optional(),
  genre: z.string().optional(),
  posterUrl: z.string().optional(),
});

type AddLibraryFormValues = z.infer<typeof AddLibraryFormSchema>;

type LibraryClientProps = {
  items: any[];
  user: any;
  teamId: string;
  sessionUserId: string;
};

export default function LibraryClient({ items, teamId, user, sessionUserId }: LibraryClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<AddLibraryFormValues>({
    resolver: zodResolver(AddLibraryFormSchema),
    defaultValues: {
      teamId: teamId || "",
      type: "movie",
      title: "",
      description: "",
      year: "",
      genre: "",
      posterUrl: "",
    },
  });

  async function onSubmit(values: AddLibraryFormValues) {
    setSubmitting(true);
    setCreateError(null);
    try {
      const result = await addLibraryItemAction(values);
      // On success, just refetch the page for now
      window.location.reload();
    } catch (err: any) {
      setCreateError(err.message || "Could not add item. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-0">Library</h1>
          <p className="text-muted-foreground mt-2">Browse and manage your team’s streaming catalog.</p>
        </div>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button variant="default" size="sm">
              <Plus className="w-4 h-4 mr-1" /> Add Title
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Title</DialogTitle>
              <DialogDescription>
                Manually add a movie or series to your team’s library.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3 py-2"
              autoComplete="off"
            >
              <div className="flex gap-2 mb-2">
                <Button
                  variant={form.watch("type") === "movie" ? "default" : "ghost"}
                  type="button"
                  onClick={() => form.setValue("type", "movie")}
                  size="sm"
                >
                  Movie
                </Button>
                <Button
                  variant={form.watch("type") === "series" ? "default" : "ghost"}
                  type="button"
                  onClick={() => form.setValue("type", "series")}
                  size="sm"
                >
                  Series
                </Button>
              </div>
              <Input
                {...form.register("title")}
                placeholder={form.watch("type") === "movie" ? "Movie title" : "Series title"}
                autoFocus
                required
              />
              <Input
                {...form.register("year")}
                placeholder="Year (e.g. 2022)"
              />
              <Input
                {...form.register("genre")}
                placeholder="Genre (optional)"
              />
              <Input
                {...form.register("posterUrl")}
                placeholder="Poster URL (optional, link to image)"
              />
              <textarea
                {...form.register("description")}
                placeholder="Short description or summary"
                className="border rounded p-2 text-sm text-muted-foreground"
                rows={3}
                maxLength={1024}
                style={{ resize: "vertical" }}
              />
              <input type="hidden" value={teamId} {...form.register("teamId")} />
              {createError && (<div className="text-destructive text-sm">{createError}</div>)}
              <ModalFooter>
                <Button type="submit" variant="default" disabled={submitting}>
                  {submitting ? "Adding..." : "Add"}
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary" disabled={submitting}>Cancel</Button>
                </DialogClose>
              </ModalFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* Main library grid */}
      {items?.length === 0 ? (
        <div className="text-muted-foreground text-center py-12">No titles have been added yet. Get started by adding a movie or series!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <Link
              key={item.id}
              href={`/dashboard/library/${item.id}`}
              className="hover:shadow-lg transition-all"
            >
              <Card className="hover:bg-secondary/40 transition cursor-pointer h-full flex flex-col">
                <CardHeader className="pb-2 flex flex-row gap-4 items-center">
                  <div className="w-14 h-20 rounded bg-secondary overflow-hidden flex-shrink-0">
                    {item.posterUrl ? (
                      <img
                        src={item.posterUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center text-xs">No Image</div>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      {item.title}
                    </CardTitle>
                    <CardDescription>
                      {item.year} • {item.type?.toUpperCase()}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground line-clamp-3">{item.description}</div>
                </CardContent>
                <CardFooter className="justify-between px-6 pt-0 mt-auto">
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                  {/* TODO: watched toggle, aggregate rating, etc */}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}