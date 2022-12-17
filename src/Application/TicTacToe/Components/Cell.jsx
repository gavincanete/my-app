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
    updateHistory,

    rowIndex,
    colIndex
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
      setLocalValue(selectedBoard.board[cellIndex])      
      
      setxMark(step%2 === 0? 'X': 'O')
    }
  }, [selectedBoard]);  

  useEffect(() => {
    if(isGameOver){
      const length = board.length

      const mutationBoard = board.slice(0, length-1)
      const lastBoard = board.at(length-1)

      const newBoard = {
        ...lastBoard,
        isWin: true
      }

      updateHistory((prev) => {
      return {
        ...prev,        
        board: [...mutationBoard, newBoard]
      }
    })

    }
  },[isGameOver])
  
  // Actions
  const handleOnClick = () => {
    setLocalValue(value || "X");
    setHasMark(true);

    setPrevMark(value || "X");

    setxMark((prev) => (!prev || prev === "X" ? "O" : "X"));

    // Update the board
    updateBoard((boardItems) => {
      console.log("%c Line:50 🌽 boardItems", "color:#465975", boardItems);
      
        return boardItems.map((item, index) => {
            if(index === cellIndex) return value || 'X'
            return item
        })
    })  
    
    const mutationBoard = board.slice(0, step+1)

    const lastBoard = mutationBoard.at(step)
    
    const {board:lastBoardHistory} = lastBoard

    const currentBoard = lastBoardHistory.map((item, index) => {      
      if(index === cellIndex) return value || 'X'
      return item
    })   

    const newBoardHistory = {      
      ...lastBoard,
      board: currentBoard,
      moves: {
        row: rowIndex+1,
        col: colIndex+1
      }
    }

    // Update History table
    updateHistory((prev) => {
      return {
        ...prev,
        step: step+1,
        board: [...mutationBoard, newBoardHistory]
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
