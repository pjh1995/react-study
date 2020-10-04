import React from 'react';
import { BrowserRouter, HashRouter, Route, Link, Switch } from 'react-router-dom';
//BrowserRouter : localhost:8080/rsp :: 새로고침시 에러ㅇ, 세팅을 해주면 검색엔진에 잡힘
//HashRouter : localhost:8080/#/rsp :: 새로고침시 에러x, 검색엔진에 잡히지 않음..!
import GameMatcher from './GameMatcher';
import WordRelay from '../../끝말잇기/WordRelay';
const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/game/num?hi=hello">숫자 야구</Link>
        &nbsp;
        <Link to="/game/rsp">가위바위보</Link>
        &nbsp;
        <Link to="/game/lotto">로또추첨기</Link>
        &nbsp;
        <Link to="/game/index">게임 매치</Link>
        &nbsp;
        <Link to="/">끝말잇기</Link>
      </div>
      <div>
        {/* <Route path="/num" component={NumberBaseBall}></Route>
        <Route path="/rsp" component={RSP}></Route>
        <Route path="/lotto" component={Lotto}></Route> */}

        {/* Switch :: 하나가 선택되면 뒤에꺼는 선택 x */}
        <Switch>
          <Route exact path="/" component={WordRelay}></Route>
          <Route path="/game/:name" component={GameMatcher}></Route>
          <Route path="/game/lotto" component={GameMatcher}></Route>
        </Switch>
        {/*기본 */}
        {/*props */}
        {/* <Route path="/game/:name" component={()=><GameMatcher props={props.abe} />}></Route> */}
        {/* <Route path="/game/:name" render={(props)=><GameMatcher props={...props} />}></Route> */}
      </div>
    </BrowserRouter>
  );
};
export default Games;
