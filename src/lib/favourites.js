import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

const toggleFavourite = (selectedSong) => {
    const favourite = JSON.parse(localStorage.getItem('favourite')) || [];
    const index = favourite.findIndex((song) => song.id === selectedSong.id);
    if (index === -1) {
        favourite.push(selectedSong);
        localStorage.setItem('favourite', JSON.stringify(favourite));
        notyf.success('Added to favourites');
    } else {
        favourite.splice(index, 1);
        localStorage.setItem('favourite', JSON.stringify(favourite));
        notyf.error('Removed from favourites');
    }
}

export { toggleFavourite }