import React, { Fragment, PureComponent } from "react";
import { useState, createRef, useContext } from 'react';
import { Container, Image } from 'react-bootstrap';
import { LoginContext } from '../context/AuthProvider';
import EditText from '../components/EditText';
import { Layout, Menu, Input, Col, Row } from 'antd';
const { Header, Content, } = Layout;


const trumpImg = [
    { imgUrl: 'https://media.vanityfair.com/photos/6226893d6df0fdac83f860fe/master/w_2560%2Cc_limit/487401374', name: 'trump', person: '1' },
]

export const AI_text = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const { setDst, setSourceimg, setPerson } = useContext(LoginContext);

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
            <Container style={{ marginTop: '6%' }}>
                <Header className="site-layout-background" style={{ padding: 0, textAlign: 'center', background: 'white', marginTop: 20 }} > <h2>AI Text to Audio</h2></Header>
                <Layout className="site-layout" style={{ background: 'white' }}>
                    <Content>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={6} style={style}>
                                <Row style={{ borderBlockColor: 'Black', textAlign: 'center' }} onClick={() => {
                                    setDst('');
                                    setSourceimg("https://64.media.tumblr.com/971da5e710cd33ce4acfaec9902d6137/c5766a70deeb9df7-76/s1280x1920/484d0783f13728ca6ee2ff19759bf4264509774f.png");
                                    setPerson('ludwig-von-drake');
                                }}>
                                    <Col style={{ marginTop: 10, marginBottom: 10, marginLeft: 15 }}>
                                        <Image
                                            style={circle}
                                            src="https://64.media.tumblr.com/971da5e710cd33ce4acfaec9902d6137/c5766a70deeb9df7-76/s1280x1920/484d0783f13728ca6ee2ff19759bf4264509774f.png"
                                        /></Col>
                                    <Col style={{ marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                                        <div >Ludwing Von Drake</div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="gutter-row" span={6} style={style}>
                                <Row onClick={() => {
                                    setDst('');
                                    setSourceimg("https://www.disneyonice.com/sites/default/files/2020-10/quackers-donald-featured.jpg");
                                    setPerson('donald-duck');
                                }}>
                                    <Col style={{ marginTop: 10, marginBottom: 10, marginLeft: 15 }}>
                                        <Image
                                            style={circle}
                                            src="https://www.disneyonice.com/sites/default/files/2020-10/quackers-donald-featured.jpg"
                                        />
                                    </Col>
                                    <Col style={{ marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                                        <div >Donald Duck</div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="gutter-row" span={6} style={style}>
                                <Row onClick={() => {
                                    setDst('');
                                    setSourceimg("https://d23.com/app/uploads/2020/05/1180w-600h_060120_mickey-mornings-launch.jpg");
                                    setPerson('mickey-mouse');
                                }}>
                                    <Col style={{ marginTop: 10, marginBottom: 10, marginLeft: 15 }}>
                                        <Image
                                            style={circle}
                                            src="https://d23.com/app/uploads/2020/05/1180w-600h_060120_mickey-mornings-launch.jpg"
                                        />
                                    </Col>
                                    <Col style={{ marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                                        <div >Mickey Mouse</div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="gutter-row" span={6} style={style}>
                                <Row onClick={() => {
                                    setDst('');
                                    setSourceimg("https://d23.com/app/uploads/2013/04/1180w-600h_minnie-mouse_1.jpg");
                                    setPerson('minnie-mouse');
                                }}>
                                    <Col style={{ marginTop: 10, marginBottom: 10, marginLeft: 15 }}>
                                        <Image
                                            style={circle}
                                            src="https://d23.com/app/uploads/2013/04/1180w-600h_minnie-mouse_1.jpg"
                                        />
                                    </Col>
                                    <Col style={{ marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                                        <div >Minnie Mouse</div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row gutter={16} justify="space-evenly" style={{ marginTop: 5 }}>
                            <Col className="gutter-row" span={6} style={style}>
                                <Row onClick={() => {
                                    setDst('');
                                    setSourceimg("https://celebrationspress.com/wp-content/uploads/2018/01/010218Goofy.jpg");
                                    setPerson('goofy');
                                }}>
                                    <Col style={{ marginTop: 10, marginBottom: 10, marginLeft: 15 }}>
                                        <Image
                                            style={circle}
                                            src="https://celebrationspress.com/wp-content/uploads/2018/01/010218Goofy.jpg"
                                        />
                                    </Col>
                                    <Col style={{ marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                                        <div >Goofy</div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="gutter-row" span={6} style={style}>
                                <Row onClick={() => {
                                    setDst('');
                                    setSourceimg("https://pm1.narvii.com/7610/c720a58bfb518ad2d9a1da897fd668ec73ee466fr1-1200-630v2_hq.jpg");
                                    setPerson('max-goof');
                                }}>
                                    <Col style={{ marginTop: 10, marginBottom: 10, marginLeft: 15 }}>
                                        <Image
                                            style={circle}
                                            src="https://pm1.narvii.com/7610/c720a58bfb518ad2d9a1da897fd668ec73ee466fr1-1200-630v2_hq.jpg"
                                        />
                                    </Col>
                                    <Col style={{ marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                                        <div >Max Goof</div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="gutter-row" span={6} style={style}>
                                <Row onClick={() => {
                                    setDst('');
                                    setSourceimg("https://www.seekpng.com/png/detail/307-3078164_confused-daisy-duck-clipart-png-images-daisy-duck.png");
                                    setPerson('daisy-duck');
                                }}>
                                    <Col style={{ marginTop: 10, marginBottom: 10, marginLeft: 15 }}>
                                        <Image
                                            style={circle}
                                            src="https://www.seekpng.com/png/detail/307-3078164_confused-daisy-duck-clipart-png-images-daisy-duck.png"
                                        />
                                    </Col>
                                    <Col style={{ marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                                        <div >Daisy Duck</div>
                                    </Col>
                                </Row>
                            </Col>

                            <Col className="gutter-row" span={6} style={style}>
                                <Row onClick={() => {
                                    setDst('');
                                    setSourceimg("https://pm1.narvii.com/7164/310cf185064c0da2a5528b4f7d199fa972560e53r1-2048-1512v2_hq.jpg");
                                    setPerson('pete');
                                }}>
                                    <Col style={{ marginTop: 10, marginBottom: 10, marginLeft: 15 }}>
                                        <Image
                                            style={circle}
                                            src="https://pm1.narvii.com/7164/310cf185064c0da2a5528b4f7d199fa972560e53r1-2048-1512v2_hq.jpg"
                                        /> </Col>
                                    <Col style={{ marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
                                        <div>Pete</div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Content>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial', background: 'white', marginLeft: 30, marginRight: 30 }}>
                        <div className="site-layout-background" style={{ padding: 0, textAlign: 'center' }}>
                            <EditText imgData={trumpImg} />
                        </div>
                    </Content>
                </Layout>
            </Container>
        </>
    );
};


const style = {
    padding: '7px 0', textAlign: 'center', boxShadow: '0 3px 3px rgb(0 0 0 / 30%)', border: '0.1px solid black'
};
const circle = { height: '4vw', overflow: 'hidden', borderRadius: '70%', marginLeft: '1px', marginTop: '1px' }