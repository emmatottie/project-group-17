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
// Import necessary modules for testing
var therealdeal_1 = require("./therealdeal"); // Replace './yourMovieFunctions' with the correct path to your functions file
// Mock data for testing
var mockMovieId = 12345; // Mock movie ID
var mockMovieDetails = {
    title: "Mock Movie",
    actors: ["Actor 1", "Actor 2"],
    director: ["Director 1"],
    genres: [{ id: 1, name: "Genre 1" }, { id: 2, name: "Genre 2" }],
    rating: 7.5
};
var mockApiResponse = { results: [{ id: mockMovieId }] }; // Mock API response
// Mock fetch function for testing
jest.mock('node-fetch', function () { return ({
    __esModule: true,
    default: jest.fn().mockImplementation(function (url, options) {
        if (url.includes('/search/movie')) {
            return Promise.resolve({ json: function () { return Promise.resolve(mockApiResponse); } });
        }
        else {
            return Promise.resolve({ json: function () { return Promise.resolve(mockMovieDetails); } });
        }
    })
}); });
describe('get_id function', function () {
    it('should return the correct movie ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var movieId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, therealdeal_1.get_id)("Mock Movie")];
                case 1:
                    movieId = _a.sent();
                    expect(movieId).toBe(mockMovieId);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('get_movie function', function () {
    it('should return the correct movie details', function () { return __awaiter(void 0, void 0, void 0, function () {
        var movie;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, therealdeal_1.get_movie)(mockMovieId)];
                case 1:
                    movie = _a.sent();
                    expect(movie).toEqual(mockMovieDetails);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('get_movie_from_title function', function () {
    it('should return the correct movie details from title', function () { return __awaiter(void 0, void 0, void 0, function () {
        var movie;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, therealdeal_1.get_movie_from_title)("Mock Movie")];
                case 1:
                    movie = _a.sent();
                    expect(movie).toEqual(mockMovieDetails);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw an error if movie title is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect((0, therealdeal_1.get_movie_from_title)("Non-existent Movie")).rejects.toThrowError()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
