import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

const addToQueue = (selectedSong, songs) => {
    localStorage.removeItem('queue');
    localStorage.removeItem('queueIndex');
    const queue = [];
    songs.forEach((song) => queue.push(song));
    const index = queue.findIndex((song) => song.id === selectedSong.id);

    localStorage.setItem('queue', JSON.stringify(queue));
    localStorage.setItem('queueIndex', index);
}

const getNextSong = () => {
    let index = localStorage.getItem('queueIndex') || 0;
    let queue = JSON.parse(localStorage.getItem('queue')) || [];
    if (index < queue.length) {
        index++;
        localStorage.setItem('queueIndex', index);
        return queue[index];
    }
    notyf.error('End of queue, start browsing for more songs!');
    return null;
}

const getPreviousSong = () => {
    let index = localStorage.getItem('queueIndex') || 0;
    let queue = JSON.parse(localStorage.getItem('queue')) || [];
    if (index > 0) {
        index--;
        localStorage.setItem('queueIndex', index);
        return queue[index];
    }
    notyf.error('No previous song in queue');
    return null;
}

export { addToQueue, getNextSong, getPreviousSong }