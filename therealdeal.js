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
exports.main = exports.get_movie = exports.get_id = void 0;
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
exports.get_id = get_id;
function get_movie(id) {
    return __awaiter(this, void 0, void 0, function () {
        var details_response, credits_response, details_result, credits_result, title, popularity, genres, actors, i, directors, i, movie;
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
                    popularity = details_result.popularity;
                    genres = details_result.genres;
                    actors = [];
                    for (i = 0; i < 3 && i < credits_result.cast.length; i++) {
                        actors.push(credits_result.cast[i].id);
                    }
                    directors = [];
                    for (i = 0; i < credits_result.crew.length; i++) {
                        if (credits_result.crew[i].job === "Director") {
                            directors.push(credits_result.crew[i].id);
                        }
                    }
                    movie = {
                        id: id,
                        title: title,
                        actors: actors,
                        director: directors,
                        genres: genres,
                        popularity: popularity
                    };
                    return [2 /*return*/, movie];
            }
        });
    });
}
exports.get_movie = get_movie;
function similar_genre(movie_id) {
    return __awaiter(this, void 0, void 0, function () {
        var similar_response, similar_result, i, movie;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.themoviedb.org/3/movie/".concat(movie_id, "/similar?language=en-US&page=1"), options)];
                case 1:
                    similar_response = _a.sent();
                    return [4 /*yield*/, similar_response.json()];
                case 2:
                    similar_result = _a.sent();
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < similar_result.results.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, get_movie(similar_result.results[i].id)];
                case 4:
                    movie = _a.sent();
                    similar_array.push(movie);
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function similar_actor(movie_id) {
    return __awaiter(this, void 0, void 0, function () {
        var actors, i, actor_id, similar_response, similar_result, j, movie_id_1, movie;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get_movie(movie_id)];
                case 1:
                    actors = (_a.sent()).actors;
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < actors.length)) return [3 /*break*/, 9];
                    actor_id = actors[i];
                    return [4 /*yield*/, fetch("https://api.themoviedb.org/3/person/".concat(actor_id, "/movie_credits?language=en-US"), options)];
                case 3:
                    similar_response = _a.sent();
                    return [4 /*yield*/, similar_response.json()];
                case 4:
                    similar_result = _a.sent();
                    j = 0;
                    _a.label = 5;
                case 5:
                    if (!(j < similar_result.cast.length && j < 20)) return [3 /*break*/, 8];
                    movie_id_1 = similar_result.cast[j].id;
                    return [4 /*yield*/, get_movie(movie_id_1)];
                case 6:
                    movie = _a.sent();
                    similar_array.push(movie);
                    _a.label = 7;
                case 7:
                    j++;
                    return [3 /*break*/, 5];
                case 8:
                    i++;
                    return [3 /*break*/, 2];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function similar_director(movie_id) {
    return __awaiter(this, void 0, void 0, function () {
        var director, directed_movies, i, director_id, similar_response, similar_result, j, movie_id_2, movie, m;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get_movie(movie_id)];
                case 1:
                    director = (_a.sent()).director;
                    directed_movies = [];
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < director.length)) return [3 /*break*/, 9];
                    director_id = director[i];
                    return [4 /*yield*/, fetch("https://api.themoviedb.org/3/person/".concat(director_id, "/movie_credits?language=en-US"), options)];
                case 3:
                    similar_response = _a.sent();
                    return [4 /*yield*/, similar_response.json()];
                case 4:
                    similar_result = _a.sent();
                    j = 0;
                    _a.label = 5;
                case 5:
                    if (!(j < similar_result.crew.length)) return [3 /*break*/, 8];
                    if (!(similar_result.crew[j].job === "Director")) return [3 /*break*/, 7];
                    movie_id_2 = similar_result.crew[j].id;
                    return [4 /*yield*/, get_movie(movie_id_2)];
                case 6:
                    movie = _a.sent();
                    directed_movies.push(movie);
                    _a.label = 7;
                case 7:
                    j++;
                    return [3 /*break*/, 5];
                case 8:
                    i++;
                    return [3 /*break*/, 2];
                case 9:
                    for (m = 0; m < directed_movies.length; m++) {
                        similar_array.push(directed_movies[m]);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function find_most_popular(movies) {
    var low = 0;
    var high = movies.length - 1;
    var highest_rating = low;
    for (var i = low + 1; i <= high; i++) {
        if (movies[i].popularity > movies[highest_rating].popularity) {
            highest_rating = i;
        }
    }
    return highest_rating;
}
function movie_member(movies, movie) {
    for (var i = 0; i < movies.length; i++) {
        if (movies[i].id === movie.id) {
            return true;
        }
    }
    return false;
}
function most_popular_movies(movies) {
    var reccomended = [];
    for (var i = 0; reccomended.length < 5; i++) {
        var highest_index = find_most_popular(movies);
        if (!movie_member(reccomended, movies[highest_index])) {
            reccomended.push(movies[highest_index]);
        }
        movies.splice(highest_index, 1);
    }
    return reccomended;
}
function remove_input(movies) {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get_id(userInput)];
                case 1:
                    id = _a.sent();
                    return [2 /*return*/, movies.filter(function (x) { return x.id != id; })];
            }
        });
    });
}
var similar_array = [];
function main(movie) {
    return __awaiter(this, void 0, void 0, function () {
        var id, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, get_id(movie)];
                case 1:
                    id = _a.sent();
                    return [4 /*yield*/, similar_director(id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, similar_actor(id)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, similar_genre(id)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, remove_input(similar_array)];
                case 5:
                    similar_array = _a.sent();
                    return [2 /*return*/, most_popular_movies(similar_array)];
                case 6:
                    error_1 = _a.sent();
                    throw error_1;
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
var prompt = PromptSync();
var userInput = prompt('Enter a movie title: ');
main(userInput)
    .then(function (result) { return console.log(result); })
    .catch(function (err) { return console.error(err); });
