const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const TMDB_URL = "https://api.themoviedb.org/3";
const BMDB_URL = "https://bestmoviesneo4j.azurewebsites.net";

app.use(cors());

app.get('/movie/:id', async (req, res) => {
    const response = await axios.get(
        `${TMDB_URL}/movie/${req.params.id}?api_key=${process.env.TMDB_KEY}&language=en-US`
    );

    res.json(response.data);
});

app.get('/genre', async (req, res) => {
    const response = await axios.get(
        `${TMDB_URL}/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
    );

    res.json(response.data);
});

app.get('/popular', async (req, res) => {
    const response = await axios.get(
        `${TMDB_URL}/movie/popular?api_key=${process.env.TMDB_KEY}&include_adult=false`
    );

    res.json(response.data);
});

app.get('/search/:title', async (req, res) => {
    const response = await axios.get(
        `${TMDB_URL}/search/movie?api_key=${process.env.TMDB_KEY}&query=${req.params.title}&include_adult=false`
    );

    res.json(response.data);
});

app.get('/credits/:id', async (req, res) => {
    const response = await axios.get(
        `${TMDB_URL}/movie/${req.params.id}/credits?api_key=${process.env.TMDB_KEY}&language=en-US`
    );

    res.json(response.data);
});

app.get('/user/:id', async (req, res) => {
    const response = await axios.get(
        `${BMDB_URL}/user/${req.params.id}`
    );

    res.json(response.data);
});

app.put('/user/:id/:name', async(req, res) => {
    const response = await axios.put(
        `${BMDB_URL}/user?username=${req.params.name}&userid=${req.params.id}`
    );

    res.json(response.data);
})

app.get('/toplist/:id', async (req, res) => {
    const response = await axios.get(
        `${BMDB_URL}/user/${req.params.id}/toplist`
    );

    res.json(response.data);
});

app.put('/toplist/:id/:movieId', async(req, res) => {
    console.log(`${BMDB_URL}/user/${req.params.id}/toplist?tmdbid=${req.params.movieId}&number=1`);

    const response = await axios.put(
        `${BMDB_URL}/user/${req.params.id}/toplist?tmdbid=${req.params.movieId}&number=1`
    );

    res.json(response.data);
})


app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
