import {createSecret, evaluateMove} from "../utility";

const initializeGame = (game) => {
    game.maxNumberOfMoves = 10 + 2 * game.level - 3;
    game.duration = (60 + 10 * (game.level - 3));
    game.numberOfMoves = 0;
    game.moves = [];
    game.status = "PLAYING";
    game.secret = createSecret(game.level);
}

export default function GameReducer(game, action) {
    const newGame = {...game};
    switch (action.type) {
        case "PLAY":
            if (newGame.guess === newGame.secret) {
                if (newGame.level === 10) {
                    newGame.status = "PLAYER_WINS";
                    return newGame;
                }
                newGame.level = newGame.level + 1;
                newGame.lives = newGame.lives + 1;
                newGame.duration = 60;
                initializeGame(newGame);
                return newGame;
            }
            newGame.numberOfMoves = newGame.numberOfMoves + 1;
            if (newGame.numberOfMoves >= newGame.maxNumberOfMoves) {
                if (newGame.lives === 1) {
                    newGame.status = "GAME_OVER";
                    return newGame;
                }
                newGame.lives = newGame.lives - 1;
                initializeGame(newGame);
            } else {
                newGame.moves = [...newGame.moves, evaluateMove(newGame.secret, newGame.guess)];
            }
            break;
        case "GUESS_CHANGED":
            newGame.guess = Number(action.event.target.value);
            break;
        case "TIMER_TICK":
            if (newGame.duration <= 0) {
                if (newGame.lives === 1) {
                    newGame.status = "GAME_OVER"
                    return newGame;
                }
                newGame.lives --;
                initializeGame(newGame);
                return newGame;
            }
            newGame.duration--;
            break;
            default:
            throw new Error("Unrecognized action type");
    }
    return newGame;
}
