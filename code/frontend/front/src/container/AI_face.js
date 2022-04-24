import React, {useState} from "react";
import EditVideo from './EditVideo';
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import { Row, Col} from 'react-bootstrap';
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
import AIStyleGallery from "./AIStyleGallery";
import AIFaceGallery from "./AIFaceGallery";
import AIFaceHistory from "./AIFaceHistory";

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
                                    <AIFaceGallery title="Movie Star" images={Movie}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                <p>Popular</p>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                <AIFaceHistory />
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
                            <EditVideo />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

const Movie = [
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/index-actors-got-their-start-on-tv-1607725466.jpg?crop=0.409xw:0.817xh;0.0529xw,0.00962xh&resize=640:*', 
    'https://media1.popsugar-assets.com/files/thumbor/PkVi0CfVJtMbJLOLQacIadEpZ0c/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2015/12/03/761/n/1922283/a80bb7bf_edit_img_image_33388244_1447776000/i/Movie-Stars-Who-Started-Out-TV.jpg',
    'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTYxNTEwNTM2ODQyODQ3NDQ0/will-smith-men-in-black.jpg', 
    'https://media.workandmoney.com/64/f6/64f66bf1508f415fbb5ab0a64eda450d.jpeg', 
    'https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/04/2560x3532/gettyimages-476575055.jpg?resize=480:*', 
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gal-gadot-attends-the-2020-vanity-fair-oscar-party-hosted-news-photo-1591212178.jpg?crop=1xw:0.99975xh;center,top&resize=480:*', 
];