import React, { memo, useState, useCallback, useContext } from 'react';
import { TableContext } from './Minesweeper';
import { DISPATCH_TYPE } from './constant';

const Form = memo(() => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);
  const { dispatch } = useContext(TableContext);
  const onChangeRow = useCallback(
    (e) => {
      setRow(e.target.value);
    },
    [row],
  );
  const onChangeCell = useCallback(
    (e) => {
      setCell(e.target.value);
    },
    [cell],
  );
  const onChangeMine = useCallback(
    (e) => {
      setMine(e.target.value);
    },
    [mine],
  );

  const onClickBtn = useCallback(
    (e) => {
      dispatch({ type: DISPATCH_TYPE.START_GAME, row, cell, mine });
    },
    [row, cell, mine],
  );

  return (
    <div>
      <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="가로" value={cell} onChange={onChangeCell} />
      <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
      <button onClick={onClickBtn}>지뢰찾기 시작</button>
    </div>
  );
});

export default Form;
