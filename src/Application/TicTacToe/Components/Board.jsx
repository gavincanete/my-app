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

  const renderCell = (cellIndex) => {
    return (
      <Cell
        value={value}
        setxMark={setxMark}
        updateBoard={updateBoard}
        setPrevMark={setPrevMark}
        isGameOver={isGameOver}
        history={history}
        cellIndex={cellIndex}
      />
    );
  };

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderCell(0)}
        {renderCell(1)}
        {renderCell(2)}
      </div>
      <div className="board-row">
        {renderCell(3)}
        {renderCell(4)}
        {renderCell(5)}
      </div>
      <div className="board-row">
        {renderCell(6)}
        {renderCell(7)}
        {renderCell(8)}
      </div>
      <button>Back</button>
      <button>Next</button>
    </div>
  );
};

export default Board;
