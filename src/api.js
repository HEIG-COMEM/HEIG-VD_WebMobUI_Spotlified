
// Fetch

const BASE_URL = 'https://webmob-ui-22-spotlified.herokuapp.com'

const loadJson = (url) => fetch(url).then((response) => response.json())

const loadArtists = () => loadJson(`${BASE_URL}/api/artists`)

const loadSongs = (id) => loadJson(`${BASE_URL}/api/artists/${id}/songs`)

const loadSongsLyrics = (id) => loadJson(`${BASE_URL}/api/songs/${id}`)

const searchSongs = (query) => loadJson(`${BASE_URL}/api/songs/search/${encodeURIComponent(query)}`)

export { loadArtists, loadSongs, searchSongs, loadSongsLyrics }
