export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "2d057043a5e8ae2214e448a3e7335e7a";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
    getMovieList: (type, page) =>
        `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
    getMovieSearch: (query, page) =>
        `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
    getMovieDetails: (movieId) =>
        `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
    getMovieMeta: (movieId, type = "videos") =>
        `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
    imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
    image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
};
