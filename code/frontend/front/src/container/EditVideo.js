import React, { useState, createRef, useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Video from '../components/Video';
import UploadFace from '../components/UploadFace';
import "../style/EditVideo.css"
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css"
import { LoginContext } from '../context/AuthProvider';
import 'antd/dist/antd.css';
import { useCookies } from 'react-cookie';

import { Layout, Image, message } from 'antd';

const { Content, Footer } = Layout;


const tempvideo = {
    videoSrc: "http://media.w3.org/2010/05/bunny/movie.mp4",
    poster: "https://epe.brightspotcdn.com/f8/ca/abde5f4f4a30a6a3d1a0eaa23821/test-032021-968416412.jpg"
}
function EditVideo(props) {
    const ref = createRef();
    const { imgData } = props;
    const { faceimg, setFaceimg, sourceimg, setSourceimg } = useContext(LoginContext);
    const [cookie, setCookie] = useCookies(['access_token', 'refresh_token', 'name', 'email'])
    const [pick, setPick] = useState('');
    const [dst, setDst] = useState('');
    const handleSubmit = async (e) => {
        console.log(faceimg);
        console.log(pick);
        console.log(sourceimg);
        if (cookie.access_token) {
            const response = await fetch('https://server-demo.ai-for-fun-backend.com/faceswap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "user_id": cookie.access_token,
                    "src_url": "https://i.postimg.cc/TwTdxrs6/v2-75cc7fe18dbf470b833c5bca162df557-img-000.png",
                    "dst_url": "https://i.postimg.cc/QCgRSPmG/0-202009230849071-Xy-Oc.jpg"
                })
            });
            if (response.status == 200) {
                const content = await response.json();
                setDst(content.res_url)
            }
            else {
                console.log('request failed', response);
                message.error('failed.');
            }
        } else {
            alert('Login first!')
        }
    };

    return (
        <Layout className="site-layout" style={{ minHeight: '100vh' }}>
            <Content style={{ margin: '0 16px' }} className='center-box'>
                <Row>
                    <Col md={1} xl={2}> </Col>
                    <Col md={10} xl={8}>
                        <center>
                            {dst ?
                                <Image src={dst} />
                                :
                                sourceimg ?
                                    <Image src={sourceimg} />
                                    :
                                    <Video props={tempvideo} />
                            }

                        </center>
                    </Col>
                    <Col md={1} xl={2}></Col>
                </Row>
            </Content>
            <Footer >
                <Row >
                    <Col md={2} lg={1} >
                        <div className="mx-auto">
                            <UploadFace />
                        </div>
                    </Col>
                    <Col md={10} lg={10}>
                        <ul ref={ref} >
                            <Image.PreviewGroup>
                                {imgData.map(item => {
                                    return <li key={item.name} className="pl-3 mt-1" style={{ display: 'inline-block' }} onClick={() => setPick(item.imgUrl)}>
                                        <Image
                                            className='res-img'
                                            src={item.imgUrl}
                                            preview={true}
                                        />
                                    </li>
                                })}
                            </Image.PreviewGroup>
                        </ul>
                    </Col>
                </Row>
                <Button onClick={handleSubmit} style={{ float: "right" }}>Combine</Button>
            </Footer>
        </Layout>
    )
}

export default EditVideo;