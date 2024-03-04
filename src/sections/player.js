import formatTimestamp from "../lib/formatTimestamp";
import * as queue from "../lib/queue";

const audio = document.querySelector('audio');
const durationSlider = document.querySelector('#player-progress-bar')

const playSong = (song) => {
    if (!song) return console.error('No song provided')
    audio.src = song.audio_url

    // Update UI
    document.querySelector('#player-infos-song-title').innerHTML = song.title
    document.querySelector('#player-infos-artist-name').innerHTML = song.artist.name
    document.querySelector('#player-thumbnail img').src = song.artist.image_url

    // reset controls
    durationSlider.value = 0
    document.querySelector("#player-time-current").innerHTML = formatTimestamp(0)

    audio.play()
    document.querySelector('#player-control-play span').innerHTML = 'pause'
}

const togglePlay = () => {
    const playButton = document.querySelector('#player-control-play')
    if (!audio.src) {
        const nextSong = queue.getNextSong()
        if (nextSong) {
            playSong(nextSong);
        }
        return;
    }
    if (audio.paused) {
        audio.play()
        playButton.querySelector('span').innerHTML = 'pause'
    } else {
        audio.pause()
        playButton.querySelector('span').innerHTML = 'play_arrow'
    }
}

const updateMaxDurationSlider = () => {
    durationSlider.max = audio.duration
    document.querySelector("#player-time-duration").innerHTML = formatTimestamp(audio.duration)
}

const updateDurationSlider = () => {
    durationSlider.value = audio.currentTime
    document.querySelector("#player-time-current").innerHTML = formatTimestamp(audio.currentTime)
}

const prevSong = () => {
    playSong(queue.getPreviousSong())
}

const nextSong = () => {
    playSong(queue.getNextSong())
}

document.querySelector('#player-control-play').addEventListener('click', togglePlay)
document.querySelector('#player-control-previous').addEventListener('click', prevSong)
document.querySelector('#player-control-next').addEventListener('click', nextSong)

durationSlider.addEventListener('input', () => audio.currentTime = durationSlider.value)

audio.addEventListener('durationchange', updateMaxDurationSlider)
audio.addEventListener('timeupdate', updateDurationSlider)
audio.addEventListener('ended', nextSong)

export { playSong }