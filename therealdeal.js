"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var PromptSync = require("prompt-sync");
var options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjI4ODQ4NjRhNjc1Mjk5NWVlMmUxNWViZjM0MTgyNCIsInN1YiI6IjY1Y2UwY2NlZWZjZWE5MDE3Y2FhYzJkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zKr06f_GR1RioPGjmxIi6IRd8sRgq3s8D2jMeUNzYtU'
    }
};
function get_id(title) {
    return __awaiter(this, void 0, void 0, function () {
        var response, search;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.themoviedb.org/3/search/movie?query=".concat(title, "&include_adult=false&language=en-US&page=1"), options)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    search = _a.sent();
                    return [2 /*return*/, search.results[0].id];
            }
        });
    });
}
function get_movie(id) {
    return __awaiter(this, void 0, void 0, function () {
        var details_response, credits_response, details_result, credits_result, title, rating, actors, i, directors, i, genres, movie;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.themoviedb.org/3/movie/".concat(id, "?language=en-US"), options)];
                case 1:
                    details_response = _a.sent();
                    return [4 /*yield*/, fetch("https://api.themoviedb.org/3/movie/".concat(id, "/credits?language=en-US"), options)];
                case 2:
                    credits_response = _a.sent();
                    return [4 /*yield*/, details_response.json()];
                case 3:
                    details_result = _a.sent();
                    return [4 /*yield*/, credits_response.json()];
                case 4:
                    credits_result = _a.sent();
                    title = details_result.original_title;
                    rating = details_result.vote_average;
                    actors = [];
                    for (i = 0; i < 10 && i < credits_result.cast.length; i++) {
                        actors.push(credits_result.cast[i].name);
                    }
                    directors = [];
                    for (i = 0; i < credits_result.crew.length; i++) {
                        if (credits_result.crew[i].job === "Director") {
                            directors.push(credits_result.crew[i].name);
                        }
                    }
                    genres = details_result.genres;
                    movie = {
                        title: title,
                        actors: actors,
                        director: directors,
                        genres: genres,
                        rating: rating
                    };
                    return [2 /*return*/, movie];
            }
        });
    });
}
function get_movie_from_title(movie) {
    return __awaiter(this, void 0, void 0, function () {
        var id, movieDetails, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, get_id(movie)];
                case 1:
                    id = _a.sent();
                    return [4 /*yield*/, get_movie(id)];
                case 2:
                    movieDetails = _a.sent();
                    return [2 /*return*/, movieDetails];
                case 3:
                    error_1 = _a.sent();
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
var prompt = PromptSync();
var userInput = prompt('Enter a movie title: ');
get_movie_from_title(userInput)
    .then(function (result) { return console.log(result); })
    .catch(function (err) { return console.error(err); });
/*
function top_5(movie: movie, top5: Array<movie>): void {
    let i = 0
    while(movie.rating < top5[i].rating && i < top5.length) {
        continue
    }
    if(i < 5) {
        const new_movie_index = i
        let current = top5[i]
        for(i; i < top5.length - 1; i++) {
            let temp = top5[i + 1]
            top5[i + 1] = current
            current = temp
        }
        top5[new_movie_index] = movie
    }
}

function similar_movies(movie:string): Array<movie> | undefined{
    const movie_api: movie = //sök movie i api
    if(movie_api) {
        let similar: Array<movie> = []
        for(let i = 0; i < movie_api.genre.length; i++) {
            const genre = //sök movie_api.genre[i] i api
            for(let j = 0; j < genre.length; j++) {
                top_5(genre[j], similar)
            }
        }
        return similar
    } else {
        console.log("Could not find any movie called " + movie)
        return undefined
    }
}
*/ 
