import { list } from "../lib/list"


type movie = {title: string,
              genre: Array<string>,
              actors: Array<string>,
              director: Array<string>,
              rating: number
}
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
    if (movie_api) {
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