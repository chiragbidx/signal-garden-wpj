"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Library, Users, UserCog, Film, Tv, LogOut } from "lucide-react";
import { signOutAction } from "@/app/dashboard/actions";

const navItems = [
  {
    name: "Library",
    href: "/dashboard/library",
    icon: Library
  },
  {
    name: "Movies",
    href: "/dashboard/library/movies",
    icon: Film
  },
  {
    name: "Series",
    href: "/dashboard/library/series",
    icon: Tv
  },
  {
    name: "Team",
    href: "/dashboard/team",
    icon: Users
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: UserCog
  }
];

export default function SidebarNav() {
  const pathname = usePathname();
  return (
    <nav className="flex-1 px-4 py-8 flex flex-col gap-4">
      <div className="space-y-2 flex-1">
        {navItems.map(item => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              href={item.href}
              key={item.href}
              className={cn(
                "flex items-center gap-3 rounded px-3 py-2 text-md font-medium transition hover:bg-accent",
                active ? "bg-accent text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
      <form action={signOutAction} method="post" className="mt-8">
        <button
          type="submit"
          className="flex items-center gap-2 px-3 py-2 text-md font-medium rounded text-destructive hover:bg-destructive/10 transition w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </form>
    </nav>
  );
}