import React, { Component } from 'react';
import RSP from '../../가위바위보/RSP';
import Lotto from '../../로또추첨기/Lotto';
import NumberBaseBall from '../../숫자야구/NumberBaseball';

class GameMatcher extends Component {
  render() {
    console.log(this.props);
    let urlSearchParams = new URLSearchParams(this.props.location.search);
    console.log(urlSearchParams.get('hi'));
    if (this.props.match.params.name === 'rsp') {
      return <RSP />;
    } else if (this.props.match.params.name === 'lotto') {
      return <Lotto />;
    } else if (this.props.match.params.name === 'num') {
      return <NumberBaseBall />;
    } else {
      return <div>원하시는 게임이 없어용</div>;
    }
  }
}

export default GameMatcher;
