const addToQueue = (song) => {
    let queue = JSON.parse(localStorage.getItem('queue')) || [];
    queue.push(song);
    localStorage.setItem('queue', JSON.stringify(queue));
}

const addToTopQueue = (song) => {
    let queue = JSON.parse(localStorage.getItem('queue')) || [];
    let index = localStorage.getItem('queueIndex') || 0;
    queue.splice(index, 0, song);
    localStorage.setItem('queue', JSON.stringify(queue));
}

const getNextSong = () => {
    let index = localStorage.getItem('queueIndex') || 0;
    let queue = JSON.parse(localStorage.getItem('queue')) || [];
    if (index < queue.length) {
        index++;
        localStorage.setItem('queueIndex', index);
        return queue[index];
    }
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
    return null;
}

export { addToQueue, addToTopQueue, getNextSong, getPreviousSong }