import React, { Component, memo } from 'react';

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
class Lotto extends Component {
    constructor() {
        super();
        this.state = {
            winBall: [],
            bonus: null,
        };
    }

    interval;

    componentDidMount() {
        this.createInterval();
    }

    createInterval = () => {
        let winNum = getWinNumber();
        this.interval = setInterval(() => {
            this.setState((prevState) => {
                return { winBall: [...prevState.winBall, winNum.pop()] };
            });
            if (winNum.length === 1) {
                this.setBonus(winNum);
            }
        }, MS);
    };

    setBonus = (winNum) => {
        setTimeout(() => {
            this.setState({
                bonus: winNum.pop(),
            });
        }, MS);
        clearInterval(this.interval);
    };

    onClickRedo = () => {
        this.setState({
            winBall: [],
            bonus: null,
        });
        this.createInterval();
    };

    componentWillUnmount = () => {
        clearInterval(this.interval);
    };

    render() {
        const { winBall, bonus, redo } = this.state;
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
                        <button onClick={this.onClickRedo}>한번더</button>
                    </>
                )}
            </>
        );
    }
}

export default Lotto;
