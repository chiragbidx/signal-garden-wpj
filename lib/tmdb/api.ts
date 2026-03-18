import { TMDB_IMAGE_BASE_URL, TmdbMovieDetail, TmdbSearchResponse, TmdbSearchMovie, TmdbSearchTv, TmdbTvDetail } from "./types";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const API_BASE = "https://api.themoviedb.org/3";

if (!TMDB_API_KEY) {
  throw new Error("TMDB_API_KEY env variable is required for movie search and detail API.");
}

export async function searchTmdbMoviesAndSeries(query: string, type: "movie" | "tv", page: number = 1): Promise<TmdbSearchResponse> {
  if (!query) {
    return {
      page: 1,
      total_pages: 1,
      total_results: 0,
      results: [],
    };
  }

  const url =
    type === "movie"
      ? `${API_BASE}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
      : `${API_BASE}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data from TMDb.");
  }

  const data = await res.json();

  return {
    ...data,
    results: data.results.map((item: any) => ({
      ...item,
      media_type: type,
    })),
  } as TmdbSearchResponse;
}

export async function fetchTmdbMovieDetail(id: number): Promise<TmdbMovieDetail> {
  const res = await fetch(`${API_BASE}/movie/${id}?api_key=${TMDB_API_KEY}`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Could not get movie details");
  return res.json();
}

export async function fetchTmdbTvDetail(id: number): Promise<TmdbTvDetail> {
  const res = await fetch(`${API_BASE}/tv/${id}?api_key=${TMDB_API_KEY}`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Could not get series details");
  return res.json();
}