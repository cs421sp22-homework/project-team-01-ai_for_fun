import React, { useState, createRef, useContext, useEffect } from 'react';
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
import Amplify, { Storage } from 'aws-amplify'
import config from '../aws-exports';
Amplify.configure(config)


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


function EditStyle(props) {
    const ref = createRef();
    const { imgData } = props;
    const { faceimg, setFaceimg, sourceimg, dst, setDst, setSourceimg } = useContext(LoginContext);
    const [cookie, setCookie] = useCookies(['access_token', 'user_id', 'refresh_token', 'name', 'email', 'avatar']);
    //console.log(cookie);
    const [pick, setPick] = useState('');
    const [pickid, setPickid] = useState('');
    // const [postText, setPostText] = useState('');
    const [showCard, setShowCard] = useState(false);
    var postText = "empty";
    var upload_img_in_AI_FACE = localStorage.getItem('global_Upload_img_In_AI_FACE');
    var upload_s3id_in_AI_FACE = localStorage.getItem('global_Upload_s3id_In_AI_FACE');
    // const [visible, setVisible] = useState(false);
    // const [imgId, setImgId] = useState('');
    // const selectImage = (id) => {
    //     var selected = state.selected;
    //     if (selected.indexOf(id) !== -1) selected.push(id);
    //     State({ selected: selected });
    // }

    const [history, setHistory] = useState([]);
    useEffect(async () => {
        let url = 'https://server-demo.ai-for-fun-backend.com/gethistory/' + cookie.user_id;
        const response = await fetch(url)
        console.log(response);

        if (response.status == 200) {
            const content = await response.json();
            setHistory(content)
            console.log(content)
        }
        else {
            console.log('request failed', response.body);
            setHistory([])
        }
    }, [])

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

    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const handleSubmit = async (e) => {
        console.log("global_upload " + upload_img_in_AI_FACE)
        if (!sourceimg || (!pick && !upload_img_in_AI_FACE)) {
            message.error('Please choose one picture!');
        } else {
            let dest = '';
            let dest_id = '';
            if (!pick) {
                dest = upload_img_in_AI_FACE
                dest_id = upload_s3id_in_AI_FACE
            } else {
                dest = pick
                dest_id = pickid
            }
            if (cookie.access_token) {
                console.log(JSON.stringify({
                    "src_url": dest,
                    "dst_url": sourceimg,
                    "user_id": cookie.user_id,
                    "src_s3_id": dest_id,
                }))
                const response = await fetch('https://server-python.ai-for-fun-backend.com/styletransfer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "user_id": cookie.user_id,
                        "content_url": dest,
                        "content_s3_id": dest_id,
                        "style_url": sourceimg
                    })
                });
                if (response.status == 200) {
                    const content = await response.json();
                    setDst(content.res_url)
                    message.success('Completed');
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
        try {
            console.log(dst);
            const hashname = makeid(16)
            const result = await Storage.put(hashname, dst);
            console.log("resultkey " + result.key);
            const signedURL = await Storage.get(result.key);
            console.log("url from key get" + signedURL);
            //localStorage.setItem('global_profile_img',signedURL);
        } catch (error) {
            console.log("Error uploading file:", error)
            message.error(`file upload failed.`);
        }

        setShowCard(false);
        message.info('Post Received.');
        let dest = '';
        if (!pick) {
            dest = faceimg
        } else {
            dest = pick
        }
        if (cookie.access_token) {
            console.log("content url ID   " + dst.substring(31, 51));
            console.log("content url" + dst);
            console.log("postText " + postText);
            console.log("user_id " + cookie.user_id);
            console.log("user_name " + cookie.name);
            const response = await fetch('https://server-demo.ai-for-fun-backend.com/createpost', {
                //const response = await fetch('http://127.0.0.1:8080/faceswap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "content_url": "id=" + dst.substring(31, 51),
                    "post_text": postText,
                    "user_id": cookie.user_id,
                    "user_name": cookie.name,
                    "user_avater": cookie.avatar
                })
            });
            if (response.status == 200) {
                const content = await response.json();
                setDst(content.res_url)
                message.success('Post success!');
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
                            <Card.Img variant="top" src={dst ? dst : "https://joeschmoe.io/api/v1/random"} style={{ minHeight: "40vh" }} />
                            <Card.Body>
                                <Card.Title>Post to Community</Card.Title>
                                <Card.Text>
                                    <TextArea showCount maxLength={100} style={{ height: 100, margin: 25 }} onChange={onChangeText} placeholder="Tell us what you would like to share in community" />,
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Button onClick={handlePost} style={{ float: "right", marginRight: '20px' }}>Submit</Button>
                                <Button onClick={handleHideCard} variant="danger" style={{ float: "right", marginRight: '15px' }}>Cancel</Button>{''}
                            </Card.Footer>
                        </Card>
                    </Content>
                    :
                    <Content style={{ margin: '0 16px' }} className='center-box'>
                        <Row>
                            <Col md={1} xl={2}> </Col>
                            <Col md={10} xl={8}>
                                <center>
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
                        <Footer >
                            <Row >
                                <Col md={2} lg={1} >
                                    <div className="mx-auto">
                                        <UploadFace />
                                    </div>
                                </Col>

                                <Col md={10} lg={10}>
                                    <ul ref={ref} >
                                        {history.map(item => {
                                            return <li key={item.his_id} className="pl-3 mt-1" style={{ display: 'inline-block' }}
                                                onClick={(e) => {
                                                    if (pick === item.url) {
                                                        setPick('')
                                                        setPickid('');
                                                    } else {
                                                        setPick(item.url);
                                                        setPickid(item.s3_id);
                                                    }
                                                }} >
                                                <Image
                                                    className='res-img'
                                                    src={item.url}
                                                    onClick={(e) => selected(e)}
                                                />
                                            </li>
                                        })}

                                    </ul>
                                </Col>

                            </Row>
                            {/* when do not use AI model, disable the post */}
                            {dst ?
                                <Button onClick={handleShowCard} style={{ float: "right", marginRight: '30px' }}>Post</Button> :
                                <Button onClick={handleShowCard} style={{ float: "right", marginRight: '30px' }} disabled>Post</Button>
                            }
                            {/* <Button onClick={handleShowCard} style={{ float: "right", marginRight: '30px' }}>Post</Button>{''} */}
                            <Button onClick={handleSubmit} variant="success" style={{ float: "right", marginRight: '15px' }}>Combine</Button>
                        </Footer>
                    </Content>

            }

        </Layout >
    )
}

export default EditStyle;