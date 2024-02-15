// Define a type for movie details
type MovieDetails = {
    ranking: number;
    actors: string[];
    director: string;
    // Add more attributes as needed
}

// Define a type for genre hashtable
type GenreHashtable = {
    [key: string]: MovieDetails[];
}

// Function to initialize genre hashtables
function initializeGenreHashtables(): GenreHashtable {
    return {
        horror: [],
        comedy: [],
        romance: [],
        child: []
    };
}

// Function to add a movie to a genre hashtable
function addMovieToGenre(genre: string, title: string, details: MovieDetails, genreHashtables: GenreHashtable) {
    if (genreHashtables[genre]) {
        genreHashtables[genre].push({ [title]: details });
    } else {
        console.log(`Genre does not exist.`);
    }
}

// Function to search for movies in a genre hashtable
function searchMovieInGenre(genre: string, title: string, genreHashtables: GenreHashtable): MovieDetails | null {
    const movies = genreHashtables[genre];
    if (movies) {
        for (const movie of movies) {
            if (Object.keys(movie)[0] === title) {
                return movie[title];
            }
        }
    }
    return null;
}

// Example usage
const genreHashtables = initializeGenreHashtables();

// Add movies to genre hashtables
addMovieToGenre('comedy', 'The Hangover', { ranking: 8.1, actors: ['Bradley Cooper', 'Ed Helms', 'Zach Galifianakis'], director: 'Todd Phillips' }, genreHashtables);
addMovieToGenre('comedy', 'Superbad', { ranking: 7.6, actors: ['Jonah Hill', 'Michael Cera', 'Christopher Mintz-Plasse'], director: 'Greg Mottola' }, genreHashtables);
addMovieToGenre('horror', 'The Shining', { ranking: 8.4, actors: ['Jack Nicholson', 'Shelley Duvall', 'Danny Lloyd'], director: 'Stanley Kubrick' }, genreHashtables);
addMovieToGenre('horror', 'Get Out', { ranking: 7.7, actors: ['Daniel Kaluuya', 'Allison Williams', 'Bradley Whitford'], director: 'Jordan Peele' }, genreHashtables);
addMovieToGenre('romance', 'The Notebook', { ranking: 7.8, actors: ['Ryan Gosling', 'Rachel McAdams', 'James Garner'], director: 'Nick Cassavetes' }, genreHashtables);
addMovieToGenre('romance', 'Pride and Prejudice', { ranking: 7.8, actors: ['Keira Knightley', 'Matthew Macfadyen', 'Brenda Blethyn'], director: 'Joe Wright' }, genreHashtables);
