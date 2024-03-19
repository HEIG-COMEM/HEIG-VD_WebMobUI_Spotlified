import { loadSongs, loadSongsLyrics, searchSongs } from '../api.js';
import { playSong } from '../sections/player.js';
import { addToQueue } from '../lib/queue.js';
import { isFavorite, toggleFavourite } from '../lib/favourites.js';

const listSectionTitle = document.querySelector('#list-section h4')

const buildSongsItems = (songs) => {
    const songList = document.querySelector('.list')

    songList.innerHTML = ''

    songs.forEach((song) => {
        const newElement = document.createElement('song-item')
        newElement.setAttribute('title', song.title)
        newElement.setAttribute('favourite', isFavorite(song))
        newElement.setAttribute('song-id', song.id)

        newElement.addEventListener('play_click', () => {
            addToQueue(song, songs);
            playSong(song);
        });

        newElement.addEventListener('favorite_click', () => {
            toggleFavourite(song);
            newElement.setAttribute('favourite', isFavorite(song));
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

const displayFavourite = () => {
    const favourite = JSON.parse(localStorage.getItem('favourite')) || [];
    listSectionTitle.innerHTML = `Favoris`;
    buildSongsItems(favourite);
}

const displayLyrics = (id) => {
    loadSongsLyrics(id).then((lyrics) => {
        const section = document.querySelector("#lyrics-section");
        section.querySelector('h4').innerHTML = `${lyrics.title}`;
        section.querySelector('h5').innerHTML = `${lyrics.artist.name}`;
        section.querySelector('p').innerHTML = lyrics.lyrics;
    })
}

export { displayArtistSongs, displaySearchSongs, displayFavourite, displayLyrics }
