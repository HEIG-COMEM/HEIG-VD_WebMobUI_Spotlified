
import './elements/artists-cover.js'
import './elements/song-item.js'

import { displaySection, activateLink } from './helpers.js'

import { displayArtists } from './sections/artists.js'
import { displayArtistSongs, displayFavourite, displaySearchSongs, displayLyrics } from './sections/songs.js'

document.querySelector('#search-trigger').addEventListener('click', () => document.querySelector('#search-input').classList.toggle('active'));

document.querySelector('#search-input').addEventListener('input', (event) => {
    window.location.hash = `#search-${event.target.value}`;
});

const routeur = () => {
    const hash = window.location.hash || '#home'
    const hashs = hash.split('-')

    // Colorie le lien
    activateLink(hashs[0])

    switch (hashs[0]) {
        case '#songs':
            if (!hashs[1]) return displaySection('home')
            displaySection('lyrics')
            displayLyrics(hashs[1])
            break;

        case '#favorites':
            displaySection('list')
            displayFavourite()
            break;

        case '#search':
            if (!hashs[1]) return displaySection('home')
            displaySection('list')
            displaySearchSongs(hashs[1]);
            break;

        case '#artists':
            if (hashs[1]) {
                displaySection('list')
                displayArtistSongs(hashs[1])
            }
            else {
                displaySection('artists')
                displayArtists()
            }
            break;

        case '#player':
            displaySection('player')
            break;

        case '#home':
            displaySection('home')
            break;
    }
}

// On veut être averti des changements
window.addEventListener('hashchange', routeur)

// on exécute une première fois au chargement de la page pour afficher la bonne section
routeur()


// Service Worker
navigator.serviceWorker.register(
    new URL('workerCacheFetched.js', import.meta.url)
);