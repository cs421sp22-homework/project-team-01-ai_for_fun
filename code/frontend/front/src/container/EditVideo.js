import React, { useState, createRef, useContext } from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';
import Video from '../components/Video';
import Card from 'react-bootstrap/Card';
import UploadFace from '../components/UploadFace';
import "../style/EditVideo.css"
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css"
import { LoginContext } from '../context/AuthProvider';
import 'antd/dist/antd.css';
import { useCookies } from 'react-cookie';
import { Comment, Avatar, Form, List, Input } from 'antd';
import { Layout, message } from 'antd';
import { LikeOutlined, CommentOutlined, ArrowRightOutlined } from '@ant-design/icons';
const { Content, Footer } = Layout;
const { TextArea } = Input;

const info = "This is a template text which is used to test";

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
    const [cookie, setCookie] = useCookies(['access_token', 'refresh_token', 'name', 'email', 'avatar']);
    // console.log(cookie);
    const [pick, setPick] = useState('');
    // const [postText, setPostText] = useState('');
    const [showCard, setShowCard] = useState(false);
    var postText = "empty";

    // const [visible, setVisible] = useState(false);
    // const [imgId, setImgId] = useState('');
    // const selectImage = (id) => {
    //     var selected = state.selected;
    //     if (selected.indexOf(id) !== -1) selected.push(id);
    //     State({ selected: selected });
    // }

    const handleShowCard = () => {
        setShowCard(true);
    }

    const handleHideCard = () => {
        setShowCard(false);
        console.log('Change:', postText);
    }

    const onChangeText = (e) => {
        postText = e.target.value;
    };

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
                //const response = await fetch('https://server-python.ai-for-fun-backend.com/faceswap', {
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

    //TODO: can not connect
    const handlePost = async (e) => {
        setShowCard(false);
        message.success('Post Received.');
        let dest = '';
        if (!pick) {
            dest = faceimg
        } else {
            dest = pick
        }
        if (cookie.access_token) {
            console.log("content " + dst);
            console.log("postText " + postText);
            console.log("user_id " + cookie.access_token);
            console.log("user_name " + cookie.name);
            const response = await fetch('https://server-python.ai-for-fun-backend.com/createpost', {
                //const response = await fetch('http://127.0.0.1:8080/faceswap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "content_url": dst,
                    "post_text": postText,
                    "user_id": cookie.access_token, //not user id, user id is not in cookie.
                    "user_name": cookie.name,
                    "user_avater": cookie.avatar
                })
            });
            if (response.status == 200) {
                const content = await response.json();
                setDst(content.res_url)
                message.error('Post success!.');
            }
            else {
                console.log('post failed', response);
                message.error('failed.');
            }
        } else {
            alert('Login first!')
        }
    };

    return (
        <Layout className="site-layout" style={{ minHeight: '100vh' }}>
            {
                showCard ?
                    <Content style={{ margin: '0 16px' }} className='center-box'>
                        <Card style={{ height: '100%', weight: '100%', margin: 35 }}>
                            <Card.Img variant="top" src={dst ? dst : "https://joeschmoe.io/api/v1/random"} style={{ height: '300px', weight: '100px' }} />
                            <Card.Body>
                                <Card.Title>Post to Community</Card.Title>
                                <Card.Text>
                                    <TextArea showCount maxLength={100} style={{ height: 100, margin: 25 }} onChange={onChangeText} placeholder="Tell us what you would like to share in community" />,
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Button onClick={handlePost} style={{ float: "right", marginRight: '30px' }}>Submit</Button>
                                <Button onClick={handleHideCard} variant="danger" style={{ float: "right", marginRight: '30px' }}>Cancel</Button>{''}
                            </Card.Footer>
                        </Card>
                    </Content>
                    :
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
            }
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

                <Button onClick={handleShowCard} style={{ float: "right", marginRight: '30px' }}>Post</Button>{''}
                <Button onClick={handleSubmit} variant="success" style={{ float: "right", marginRight: '15px' }}>Combine</Button>
            </Footer>
        </Layout >
    )
}

export default EditVideo;