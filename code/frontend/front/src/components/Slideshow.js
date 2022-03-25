import React, { Component, useState, memo, createRef } from 'react';
import '../style/Slideshow.css';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import Container from 'react-bootstrap/Container';
import { Image } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { AI_face_topic } from '../container/AI_face_topic';

function Slideshow(props) {
  const ref = createRef();
  const { imgData } = props;
  const [translateX, setTranslateX] = useState(0);

  /**
   * right button
   */
  const clickRightIcon = () => {
    if (ref.current.scrollWidth < Math.abs(translateX) + Math.abs(ref.current.offsetWidth)) {
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
  //console.log('translateX', translateX);
  //console.log('ref', ref);

  return (
    <Container fluid>

      <div className='wrap_scrollImg'>
        <span className='left_icon' onClick={clickLeftIcon}><LeftCircleOutlined /></span>
        <span className='right_icon' onClick={clickRightIcon}><RightCircleOutlined /></span>
        <ul style={{ transform: `translateX(${translateX}px)` }} ref={ref}>
          {imgData.map(item => {
            return <li key={item.name} className='shadow'>
              <Card>
                <Card.Link href="/AI_face_topic">
                  <Card.Img className='CardImage' as={Image} src={item.imgUrl} fluid={true} alt="item.name" style={{ height: '15vw' }} />
                </Card.Link>
                <Card.Body>
                  {/* <Card.Title>{item.topic}</Card.Title> */}
                  <Card.Text>
                    {item.topic}
                  </Card.Text>
                </Card.Body>
              </Card>
              {/* <img src={item.imgUrl} alt={item.name}/> */}
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