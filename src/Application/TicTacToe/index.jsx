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

  const [history, setHistory] = useState({
    step: 0,
    selectedBoard: undefined,
    board: [boardLogic]
  });

  // Status
  const [status, setStatus] = useState(`Next player: ${xMark || 'X'}`);

  // Game Over
  const [isGameOver, setIsGameOver] = useState(false);

  const validateBoard = () => {
    const isWin =
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

    if(isWin) setIsGameOver(true)
  };

  // Actions
  const handleHistoryMove = (step) => {
    setHistory(prev => {
      return {
        ...prev,
        step,
        selectedBoard: prev.board.at(step)
      }
    })

    if(history.board.length === step+1)
      setIsGameOver(true)
    else
      setIsGameOver(false)
  }

  useEffect(() => {
    if (!isGameOver) {
      setStatus(`Next player: ${xMark || 'X'}`)
    }else{
      setStatus(`Player ${xMark === 'O'? 'X': 'O'} win!`);
    }
  }, [xMark, isGameOver]);

  useEffect(() => {
    if (prevMark) {
      validateBoard();
    }
    setPrevMark('')
  }, [prevMark]);

  useEffect(() => {
    const { selectedBoard } = history
    if(selectedBoard){
      setBoardLogic(selectedBoard)

      // Reset the selectedBoard
      setHistory((prev) => {
        return {
          ...prev,
          selectedBoard: undefined
        }
      })
    }
  },[history.selectedBoard])

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
        updateHistory={setHistory}
      />      
      <ol>
        {
          history.board && (
            history.board.map((_, index) => {
              if(index === 0){
                return (
                  <li>
                    <button
                      onClick={handleHistoryMove.bind(this, 0)}
                    >Move to Start</button>
                  </li>                  
                )
              }else{
                return (
                  <li>
                    <button
                      onClick={handleHistoryMove.bind(this,index)}
                    >Move to #{index}</button>
                  </li>
                )
              }
            })
          )
        }
      </ol>
    </div>
  );
};

export default TicTactToe;
