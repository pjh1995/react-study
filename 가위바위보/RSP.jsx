import React, { Component, memo } from 'react';

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

const ImgTag = (props) => <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${props.imgCoord} 0` }}></div>;

const ResultTag = memo((props) => (
    <div>
        {props.result} 현재 {props.score}
    </div>
));

const BtnTag = memo((props) => (
    <div>
        {rspData.map((data) => (
            <button key={data.en} id={data.en} className="btn" onClick={(e) => props.onClick(e)}>
                {data.ko}
            </button>
        ))}
    </div>
));

class RSP extends Component {
    state = {
        result: '',
        score: 0,
        imgCoord: '0',
    };
    interval;
    componentDidMount() {
        this.createInterval();
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    createInterval = () => {
        this.interval = setInterval(() => {
            const currentIdx = this.getIndex();
            const imgCoord = currentIdx + 1 >= 3 ? rspData[0].coord : rspData[currentIdx + 1].coord;
            this.setState({
                imgCoord,
            });
        }, 100);
    };
    onClickBtn = (e) => {
        e.preventDefault();
        clearInterval(this.interval);
        const myScore = this.getIndex(e.target.id);
        const cpuScore = this.getIndex();
        const diff = myScore - cpuScore;
        if (diff === 0) {
            this.setState({
                result: '비겻습니다.',
            });
        } else if (diff === -1 || diff === 2) {
            this.setState((prevState) => {
                return {
                    result: '이겻습니다.',
                    score: prevState.score + 1,
                };
            });
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다.',
                    score: prevState.score - 1,
                };
            });
        }
        setTimeout(this.createInterval, 500);
    };

    getIndex = (value) => {
        if (value) {
            return rspData.findIndex((data) => data.en === value);
        } else {
            return rspData.findIndex((data) => data.coord === this.state.imgCoord);
        }
    };

    render() {
        const { result, score, imgCoord } = this.state;
        return (
            <>
                <ImgTag imgCoord={imgCoord} />
                <BtnTag onClick={this.onClickBtn} />
                <ResultTag result={result} score={score} />
            </>
        );
    }
}

export default RSP;
