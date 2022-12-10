import React, { useState, useEffect } from "react";
import Board from "./Components/Board";

const TicTactToe = () => {
  // Current Mark
  const [xMark, setxMark] = useState("");

  // Previous Mark
  const [prevMark, setPrevMark] = useState("");

  // Board Logic
  const [boardLogic, setBoardLogic] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [history, setHistory] = useState({
    count: 0,
    board: undefined,
    status: '',
    selectedBoard: undefined
  });

  // Status
  const [status, setStatus] = useState();

  // Game Over
  const [isGameOver, setIsGameOver] = useState(false);

  const validateBoard = () => {
    const isWin =
      // Vertical
      [boardLogic[0][0], boardLogic[1][0], boardLogic[2][0]].every(
        (item) => item === prevMark
      ) ||
      [boardLogic[0][1], boardLogic[1][1], boardLogic[2][1]].every(
        (item) => item === prevMark
      ) ||
      [boardLogic[0][2], boardLogic[1][2], boardLogic[2][2]].every(
        (item) => item === prevMark
      ) ||
      // Horizontal
      [boardLogic[0][0], boardLogic[0][1], boardLogic[0][2]].every(
        (item) => item === prevMark
      ) ||
      [boardLogic[1][0], boardLogic[1][1], boardLogic[1][2]].every(
        (item) => item === prevMark
      ) ||
      [boardLogic[2][0], boardLogic[2][1], boardLogic[2][2]].every(
        (item) => item === prevMark
      ) ||
      // Diagonal
      [boardLogic[0][0], boardLogic[1][1], boardLogic[2][2]].every(
        (item) => item === prevMark
      ) ||
      [boardLogic[0][2], boardLogic[1][1], boardLogic[2][0]].every(
        (item) => item === prevMark
      );

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
    if(history.board){
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
