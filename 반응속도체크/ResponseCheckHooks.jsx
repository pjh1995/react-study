import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
    const [status, setStatus] = useState('waiting');
    const [msg, setMsg] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);
    const timeout = useRef(null); //값이 바뀌어도 렌더링을 다시 하지 않을때
    const startTime = useRef(null);
    const endTime = useRef(null);

    const onClickScreen = () => {
        if (status === 'waiting') {
            setStatus('ready');
            setMsg('초록색이 되면 클릭하세요.');
            timeout.current = setTimeout(() => {
                setStatus('now');
                setMsg('클릭하세요.');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
        } else if (status === 'ready') {
            // 성급하게 클릭
            clearTimeout(timeout.current);
            setStatus('waiting');
            setMsg('너무 성급하시군요..!');
        } else if (status === 'now') {
            //반응 속도 체크
            endTime.current = new Date();
            setStatus('waiting');
            setMsg('클릭해서 시작하세요.');
            setResult((preResult) => {
                return [...preResult, endTime.current - startTime.current];
            });
        }
    };

    const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        return result.length > 0 ? (
            <>
                <div> 평균 시간: {result.reduce((a, c) => (a + c) / result.length)}ms</div>
                <button onClick={onReset}>리셋</button>
            </>
        ) : null;
    };

    return (
        <>
            <div id="screen" className={status} onClick={onClickScreen}>
                {msg}
            </div>
            {renderAverage()}
        </>
    );
};

export default ResponseCheck;
