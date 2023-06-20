/* eslint-disable react/prop-types */
import confetti from "canvas-confetti";
import { useState } from "react";
import { Square } from "./components/Square";

import { TURNS } from "./constans";
import { checkWinner, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";


export const App=()=>{
const [board, setBoard] = useState(()=>{
  const boardFromStorage= localStorage.getItem("board")

  return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
})

const [turn, setTurn] = useState(()=>{
  const turnFromStorage= localStorage.getItem("turn")
  return turnFromStorage ?? TURNS.X;
})

const [winner, setWinner] = useState(null)

const resetGame=()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    localStorage.removeItem("board")
    localStorage.removeItem("turn")
}



const updateBoard=(index)=>{
    if(board[index] || winner)return

    const newBoard= [...board]
    newBoard[index]=turn
    setBoard(newBoard)

    const newTurn = (turn === TURNS.X) ? TURNS.O : TURNS.X
    setTurn(newTurn)

    localStorage.setItem("board",JSON.stringify(newBoard))
    localStorage.setItem("turn",newTurn)

    const newWinner= checkWinner(newBoard)

    if(newWinner){
        confetti()
        setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
        setWinner(false)
    }
}

    return (
      <main className="board">
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}>Empezar de nuevo</button>
        <section className="game">
          {board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            );
          })}
        </section>

        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <WinnerModal winner={winner} resetGame={resetGame}/>
      </main>
    );
}