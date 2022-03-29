import React, { useState, createRef, useContext } from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';
import Video from '../components/Video';
import UploadFace from '../components/UploadFace';
import "../style/EditVideo.css"
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css"
import { LoginContext } from '../context/AuthProvider';
import 'antd/dist/antd.css';
import { useCookies } from 'react-cookie';

import { Layout, message } from 'antd';

const { Content, Footer } = Layout;


const tempvideo = {
    videoSrc: "http://media.w3.org/2010/05/bunny/movie.mp4",
    poster: "https://epe.brightspotcdn.com/f8/ca/abde5f4f4a30a6a3d1a0eaa23821/test-032021-968416412.jpg"
}

const previousSelected = [];

const selected = (e) => {
    previousSelected.push(e.currentTarget);
    for (var i = 0; i < previousSelected.length; i++) {
        if (previousSelected[i] === e.currentTarget) {
            continue;
        }
        previousSelected[i].classList.remove('selected');
    }
    let target = e.currentTarget;
    target.classList.toggle('selected');
}

function EditVideo(props) {
    const ref = createRef();
    const { imgData } = props;
    const { faceimg, setFaceimg, sourceimg, dst, setDst, setSourceimg } = useContext(LoginContext);
    const [cookie, setCookie] = useCookies(['access_token', 'refresh_token', 'name', 'email'])
    const [pick, setPick] = useState('');


    // const selectImage = (id) => {
    //     var selected = state.selected;
    //     if (selected.indexOf(id) !== -1) selected.push(id);
    //     State({ selected: selected });
    // }

    const handleSubmit = async (e) => {
        console.log(faceimg);
        console.log(pick);
        console.log(sourceimg);
        if (!sourceimg || (!pick && !faceimg)) {
            message.error('Please choose one picture!');
        } else {
            let dest = '';
            if (!pick) {
                dest = faceimg
            } else {
                dest = pick
            }
            if (cookie.access_token) {
                // const response = await fetch('https://server-demo.ai-for-fun-backend.com/faceswap', {
                const response = await fetch('http://127.0.0.1:8080/faceswap', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "src_url": dest,
                        "dst_url": sourceimg,
                        "user_id": cookie.access_token
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
        }

    };

    return (
        <Layout className="site-layout" style={{ minHeight: '100vh' }}>
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
                            {imgData.map(item => {
                                return <li key={item.name} className="pl-3 mt-1" style={{ display: 'inline-block' }}
                                    onClick={(e) => {
                                        if (pick === item.imgUrl) {
                                            setPick('')
                                        } else {
                                            setPick(item.imgUrl);
                                        }
                                    }} >
                                    <Image
                                        className='res-img'
                                        src={item.imgUrl}
                                        onClick={(e) => selected(e)}
                                    />
                                </li>
                            })}
                        </ul>
                    </Col>

                </Row>

                <Button onClick={handleSubmit} style={{ float: "right", marginRight: '30px' }}>Post</Button>{''}
                <Button onClick={handleSubmit} variant="success" style={{ float: "right", marginRight: '15px' }}>Combine</Button>
            </Footer>
        </Layout>
    )
}

export default EditVideo;