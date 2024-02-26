import { loadArtists, loadSongs } from './api.js'

const artistList = document.querySelector('.artist-list')

const afficherArtistes = () => loadArtists().then((artists) => {
    artistList.replaceChildren()
    artists.forEach((artist) => {
        const newElement = document.createElement('artist-cover')
        newElement.setAttribute('id', artist.id)
        newElement.setAttribute('name', artist.name)
        newElement.setAttribute('cover', artist.image_url)
        artistList.appendChild(newElement)
    });
});

const songsList = document.querySelector('#list-section div')

const afficheSons = (id) => loadSongs(id).then((songs) => {
    songsList.innerHTML = ''
    songs.forEach((song) => {
        const newSong = document.createElement('song-element')
        newSong.setAttribute('title', song.title)
        songsList.appendChild(newSong)
    });
    document.querySelector('#list-section h4').textContent = `Artistes > ${songs.at(0).artist.name}`;
    document.querySelector('#list-section').classList.add('active');
});

const afficherSection = () => {
    const hash = window.location.hash || '#home'

    const laSectionActive = document.querySelector('section.active')
    laSectionActive?.classList.remove('active')

    const laSection = document.querySelector(`${hash}-section`)
    laSection?.classList.add('active')

    // Same same, avec les liens
    const leLienActif = document.querySelector(`nav a.active`)
    leLienActif?.classList.remove('active')

    const lien = document.querySelector(`nav a[href="${hash}"]`)
    lien?.classList.add('active')

    const splittedHash = hash.split('-');
    switch (splittedHash.at(0)) {
        case '#home':
            break;
        case '#artists':
            (splittedHash.at(1)) ? afficheSons(splittedHash.at(1)) : afficherArtistes();
            break;
        case '#search':
            break;
        case '#favorites':
            break;
    }
}

// On veut être averti des changements
window.addEventListener("hashchange", afficherSection)

// on exécute une première fois au chargement de la page pour afficher la bonne section
afficherSection()