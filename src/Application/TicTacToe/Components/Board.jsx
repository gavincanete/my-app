import React from "react";
import Cell from "./Cell";
import "./TicTacToe.css";

const Board = (props) => {
  const {
    value,
    setxMark,

    updateBoard,
    setPrevMark,

    status,
    isGameOver,
    history
  } = props;

  const renderCell = (categoryIndex, elementIndex) => {
    return (
      <Cell
        value={value}
        setxMark={setxMark}
        updateBoard={updateBoard}
        setPrevMark={setPrevMark}
        categoryIndex={categoryIndex}
        elementIndex={elementIndex}
        isGameOver={isGameOver}
        history={history}
      />
    );
  };

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderCell(0, 0)}
        {renderCell(0, 1)}
        {renderCell(0, 2)}
      </div>
      <div className="board-row">
        {renderCell(1, 0)}
        {renderCell(1, 1)}
        {renderCell(1, 2)}
      </div>
      <div className="board-row">
        {renderCell(2, 0)}
        {renderCell(2, 1)}
        {renderCell(2, 2)}
      </div>
      <button>Back</button>
      <button>Next</button>
    </div>
  );
};

export default Board;
