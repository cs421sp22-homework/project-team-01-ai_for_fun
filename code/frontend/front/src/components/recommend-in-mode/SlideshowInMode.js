import React, { Component, useState, memo, createRef, useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
// import '../bootstrap-4.3.1-dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import { Image } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import { LoginContext } from "../../context/AuthProvider";
// import '../../style/SlideInMode.css';


function SlideshowInMode(props) {
    const ref = createRef();
    const { imgData } = props;
    const [translateX, setTranslateX] = useState(0);
    const { soureimg, setSourceimg } = useContext(LoginContext);
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
        <div className='wrap_scrollImg' style={{ width: '100%', height: '100%' }}>
            <span className='left_icon' onClick={clickLeftIcon}><LeftCircleOutlined /></span>
            <span className='right_icon' onClick={clickRightIcon}><RightCircleOutlined /></span>
            <ul style={{ transform: `translateX(${translateX}px)` }} ref={ref}>
                {imgData.map(item => {
                    return <li key={item.name}>
                        <Card.Img as={Image} style={{ height: '85px', witdh: '85px', objectFit: 'cover', maxHeight: '100vh' }} src={item.imgUrl} fluid={true} alt="item.name" onClick={() => setSourceimg(item.imgUrl)
                        } />
                    </li>;
                })}
            </ul>
        </div>

    );
}

export default SlideshowInMode;