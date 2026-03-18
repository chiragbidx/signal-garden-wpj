"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type MoviesClientProps = {
  items: any[];
  teamId: string;
  sessionUserId: string;
};

export default function LibraryMoviesClient({ items }: MoviesClientProps) {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-8">Movies</h1>
      {items.length === 0 ? (
        <div className="text-muted-foreground text-center py-12">No movies in the library yet.</div>
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
                      {item.year} • MOVIE
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
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}