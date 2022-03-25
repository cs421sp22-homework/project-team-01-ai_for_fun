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
    { imgUrl: 'https://media1.popsugar-assets.com/files/thumbor/0ebv7kCHr0T-_O3RfQuBoYmUg1k/475x60:1974x1559/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/023/n/1922398/9f849ffa5d76e13d154137.01128738_/i/Taylor-Swift.jpg', name: 'singers_1', topic: 'Singers' },
    { imgUrl: 'https://cdn.vox-cdn.com/thumbor/84BoAJ5wM2CSqDoaTOZNBnPDU4U=/0x0:2040x1360/1200x675/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/63940677/jbareham_190520_0907_got_0004.0.jpg', name: '04', topic: 'Game of Thrones' },
    { imgUrl: 'https://www.researchgate.net/profile/Giulia-Bini/publication/331639939/figure/fig2/AS:734865725063171@1552217050976/Template-and-propagation-of-the-Success-Kid-meme-source-Google-search-Sept-18.jpg', name: 'meme_01', topic: 'Meme' },
    { imgUrl: 'https://img-9gag-fun.9cache.com/photo/agA21oW_460s.jpg', name: '06', topic: 'Face' },
    { imgUrl: 'https://www.filmcompanion.in/wp-content/uploads/2020/07/film-comapnion-Joey-Lead-2.jpg', name: 'friends_1', topic: 'Friends' },
    { imgUrl: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5ODc1NTM4NjMyOTc2Mzcz/gettyimages-693134468.jpg', name: 'movieStart_1', topic: 'Movie Stars' },
    { imgUrl: 'https://img-9gag-fun.9cache.com/photo/agA21oW_460s.jpg', name: '06', topic: 'Face' },
    { imgUrl: 'https://www.filmcompanion.in/wp-content/uploads/2020/07/film-comapnion-Joey-Lead-2.jpg', name: 'friends_1', topic: 'Friends' },
    { imgUrl: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5ODc1NTM4NjMyOTc2Mzcz/gettyimages-693134468.jpg', name: 'movieStart_1', topic: 'Movie Stars' },
    { imgUrl: 'https://cdn.vox-cdn.com/thumbor/84BoAJ5wM2CSqDoaTOZNBnPDU4U=/0x0:2040x1360/1200x675/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/63940677/jbareham_190520_0907_got_0004.0.jpg', name: '04', topic: 'Game of Thrones' },
    { imgUrl: 'https://cdn.vox-cdn.com/thumbor/6tDpDw_t5UhkGyU3pMLcPjvudD0=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/12861241/acastro_180403_1777_youtube_0002.0.jpg', name: '07', topic: 'Vedio Model' },
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