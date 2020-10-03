import React, { memo, useState, useRef, useEffect, useCallback } from 'react';

//componenetDidMount시 또는 input값이 바뀌면 실행
//return 은 componenetWillUnMount시 실행
// useEffect(() => {
//     effect
//     return () => {
//         cleanup
//     }
// }, [input])

//input값이 바뀌면 실행,  function의 return 값을 저장
// useMemo(() => function, input)

//훅스는 값이 바뀔때 마다 전체가 재실행 되는데, useCallback을 해놓으면 해당 함수를 기억해 놓는다.
//input값이 바뀌면 실행,  function을 저장함.
//자식컴포넌트에 function을 넘길 때에는 필수!
//설정 하지 않는 경우엔 값이 바뀌는 경우 -> function이 재생성 -> 자식컴포넌트에선 props가 바뀐걸로 보고 re-render됨. (성능 저하)
// useCallback(
//     () => {
//         callback
//     },
//     [input],
// )

function getWinNumber() {
    console.log('getWinNumber');
    const candinate = Array(45)
        .fill()
        .map((v, i) => i + 1);
    const winNum = [];
    while (winNum.length < 7) {
        winNum.push(candinate.splice(Math.floor(Math.random() * candinate.length), 1)[0]);
    }
    return winNum;
}

const Ball = memo(({ number }) => {
    //함수 컴포넌트
    let background;
    if (number <= 10) {
        background = 'red';
    } else if (number <= 20) {
        background = 'orange';
    } else if (number <= 30) {
        background = 'yellow';
    } else if (number <= 40) {
        background = 'blue';
    } else {
        background = 'green';
    }
    console.log(number);
    return (
        <div className="ball" style={{ background }}>
            {number}
        </div>
    );
});

const MS = 500;
const Lotto = () => {
    const [winBall, setWinBall] = useState([]);
    const [bonus, setBonus] = useState(null);
    const interval = useRef();

    useEffect(() => {
        createInterval();
        return () => {
            clearInterval(interval.current);
        };
    }, []);

    const createInterval = () => {
        let winNum = getWinNumber();
        interval.current = setInterval(() => {
            setWinBall((prevWinBall) => [...prevWinBall, winNum.pop()]);
            if (winNum.length === 1) {
                setTimeout(() => {
                    setBonus(winNum.pop());
                }, MS);
                clearInterval(interval.current);
            }
        }, MS);
    };

    //자식 컴포넌트에 넘길 경우에는 useCallback 필수..!!!!!!!!!!!!!!!
    const onClickRedo = useCallback(() => {
        //훅스는 값이 바뀔때 마다 전체가 재실행 되는데, useCallback을 해놓으면 해당 함수를 기억해 놓는다.
        setWinBall([]);
        setBonus(null);
        createInterval(interval.current);
        //useCallback 안에서 쓰일 state들은 []안에 넣어줘야지만 값이 바뀜.
    }, []);

    return (
        <>
            <div>당첨 숫자</div>
            <div>
                {winBall.map((v) => (
                    <Ball key={v} number={v} />
                ))}
            </div>
            {bonus && (
                <>
                    <div>보너스</div>
                    <Ball number={bonus} />
                    <button onClick={onClickRedo}>한번더</button>
                </>
            )}
        </>
    );
};

export default Lotto;
