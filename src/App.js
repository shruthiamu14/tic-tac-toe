import React, {useState} from "react";

import './App.css';

import {Board} from "./components/Board"
import { ScoreBoard } from "./components/ScoreBoard"
import { ResetButton } from "./components/ResetButton"

function App() {

  const WIN_CONDITIONS = [
    [0,1,2], // top row
    [3,4,5], // middle row
    [6,7,8], // bottom row
    [0,3,6], // left column
    [1,4,7], // middle column
    [2,5,8], // right column
    [0,4,8], // top left to bottom right diagonal
    [2,4,6] // top right to bottom left diagonal
  ]
  
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xplaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({xScore: 0, oScore: 0});
  const [gameOver, setGameOver] = useState(false);

  const handleBoxClick = (boxIdx) => {
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xplaying ? "X" : "O";
      }else{
        return value;
      }
      })

    const winner =  checkWinner(updatedBoard);
    if (winner) {
      if (winner === "O") {
        let {oScore} = scores;
        oScore += 1;
        setScores({...scores,oScore})
      }else{
        let {xScore} = scores;
        xScore += 1;
        setScores({...scores,xScore})
      }
    }   



      setBoard(updatedBoard);

      setXPlaying(!xplaying);
  }

   const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  }

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setGameOver(false);
  }

  return (
    <div className="App">

      <ScoreBoard scores = {scores} xplaying={xplaying}/>
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard}/>
    </div>
  );
}

export default App;  
