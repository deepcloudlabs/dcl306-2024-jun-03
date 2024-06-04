import {createSecret} from "./utility";
import {createContext, useReducer} from "react";
import MastermindStateless from "./mastermind-stateless";
import GameReducer from "./reducer/game-reducer";

const initialSecret = createSecret(3);

export const gameInitialState = {
    level: 3,
    lives: 3,
    moves: [],
    status: "PLAYING",
    secret: initialSecret,
    guess: 123,
    duration: 60,
    numberOfMoves: 0,
    maxNumberOfMoves: 10
};
export const GameContext = createContext(gameInitialState);

export default function MastermindProvider() {
    const [game, dispatchGame] = useReducer(GameReducer, gameInitialState);
    return (
        <GameContext.Provider value={{game, dispatchGame}}>
            <MastermindStateless></MastermindStateless>
        </GameContext.Provider>
    );
}
