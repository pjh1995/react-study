import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './Table';
import { DISPATCH_TYPE } from './constant';

//useReducer :: redux와 비슷한 개념
// state를 한데 모아서 reducer를 통해서만 state를 변경가능하게 한다.
// dispatch를 통해 action을 전달한다.
const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    recentCell: [-1, -1],
};

const reducer = (state, action) => {
    switch (action.type) {
        case DISPATCH_TYPE.SET_WINNER:
            //state.winner = action.winner 이렇게 하면 안됌!
            return {
                ...state,
                winner: action.winner,
            };
        case DISPATCH_TYPE.CLICK_CELL:
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]; //immer라는 라이브러리로 가독성 해결 가능
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            };
        case DISPATCH_TYPE.CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            };
        }
        case DISPATCH_TYPE.RESET_GAME: {
            return {
                ...state,
                turn: 'O',
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ],
                recentCell: [-1, -1],
            };
        }
        default:
            return state;
    }
};

const TicTacToc = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;

    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) return;
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        } //가로
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        } //세로
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        } //대각선
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        } //대각선
        if (win) {
            //승리
            dispatch({ type: DISPATCH_TYPE.SET_WINNER, winner: turn });
            dispatch({ type: DISPATCH_TYPE.RESET_GAME });
        } else {
            let all = true;
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                    }
                });
            });
            if (all) {
                dispatch({ type: DISPATCH_TYPE.RESET_GAME });
            } else {
                dispatch({ type: DISPATCH_TYPE.CHANGE_TURN });
            }
            //무승부 검사
        }
    }, [recentCell]);

    return (
        <>
            <Table tableData={state.tableData} dispatch={dispatch} />
            {winner && <div>{winner}님이 승리</div>}
        </>
    );
};

export default TicTacToc;
