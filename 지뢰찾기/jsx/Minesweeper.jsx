import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import Table from './Table';
import Form from './Form';
import { DISPATCH_TYPE, CODE } from './constant';

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
  gameOver: true,
});

const initialState = {
  tableData: [],
  timer: 0,
  result: '',
  openedCount: 0,
  gameOver: true,
};

let MAXROW;
let MAXCELL;
let MINENUM;
const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => i);
  const shuffle = [];
  while (shuffle.length < mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  } //지뢰가 심어질 장소 뽑아놓기

  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  } //지뢰 없는 지뢰찾기 생성

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  } //지뢰 심기
  return data;
};

const changeCellData = (state, action) => {
  const tableData = [...state.tableData];
  const { type, row, cell } = action;
  tableData[row] = [...state.tableData[row]];

  let cellData = tableData[row][cell];
  switch (type) {
    case DISPATCH_TYPE.OPEN_CELL: {
      cellData = CODE.OPENED;
      break;
    }
    case DISPATCH_TYPE.CLICK_MINE: {
      cellData = CODE.CLICKED_MINE;
      break;
    }
    case DISPATCH_TYPE.FLAG_CELL: {
      cellData = cellData === CODE.MINE ? CODE.FLAG_MINE : CODE.FLAG;
      break;
    }
    case DISPATCH_TYPE.QUESTION_CELL: {
      cellData = cellData === CODE.FLAG_MINE ? CODE.QUESTION_MINE : CODE.QUESTION;
      break;
    }
    case DISPATCH_TYPE.NORMALIZE_CELL: {
      cellData = cellData === CODE.QUESTION_MINE ? CODE.MINE : CODE.NORMAL;
      break;
    }
  }
  tableData[row][cell] = cellData;
  return tableData;
};
const getAroundCoord = (currentCoord) => {
  const [row, cell] = currentCoord;
  const around = [];
  if (row !== 0) {
    //클릭한 칸이 맨 위칸이 아닌경우
    around.push([row - 1, cell]);
    if (cell !== 0) {
      around.push([row - 1, cell - 1]);
    }
    if (cell !== MAXCELL) {
      around.push([row - 1, cell + 1]);
    }
  }
  if (row !== MAXROW - 1) {
    //클릭한 칸이 맨 아래칸이 아닌경우
    around.push([row + 1, cell]);
    if (cell !== 0) {
      around.push([row + 1, cell - 1]);
    }
    if (cell !== MAXCELL) {
      around.push([row + 1, cell + 1]);
    }
  }
  //좌,우
  if (cell !== 0) {
    around.push([row, cell - 1]);
  }
  if (cell !== MAXCELL - 1) {
    around.push([row, cell + 1]);
  }
  return around;
};

const reducer = (state, action) => {
  switch (action.type) {
    case DISPATCH_TYPE.START_GAME: {
      MAXROW = action.row;
      MAXCELL = action.cell;
      MINENUM = action.mine;
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        gameOver: false,
        result: '',
        timer: 0,
      };
    }
    case DISPATCH_TYPE.CLICK_MINE: {
      const tableData = changeCellData(state, action);
      return {
        ...state,
        tableData,
        gameOver: true,
        result: '지뢰를 클릭하셧습니다.',
      };
    }
    case DISPATCH_TYPE.OPEN_CELL: {
      let result = state.result;
      let gameOver = state.gameOver;
      let openedCount = state.openedCount;
      const tableData = [...state.tableData]; //불변성
      tableData.forEach((row, i) => {
        tableData[i] = [...state.tableData[i]];
      });

      const checkAround = (currentCoord) => {
        //주변 칸들중 지뢰의 갯수
        const aroundCoord = getAroundCoord(currentCoord);

        const around = [];
        aroundCoord.forEach((n) => {
          around.push(tableData[n[0]][n[1]]);
        });
        const count = around.filter((v) =>
          [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v),
        ).length;
        tableData[currentCoord[0]][currentCoord[1]] = count;
        openedCount++;
        return count;
      };

      const clickAround = (currentCoord) => {
        //주변 클릭
        const aroundCoord = getAroundCoord(currentCoord);
        aroundCoord.forEach((n) => {
          if (tableData[n[0]][n[1]] !== CODE.NORMAL) {
            return;
          }
          const newCoord = [n[0], n[1]];
          const count = checkAround(newCoord);
          if (!count) {
            clickAround(newCoord);
          }
        });
      };

      const count = checkAround([action.row, action.cell]);

      if (count === 0) {
        clickAround([action.row, action.cell]);
      }
      if (MAXROW * MAXCELL - MINENUM === openedCount) {
        gameOver = true;
        result = '승리하셧습니다.';
      }
      return {
        ...state,
        tableData,
        result,
        gameOver,
        openedCount,
      };
    }
    case DISPATCH_TYPE.FLAG_CELL:
    case DISPATCH_TYPE.QUESTION_CELL:
    case DISPATCH_TYPE.NORMALIZE_CELL: {
      const tableData = changeCellData(state, action);
      return {
        ...state,
        tableData,
      };
    }
    case DISPATCH_TYPE.INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      };
    }
    default:
      return state;
  }
};
const Minesweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, gameOver, timer, result } = state;
  const value = useMemo(() => {
    return { tableData, dispatch, gameOver };
  }, [tableData, gameOver]);

  useEffect(() => {
    let timer;
    console.log(gameOver);
    if (!gameOver) {
      timer = setInterval(() => {
        dispatch({ type: DISPATCH_TYPE.INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [gameOver]);
  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table></Table>
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default Minesweeper;
