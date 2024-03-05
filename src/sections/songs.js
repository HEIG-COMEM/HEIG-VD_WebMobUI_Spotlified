import { loadSongs } from '../api.js';
import { playSong } from '../sections/player.js';
import { addToQueue } from '../lib/queue.js';
import { toggleFavourite } from '../lib/favourites.js';

const listSectionTitle = document.querySelector('#list-section h4')

const displayArtistSongs = (id) => {
  const songList = document.querySelector('.list')

  loadSongs(id).then((songs) => {
    listSectionTitle.innerHTML = `Artistes > ${songs[0].artist.name}`

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
  })
}
export { displayArtistSongs }
