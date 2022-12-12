import React, { useState, useEffect } from "react";
import "./TicTacToe.css";

const Cell = (props) => {
  const {
    value,
    setxMark,
    updateBoard,
    setPrevMark,

    cellIndex,
    isGameOver,
    
    history,
    updateHistory
  } = props;

  const { 
    selectedBoard, 
    step,
    board 
  } = history

  const [localValue, setLocalValue] = useState("");
  const [hasMark, setHasMark] = useState(false);

  useEffect(() => {
    if(selectedBoard){
      setHasMark(false)
      setLocalValue(selectedBoard[cellIndex])      
      
      setxMark(step%2 === 0? 'X': 'O')
    }
  }, [selectedBoard]);

  // Actions
  const handleOnClick = () => {
    setLocalValue(value || "X");
    setHasMark(true);

    setPrevMark(value || "X");

    setxMark((prev) => (!prev || prev === "X" ? "O" : "X"));

    // Update the board
    updateBoard((boardItems) => {
        return boardItems.map((item, index) => {
            if(index === cellIndex) return value || 'X'
            return item
        })
    })  

    const mutationBoard = board.slice(0, step+1)
    // Update History table
    const lastBoardHistory = mutationBoard.at(mutationBoard.length-1)
    const currentBoard = lastBoardHistory.map((item, index) => {
      if(index === cellIndex) return value || 'X'
      return item
    })

    updateHistory((prev) => {
      return {
        ...prev,
        step: step+1,
        board: [...mutationBoard, currentBoard]
      }
    })
  };

  return (
    <button
      className="square"
      disabled={isGameOver}
      onClick={!hasMark && handleOnClick}
    >
      {localValue}
    </button>
  );
};

export default Cell;
