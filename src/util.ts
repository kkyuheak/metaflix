export const getMovieImg = (movidId: string, size?: string) => {
  return `https://image.tmdb.org/3/t/p/${size ? size : "original"}/${movidId}`;
};
