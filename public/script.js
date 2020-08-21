const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');

// Search by song or artist
async function searchSongs(searchTerm) {
    result.innerHTML = '<h2>Loading...</h2>';
    const response = await fetch(`/songs?searchTerm=${searchTerm}`);
    const data = await response.json();

    showData(data);
}

// Show song and artist in DOM
function showData(data) {
    search.value = '';
    if (data.error) {
        result.innerText = data.error;
        return;
    }
    result.innerHTML = `
    <ul class="songs">
        ${data.data.map(song => `<li>
        <span><strong>${song.artist}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`).join('')}
    </ul>
    `;
}

// Get lyrics for song
async function getLyrics(artist, title) {
    const response = await fetch(`/lyrics?artist=${artist}&title=${title}`);
    const data = await response.json();

    if(data.error) {
        result.innerText = 'Lyrics not found! Please try some other search terms';
        return
    }

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    result.innerHTML = `<h2><strong>${artist}</strong> - ${title}</h2>
    <span>${lyrics}</span>`;
}

//Event Listeners
form.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = search.value.trim();

    if (!searchTerm) {
        alert('Please type in a search term!');
    } else {
        searchSongs(searchTerm);
    }
})

result.addEventListener('click', e => {
    const clickedEl = e.target;

    if(clickedEl.tagName === 'BUTTON') {
        const artist = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute('data-songtitle');

        getLyrics(artist, songTitle);
    }
})