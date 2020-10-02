const React = require('react');
const { Component } = React;
class WordRelay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '시이작',
            value: '',
            result: '',
        };
    }
    onSubmitForm = (e) => {
        e.preventDefault();
        const { word, value } = this.state;

        if (word[word.length - 1] === value[0]) {
            this.setState({
                result: '정답',
                word: value,
                value: '',
            });
        } else {
            this.setState({
                result: '땡',
                value: '',
            });
        }
        this.input.focus();
    };

    input;

    onRefInput = (c) => {
        this.input = c;
    };

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { word, value, result } = this.state;
        return (
            <>
                <div>{word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRefInput} value={value} onChange={this.onChangeInput} />
                    <button>입력</button>
                </form>
                <div>{result}</div>
            </>
        );
    }
}

module.exports = WordRelay;
