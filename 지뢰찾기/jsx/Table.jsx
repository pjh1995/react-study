import React, { useContext, memo } from 'react';
import { TableContext } from './Minesweeper';
import Tr from './Tr';
const Table = memo(() => {
  const { tableData } = useContext(TableContext);
  return (
    <table>
      {Array(tableData.length)
        .fill()
        .map((tr, i) => (
          <Tr key={`tr${i}`} rowIdx={i} />
        ))}
    </table>
  );
});

export default Table;
