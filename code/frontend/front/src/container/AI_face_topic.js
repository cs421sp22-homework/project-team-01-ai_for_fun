import React, { Fragment, useState, PureComponent } from "react";
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Slideshow from "../components/Slideshow";
import SlideshowInMode from "../components/recommend-in-mode/SlideshowInMode";
import Card from 'react-bootstrap/Card'
import UploadPic from '../components/UploadPic';
// import '../style/Slideshow.css';
// import '../style/sider.css';
// import UploadFile from "../components/UploadFile";
// import FaceResult from "../components/FaceResult";
import SlidesShowInLeft from "../components/recommend-in-mode/SlidesShowInLeft";
import CollectionInLeft from "../components/recommend-in-mode/CollectionInLeft";
import Video from '../components/Video';
import UploadFace from '../components/UploadFace';
import EditVideo from './EditVideo';

import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,

} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const tempvideo = {
    videoSrc: "http://media.w3.org/2010/05/bunny/movie.mp4",
    poster: "https://epe.brightspotcdn.com/f8/ca/abde5f4f4a30a6a3d1a0eaa23821/test-032021-968416412.jpg"
}

const tempimage = [
    { imgUrl: './img/01.png', name: '01', topic: 'Star' },
    { imgUrl: './img/02.png', name: '02', topic: 'House' },
    { imgUrl: './img/03.png', name: '03', topic: 'New Year' },
    { imgUrl: './img/04.png', name: '04', topic: 'Amazing' },
    { imgUrl: './img/05.png', name: '05', topic: 'Fashion' },
    { imgUrl: './img/06.png', name: '06', topic: 'Face' },
    { imgUrl: './img/07.png', name: '07', topic: 'Good' },
]
const leftData = [
    { imgUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/index-actors-got-their-start-on-tv-1607725466.jpg?crop=0.409xw:0.817xh;0.0529xw,0.00962xh&resize=640:*', name: 'movie_01', topic: 'Movie' },
    { imgUrl: 'https://media1.popsugar-assets.com/files/thumbor/PkVi0CfVJtMbJLOLQacIadEpZ0c/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2015/12/03/761/n/1922283/a80bb7bf_edit_img_image_33388244_1447776000/i/Movie-Stars-Who-Started-Out-TV.jpg', name: 'movie_02', topic: 'Movie' },
    { imgUrl: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTYxNTEwNTM2ODQyODQ3NDQ0/will-smith-men-in-black.jpg', name: '04', topic: 'Amazing' },
    { imgUrl: 'https://media.workandmoney.com/64/f6/64f66bf1508f415fbb5ab0a64eda450d.jpeg', name: '05', topic: 'Fashion' },
    { imgUrl: 'https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/04/2560x3532/gettyimages-476575055.jpg?resize=480:*', name: '06', topic: 'Face' },
    { imgUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gal-gadot-attends-the-2020-vanity-fair-oscar-party-hosted-news-photo-1591212178.jpg?crop=1xw:0.99975xh;center,top&resize=480:*', name: '07', topic: 'Good' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFLysfblilvBqTDNXvMILLekdjUW2-PsEKtg&usqp=CAU', name: '01', topic: 'Star' },
    { imgUrl: 'https://d207ibygpg2z1x.cloudfront.net/image/upload/v1541181492/articles_upload/content/nsafehc82lfmkwroe1tg.jpg', name: '02', topic: 'House' },
    { imgUrl: 'https://www.irishexaminer.com/cms_media/module_img/4972/2486069_10_seoimage1x1_E2jArIRWUAM-0jT.jpg', name: '03', topic: 'New Year' },
    { imgUrl: 'https://static3.srcdn.com/wordpress/wp-content/uploads/2019/08/Joey-Tribbiani.jpg', name: '04', topic: 'Amazing' },
    { imgUrl: 'https://i.pinimg.com/originals/f7/30/a0/f730a00f24b13da6d2012b7094683621.jpg', name: '05', topic: 'Fashion' },
    { imgUrl: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/11/09/11/joey-friends.jpg?quality=75&width=982&height=726&auto=webp', name: '06', topic: 'Face' },
    { imgUrl: 'https://st1.latestly.com/wp-content/uploads/2020/07/01-15-380x214.jpg', name: '07', topic: 'Good' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTehUF4TMPXq4SQl7Q7wBpdA3xcJgemteYx0w&usqp=CAU', name: 'meme_01', topic: 'Star' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqhAQBMNMwl6bAhZ4XapoYXPGAqnQdh_ZKLA&usqp=CAU', name: 'meme_02', topic: 'House' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtP21VeYsM2-brbdMVppIsS8HQ5UfiZxDfQg&usqp=CAU', name: 'meme_03', topic: 'New Year' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKS5w4ofrL3jGVI1-o1wcfFC7FMzJ64oWWFg&usqp=CAU', name: 'meme_04', topic: 'Amazing' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ74l3eSS-cqR5RdNSD_2SH5S3t6DX3JHCuqQ&usqp=CAU', name: '05', topic: 'Fashion' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiuMzoVpJ1O9tRNwKq32s5d7F3QTImE_-0eQ&usqp=CAU', name: '06', topic: 'Face' },
]

export const AI_face_topic = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    // const { leftData } = tempimage_1;
    const onCollapse = collapsed => {
        console.log(collapsed);
        if (collapsed) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    };

    return (
        <>
            <Row style={{ height: '100%' }}>
                <Col xs={3}>
                    < CollectionInLeft leftSourceImg={leftData} />
                </Col>
                <Col xs={9}>
                    <EditVideo imgData={tempimage} />
                </Col>
            </Row>
            {/*
            <Layout style={{ minHeight: '100%' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} theme="light" width='350' collapsedWidth='100'>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        < SlidesShowInLeft />
                        < CollectionInLeft />
                    </Menu>
                </Sider>

                <Layout className="site-layout">
                    <FaceResult />
                    <UploadFile /> 
                    <Video props={tempvideo} /> 
                    <EditVideo imgData={tempimage} />
                </Layout>
            </Layout>
        */}

        </>
    );
};