import React, { Component, useState, memo, createRef } from 'react';
import styles from '../style/Slideshow.less';
import {LeftCircleOutlined, RightCircleOutlined} from '@ant-design/icons';

function Slideshow(props) {
  const ref = createRef();
  const { imgData } = props;
  const [translateX, setTranslateX] = useState(0); //每次偏移数值

  /**
   * 点击右侧按钮ƒ
   */
  const clickRightIcon = () => {
    if (ref.current.scrollWidth < Math.abs(translateX) + Math.abs(ref.current.offsetWidth)) {//到最后一页时候需要停止点击按钮
      return;
    }
    setTranslateX(translateX - ref.current.offsetWidth); //每次滚动可见区域宽度
  };

  /**
   * 点击左侧按钮
   */
  const clickLeftIcon = () => {
    if (translateX === 0) return;
    setTranslateX(translateX + ref.current.offsetWidth);
  };
  console.log('translateX', translateX);
  console.log('ref', ref);
  return (
    <div className={styles.wrap_scrollImg}>
      <span className={styles.left_icon} onClick={clickLeftIcon}><LeftCircleOutlined /></span>
      <span className={styles.right_icon} onClick={clickRightIcon}><RightCircleOutlined /></span>
      <ul style={{ transform: `translateX(${translateX}px)` }} ref={ref}>
        {imgData.map(item => {
          return <li key={item.name}>
            <img src={item.imgUrl} alt={item.name}/>
          </li>;
        })}

      </ul>
    </div>
  );
}

export default Slideshow;