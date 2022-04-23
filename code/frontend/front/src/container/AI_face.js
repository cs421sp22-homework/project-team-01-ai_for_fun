import React, {useState} from "react";
import EditVideo from './EditVideo';
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import { Row, Col} from 'react-bootstrap';
import SlideshowInMode from "../components/recommend-in-mode/SlideshowInMode";
import '../style/Slideshow.css';
import '../style/sider.css';
import '../style/AI_face.css'


import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    UserAddOutlined,
    UserDeleteOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';

const {Content, Sider } = Layout;
const { SubMenu } = Menu;

export const AI_face = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectTab, setSelectTab] = useState("first");
    const [selectTab1, setSelectTab1] = useState(true);
    const [selectTab2, setSelectTab2] = useState(false);
    const [selectTab3, setSelectTab3] = useState(false);
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
                <Sider
                    theme="light" width='32%' collapsedWidth='5%'
                    style={{
                        height: 'auto',
                        width: '100%',
                        // overflow: 'auto',
                        // position: 'fixed',
                    }}
                >
                    {/* <div className="logo" /> */}
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row style={{height:"100%"}}>
                            <Col sm={3} style={{borderRight:"2px solid #E2E1E2"}}>
                            <Nav justify variant="pills" className="flex-column myNav">
                                <Nav.Item>
                                    <Nav.Link eventKey="first" 
                                    onClick={() => {setSelectTab("first")}} 
                                    onMouseEnter ={() => {setSelectTab1(true)}}
                                    onMouseLeave ={() => {setSelectTab1(false)}}>
                                    <img src={(selectTab=="first"||selectTab1)?"AI_face_images/face_active.png":"AI_face_images/face_inactive.png"} width="40" height="40" style={{marginTop:"25%"}}/>
                                    <p>Face</p>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second" 
                                    onClick={() => {setSelectTab("second")}} 
                                    onMouseEnter ={() => {setSelectTab2(true)}}
                                    onMouseLeave ={() => {setSelectTab2(false)}}>
                                        <img src={(selectTab=="second"||selectTab2)?"AI_face_images/popular_active.png":"AI_face_images/popular_inactive.png"} width="40" height="40" style={{marginTop:"25%"}}/>
                                        <p>Popular</p>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                        <Nav.Link eventKey="third" 
                                        onClick={() => {setSelectTab("third")}} 
                                        onMouseEnter ={() => {setSelectTab3(true)}}
                                        onMouseLeave ={() => {setSelectTab3(false)}}>
                                        <img src={(selectTab=="third" ||selectTab3)?"AI_face_images/history_active.png":"AI_face_images/history_inactive.png"} width="40" height="40" style={{marginTop:"25%"}}/>
                                        <p>History</p>
                                        </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            </Col>
                            <Col sm={9}>
                            <Tab.Content >
                                <Tab.Pane eventKey="first">
                                    <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4','sub5', 'sub6', 'sub7', 'sub8']}>
                                        <SubMenu key="sub1" title="Singers">
                                            <SlideshowInMode imgData={Face_Singers} />
                                        </SubMenu>
                                        <SubMenu key="sub2" title="Meme">
                                            <SlideshowInMode imgData={Face_Meme} />
                                        </SubMenu>
                                        <SubMenu key="sub3" title="Moive Star">
                                            <SlideshowInMode imgData={Movie} />
                                        </SubMenu>
                                        <SubMenu key="sub4" title="Friends Meme">
                                            <SlideshowInMode imgData={Friends} />
                                        </SubMenu>
                                        <SubMenu key="sub5" title="President">
                                            <SlideshowInMode imgData={Face_Singers} />
                                        </SubMenu>
                                        <SubMenu key="sub6" title="Game of Thrones">
                                            <SlideshowInMode imgData={Face_Meme} />
                                        </SubMenu>
                                        <SubMenu key="sub7" title="Harry Potter">
                                            <SlideshowInMode imgData={Movie} />
                                        </SubMenu>
                                        <SubMenu key="sub8"  title="Marvel">
                                            <SlideshowInMode imgData={Friends} />
                                        </SubMenu>
                                    </Menu>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                <p>Popular</p>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                <p>History</p>
                                </Tab.Pane>
                            </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                   
                </Sider >

                <Layout className="site-layout" style={{ marginLeft: 0 }}>
                     <h2 style={{marginTop:"2%", textAlign: "center", fontFamily:"'Times New Roman', Times, serif"}}>FACE SWAP</h2>
                    <Content style={{overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ padding: 0, textAlign: 'center' }}>
                            <EditVideo imgData={tempimage} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

const tempimage = [
    { imgUrl: 'https://s1.r29static.com/bin/entry/43a/0,200,2000,2000/x,80/1536749/image.jpg', name: '01', topic: 'Star' },
    { imgUrl: 'https://hips.hearstapps.com/cosmouk.cdnds.net/15/33/1439714614-celebrity-face-mashups-taylor-swift-emma-watson.jpg', name: '02', topic: 'House' },
    { imgUrl: 'https://stylesatlife.com/wp-content/uploads/2021/11/Emma-Watson-face-shape.jpg.webp', name: '03', topic: 'New Year' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScxopB3Y_Z0Yu1v5JpXdx-3NOKX7yqg1iIHg&usqp=CAU', name: '04', topic: 'Amazing' },
    { imgUrl: 'https://c4.wallpaperflare.com/wallpaper/485/848/917/actresses-mckenna-grace-actress-blonde-blue-eyes-hd-wallpaper-preview.jpg', name: '05', topic: 'Fashion' },
  ]
const Face_Singers = [
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdA_-rNSScGyaVKRkA7FkHsjVlbxjIYihtYA&usqp=CAU', name: '01', topic: 'Star' },
    { imgUrl: 'data:image/jpeg;base64,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', name: '02', topic: 'House' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5FbK5cYcUxvmo7Of1VS7K4PrHNXWIpL-xTQ&usqp=CAU', name: '03', topic: 'New Year' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1qbk5DdWrBQ7GTegjZ_5bJpr-J8l3o2wlTw&usqp=CAU', name: '04', topic: 'Amazing' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlbYB7DxCZwteEaHnLHIw4WWKaoZoCH_RKTA&usqp=CAU', name: '05', topic: 'Fashion' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9v0ICFWny_eh_HBw7yw4p44nVYOboJIXpIQ&usqp=CAU', name: '06', topic: 'Face' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWS2o9Xhju8jsP3zCwsas--mqZYvwaAQFMww&usqp=CAU', name: '07', topic: 'Good' },
];

const Face_Meme = [
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTehUF4TMPXq4SQl7Q7wBpdA3xcJgemteYx0w&usqp=CAU', name: 'meme_01', topic: 'Star' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqhAQBMNMwl6bAhZ4XapoYXPGAqnQdh_ZKLA&usqp=CAU', name: 'meme_02', topic: 'House' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtP21VeYsM2-brbdMVppIsS8HQ5UfiZxDfQg&usqp=CAU', name: 'meme_03', topic: 'New Year' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKS5w4ofrL3jGVI1-o1wcfFC7FMzJ64oWWFg&usqp=CAU', name: 'meme_04', topic: 'Amazing' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ74l3eSS-cqR5RdNSD_2SH5S3t6DX3JHCuqQ&usqp=CAU', name: '05', topic: 'Fashion' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiuMzoVpJ1O9tRNwKq32s5d7F3QTImE_-0eQ&usqp=CAU', name: '06', topic: 'Face' },
];

const Friends = [
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFLysfblilvBqTDNXvMILLekdjUW2-PsEKtg&usqp=CAU', name: '01', topic: 'Star' },
    { imgUrl: 'https://d207ibygpg2z1x.cloudfront.net/image/upload/v1541181492/articles_upload/content/nsafehc82lfmkwroe1tg.jpg', name: '02', topic: 'House' },
    { imgUrl: 'https://www.irishexaminer.com/cms_media/module_img/4972/2486069_10_seoimage1x1_E2jArIRWUAM-0jT.jpg', name: '03', topic: 'New Year' },
    { imgUrl: 'https://static3.srcdn.com/wordpress/wp-content/uploads/2019/08/Joey-Tribbiani.jpg', name: '04', topic: 'Amazing' },
    { imgUrl: 'https://i.pinimg.com/originals/f7/30/a0/f730a00f24b13da6d2012b7094683621.jpg', name: '05', topic: 'Fashion' },
    { imgUrl: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/11/09/11/joey-friends.jpg?quality=75&width=982&height=726&auto=webp', name: '06', topic: 'Face' },
    { imgUrl: 'https://st1.latestly.com/wp-content/uploads/2020/07/01-15-380x214.jpg', name: '07', topic: 'Good' },
];
const Movie = [
    { imgUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/index-actors-got-their-start-on-tv-1607725466.jpg?crop=0.409xw:0.817xh;0.0529xw,0.00962xh&resize=640:*', name: 'movie_01', topic: 'Movie' },
    { imgUrl: 'https://media1.popsugar-assets.com/files/thumbor/PkVi0CfVJtMbJLOLQacIadEpZ0c/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2015/12/03/761/n/1922283/a80bb7bf_edit_img_image_33388244_1447776000/i/Movie-Stars-Who-Started-Out-TV.jpg', name: 'movie_02', topic: 'Movie' },
    { imgUrl: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTYxNTEwNTM2ODQyODQ3NDQ0/will-smith-men-in-black.jpg', name: '04', topic: 'Amazing' },
    { imgUrl: 'https://media.workandmoney.com/64/f6/64f66bf1508f415fbb5ab0a64eda450d.jpeg', name: '05', topic: 'Fashion' },
    { imgUrl: 'https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/04/2560x3532/gettyimages-476575055.jpg?resize=480:*', name: '06', topic: 'Face' },
    { imgUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gal-gadot-attends-the-2020-vanity-fair-oscar-party-hosted-news-photo-1591212178.jpg?crop=1xw:0.99975xh;center,top&resize=480:*', name: '07', topic: 'Good' },
];