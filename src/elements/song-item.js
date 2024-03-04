import { displaySection, activateLink } from '../helpers.js';
import { playSong } from '../sections/player.js';
import { addToQueue, addToTopQueue } from '../lib/queue.js';

class SongItem extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<a href="#">
    <div class="list-item-title">${this.getAttribute('title')}</div>
    <div class="list-item-actions">
      <button type="button" class="icon-button favorite-button ">
        <span class="material-icons">playlist_add</span>
      </button>
      <button type="button" class="icon-button play-button">
        <span class="material-icons">play_arrow</span>
      </button>
    </div>
  </a>`;
    this.song = JSON.parse(this.getAttribute('song'));

    this.querySelector(".play-button").addEventListener('click', (e) => {
      e.preventDefault();
      addToTopQueue(this.song);
      playSong(this.song);
      displaySection('player');
      activateLink('#player');
    });

    this.querySelector(".favorite-button").addEventListener('click', (e) => {
      e.preventDefault();
      addToQueue(this.song);
    });
  }
}
customElements.define('song-item', SongItem)
