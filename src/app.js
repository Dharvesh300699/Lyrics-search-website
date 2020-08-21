const path = require('path');
const express = require('express');
const { searchSongs, getLyrics } = require('../src/utils/searchSongs');

const app = express();
const port = process.env.PORT || 3000;

//Define path for express configuration
const publicDirectoryPath = path.join(__dirname, '../public');

//set up static directory to be served
app.use(express.static(publicDirectoryPath));
app.use(express.json());

app.get('/songs', (req, res) => {
    searchSongs(req.query.searchTerm, (error, result) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        res.send(result);

    })
})

app.get('/lyrics', (req, res) => {
    getLyrics(req.query.artist, req.query.title, (error, result) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        res.send(result);
    })
})

app.get('*', (req, res) => {
    res.send('My 404 page!');
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})