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
    history,
    updateHistory
  } = props;

  const renderCell = (cellIndex, rowIndex, colIndex) => {
    return (
      <Cell
        value={value}
        setxMark={setxMark}
        updateBoard={updateBoard}
        setPrevMark={setPrevMark}
        isGameOver={isGameOver}
        history={history}
        cellIndex={cellIndex}
        updateHistory={updateHistory}
        colIndex={colIndex}
        rowIndex={rowIndex}
      />
    );
  };

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderCell(0,0,0)}
        {renderCell(1,0,1)}
        {renderCell(2,0,2)}
      </div>
      <div className="board-row">
        {renderCell(3,1,0)}
        {renderCell(4,1,1)}
        {renderCell(5,1,2)}
      </div>
      <div className="board-row">
        {renderCell(6,2,0)}
        {renderCell(7,2,1)}
        {renderCell(8,2,2)}
      </div>
    </div>
  );
};

export default Board;
