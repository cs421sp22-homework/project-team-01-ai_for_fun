import React, { Fragment, PureComponent } from "react";
import { useState, createRef, useContext } from 'react';
import { Image } from 'react-bootstrap';
import { LoginContext } from '../context/AuthProvider';
import EditText from '../components/EditText';
import { Layout, Menu, Breadcrumb, Input } from 'antd';
import {
    UserOutlined,
    UserAddOutlined,
    UserDeleteOutlined,

} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { TextArea } = Input;

const tempvideo = {
    videoSrc: "http://media.w3.org/2010/05/bunny/movie.mp4",
    poster: "https://epe.brightspotcdn.com/f8/ca/abde5f4f4a30a6a3d1a0eaa23821/test-032021-968416412.jpg"
}


const trumpImg = [
    { imgUrl: 'https://media.vanityfair.com/photos/6226893d6df0fdac83f860fe/master/w_2560%2Cc_limit/487401374', name: 'trump', person: '1' },
]

export const AI_text = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const { faceimg, setFaceimg, sourceimg, dst, setDst, setSourceimg, person, setPerson } = useContext(LoginContext);
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
                    }}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub5', 'sub6', 'sub4']}>
                        {/* <SubMenu key="sub1" icon={<UserAddOutlined />} title="Standard Voice">
                            <Image
                                width={'100%'}
                                height={'50%'}
                                onClick={() => {
                                    setDst('');
                                    setSourceimg("https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80");
                                    setPerson('Normal');
                                }}
                                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                            />
                        </SubMenu> */}
                        <SubMenu key="sub4" icon={<UserOutlined />} title="Donald Duck">
                            <Image
                                width={'100%'}
                                onClick={() => {
                                    setDst('');
                                    setSourceimg("https://www.disneyonice.com/sites/default/files/2020-10/quackers-donald-featured.jpg");
                                    setPerson('donald-duck');
                                }}
                                src="https://www.disneyonice.com/sites/default/files/2020-10/quackers-donald-featured.jpg"
                            />
                        </SubMenu>
                        <SubMenu key="sub5" icon={<UserOutlined />} title="Mickey Mouse">
                            <Image
                                width={'100%'}
                                onClick={() => {
                                    setDst('');
                                    setSourceimg("https://d23.com/app/uploads/2020/05/1180w-600h_060120_mickey-mornings-launch.jpg");
                                    setPerson('mickey-mouse');
                                }}
                                src="https://d23.com/app/uploads/2020/05/1180w-600h_060120_mickey-mornings-launch.jpg"
                            />
                        </SubMenu>
                        <SubMenu key="sub6" icon={<UserOutlined />} title="Minnie Mouse">
                            <Image
                                width={'100%'}
                                onClick={() => {
                                    setDst('');
                                    setSourceimg("https://lumiere-a.akamaihd.net/v1/images/r_mickeymousefranchise_minniemouse_ddt-16970_52a2771b.jpeg?region=0%2C0%2C1536%2C450");
                                    setPerson('minnie-mouse');
                                }}
                                src="https://lumiere-a.akamaihd.net/v1/images/r_mickeymousefranchise_minniemouse_ddt-16970_52a2771b.jpeg?region=0%2C0%2C1536%2C450"
                            />
                        </SubMenu>
                        <SubMenu key="sub7" icon={<UserOutlined />} title="Goofy">
                            <Image
                                width={'100%'}
                                onClick={() => {
                                    setDst('');
                                    setSourceimg("https://celebrationspress.com/wp-content/uploads/2018/01/010218Goofy.jpg");
                                    setPerson('max-goof');
                                }}
                                src="https://celebrationspress.com/wp-content/uploads/2018/01/010218Goofy.jpg"
                            />
                        </SubMenu>
                        <SubMenu key="sub8" icon={<UserOutlined />} title="Max Goof">
                            <Image
                                width={'100%'}
                                onClick={() => {
                                    setDst('');
                                    setSourceimg("https://pm1.narvii.com/7610/c720a58bfb518ad2d9a1da897fd668ec73ee466fr1-1200-630v2_hq.jpg");
                                    setPerson('max-goof');
                                }}
                                src="https://pm1.narvii.com/7610/c720a58bfb518ad2d9a1da897fd668ec73ee466fr1-1200-630v2_hq.jpg"
                            />
                        </SubMenu>
                        <SubMenu key="sub9" icon={<UserOutlined />} title="Pete">
                            <Image
                                width={'100%'}
                                onClick={() => {
                                    setDst('');
                                    setSourceimg("https://pm1.narvii.com/7164/310cf185064c0da2a5528b4f7d199fa972560e53r1-2048-1512v2_hq.jpg");
                                    setPerson('pete');
                                }}
                                src="https://pm1.narvii.com/7164/310cf185064c0da2a5528b4f7d199fa972560e53r1-2048-1512v2_hq.jpg"
                            />
                        </SubMenu>
                        <SubMenu key="sub10" icon={<UserOutlined />} title="Daisy Duck">
                            <Image
                                width={'100%'}
                                onClick={() => {
                                    setDst('');
                                    setSourceimg("https://www.seekpng.com/png/detail/307-3078164_confused-daisy-duck-clipart-png-images-daisy-duck.png");
                                    setPerson('daisy-duck');
                                }}
                                src="https://www.seekpng.com/png/detail/307-3078164_confused-daisy-duck-clipart-png-images-daisy-duck.png"
                            />
                        </SubMenu>
                        <SubMenu key="sub11" icon={<UserOutlined />} title="Ludwig Von Drake">
                            <Image
                                width={'100%'}
                                onClick={() => {
                                    setDst('');
                                    setSourceimg("https://cartoonresearch.com/wp-content/uploads/2014/07/Ludwig-Record344.jpg");
                                    setPerson('ludwig-von-drake');
                                }}
                                src="https://cartoonresearch.com/wp-content/uploads/2014/07/Ludwig-Record344.jpg"
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