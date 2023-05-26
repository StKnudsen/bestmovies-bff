const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const TMDB_URL = "https://api.themoviedb.org/3"

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
        // `${TMDB_URL}/movie/${req.params.id}/credits?api_key=${process.env.TMDB_KEY}&language=en-US`
        `https://bestmoviesneo4j.azurewebsites.net/user/${req.params.id}`
    );

    res.json(response.data);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
