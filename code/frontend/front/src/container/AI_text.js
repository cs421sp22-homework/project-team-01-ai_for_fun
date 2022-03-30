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
const leftData = [
    { imgUrl: 'https://static01.nyt.com/images/2021/01/20/us/politics/20Biden-profile-top/20Biden-profile-top-superJumbo.jpg', name: 'biden', person: '0' },
    { imgUrl: 'https://media.vanityfair.com/photos/6226893d6df0fdac83f860fe/master/w_2560%2Cc_limit/487401374', name: 'trump', person: '1' },
    { imgUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80', name: 'nobody', person: '2' },
    // { imgUrl: 'https://static01.nyt.com/images/2021/01/20/us/politics/20Biden-profile-top/20Biden-profile-top-superJumbo.jpg', name: 'biden', topic: '' },
    // { imgUrl: 'https://media.vanityfair.com/photos/6226893d6df0fdac83f860fe/master/w_2560%2Cc_limit/487401374', name: 'trump', topic: '' },
    // { imgUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80', name: 'nobody', topic: '' },
    // { imgUrl: 'https://static01.nyt.com/images/2021/01/20/us/politics/20Biden-profile-top/20Biden-profile-top-superJumbo.jpg', name: 'biden', topic: '' },
    // { imgUrl: 'https://media.vanityfair.com/photos/6226893d6df0fdac83f860fe/master/w_2560%2Cc_limit/487401374', name: 'trump', topic: '' },
    // { imgUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80', name: 'nobody', topic: '' },
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
    const onChangeText = e => {
        // console.log('Change:', e.target.value);
        inputText = e.target.value;
    };
    const handleInput = e => {
        console.log('input: ', inputText);
    }

    return (
        <> <Layout hasSider>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}
                theme="dark" width='10%' collapsedWidth='5%'
                style={{
                    height: 'auto',
                    width: '100%',
                    // overflow: 'auto',
                    // position: 'fixed',
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}>
                    < CollectionInLeft leftSourceImg={leftData} />
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 0 }}>
                <Header className="site-layout-background" style={{ padding: 0, textAlign: 'center', background: '#f0f0f0' }} > <h2>AI Voice</h2></Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <Content style={{ margin: '0 16px' }} className='center-box'>
                        <Row>
                            <Col md={1} xl={2}> </Col>
                            <Col md={10} xl={8}>
                                <center>
                                    {console.log(dst)}
                                    {dst ?
                                        <Image src={dst} style={{ minHeight: "40vh" }} fluid />
                                        :
                                        sourceimg ?
                                            <Image src={sourceimg} style={{ minHeight: "40vh" }} fluid />
                                            :
                                            <Video props={tempvideo} />
                                    }
                                    {console.log(person)}
                                </center>
                            </Col>
                            <Col md={1} xl={2}></Col>
                        </Row>
                    </Content>
                    <div className="site-layout-background" style={{ padding: 0, textAlign: 'center' }}>
                        <h3 style={{ margin: 10 }}>Please input the content you would like to manipulate</h3>
                        <TextArea showCount maxLength={100} style={{ height: 100, margin: 25 }} onChange={onChangeText} />,
                        <Button variant="outline-dark" size="lg" onClick={handleInput}>Continue</Button>{' '}
                    </div>
                </Content>
            </Layout>
        </Layout>
        </>
    );
};