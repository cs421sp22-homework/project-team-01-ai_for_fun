import React, { Fragment, useState, PureComponent } from "react";
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Slideshow from "../components/Slideshow";
import SlideshowInMode from "../components/recommend-in-mode/SlideshowInMode";
import Card from 'react-bootstrap/Card'
import UploadPic from '../components/UploadPic';
import '../style/Slideshow.css';
import '../style/sider.css';
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
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    UploadOutlined,
    VideoCameraOutlined,
    UserAddOutlined,
    UserDeleteOutlined,
    UsergroupAddOutlined,
    MailOutlined

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
export const AI_face = () => {
    const [collapsed, setCollapsed] = useState(false);
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
            <Layout hasSider>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}
                    theme="dark" width='35%' collapsedWidth='5%'
                    style={{
                        height: 'auto',
                        width: '100%',
                        // overflow: 'auto',
                        // position: 'fixed',
                    }}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}>

                        <SubMenu key="sub1" icon={<UserAddOutlined />} title="For you">
                            <SlideshowInMode imgData={tempimage} />
                        </SubMenu>
                        <SubMenu key="sub2" icon={<UserDeleteOutlined />} title="Recent popular topic">
                            <SlideshowInMode imgData={tempimage} />
                        </SubMenu>
                        <SubMenu key="sub3" icon={<UserOutlined />} title="celebrity image">
                            <SlideshowInMode imgData={tempimage} />
                        </SubMenu>
                        <SubMenu key="sub4" icon={<UsergroupAddOutlined />} title="animal image">
                            <SlideshowInMode imgData={tempimage} />
                        </SubMenu>
                    </Menu>

                </Sider>

                <Layout className="site-layout" style={{ marginLeft: 0 }}>
                    <Header className="site-layout-background" style={{ padding: 0, textAlign: 'center', background: '#f0f0f0' }} > <h2>AI FACE</h2></Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ padding: 0, textAlign: 'center' }}>
                            <EditVideo imgData={tempimage} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};