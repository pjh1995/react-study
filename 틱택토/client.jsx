import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';

import TicTacToc from './TicTacToc';

const Hot = hot(TicTacToc);

ReactDom.render(<Hot />, document.querySelector('#root'));
