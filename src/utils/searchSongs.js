const request = require('request');

const searchSongs = (searchTerm, callback) => {
    let songTitleArray = [];
    const url = `https://api.lyrics.ovh/suggest/${encodeURIComponent(searchTerm)}`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to Lyrics search service');
        } else if (response.body.total === 0) {
            callback('Unable to find songs. Please try some other search term!');
        } else {
            response.body.data.forEach(song => {
                songTitleArray.push({
                    artist: song.artist.name,
                    title: song.title
                })
            });
            callback(undefined, {
                data: songTitleArray
            });
        }
    })
}

const getLyrics = (artist, songTitle, callback) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${songTitle}`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to Lyrics search service');
        } else if (response.body.error) {
            callback('Unable to find Lyrics. Please try some other search term!');
        } else {
            callback(undefined, response.body);
        }
    })
}

module.exports = {
    searchSongs,
    getLyrics
}