import "./Board.css"

// eslint-disable-next-line react/prop-types
function Square({value, onSquareClick, highlight}) {
    return(
        <button className={"square"} onClick={onSquareClick} style={
            {
                color: (value === 'X' ? "#F54D62" : "#87E43A"),
                backgroundColor: highlight ? "rgba(255, 240, 107, 50)" : "#FFFFFF"
            }}>
            {value}
        </button>
    );
}

// eslint-disable-next-line react/prop-types
export default function Board({turnX, squares, onPlay}) {
    const winnerLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ];

    const winnerInfo = calculateWinner(squares)
    const winner = winnerInfo ? winnerInfo.winner : null;
    const winningLine = winnerInfo ? winnerInfo.line : [];

    let status;
    if (winner === 'T') {
        status = "It's a tie!";
    }
    else if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (turnX ? 'X' : 'O');
    }

    const board = [];
    for (let i = 0; i < 3; i++) {
        board.push(<div className={"board-row"} /> )
        for (let j = 0; j < 3; j++) {
            let idx = i * 3 + j;
            board.push(
                <Square value={squares[idx]}
                               onSquareClick={() => handleSquareClick(idx)}
                        highlight={winningLine.includes(idx)}
                />
            )
        }
    }

    return (
        <>
            <div className={"status"}>{status}</div>
            <div className={"board"}>
                {board}
            </div>
        </>
    );


    function handleSquareClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }

        // eslint-disable-next-line react/prop-types
        const squaresCopy = squares.slice();
        squaresCopy[i] = (turnX) ? 'X' : 'O';
        onPlay(squaresCopy);
    }

    function calculateWinner(squares) {
        for (let i = 0; i < winnerLines.length; i++) {
            const [idx1, idx2, idx3] = winnerLines[i];
            if (squares[idx1] && (squares[idx1] === squares[idx2]) && (squares[idx2] === squares[idx3])) {
                return {winner: squares[idx1], line: winnerLines[i]}
            }
        }

        for (let square of squares) {
            if (!square)
                return null;
        }
        return {winner: 'T', line: []};
    }
}