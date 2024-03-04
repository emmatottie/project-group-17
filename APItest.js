"use strict";
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjI4ODQ4NjRhNjc1Mjk5NWVlMmUxNWViZjM0MTgyNCIsInN1YiI6IjY1Y2UwY2NlZWZjZWE5MDE3Y2FhYzJkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zKr06f_GR1RioPGjmxIi6IRd8sRgq3s8D2jMeUNzYtU'
    }
};
fetch('https://api.themoviedb.org/3/movie/120?language=en-US', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
