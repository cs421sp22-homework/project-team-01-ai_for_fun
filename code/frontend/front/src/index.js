import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import Slideshow from './components/Slideshow';
import Edit from './components/Edit';
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

const input = 
  {fontSize:'14px',            //显示字体大小
  iconColor:"#5f68ea",        //鼠标滑过icon图标颜色
  inputWidth:"400px",         //输入框宽度，高度自适应
  showSize:"30",              //可展示字数，溢出隐藏，滑过展示全部
  amount:"30",                //字数限制长度
  type:"number",              //可输入类型
  value:"17600381667",        //传入内容
  // handleOk={this.handleOk},   //点击对号回调
  name:"firmFax"}             //地段名

const info = {name:'AKUN'}

ReactDOM.render(
    // <Slideshow imgData={image}/>,
    <Profile props={info}/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
