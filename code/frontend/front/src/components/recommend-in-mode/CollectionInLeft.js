import React, { useContext,useEffect } from "react";
import { LoginContext } from "../../context/AuthProvider";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Image } from 'react-bootstrap';
import "../../bootstrap-4.3.1-dist/css/bootstrap.min.css";
import {motion} from 'framer-motion';
import Macy from 'macy';


const macyOptions = {
    container: '#macy-grid',
    trueOrder: true,
    mobileFirst: true,
    margin: 10,
    columns: 1,
    breakAt: {
      1800: 3,
      1400: 2,
      650: {
        margin: 10,
        columns: 1,
      },
    },
  }

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

const cardAnimation = {
    hide: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

export default function CollectionInLeft(props) {
    var leftimg = props.leftSourceImg;
    useEffect(()=>{
        new Macy(macyOptions)
    },[])

    
    const { soureimg, setSourceimg, dst, setDst} = useContext(LoginContext);
    return (
        <Row className="pt-1 pl-3 overflow-auto" style={{ height: "100vh",backgroundColor:"rgba(0,0,0,0.9)" }}>
           <motion.ul
        id="macy-grid"
        initial="hide"
        animate="show"
        variants={galleryAnimation}
        >
                {leftimg.map(item => {
                    return <motion.li 
                    key={item.name} 
                    variants={cardAnimation} 
                    whileHover={{ scale: 1.01 }} 
                    style={{overflow: "hidden"}}
                    onClick={() => {
                        setDst('');
                        setSourceimg(item.imgUrl)
                        }}
                    >
                        <Image src={item.imgUrl} fluid alt="item.name" />
                    </motion.li>;
                })}
            </motion.ul>
        </Row>
    );
}



