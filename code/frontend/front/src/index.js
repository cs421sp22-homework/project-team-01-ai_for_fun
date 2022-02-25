import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import Slideshow from './components/Slideshow';
import Profile from './components/Profile';
import reportWebVitals from './components/reportWebVitals';

const image = [
  {imgUrl:'./img/01.png', name:'01'},
  {imgUrl:'./img/02.png', name:'02'},
  {imgUrl:'./img/03.png', name:'03'},
  {imgUrl:'./img/04.png', name:'04'},
  {imgUrl:'./img/05.png', name:'05'},
  {imgUrl:'./img/06.png', name:'06'},
  {imgUrl:'./img/07.png', name:'07'},
]

const info = {pic:'./img/01.png',name:'Sample',email:'1234@jh.edu'}

ReactDOM.render(
    // <Slideshow imgData={image}/>,
    <Profile props={info}/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
