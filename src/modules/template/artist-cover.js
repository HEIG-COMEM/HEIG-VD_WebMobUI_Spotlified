// Elements
class ArtistCover extends HTMLElement {
    connectedCallback() {
        const newContent = document.querySelector('#artist-list-item-template')
        const newElement = newContent.content.cloneNode(true)
        newElement.querySelector('img').src = this.getAttribute('cover')
        newElement.querySelector('div').innerText = this.getAttribute('name')
        newElement.querySelector('a').href = `#artists-${this.getAttribute('id')}`
        this.replaceChildren(newElement)
    }
}
customElements.define("artist-cover", ArtistCover)