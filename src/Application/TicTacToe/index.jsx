import React, { useState, useEffect } from "react";
import Board from "./Components/Board";

const TicTactToe = () => {
  // Current Mark
  const [xMark, setxMark] = useState("");

  // Previous Mark
  const [prevMark, setPrevMark] = useState("");

  // Board Logic
  const [boardLogic, setBoardLogic] = useState([
    "", "", "",
    "", "", "",
    "", "", "",
  ]);

  const [history, setHistory] = useState();

  // Status
  const [status, setStatus] = useState(`Next player: ${xMark || 'X'}`);

  // Game Over
  const [isGameOver, setIsGameOver] = useState(false);

  const validateBoard = () => {
    const isWin =
      // Vertical
      [boardLogic[0], boardLogic[3], boardLogic[6]].every(item => item === prevMark) 
      ||
      [boardLogic[1], boardLogic[4], boardLogic[7]].every(item => item === prevMark)
      ||
      [boardLogic[2], boardLogic[5], boardLogic[8]].every(item => item === prevMark)
      ||
      [boardLogic[0], boardLogic[1], boardLogic[2]].every(item => item === prevMark)
      ||
      [boardLogic[3], boardLogic[4], boardLogic[5]].every(item => item === prevMark)
      ||
      [boardLogic[6], boardLogic[7], boardLogic[8]].every(item => item === prevMark)
      ||
      [boardLogic[0], boardLogic[4], boardLogic[8]].every(item => item === prevMark)
      ||
      [boardLogic[2], boardLogic[4], boardLogic[6]].every(item => item === prevMark)

    if (isWin) {
      setStatus(`Player ${prevMark} win!`);
      setIsGameOver(true);
    }else{
      setStatus(`Next player: ${xMark || 'X'}`)
    }
  };

  useEffect(() => {
    if (prevMark) {      
      validateBoard();
    }
  }, [prevMark]);

  useEffect(() => {
    if(history && history.board){
      setHistory(prev => {
        return {
          ...prev,
          board: [...prev.board, ...boardLogic],
          status
        }
      })
    }else{
      setHistory(prev => {
        return {
          ...prev,
          board: boardLogic,
          status
        }
      })
    }
  }, [boardLogic]);

  return (
    <div>
      <h1>Tic Tact Toe</h1>
      <Board
        value={xMark}
        setxMark={setxMark}
        setPrevMark={setPrevMark}
        updateBoard={setBoardLogic}
        status={status}
        isGameOver={isGameOver}
        history={history}
      />
    </div>
  );
};

export default TicTactToe;
