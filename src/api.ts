const API_KEY = import.meta.env.VITE_API_KEY;
const base_url = import.meta.env.VITE_BASE_URL;

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  title: string;
  video: boolean;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export const getMovies = () => {
  return fetch(
    `${base_url}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
  ).then((response) => response.json());
};
