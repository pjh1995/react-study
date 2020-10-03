import React, { memo } from 'react';
import Td from './Td';
const Tr = memo(({ rowData, rowIdx, dispatch }) => {
    return (
        <tr>
            {Array(rowData.length)
                .fill()
                .map((td, i) => (
                    <Td key={`td${i}`} rowIdx={rowIdx} cellIdx={i} cellData={rowData[i]} dispatch={dispatch} />
                ))}
        </tr>
    );
});

export default Tr;
