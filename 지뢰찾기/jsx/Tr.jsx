import React, { memo, useContext } from 'react';
import Td from './Td';
import { TableContext } from './Minesweeper';

const Tr = memo(({ rowIdx }) => {
    const { tableData } = useContext(TableContext);
    return (
        <tr>
            {tableData[0] &&
                Array(tableData[0].length)
                    .fill()
                    .map((td, i) => <Td key={`td${i}`} rowIdx={rowIdx} cellIdx={i} />)}
        </tr>
    );
});

export default Tr;
