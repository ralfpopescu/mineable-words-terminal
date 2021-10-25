import mineWord from "./mine-word"

const mine = () => {
    let found;
    while(!found) {
        found = mineWord();
    }
}

mine();