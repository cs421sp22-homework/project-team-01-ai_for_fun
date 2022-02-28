import React, { Component, useState, memo, createRef } from 'react';
import '../../style/Slideshow.css';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
// import '../bootstrap-4.3.1-dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'

function Slideshow(props) {
  const ref = createRef();
  const { imgData } = props;
  const [translateX, setTranslateX] = useState(0);

  /**
   * right button
   */
  const clickRightIcon = () => {
    if (ref.current.scrollWidth < Math.abs(translateX) + Math.abs(ref.current.offsetWidth)) {//到最后一页时候需要停止点击按钮
      return;
    }
    setTranslateX(translateX - ref.current.offsetWidth);
  };

  /**
   * left button
   */
  const clickLeftIcon = () => {
    if (translateX === 0) return;
    setTranslateX(translateX + ref.current.offsetWidth);
  };
  console.log('translateX', translateX);
  console.log('ref', ref);
  return (
    <Container fluid>
      <div className='wrap_scrollImg'>
        <span className='left_icon' onClick={clickLeftIcon}> <LeftCircleOutlined /> </span>
        <span className='right_icon' onClick={clickRightIcon}> <RightCircleOutlined /> </span>
        <ul style={{ transform: `translateX(${translateX}px)` }} ref={ref}>
          {imgData.map(item => {
            return <li key={item.name}>
              <img src={item.imgUrl} alt={item.name} />
              {/* 
            <div className='img_contianer'>
                <img src={item.imgUrl} alt={item.name}/>
                <div className="overlay">{item.name}</div>
            </div>
             */}
            </li>;
          })}
        </ul>
      </div>
    </Container>
  );
}

export default Slideshow;