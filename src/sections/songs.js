import { loadSongs, searchSongs } from '../api.js';
import { playSong } from '../sections/player.js';
import { addToQueue } from '../lib/queue.js';
import { toggleFavourite } from '../lib/favourites.js';

const listSectionTitle = document.querySelector('#list-section h4')

const buildSongsItems = (songs) => {
    const songList = document.querySelector('.list')

    songList.innerHTML = ''

    songs.forEach((song) => {
        const newElement = document.createElement('song-item')
        newElement.setAttribute('title', song.title)

        newElement.addEventListener('play_click', () => {
            addToQueue(song, songs);
            playSong(song);
        });

        newElement.addEventListener('favorite_click', () => {
            toggleFavourite(song);
        });

        songList.appendChild(newElement)
    })
}

const displayArtistSongs = (id) => {
    loadSongs(id).then((songs) => {
        listSectionTitle.innerHTML = `Artistes > ${songs[0].artist.name}`
        buildSongsItems(songs);
    })
}

const displaySearchSongs = (query) => {
    searchSongs(query).then((songs) => {
        listSectionTitle.innerHTML = `Résultat de la recherche pour "${query}"`;
        buildSongsItems(songs);
    })
}

export { displayArtistSongs, displaySearchSongs }
