"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SeriesClientProps = {
  items: any[];
  teamId: string;
  sessionUserId: string;
};

export default function LibrarySeriesClient({ items }: SeriesClientProps) {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-8">Series</h1>
      {items.length === 0 ? (
        <div className="text-muted-foreground text-center py-12">No series in the library yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <Card key={item.id} className="hover:bg-secondary/40 transition">
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
                    {item.year} • SERIES
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground line-clamp-3">{item.description}</div>
              </CardContent>
              <CardFooter className="justify-between px-6 pt-0">
                <Button size="sm" variant="outline">
                  View
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}