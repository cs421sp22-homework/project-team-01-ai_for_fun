import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Image } from "react-bootstrap";
import { Row, Col } from 'react-bootstrap';
import "../style/Gallery.css";
import { CommentOutlined, ArrowRightOutlined, DeleteOutlined } from '@ant-design/icons';
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css";
import {  Button } from 'antd';
import { Comment, Avatar, Form, List, Input, message } from 'antd';
import Widget from './Widget';
import Masonry from 'react-masonry-css';

const { TextArea } = Input;

const galleryAnimation = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      ease: 'easeOut',
      delayChildren: 1.5,
    },
  },
}

const Cardtransition = {
  type: "spring",
  damping: 10,
  stiffness: 100
}

const cardAnimation = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
}

function FriendList(probs) {

  const friends = probs.props
  console.log(friends)
  const [cookie, setCookie] = useCookies(['token', 'refresh_token', 'name', 'email', 'user_id', 'avatar'])

  const breakpointColumnsObj = {
  default: 3,
  1800: 3,
  1300: 2,
  1000: 1
};
  return (
    <>
    <motion.div
    initial="hide"
    animate="show"
    variants={galleryAnimation}
    >
    <Masonry
  breakpointCols={breakpointColumnsObj}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column"
>
{friends.map((item) => {
            { console.log(item) }
            return <motion.div
              key={item}
              // variants={cardAnimation}
              animate={{ y: [-5, 5, 0] }}
              transition={Cardtransition}
              whileHover={{ scale: 1.05 }}
              className="gallery"
            >
              <Widget props={item}/>
            </motion.div>
          })}

</Masonry>
</motion.div>
    </>
  )
}

export default FriendList;