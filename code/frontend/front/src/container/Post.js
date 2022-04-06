
import React, { useState, useContext, createRef, useEffect } from 'react';
import { message, Input, Form } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Card from 'react-bootstrap/Card';
import '../style/Profile.css';
import '../style/PopupPost.css';
import { Row, Col, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css";
import { LoginContext } from '../context/AuthProvider';
import { useCookies } from 'react-cookie';
import CollectionInLeft from "../components/recommend-in-mode/CollectionInLeft";
// import "../style/EditVideo.css"
import { motion } from 'framer-motion';
import Macy from 'macy';
import { Layout } from 'antd';
const { TextArea } = Input;
const { Content } = Layout;
const previousSelectedPost = [];

const macyOptions = {
    container: '#macy-grid',
    trueOrder: true,
    mobileFirst: true,
    margin: 10,
    columns: 1,
    breakAt: {
        1800: 3,
        1400: 2,
        650: {
            margin: 10,
            columns: 1,
        },
    },
}

const galleryAnimation = {
    hide: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.25,
            ease: 'easeOut',
            delayChildren: 1.5,
        },
    },
}

const cardAnimation = {
    hide: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
}

function Post() {
    useEffect(() => {
        new Macy(macyOptions)
    }, [])

    //const { faceimg, setFaceimg, sourceimg, dst, setDst, setSourceimg } = useContext(LoginContext);

    // const {user,setUser,email,setEmail} = useContext(LoginContext);
    const [cookie, setCookie] = useCookies(['token', 'refresh_token', 'name', 'email', 'user_id', 'avatar'])
    console.log(cookie);
    const [avatar, setAvatar] = useState(cookie.avatar);
    const [name, setName] = useState(cookie.name);
    const [email, setEmail] = useState(cookie.email);
    const [password, setPassword] = useState('');
    const [oriPsw, setOriPsw] = useState('');
    const [showInputEmail, setshowInputEmail] = useState(false);
    // const { avatarimg } = useContext(LoginContext);
    const [showEditPsw, setShowEditPsw] = useState(false)
    const [showInputName, setshowInputName] = useState(false);

    var user_id = localStorage.getItem('global_userID');
    var globla_token = localStorage.getItem('global_token');
    var profileimg = localStorage.getItem('global_profile_IMG');
    var postText = "empty";
    console.log(user_id);
    console.log(globla_token);
    console.log("img" + profileimg)
    const ref = createRef();
    const [pick, setPick] = useState('');

    const selectedToPost = (e) => {
        previousSelectedPost.push(e.currentTarget);
        for (var i = 0; i < previousSelectedPost.length; i++) {
            if (previousSelectedPost[i] === e.currentTarget) {
                continue;
            }
            previousSelectedPost[i].classList.remove('selected');
        }
        let target = e.currentTarget;
        target.classList.toggle('selected');
        console.log("new " + previousSelectedPost.length);
    }


    const onChangeText = (e) => {
        postText = e.target.value;
    };

    const handlePost = async (e) => {
        if (cookie.access_token) {
            console.log("content(pick) " + pick);
            console.log("postText " + postText);
            console.log("user_id " + cookie.access_token);
            console.log("user_name " + cookie.name);
            const response = await fetch('https://server-demo.ai-for-fun-backend.com/createpost', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "content_url": pick,
                    "post_text": postText,
                    "user_id": cookie.access_token, //not user id, user id is not in cookie.
                    "user_name": cookie.name,
                    "user_avater": cookie.avatar
                })
            });
            if (response.status == 200) {
                const content = await response.json();
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
        <Container style={{ minHeight: '100vh' }}>
            <Row className='pt-3'>
                <Col md={4} style={{ margin: '10' }} className="mr-1">
                    <h4 style={{ textAlign: 'center' }}>My work</h4>
                    <Row className="pt-1 pl-3 overflow-auto" style={{ height: "100vh", backgroundColor: "" }}>
                        <motion.ul
                            id="macy-grid"
                            initial="hide"
                            animate="show"
                            variants={galleryAnimation}
                        >
                            {imgData.map(item => {
                                return <motion.li
                                    key={item.name}
                                    variants={cardAnimation}
                                    whileHover={{ scale: 1.01 }}
                                    style={{ overflow: "hidden" }}
                                    onClick={(e) => {
                                        selectedToPost(e);
                                        if (pick === item.imgUrl) {
                                            setPick('')
                                        } else {
                                            setPick(item.imgUrl);
                                            console.log("Pick:" + pick);
                                        }
                                    }}
                                >
                                    <Image src={item.imgUrl} fluid alt="item.name" />
                                </motion.li>;
                            })}
                        </motion.ul>
                    </Row>
                </Col>
                <Col md={7}>
                    <Row className="mt-1" style={{}}>
                        <Content style={{ height: '90vh', weight: '80vh' }} className='center-box'>
                            <Card style={{ height: '100%', weight: '100%', margin: 35 }}>
                                <Card.Img variant="top" src={pick ? pick : "https://joeschmoe.io/api/v1/random"} style={{ minHeight: "40vh" }} />
                                <Card.Body>
                                    <Card.Title style={{ textAlign: 'center' }}>Post to Community</Card.Title>
                                    <Card.Text>
                                        <TextArea showCount maxLength={100} style={{ height: 100, margin: 25 }} onChange={onChangeText} placeholder="Tell us what you would like to share in community" />,
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button onClick={handlePost} style={{ float: "right", marginRight: '20px' }}>Submit</Button>
                                </Card.Footer>
                            </Card>
                        </Content>
                    </Row>
                </Col>
            </Row>
        </Container >
    )
}
export default Post;

const imgData = [
    { imgUrl: 'https://s1.r29static.com/bin/entry/43a/0,200,2000,2000/x,80/1536749/image.jpg', name: '01', topic: 'Star' },
    { imgUrl: 'https://hips.hearstapps.com/cosmouk.cdnds.net/15/33/1439714614-celebrity-face-mashups-taylor-swift-emma-watson.jpg', name: '02', topic: 'House' },
    { imgUrl: 'https://stylesatlife.com/wp-content/uploads/2021/11/Emma-Watson-face-shape.jpg.webp', name: '03', topic: 'New Year' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScxopB3Y_Z0Yu1v5JpXdx-3NOKX7yqg1iIHg&usqp=CAU', name: '04', topic: 'Amazing' },
    { imgUrl: 'https://c4.wallpaperflare.com/wallpaper/485/848/917/actresses-mckenna-grace-actress-blonde-blue-eyes-hd-wallpaper-preview.jpg', name: '05', topic: 'Fashion' },
]