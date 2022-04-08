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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}>
                        <SubMenu key="sub1" icon={<UserAddOutlined />} title="Standard Voice">
                            <Image
                                width={'100%'}
                                onClick={() => {
                                    setDst('');
                                    setSourceimg("https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80");
                                    setPerson('Normal');
                                }}
                                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                            />
                        </SubMenu>
                        <SubMenu key="sub2" icon={<UserDeleteOutlined />} title="Joe Bide">
                            <Image
                                width={'100%'}
                                onClick={() => {
                                    setDst('');
                                    setSourceimg("https://static01.nyt.com/images/2021/01/20/us/politics/20Biden-profile-top/20Biden-profile-top-superJumbo.jpg");
                                    setPerson('Biden');
                                }}
                                src="https://static01.nyt.com/images/2021/01/20/us/politics/20Biden-profile-top/20Biden-profile-top-superJumbo.jpg"
                            />
                        </SubMenu>
                        <SubMenu key="sub3" icon={<UserOutlined />} title="Donald J. Trump">
                            <Image
                                width={'100%'}
                                onClick={() => {
                                    setDst('');
                                    setSourceimg("https://media.vanityfair.com/photos/6226893d6df0fdac83f860fe/master/w_2560%2Cc_limit/487401374");
                                    setPerson('Trump');
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