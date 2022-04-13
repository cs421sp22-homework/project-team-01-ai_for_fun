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
import EditStyle from './EditStyle';

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


export const AI_style = (props) => {
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
                    <EditStyle imgData={tempimage} />
                </Col>
            </Row>
        </>
    );
};

const tempvideo = {
    videoSrc: "http://media.w3.org/2010/05/bunny/movie.mp4",
    poster: "https://epe.brightspotcdn.com/f8/ca/abde5f4f4a30a6a3d1a0eaa23821/test-032021-968416412.jpg"
}

const tempimage = [
    { imgUrl: 'https://s1.r29static.com/bin/entry/43a/0,200,2000,2000/x,80/1536749/image.jpg', name: '01', topic: 'Star' },
    { imgUrl: 'https://hips.hearstapps.com/cosmouk.cdnds.net/15/33/1439714614-celebrity-face-mashups-taylor-swift-emma-watson.jpg', name: '02', topic: 'House' },
    { imgUrl: 'https://stylesatlife.com/wp-content/uploads/2021/11/Emma-Watson-face-shape.jpg.webp', name: '03', topic: 'New Year' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScxopB3Y_Z0Yu1v5JpXdx-3NOKX7yqg1iIHg&usqp=CAU', name: '04', topic: 'Amazing' },
    { imgUrl: 'https://c4.wallpaperflare.com/wallpaper/485/848/917/actresses-mckenna-grace-actress-blonde-blue-eyes-hd-wallpaper-preview.jpg', name: '05', topic: 'Fashion' },
]
const leftData = [
    { imgUrl: 'https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg', name: '24', topic: 'Vincent van Gogh' },
    { imgUrl: 'https://www.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e/full/843,/0/default.jpg', name: '25', topic: 'Vincent van Gogh' },
    { imgUrl: 'https://www.artic.edu/iiif/2/9ea77636-76e9-9031-6b92-ff34512d7cbc/full/843,/0/default.jpg', name: '26', topic: 'Vincent van Gogh' },
    { imgUrl: 'https://www.artic.edu/iiif/2/d0ff5b36-bb38-b156-6042-5c8545352c2f/full/843,/0/default.jpg', name: '27', topic: 'Vincent van Gogh' },
    { imgUrl: 'https://www.artic.edu/iiif/2/92827fc4-78a3-a263-75a2-6470eabad38b/full/843,/0/default.jpg', name: '28', topic: 'Vincent van Gogh' },
    { imgUrl: 'https://www.artic.edu/iiif/2/43fcfad0-8256-4923-9f9c-03ca90417907/full/843,/0/default.jpg', name: '29', topic: 'Vincent van Gogh' },
    { imgUrl: 'https://www.artic.edu/iiif/2/f11bd233-6cc3-4221-59eb-f7363be4119e/full/843,/0/default.jpg', name: '29', topic: 'Vincent van Gogh' },
    { imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Claude_Monet_Water_Lilies_1908.jpg/800px-Claude_Monet_Water_Lilies_1908.jpg', name: '29', topic: 'Les Nymphéas' },
    { imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Nympheas_71293_3.jpg/1280px-Nympheas_71293_3.jpg', name: '29', topic: 'Les Nymphéas' },
    { imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Claude_Monet_-_Water-Lilies_%28Bridgestone_Museum%29.jpg', name: '29', topic: 'Les Nymphéas' },
    { imgUrl: 'https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc4NTk4NjgxNjM0NTI3/hith-art-heists-scream-2.jpg', name: '29', topic: 'Style' },
    { imgUrl: 'https://artincontext.org/wp-content/uploads/2021/10/Famous-Portrait-Paintings-848x530.jpg', name: '29', topic: 'Style' },
    { imgUrl: 'https://wallpaperaccess.com/full/2614.jpg', name: '29', topic: 'Style' },
    { imgUrl: 'https://i.pinimg.com/736x/45/45/4c/45454cdf18790c0eaf4390aad5ea04fe.jpg', name: '29', topic: 'Style' },
    { imgUrl: 'https://frenchquest.files.wordpress.com/2014/04/monet-impression-sunrise.jpg', name: '30', topic: 'Style' },
    { imgUrl: 'https://www.discoverlosangeles.com/sites/default/files/images/2019-01/Getty%20Center%20Van%20Gogh%20Irises.jpg', name: '31', topic: 'Style' },
    { imgUrl: 'https://i.pinimg.com/originals/0d/34/f0/0d34f0ffab6ae81e6e60e1293be046a2.jpg', name: '32', topic: 'Style' },
    { imgUrl: 'https://theawesomedaily.com/wp-content/uploads/2016/12/famous-paintings-1-1.jpg', name: '33', topic: 'Style' },
    { imgUrl: 'https://artlogic-res.cloudinary.com/w_1200,h_800,c_fill,f_auto,fl_lossy,q_auto:good/ws-canvasgallery/usr/images/blog_entries/main_image/items/62/624b23f8789441b598e404ea116b41c4/waterlillies-john-myatt.jpg', name: '34', topic: 'Style' },
    { imgUrl: 'https://www.touropia.com/gfx/b/2010/10/the_great_wave_off_kanagawa.jpg', name: '35', topic: 'Style' },
    { imgUrl: 'https://i.insider.com/4ef4ba36eab8eafb64000035?width=600&format=jpeg&auto=webp', name: '36', topic: 'Style' },
    { imgUrl: 'https://el-paso-museum-of-art-production.s3.amazonaws.com/collections/images/000/000/001/optimized/ButlerFireworks.jpg?1516832871', name: '37', topic: 'Style' },
    { imgUrl: 'https://sep.yimg.com/ty/cdn/madisonartshop/most-famous-paintings-16.jpg?t=1628119938&', name: '38', topic: 'Style' },
    { imgUrl: 'https://bocadolobo.com/blog/wp-content/uploads/2020/10/Some-of-The-Most-Famous-Artists-Of-All-Time-4.jpg', name: '39', topic: 'Style' },
    { imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/1024px-Vincent_Willem_van_Gogh_127.jpg', name: '40', topic: 'Style' },
    //{ imgUrl: '', name: '34', topic: 'Style' },
]
