import React, { useState, useRef } from 'react';
import Try from './Try';

const MAXNUM = 4;
const MAXTRY = 10;
function getNumber() {
    //숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
    const Candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const arr = [];
    while (arr.length !== MAXNUM) {
        const num = Math.ceil(Math.random() * Candidate.length);
        arr.push(Candidate.splice(num - 1, 1)[0]);
    }
    return arr;
}

const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumber());
    const [trys, setTrys] = useState([]);
    const [retry, setRetry] = useState(false);
    const inputRef = useRef();

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (trys.length === MAXTRY || retry) {
            return false;
        }

        if (value === answer.join('')) {
            setResultValues('홈런~!', value, true);
        } else {
            if (trys.length >= MAXTRY - 1) {
                setResultValues(`시도 횟수를 초과하셨습니다. 답은 ${answer.join('')} 입니다.`, value, true);
            } else {
                let result;
                const answerArray = getAnswerArray();

                if (!answerArray.S && !answerArray.B) {
                    result = '스트라이크';
                } else {
                    result = `${answerArray.S}S${answerArray.B}B`;
                }
                setResultValues(result, value);
            }
        }
        inputRef.current.focus();
    };

    const getAnswerArray = () => {
        return value.split('').reduce(
            (arr, n, i) => {
                if (n == answer[i]) {
                    ++arr.S;
                } else {
                    const isBall = answer.filter((an) => an == n);
                    if (isBall.length) {
                        ++arr.B;
                    }
                }
                return arr;
            },
            {
                S: 0,
                B: 0,
            },
        );
    };

    const setResultValues = (result, value, retry = false) => {
        setResult(result);
        setTrys((prevTrys) => {
            console.log(prevTrys);
            return [
                ...prevTrys,
                {
                    try: value,
                    result,
                },
            ];
        });
        setValue('');
        setRetry(retry);
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    };

    const onRetry = (e) => {
        e.preventDefault();
        setResult('');
        setValue('');
        setAnswer(getNumber());
        setTrys([]);
        setRetry(false);
    };

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input minLength={MAXNUM} maxLength={MAXNUM} ref={inputRef} value={value} onChange={onChangeInput} />
            </form>
            <div>남은 횟수 : {10 - trys.length} </div>
            <ul>
                {trys.map((v, i) => {
                    return <Try key={v.try + i} value={v} />;
                })}
            </ul>
            {retry && <button onClick={onRetry}>재시작</button>}
        </>
    );
};

export default NumberBaseball;
