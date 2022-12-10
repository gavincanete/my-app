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
    
    history
  } = props;

  const [localValue, setLocalValue] = useState("");
  const [hasMark, setHasMark] = useState(false);

  useEffect(() => {
    if(history && history.selectedBoard){
      console.log("%c Line:16 🌮 history", "color:#ea7e5c", history.selectedBoard);
    }
  }, [history]);

  // Actions
  const handleOnClick = () => {
    setLocalValue(value || "X");
    setHasMark(true);

    setPrevMark(value || "X");

    setxMark((prev) => (!prev || prev === "X" ? "O" : "X"));

    updateBoard((boardItems) => {
        return boardItems.map((item, index) => {
            if(index === cellIndex) return value || 'X'
            return item
        })
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
