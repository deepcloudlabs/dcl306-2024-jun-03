import {createSecret} from "./utility";
import {createContext, useReducer} from "react";
import MastermindStateless from "./components/mastermind/mastermind-stateless";
import GameReducer from "./reducer/game-reducer";
import StatisticsReducer from "./reducer/statistics-reducer";
import PreferencesReducer from "./reducer/preferences-reducer";

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
export const statisticsInitialState = {
    wins: 0,
    loses: 0,
    totalMoveTimes: 0,
    averageMoveTime: 0,
    totalMoves: 0
};
export const preferencesInitialState = {
    nickname: "",
    email: "",
    fullname: "",
    avatar: "",
    theme: "dark"
};

export const GameContext = createContext(gameInitialState);
export const StatisticsContext = createContext(statisticsInitialState);
export const PreferencesContext = createContext(preferencesInitialState);
export default function MastermindProvider() {
    const [game, dispatchGame] = useReducer(GameReducer, gameInitialState);
    const [stats, dispatchStats] = useReducer(StatisticsReducer, statisticsInitialState);
    const [prefs, dispatchPrefs] = useReducer(PreferencesReducer, preferencesInitialState);
    return (
        <GameContext.Provider value={{game, dispatchGame}}>
            <StatisticsContext.Provider value={{stats, dispatchStats}}>
                <PreferencesContext.Provider value={{prefs, dispatchPrefs}}>
                    <MastermindStateless></MastermindStateless>
                </PreferencesContext.Provider>
            </StatisticsContext.Provider>
        </GameContext.Provider>
    );
}
