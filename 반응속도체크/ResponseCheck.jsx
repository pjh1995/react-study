import React, { PureComponent } from 'react';

export default class ResponseCheck extends PureComponent {
    constructor() {
        super();
        this.state = {
            status: 'waiting',
            msg: '클릭해서 시작하세요.',
            result: [],
        };
    }

    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const { status } = this.state;
        if (status === 'waiting') {
            this.setState({
                status: 'ready',
                msg: '초록색이 되면 클릭하세요.',
            });
            this.timeout = setTimeout(() => {
                this.setState({
                    status: 'now',
                    msg: '클릭하세요.',
                });
                this.startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
        } else if (status === 'ready') {
            // 성급하게 클릭
            clearTimeout(this.timeout);
            this.setState({
                status: 'waiting',
                msg: '너무 성급하시군요..!',
            });
        } else if (status === 'now') {
            //반응 속도 체크
            this.endTime = new Date();
            this.setState((prevState) => ({
                status: 'waiting',
                msg: '클릭해서 시작하세요.',
                result: [...prevState.result, this.endTime - this.startTime],
            }));
            console.log(this.endTime - this.startTime);
        }
    };

    onReset = () => {
        this.setState({
            result: [],
        });
    };

    renderAverage = () => {
        const { result } = this.state;
        return result.length > 0 ? (
            <>
                <div> 평균 시간: {result.reduce((a, c) => (a + c) / result.length)}ms</div>
                <button onClick={this.onReset}>리셋</button>
            </>
        ) : null;
    };

    render() {
        console.log('메인 렌더링');
        const { status, msg } = this.state;
        return (
            <>
                <div id="screen" className={status} onClick={this.onClickScreen}>
                    {msg}
                </div>
                {this.renderAverage()}
            </>
        );
    }
}
