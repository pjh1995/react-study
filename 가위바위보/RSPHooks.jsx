import React, { useState, useRef } from 'react';

const rspData = [
    {
        ko: '바위',
        en: 'rock',
        coord: '0',
    },
    {
        ko: '가위',
        en: 'scissor',
        coord: '-142px',
    },
    {
        ko: '보',
        en: 'paper',
        coord: '-284px',
    },
];

const RSP = () => {
    const [result, setResult] = useState('');
    const [score, setScore] = useState(0);
    const [imgCoord, setImgCoord] = useState('0');
    const interval = useRef();
    const createInterval = () => {
        interval.current = setInterval(() => {
            const currentIdx = getIndex();
            const imgCoord = currentIdx + 1 >= 3 ? rspData[0].coord : rspData[currentIdx + 1].coord;
            setImgCoord(imgCoord);
        }, 100);
    };
    const onClickBtn = (e) => {
        e.preventDefault();
        clearInterval(interval.current);
        const myScore = getIndex(e.target.id);
        const cpuScore = getIndex();
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult('비겻습니다.');
        } else if (diff === -1 || diff === 2) {
            setResult('이겻습니다.');
            setScore((preScore) => preScore + 1);
        } else {
            setResult('졌습니다.');
            setScore((preScore) => preScore - 1);
        }
        setTimeout(createInterval, 500);
    };

    const getIndex = (value) => {
        if (value) {
            return rspData.findIndex((data) => data.en === value);
        } else {
            return rspData.findIndex((data) => data.coord === imgCoord);
        }
    };
    // componentDidMount() {
    //     this.createInterval();
    // }
    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }
    return (
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
            <div>
                {rspData.map((data) => (
                    <button key={data.en} id={data.en} className="btn" onClick={(e) => onClickBtn(e)}>
                        {data.ko}
                    </button>
                ))}
            </div>
            <div>{result}</div>
            <div>현재 {score}</div>
        </>
    );
};

export default RSP;
