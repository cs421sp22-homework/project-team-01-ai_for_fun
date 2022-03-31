import React, { Fragment, PureComponent } from "react";
import { useState, createRef, useContext } from 'react';
import { Image } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Slideshow from "../components/Slideshow";
import SlideshowInMode from "../components/recommend-in-mode/SlideshowInMode";
import Card from 'react-bootstrap/Card'
import UploadPic from '../components/UploadPic';
import { LoginContext } from '../context/AuthProvider';
// import '../style/Slideshow.css';
// import '../style/sider.css';
// import UploadFile from "../components/UploadFile";
// import FaceResult from "../components/FaceResult";
import SlidesShowInLeft from "../components/recommend-in-mode/SlidesShowInLeft";
import CollectionInLeft from "../components/recommend-in-mode/CollectionInLeft";
import Video from '../components/Video';
import UploadFace from '../components/UploadFace';
import EditVideo from './EditVideo';
import EditText from '../components/EditText';

import { ToggleButton, ToggleButtonGroup, ButtonGroup, Button } from 'react-bootstrap';
import { Layout, Menu, Breadcrumb, Input } from 'antd';
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
const { TextArea } = Input;

const tempvideo = {
    videoSrc: "http://media.w3.org/2010/05/bunny/movie.mp4",
    poster: "https://epe.brightspotcdn.com/f8/ca/abde5f4f4a30a6a3d1a0eaa23821/test-032021-968416412.jpg"
}

// const tempimage = [
//     { imgUrl: 'https://s1.r29static.com/bin/entry/43a/0,200,2000,2000/x,80/1536749/image.jpg', name: '01', topic: 'Star' },
//     { imgUrl: 'https://hips.hearstapps.com/cosmouk.cdnds.net/15/33/1439714614-celebrity-face-mashups-taylor-swift-emma-watson.jpg', name: '02', topic: 'House' },
//     { imgUrl: 'https://stylesatlife.com/wp-content/uploads/2021/11/Emma-Watson-face-shape.jpg.webp', name: '03', topic: 'New Year' },
//     { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScxopB3Y_Z0Yu1v5JpXdx-3NOKX7yqg1iIHg&usqp=CAU', name: '04', topic: 'Amazing' },
//     { imgUrl: 'https://c4.wallpaperflare.com/wallpaper/485/848/917/actresses-mckenna-grace-actress-blonde-blue-eyes-hd-wallpaper-preview.jpg', name: '05', topic: 'Fashion' },
// ]
// const standardImg = [
//     { imgUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80', name: 'nobody', person: '2' },
// ]
// const bidenImg = [
//     { imgUrl: 'https://static01.nyt.com/images/2021/01/20/us/politics/20Biden-profile-top/20Biden-profile-top-superJumbo.jpg', name: 'biden', person: '0' }
// ]

const trumpImg = [
    { imgUrl: 'https://media.vanityfair.com/photos/6226893d6df0fdac83f860fe/master/w_2560%2Cc_limit/487401374', name: 'trump', person: '1' },
]

export const AI_text = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const { faceimg, setFaceimg, sourceimg, dst, setDst, setSourceimg, setPerson, person } = useContext(LoginContext);
    var inputText = "empty";

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
            <Layout hasSider>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}
                    theme="dark" width='30%' collapsedWidth='5%'
                    style={{
                        height: 'auto',
                        width: '100%',
                        // overflow: 'auto',
                        // position: 'fixed',
                    }}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}>
                        <SubMenu key="sub1" icon={<UserAddOutlined />} title="Standard Voice">
                            <Image
                                width={'100%'}
                                onClick={() => {
                                    setDst('');
                                    setSourceimg("https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80")
                                    setPerson("2")
                                }}
                                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                            />
                        </SubMenu>
                        <SubMenu key="sub2" icon={<UserDeleteOutlined />} title="Joe Bide">
                            <Image
                                width={'100%'}
                                onClick={() => {
                                    setDst('');
                                    setSourceimg("https://static01.nyt.com/images/2021/01/20/us/politics/20Biden-profile-top/20Biden-profile-top-superJumbo.jpg")
                                    setPerson("0")
                                }}
                                src="https://static01.nyt.com/images/2021/01/20/us/politics/20Biden-profile-top/20Biden-profile-top-superJumbo.jpg"
                            />
                        </SubMenu>
                        <SubMenu key="sub3" icon={<UserOutlined />} title="Donald J. Trump">
                            <Image
                                width={'100%'}
                                onClick={() => {
                                    setDst('');
                                    setSourceimg("https://media.vanityfair.com/photos/6226893d6df0fdac83f860fe/master/w_2560%2Cc_limit/487401374")
                                    setPerson("1")
                                }}
                                src="https://media.vanityfair.com/photos/6226893d6df0fdac83f860fe/master/w_2560%2Cc_limit/487401374"
                            />
                        </SubMenu>

                    </Menu>
                </Sider>

                <Layout className="site-layout" style={{ marginLeft: 0 }}>
                    <Header className="site-layout-background" style={{ padding: 0, textAlign: 'center', background: '#f0f0f0' }} > <h2>AI Text</h2></Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ padding: 0, textAlign: 'center' }}>
                            <EditText imgData={trumpImg} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};