import React, { useState, useEffect } from "react";
import Board from "./Components/Board";
import { mutateState } from '../utils/general';

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
    board: [{board:boardLogic, moves: '', isWin: false}]    
  });

  // Status
  const [status, setStatus] = useState(`Next player: ${xMark || 'X'}`);

  // Game Over
  const [isGameOver, setIsGameOver] = useState(false);

  const validateBoard = () => {
    const isWin =        
      [boardLogic[0], boardLogic[3], boardLogic[6]].every(item => item === prevMark) ?
      [0,3,6]: [boardLogic[1], boardLogic[4], boardLogic[7]].every(item => item === prevMark) ?
      [1,4,7]: [boardLogic[2], boardLogic[5], boardLogic[8]].every(item => item === prevMark) ?
      [2,5,8]: [boardLogic[0], boardLogic[1], boardLogic[2]].every(item => item === prevMark) ?
      [0,1,2]: [boardLogic[3], boardLogic[4], boardLogic[5]].every(item => item === prevMark) ?
      [3,4,5]: [boardLogic[6], boardLogic[7], boardLogic[8]].every(item => item === prevMark) ?
      [6,7,8]: [boardLogic[0], boardLogic[4], boardLogic[8]].every(item => item === prevMark) ?
      [0,4,8]: [boardLogic[2], boardLogic[4], boardLogic[6]].every(item => item === prevMark) ?
      [2,4,6]: [0,0,0]    

    if(isWin.some(item => !!item)){
      setIsGameOver(true)

      mutateState(setHistory, {
        candidateCell: isWin
      })      
    }    
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

    const { board } = history

    if(board.length > 1 && board.length === step+1 && board.at(step).isWin)
      setIsGameOver(true)
    else{
      setIsGameOver(false)
      setHistory((prev) => {
        return {
          ...prev,          
          candidateCell: undefined
        }
      })
    }
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
      setBoardLogic(selectedBoard.board)

      // Reset the selectedBoard
      mutateState(setHistory, {
        selectedBoard: undefined
      })      
    }
  },[history.selectedBoard])

  return (
    <div className="game-info">
      <h1>Tic Tact Toe</h1>
      <div className="game">
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
              history.board.map((item, index) => {
                if(index === 0){
                  return (
                    <li key={index}>
                      <button
                        onClick={handleHistoryMove.bind(this, 0)}
                      >Move to Start: {item.moves}</button>
                    </li>                  
                  )
                }else{
                  const {row, col} = item.moves
                  return (
                    <li key={index}>
                      <button
                      style={{fontWeight: index === history.board.length-1? 'bold': 'normal'}}
                        onClick={handleHistoryMove.bind(this,index)}
                    >Move to #{index}: ({row}, {col})</button>                      
                    </li>
                  )
                }
              })
            )
          }
        </ol>
      </div>          
    </div>
  );
};

export default TicTactToe;
