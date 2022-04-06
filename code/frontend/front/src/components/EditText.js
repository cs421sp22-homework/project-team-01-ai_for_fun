import React, { useState, createRef, useContext } from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';
import Video from '../components/Video';
import UploadFace from '../components/UploadFace';
import "../style/EditVideo.css"
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css"
import { LoginContext } from '../context/AuthProvider';
import 'antd/dist/antd.css';
import { useCookies } from 'react-cookie';
import MediaComponent from "../components/MediaComponent";
import { Layout, message, Menu, Input } from 'antd';

const { Content, Footer } = Layout;
const { SubMenu } = Menu;
const { TextArea } = Input;

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

function EditText(props) {
    const ref = createRef();
    const { imgData } = props;
    const { faceimg, setFaceimg, sourceimg, dst, setDst, setSourceimg, setPerson, person } = useContext(LoginContext);
    const [cookie, setCookie] = useCookies(['access_token', 'refresh_token', 'name', 'email'])
    const [pick, setPick] = useState('');
    var inputText = "empty";

    // const selectImage = (id) => {
    //     var selected = state.selected;
    //     if (selected.indexOf(id) !== -1) selected.push(id);
    //     State({ selected: selected });
    // }

    const onChangeText = e => {
        // console.log('Change:', e.target.value);
        inputText = e.target.value;
    };

    const handleInput = e => {
        console.log('input: ', inputText);
    }
    //TODO
    const handleLoading = async (e) => {
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
                const response = await fetch('https://server-python.ai-for-fun-backend.com/faceswap', {
                    // const response = await fetch('http://127.0.0.1:8080/faceswap', {
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
                            {console.log(person)}
                        </center>
                    </Col>
                    <Col md={1} xl={2}>
                    </Col>
                </Row>
            </Content>
            <Content >
                <h3 style={{ margin: 10 }}>Please input the content you would like to manipulate</h3>
                <MediaComponent />
                <TextArea showCount maxLength={100} style={{ height: 100, margin: 25 }} onChange={onChangeText} />,
                <Button variant="outline-dark" size="lg" onClick={handleInput}>Continue</Button>{' '}
            </Content>
        </Layout>
    )
}

export default EditText;