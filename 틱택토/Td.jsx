import React, { useCallback } from 'react';
import { DISPATCH_TYPE } from './constant';

const Td = memo(({ rowIdx, cellIdx, dispatch, cellData }) => {
    const onClickTd = useCallback(() => {
        if (cellData) return;
        dispatch({ type: DISPATCH_TYPE.CLICK_CELL, row: rowIdx, cell: cellIdx });
    }, [cellData]);
    return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
