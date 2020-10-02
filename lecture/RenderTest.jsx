import React, { Component } from 'react';

class Test extends Component {
    constructor(props) {
        this.state = {
            counter: 0,
        };
    }
    onClick = () => {
        this.setState({});
    };

    render() {
        console.log('렌더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        );
    }
}
