import React, { useCallback, memo, useContext, useMemo } from 'react';
import { DISPATCH_TYPE, CODE } from './constant';
import { TableContext } from './Minesweeper';

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444',
      };
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return {
        background: 'yellow',
      };
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return {
        background: 'red',
      };
    default:
      return {
        background: 'white',
      };
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.OPENED:
    case CODE.MINE:
    case CODE.NORMAL:
      return '';
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return '!';
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return '?';
    default:
      return code;
  }
};

const Td = memo(({ rowIdx, cellIdx }) => {
  const { tableData, dispatch, gameOver } = useContext(TableContext);
  const cellData = tableData[rowIdx][cellIdx];

  const onClickTd = useCallback(() => {
    if (gameOver) return;
    switch (cellData) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL:
        dispatch({ type: DISPATCH_TYPE.OPEN_CELL, row: rowIdx, cell: cellIdx });
        return;
      case CODE.MINE:
        dispatch({ type: DISPATCH_TYPE.CLICK_MINE, row: rowIdx, cell: cellIdx });
        return;
    }
  }, [cellData, gameOver]);

  const onRightClickTd = useCallback(
    (e) => {
      e.preventDefault();
      if (gameOver) return;
      switch (cellData) {
        case CODE.NORMAL:
        case CODE.MINE:
          dispatch({ type: DISPATCH_TYPE.FLAG_CELL, row: rowIdx, cell: cellIdx });
          return;
        case CODE.FLAG:
        case CODE.FLAG_MINE:
          dispatch({ type: DISPATCH_TYPE.QUESTION_CELL, row: rowIdx, cell: cellIdx });
          return;
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          dispatch({ type: DISPATCH_TYPE.NORMALIZE_CELL, row: rowIdx, cell: cellIdx });
          return;
        default:
          return;
      }
    },
    [cellData, gameOver],
  );

  return useMemo(
    () => (
      <td style={getTdStyle(cellData)} onClick={onClickTd} onContextMenu={onRightClickTd}>
        {getTdText(cellData)}
      </td>
    ),
    [cellData],
  );
});

export default Td;
