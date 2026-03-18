export interface TmdbSearchMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  genre_ids: number[];
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  media_type: "movie";
  original_language: string;
  popularity: number;
}

export interface TmdbSearchTv {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  genre_ids: number[];
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  media_type: "tv";
  original_language: string;
  popularity: number;
}

export interface TmdbMovieDetail {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  genres: { id: number; name: string }[];
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  original_language: string;
  runtime: number;
}

export interface TmdbTvDetail {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  genres: { id: number; name: string }[];
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  number_of_seasons: number;
  number_of_episodes: number;
  original_language: string;
}

export interface TmdbSearchResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: (TmdbSearchMovie | TmdbSearchTv)[];
}

export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";