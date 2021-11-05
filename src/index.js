import "@babel/polyfill";

import React from "react";// cet import est a faire sur chaques fichiés js en réact
import ReactDOM from "react-dom";
import SelectStep from './SelectStep';
import ScoreBoard from './ScoreBoard';
import RoundResult from "./RoundResult";
import axios from 'axios';

export const PIERRE = "p"; //constantes des coups possible à jouer
export const FEUILLE = "f";
export const CISEAU = "c";
const MANCHES_VICTORIEUSES = 3;

export const GAME_STATES = { //constantes possibilités d'états de manche
    WAITING: 0,
    WIN: 1,
    LOSE: 2,
    TIE: 3,
    END_WIN: 4,
    END_LOSE: 5
}

const App = () => { //composant principal
    /*
    Use state initialise un point de depart (ici à 0). 
    Les usestate sont appelés “hook” qui sont des états du composant (ici App)
    A ce stade, useState renvoit 0 a scoreJoueuse, on ne se sert pas encore de setScore joueuse puisque setscore joueuse mettra a jour le prochain score.
    A chaque modification de score, setScoreJoueuse se met à jour et renvoit la nouvelle valeur a usestate, et ensuite usestate met à jour le score. Et donc l’état de depart change (ce n’est plus 0)
    en fonction du score du moment de la joueuse.
    */

    const [scoreJoueuse, setScoreJoueuse] = React.useState(0); //constante d'état Joueuse
    const [scoreOrdi, setScoreOrdi] = React.useState(0); //constante d'état Ordi
    const [gameState, setGameState] = React.useState(GAME_STATES.WAITING); //constante d'état manche voir l.14

    function resetRound () {
        if (gameState === GAME_STATES.END_LOSE 
            || gameState === GAME_STATES.END_WIN) { //si la manche est strictement différente de en attente,
            setScoreJoueuse(0)
            setScoreOrdi(0)       
        }
    
        if (gameState !== GAME_STATES.WAITING) {
            setGameState(GAME_STATES.WAITING);
        }
    }
    
    async function jouer(coup) {
        let response = await axios.post("/api/jouer", {coup}); // Axios sert à envoyer des requêtes HTTP de manière plus simple.
        let resultatManche = response.data;
    
        if (resultatManche === "GAGNE") {
            // la joueuse a gagné
            let nouveauScore = scoreJoueuse + 1;
                setScoreJoueuse(nouveauScore); // voir RoundResult.js
            if (nouveauScore === MANCHES_VICTORIEUSES) {
                setGameState(GAME_STATES.END_WIN)
            } else {
                setGameState(GAME_STATES.WIN);
            }
        } else if (resultatManche === "PERDU") {
            let nouveauScore = scoreOrdi + 1;
            setScoreOrdi(nouveauScore); // voir RoundResult.js
            
            if (nouveauScore === MANCHES_VICTORIEUSES) {
                setGameState(GAME_STATES.END_LOSE)
            } else {
                setGameState(GAME_STATES.LOSE)
            }
        }else{
            setGameState(GAME_STATES.TIE) // voir RoundResult.js
        }
    }

    //blockGame, contient tout ce qui s'affiche pendant la partie
    const blockGame = (gameState === GAME_STATES.WAITING) ?
        <SelectStep jouer={jouer} /> :
        <RoundResult gameState={gameState}/>;

    return (
        <div onClick={resetRound}> {/*voir l.56*/}
            <style jsx>{`
                div {
                    background-color: #D3CFFF;
                    height: 100%;
                }
            `}
            </style>
            <ScoreBoard scoreJoueuse={scoreJoueuse} scoreOrdi={scoreOrdi} />
            {/*Si le jeu est terminé j'affiche la victoire, sinon j'affiche la ligne 133*/}
            {blockGame}
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById("react-app"));