import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './components/App';
import reportWebVitals from './components/reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditVideo from './container/EditVideo';

import Video from './components/Video';
import UploadFace from './components/UploadFace';

const tempvideo = {
  videoSrc:"http://media.w3.org/2010/05/bunny/movie.mp4",
  poster:"https://epe.brightspotcdn.com/f8/ca/abde5f4f4a30a6a3d1a0eaa23821/test-032021-968416412.jpg"
}

const tempimage = [
  { imgUrl: './img/01.png', name: '01', topic: 'Star' },
  { imgUrl: './img/02.png', name: '02', topic: 'House' },
  { imgUrl: './img/03.png', name: '03', topic: 'New Year' },
  { imgUrl: './img/04.png', name: '04', topic: 'Amazing' },
  { imgUrl: './img/05.png', name: '05', topic: 'Fashion' },
]

ReactDOM.render(
    <App />,
    // <Video props={tempvideo}/>,
    // <EditVideo imgData ={tempimage}/>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();