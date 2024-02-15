import { TmdbApi } from "tmdb-typescript-api";

const apiKey = 'ef2884864a6752995ee2e15ebf341824';
const tmdbApi = new TmdbApi(apiKey);

const searchResults = tmdbApi.search.movies('The fellowship of the ring');
const blab = searchResults.source.request.url
console.log(blab)
search