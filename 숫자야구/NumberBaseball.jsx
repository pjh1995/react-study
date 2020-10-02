import React, { Component, createRef } from 'react';
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

export default class NumberBaseball extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            value: '',
            answer: getNumber(),
            trys: [], //push를 쓰면 안댐..!
            retry: false,
        };
    }

    //onSubmitFrom(e){} bind(this)를 해야합니다.
    onSubmitForm = (e) => {
        e.preventDefault();
        const { value, trys, answer, retry } = this.state;

        if (trys.length === MAXTRY || retry) {
            return false;
        }

        if (value === answer.join('')) {
            this.setResult('홈런~!', value, true);
        } else {
            if (trys.length >= MAXTRY - 1) {
                this.setResult(`시도 횟수를 초과하셨습니다. 답은 ${answer.join('')} 입니다.`, value, true);
            } else {
                let result;
                const answerArray = this.getAnswerArray();

                if (!answerArray.S && !answerArray.B) {
                    result = '스트라이크';
                } else {
                    result = `${answerArray.S}S${answerArray.B}B`;
                }
                this.setResult(result, value);
            }
        }
        this.inputRef.current.focus();
    };

    inputRef = createRef();

    getAnswerArray = () => {
        const { value, answer } = this.state;
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

    setResult = (result, value, retry = false) => {
        this.setState((prevState) => ({
            result,
            trys: [
                ...prevState.trys,
                {
                    try: value,
                    result,
                },
            ],
            value: '',
            retry,
        }));
    };

    onChangeInput = (e) => {
        e.preventDefault();
        this.setState({
            value: e.target.value,
        });
    };

    onRetry = (e) => {
        e.preventDefault();
        this.setState({
            result: '',
            value: '',
            answer: getNumber(),
            trys: [],
            retry: false,
        });
    };

    render() {
        const { result, value, trys, retry } = this.state;
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input minLength={MAXNUM} maxLength={MAXNUM} ref={this.inputRef} value={value} onChange={this.onChangeInput} />
                </form>
                <div>남은 횟수 : {10 - trys.length} </div>
                <ul>
                    {trys.map((v, i) => {
                        return <Try key={v.try + i} value={v} />;
                    })}
                </ul>
                {retry && <button onClick={this.onRetry}>재시작</button>}
            </>
        );
    }
}
