import Board from "./Board.jsx"
import "./Game.css"
import {useState} from "react";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const turnX = currentMove % 2 === 0;

    const moves = history.map((squares, move) => {
        let desc;
        if (move > 0) {
            desc = "Jump to move #" + move;
        }
        else {
            desc = "Go to the start";
        }

        if (move !== currentMove) {
            return (
                <li key={move}>
                    <button onClick={() => jumpToNextMove(move)}>{desc}</button>
                </li>
            );
        }
        else {
            return (
                <li key={move}>
                    <div className={"currentMove"}>
                        You are at move #{currentMove}
                    </div>
                </li>
            );
        }
    })


    return (
        <div className={"game"}>
            <div className={"game-board"}>
                <Board turnX={turnX} squares={currentSquares} onPlay={handlePlay} />
            </div>

            <div className={"game-info"}>
                <ol className={"move-history"} start={0}>{moves}</ol>
            </div>
        </div>
    )


    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpToNextMove(nextMove) {
        setCurrentMove(nextMove);
    }
}