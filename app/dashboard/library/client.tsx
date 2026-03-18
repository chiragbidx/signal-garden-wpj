"use client";

import { useState, useMemo } from "react";
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
import { TMDB_IMAGE_BASE_URL } from "@/lib/tmdb/types";
import { searchTmdbMoviesAndSeries } from "@/lib/tmdb/api";
import { useForm } from "react-hook-form";
import type { TmdbSearchResponse, TmdbSearchMovie, TmdbSearchTv } from "@/lib/tmdb/types";
import { BadgeCheck, Circle, Loader2, Plus } from "lucide-react";

type LibraryClientProps = {
  items: any[];
  user: any;
  teamId: string;
  sessionUserId: string;
};

type SearchType = "movie" | "tv";

export default function LibraryClient({ items, teamId, user, sessionUserId }: LibraryClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchType, setSearchType] = useState<SearchType>("movie");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<TmdbSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<TmdbSearchMovie | TmdbSearchTv | null>(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setResults(null);
    setError(null);
    try {
      const data = await searchTmdbMoviesAndSeries(search, searchType);
      setResults(data);
    } catch (e) {
      setError("Could not fetch from TMDb. Try again later.");
    }
    setLoading(false);
  };

  // Placeholder: handleAddToLibrary will eventually call server action
  async function handleAddToLibrary(result: TmdbSearchMovie | TmdbSearchTv) {
    setAdding(true);
    setError(null);
    // TODO: wire to server action via API call or server action
    alert("Add to library: " + (result.title || result.name));
    setAdding(false);
    setSelected(null);
    setModalOpen(false);
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
                Search movies or series by title. Powered by TMDb.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 py-2">
              <div className="flex gap-2 mb-2">
                <Button
                  variant={searchType === "movie" ? "default" : "ghost"}
                  onClick={() => setSearchType("movie")}
                  size="sm"
                >
                  Movies
                </Button>
                <Button
                  variant={searchType === "tv" ? "default" : "ghost"}
                  onClick={() => setSearchType("tv")}
                  size="sm"
                >
                  Series
                </Button>
              </div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="flex gap-2"
              >
                <Input
                  type="text"
                  placeholder={searchType === "movie" ? "Search movies..." : "Search series..."}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  required
                />
                <Button type="submit" disabled={loading || !search} size="sm">
                  {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Search"}
                </Button>
              </form>
              {error && <div className="text-destructive text-sm">{error}</div>}
              {results && (
                <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto mt-2">
                  {results.results.length === 0 ? (
                    <div className="text-muted-foreground">No results found.</div>
                  ) : (
                    results.results.map(item => (
                      <Card key={item.id} className="flex flex-row gap-4 items-center">
                        <div className="w-16 h-24 flex-shrink-0 rounded overflow-hidden bg-secondary">
                          {item.poster_path ? (
                            <img
                              src={TMDB_IMAGE_BASE_URL + item.poster_path}
                              alt={item.media_type === "movie" ? (item as TmdbSearchMovie).title : (item as TmdbSearchTv).name}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/20 flex items-center justify-center text-xs">No Image</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">
                            {item.media_type === "movie"
                              ? (item as TmdbSearchMovie).title
                              : (item as TmdbSearchTv).name}
                          </div>
                          <div className="text-muted-foreground text-xs truncate w-[220px]">{item.overview?.slice(0, 120)}</div>
                          <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                            {item.media_type === "movie"
                              ? (item as TmdbSearchMovie).release_date
                              : (item as TmdbSearchTv).first_air_date}
                          </div>
                        </div>
                        <Button
                          disabled={adding}
                          onClick={() => handleAddToLibrary(item)}
                          size="sm"
                          variant="secondary"
                        >
                          <Plus className="w-4 h-4 mr-1" /> Add
                        </Button>
                      </Card>
                    ))
                  )}
                </div>
              )}
            </div>
            <ModalFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </ModalFooter>
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