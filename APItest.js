"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tmdb_typescript_api_1 = require("tmdb-typescript-api");
var apiKey = 'ef2884864a6752995ee2e15ebf341824';
var api = new tmdb_typescript_api_1.TmdbApi(apiKey);
api.search.movies('Pulp Fiction').subscribe(function (movies) {
    var movie = movies.results[0];
    console.log("\"Pulp Fiction\" was released in ".concat(movie.release_date));
});
api.tvshows.details(4607).subscribe(function (show) {
    console.log("\"Lost\" had ".concat(show.number_of_seasons, " seasons"));
});
