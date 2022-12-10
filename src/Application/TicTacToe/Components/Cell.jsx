import React, { useState, useEffect } from "react";
import "./TicTacToe.css";

const Cell = (props) => {
  const {
    value,
    setxMark,
    updateBoard,
    setPrevMark,

    categoryIndex: outerIndex,
    elementIndex: innerIndex,
    isGameOver,
    
    history
  } = props;

  const [localValue, setLocalValue] = useState("");
  const [hasMark, setHasMark] = useState(false);

  useEffect(() => {
    const { selectedBoard } = history

    if(selectedBoard){
        console.log("%c Line:16 🌮 history", "color:#ea7e5c", history.selectedBoard);
    }
  }, [history.selectedBoard]);

  // Actions
  const handleOnClick = () => {
    setLocalValue(value || "X");
    setHasMark(true);

    setPrevMark(value || "X");

    setxMark((prev) => (!prev || prev === "X" ? "O" : "X"));

    updateBoard((boardItems) => {
      return boardItems.map((boardItem, outIdx) => {
        return boardItem.map((item, inIdx) => {
          if (outIdx === outerIndex && inIdx === innerIndex) {
            return value || "X";
          }

          return item;
        });
      });
    });
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
