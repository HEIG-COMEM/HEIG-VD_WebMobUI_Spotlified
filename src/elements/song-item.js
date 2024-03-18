const playClick = new CustomEvent('play_click');
const favoriteClick = new CustomEvent('favorite_click');

class SongItem extends HTMLElement {

  static get observedAttributes() {
    return ['favourite'];
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  };

  render() {
    const icon = this.getAttribute('favourite') === 'true' ? 'favorite' : 'favorite_border';
    this.innerHTML = `<a href="#">
    <div class="list-item-title">${this.getAttribute('title')}</div>
    <div class="list-item-actions">
      <button type="button" class="icon-button favorite-button">
        <span class="material-icons">${icon}</span>
      </button>
      <button type="button" class="icon-button play-button">
        <span class="material-icons">play_arrow</span>
      </button>
    </div>
  </a>`;
    this.song = JSON.parse(this.getAttribute('song'));

    this.querySelector(".play-button").addEventListener('click', (e) => {
      e.preventDefault();
      this.dispatchEvent(playClick);
    });

    this.querySelector(".favorite-button").addEventListener('click', (e) => {
      e.preventDefault();
      this.dispatchEvent(favoriteClick);
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'favourite') {
      this.render();
    }
  }
}
customElements.define('song-item', SongItem)
