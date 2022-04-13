import {motion} from 'framer-motion';
import Macy from 'macy';
import React,{useEffect, useState} from 'react';
import data from '../data/gallery.json';
import { Image } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import {Row, Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import "../style/Gallery.css";
import {LikeOutlined,CommentOutlined,ArrowRightOutlined} from '@ant-design/icons';
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css";
import {Modal, Button} from 'antd';
import { Comment, Avatar, Form, List, Input } from 'antd';
import moment from 'moment';
import Post from '../components/Post';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RightSidebar from '../components/RightSider'
import Feed from '../components/Feed'
import Widgets from '../components/Widgets';
import Loader from "../components/Loader";
import Explore_Feed from '../components/explore_feed'

const { TextArea } = Input;

// const macyOptions = {
//     container: '#macy-grid',
//     trueOrder: true,
//     mobileFirst: true,
//     margin: 23,
//     columns: 1,
//     breakAt: {
//       1400: 4,
//       1000: 3,
//       650: {
//         margin: 40,
//         columns: 2,
//       },
//     },
//   }

// const galleryAnimation = {
//     hide: {
//       opacity: 0,
//     },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.25,
//         ease: 'easeOut',
//         delayChildren: 1.5,
//       },
//     },
//   }

// const cardAnimation = {
//     hide: {
//       opacity: 0,
//     },
//     show: {
//       opacity: 1,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   }
function Explore(probs){
    const slider = useNavigate();
    const [posts, setPosts]=useState([]);
    // useEffect(() => {
    //     fetchUser().catch(() => {
    //       navigator("login");
    //     });
    //   }
    useEffect(()=>{
            let url = 'https://server-demo.ai-for-fun-backend.com/getpost';
            fetch(url)
                .then(res => res.json())
                .then(
                (result) => setPosts(result)
                )
            },[])
  if (posts?.length === 0) {
        return <Loader />;
    }
    return(
        <>
        <React.Fragment>
        <Row>
        <Col md={3} xxl={2} className="ml-2">
        <RightSidebar />
        </Col>
        <Col>
        <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center w-full max-w-6xl sm:mx-auto my-2 sm:my-4 px-4">
          <Post />
          <Explore_Feed
          isExplore={posts}
          isLibrary={false}
          isYourPosts={false}
          isSearch={false}
          isProfile={false}
          isFollower={false}
          homePosts={false}
        />
          </div>
        </Col>
        <Col>
        <Widgets />
        </Col>
        </Row>
        
          
        
        
        
        </React.Fragment>
        </>
    );
}
export default Explore