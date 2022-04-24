
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
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
// import "../style/EditVideo.css"
import { motion } from 'framer-motion';
import Macy from 'macy';
import { Layout } from 'antd';
import Video from '../components/Video';
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
    // useEffect(() => {
    //     new Macy(macyOptions)
    // }, [])

    //const { faceimg, setFaceimg, sourceimg, dst, setDst, setSourceimg } = useContext(LoginContext);

    // const {user,setUser,email,setEmail} = useContext(LoginContext);
    const [cookie, setCookie] = useCookies(['access_token', 'user_id', 'refresh_token', 'name', 'email', 'avatar']);
    console.log(cookie);
    const [avatar, setAvatar] = useState(cookie.avatar);
    const [name, setName] = useState(cookie.name);
    const [email, setEmail] = useState(cookie.email);
    const [password, setPassword] = useState('');
    const [oriPsw, setOriPsw] = useState('');
    const [ImagePost, setImagePost] = useState(true);
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
    const [translateX, setTranslateX] = useState(0);



    // getHistoryWork
    const [hiswork, setHiswork] = useState([]);
    useEffect(() => {
        let url = 'https://server-demo.ai-for-fun-backend.com/getwork/' + cookie.user_id;
        console.log("url for history" + url);
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => setHiswork(result)
            )
    }, [])

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
        console.log("content(pick in post.js) " + pick);
        console.log("postText " + postText);
        console.log("user_id " + cookie.access_token);
        console.log("user_name " + cookie.name);
        console.log("user_avater" + cookie.avatar);
        const response = await fetch('https://server-demo.ai-for-fun-backend.com/createpost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "content_url": "id=" + pick.substring(31, 51),
                "post_text": postText,
                "user_id": cookie.user_id,
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
    }
    const clickRightIcon = () => {
        if (ref.current.scrollWidth < Math.abs(translateX) + Math.abs(ref.current.offsetWidth)) {//到最后一页时候需要停止点击按钮
            return;
        }
        setTranslateX(translateX - ref.current.offsetWidth);
    };

    /**
     * left button
     */
    const clickLeftIcon = () => {
        if (translateX === 0) return;
        setTranslateX(translateX + ref.current.offsetWidth);
    };

    return (
        <Container className="container" style={{ marginTop: '6%', marginBottom: '10%', borderRadius: '20px', boxShadow: '0 3px 10px rgb(0 0 0 / 20%)' }}>
            <Row className='pt-3'>
                <Container md={4} style={{ height: '70%', maxHeight: '70%' }}>
                    <div
                        className='p-5 bg-image'
                        style={{ backgroundImage: "url('/images/post.jpg')", height: 200 }}
                    >
                    </div>
                    <br></br>
                    <div className='wrap_scrollImg' style={{ width: '100%', height: '100%' }}>
                        <span className='left_icon' onClick={clickLeftIcon}><LeftCircleOutlined /></span>
                        <span className='right_icon' onClick={clickRightIcon}><RightCircleOutlined /></span>
                        <ul style={{ transform: `translateX(${translateX}px)` }} ref={ref}>
                            {hiswork.map(item => {
                                return <li key={item.name} onClick={(e) => {
                                    selectedToPost(e);
                                    if (pick === item.url) {
                                        setPick('')
                                    } else {
                                        setPick(item.url);
                                        console.log("Pick in image" + pick);
                                        if (item.type === 'image') {
                                            setImagePost(true);
                                        } else {
                                            setImagePost(false);
                                        }
                                    }
                                }}>
                                    {item.type === 'image' ?
                                        <Image as={Image} style={{ height: '100%', witdh: '100%', objectFit: 'cover', maxHeight: '100vh' }} src={item.url} fluid={true} alt="item.name" />
                                        :
                                        <Video props={{ "videoSrc": item.url }} style={{ height: '100%', witdh: '100%', objectFit: 'cover', maxHeight: '100vh' }} />
                                    }
                                </li>;
                            })}
                        </ul>
                    </div>

                    <br></br>
                    <Content style={{ alignItems: 'center', justifyContent: 'center', marginBottom: '5%' }}>
                        <Row>
                            <Col md={5}>
                                {ImagePost ?
                                    <Image src={pick ? pick : "/images/PostSteps.jpg"} fluid alt="choose" style={{ height: 350, display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '70%' }} />
                                    :
                                    <div style={{ height: '50%', width: '50%', marginLeft: '20%', marginTop: '1%', marginBottom: '1%' }}>
                                        <Video props={{ "videoSrc": pick }} />
                                    </div>
                                }
                            </Col>
                            <Col md={6} style={{ margin: '4%', marginTop: '5%' }}>
                                <TextArea showCount maxLength={100} style={{ height: 100 }} onChange={onChangeText} placeholder="Tell us what you would like to share in community" />,
                                <Button variant="danger" style={{ float: "right", marginTop: '25px' }} href="/gallery">Back</Button>{' '}
                                <Button onClick={handlePost} style={{ float: "right", marginTop: '25px', marginRight: '10px' }}>Submit</Button>{' '}
                            </Col>
                        </Row>
                    </Content>
                </Container>
            </Row >
        </Container >
    )
}
export default Post;

var historydata = [

]
const imgData = [
    { imgUrl: 'https://s1.r29static.com/bin/entry/43a/0,200,2000,2000/x,80/1536749/image.jpg', name: '01', topic: 'Star' },
    { imgUrl: 'https://hips.hearstapps.com/cosmouk.cdnds.net/15/33/1439714614-celebrity-face-mashups-taylor-swift-emma-watson.jpg', name: '02', topic: 'House' },
    { imgUrl: 'https://stylesatlife.com/wp-content/uploads/2021/11/Emma-Watson-face-shape.jpg.webp', name: '03', topic: 'New Year' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScxopB3Y_Z0Yu1v5JpXdx-3NOKX7yqg1iIHg&usqp=CAU', name: '04', topic: 'Amazing' },
    { imgUrl: 'https://c4.wallpaperflare.com/wallpaper/485/848/917/actresses-mckenna-grace-actress-blonde-blue-eyes-hd-wallpaper-preview.jpg', name: '05', topic: 'Fashion' },
]