import React from 'react';

import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import mongoose from "mongoose";

// mongoose.connect('mongodb+srv://jihyun:1q2w%40%403e4r@sophies-3bv9b.mongodb.net/test?retryWrites=true&w=majority',{
//   useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology:true
// }).then(()=>{
//   console.log("mongoose connect ...");
// }).catch(err=>{
//   console.error(err);
// })


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
