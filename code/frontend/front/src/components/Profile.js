import React, { useState, useContext, createRef, useEffect } from 'react';
import { message, Input, Form, Layout, InputNumber } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import UploadPicinProfile from './UploadPicinProfile';
import UploadPic from './UploadPic'
import Card from 'react-bootstrap/Card';
import '../style/Profile.css';
import '../style/PopupPost.css';
import { Row, Col, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css";
import { LoginContext } from '../context/AuthProvider';
import { useCookies } from 'react-cookie';
import PopupPost from './PopupPost';
import Video from './Video';
import { motion } from 'framer-motion';
import FriendList from "./FriendList";
import Masonry from 'react-masonry-css';
import Gallery from "../container/Community_home";
import { Modal } from 'antd';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
// import "../style/EditVideo.css"
const { TextArea } = Input;
const { Content } = Layout;
const previousSelectedPost = [];


const compareToFirstPassword = ({ getFieldValue }) => ({
    validator(rule, value) {
        if (getFieldValue('password') === value) return Promise.resolve();
        return Promise.reject("Two passwords that you enter is inconsistent!")
    }
});

function Profile(props) {
    const user = window.location.pathname.split("/")[2]
    const [compid, setCompid] = useState('post')
    //const [cookie, setCookie] = useCookies(['token', 'refresh_token', 'name', 'email', 'user_id', 'avatar'])
    const [userposts, setUserposts] = useState([])
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [likes, setLikes] = useState(0)
    const [fowlist, setfowlist] = useState([])
    const [finglist, setfinglist] = useState([])
    const [postnum, setPostnum] = useState(0)
    const [worksnum, setWorksnum] = useState(0);
    props = props.props
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
    const [showAvater, setshowAvater] = useState(false);
    const [pic, setPic] = useState(props.pic);
    var user_id = localStorage.getItem('global_userID');
    var globla_token = localStorage.getItem('global_token');
    var profileimg = localStorage.getItem('global_profile_IMG');
    var postText = "empty";
    console.log(user_id);
    console.log(globla_token);
    console.log("img" + profileimg)
    const ref = createRef();
    const [pick, setPick] = useState('');
    const [showCard, setShowCard] = useState(false);
    const [seen, setSeen] = useState(false);
    const [translateX, setTranslateX] = useState(0);

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

    // Edit Name
    const handleEditName = () => {
        console.log(1);
        // console.log(user);
        setshowInputName(true)
        setSeen(!seen);
    };

    const [hiswork, setHiswork] = useState([]);
    const [hisupload, setHisupload] = useState([]);

    useEffect(async () => {
        let url_follow = 'https://server-demo.ai-for-fun-backend.com/getfollowinfo/' + user_id;
        let url_like = 'https://server-demo.ai-for-fun-backend.com/postlikeinfo/' + user_id;
        let url = 'https://server-demo.ai-for-fun-backend.com/getuserpost/' + user_id;
        const res_follow = await fetch(url_follow)
        const res_like = await fetch(url_like)
        if (res_follow.status == 200) {
            const fer = await res_follow.json();
            setFollowers(fer[0].follower_count)
            setfowlist(fer[0].follower_list)
            setfinglist(fer[0].followed_list)
            setFollowing(fer[0].followed_count)
        }
        if (res_like.status == 200) {
            const lk = await res_like.json();
            setLikes(lk[0].liked_sum)
        }
        const response = await fetch(url)
        console.log(response);
        if (response.status == 200) {
            const content = await response.json();
            setUserposts(content)
            setPostnum(content.length)
        }
        else {
            setUserposts([])
        }

        let url1 = 'https://server-demo.ai-for-fun-backend.com/getwork/' + cookie.user_id;
        console.log("url for history" + url1);
        const workFetch = await fetch(url1)
        if (workFetch.status == 200) {
            const workRes = await workFetch.json();
            setHiswork(workRes);
            setWorksnum(workRes.length);
        }
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

    // TODO: Interaction with backend
    const handleAffirmName = async () => {
        if (name != cookie.name) {
            try {
                let url = 'https://server-demo.ai-for-fun-backend.com/changeinfo/' + user_id

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'content-Type': 'application/json',
                        //'Token': globla_token.toString()
                    },
                    body: JSON.stringify({
                        "new_name": name.toString()
                    })
                });

                if (response.status == 200) {
                    const content = await response.json();
                    let expires = new Date();
                    expires.setTime(expires.getTime() + (30 * 60 * 1000));
                    setCookie('name', content.name, { path: '/', expires });
                    message.success("change name successful")
                    setshowInputName(false)
                }
                else {
                    console.log('request failed', response);
                    message.error('request failed')
                }
            } catch (err) {
                if (err.response?.status === 500) {
                    message.error('Missing Email or Password');
                } else {
                    message.error('Login Failed!');
                }
            }
        } else {
            message.error("Please input a new name")
        }


    };
    const handleCloseName = () => {
        setshowInputName(false)
    };

    const handleEditPsw = () => {
        setShowEditPsw(true)
        setSeen(!seen);
    }
    const handleClosePsw = () => {
        setShowEditPsw(false)
    }

    const handleEditAvater = () => {
        setshowAvater(true)
        setSeen(!seen);
    }
    const handleCloseAvater = () => {
        setshowAvater(false)
    }

    const handleAffirmPsw = async () => {
        if (password && oriPsw) {
            try {
                let url = 'https://server-demo.ai-for-fun-backend.com/changeinfo/' + user_id
                console.log(url);
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        //'Token': globla_token
                    },
                    body: JSON.stringify({
                        "old_password": oriPsw,
                        "new_password": password
                    })
                });
                console.log(response.status)

                if (response.status == 200) {
                    const content = await response.json();
                    let expires = new Date();
                    expires.setTime(expires.getTime() + (30 * 60 * 1000));
                    setCookie('name', content.name, { path: '/', expires });
                    message.success('Change Password Successful')
                    setShowEditPsw(false)
                }
                else {
                    console.log('request failed', response);
                    setName(cookie.name)
                    message.error('request failed')
                }
            } catch (err) {
                if (err.response?.status === 500) {
                    message.error('Missing Email or Password');
                } else {
                    message.error('Login Failed!');
                }
            }
        } else {
            message.error("Please input password")
        }
    }
    const handleImg = async () => {
        //  if (password && oriPsw) {
        try {
            let url = 'https://server-demo.ai-for-fun-backend.com/changeinfo/' + user_id
            console.log(url);
            console.log(profileimg)
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Token': globla_token
                },
                body: JSON.stringify({
                    "new_avatar": profileimg,
                })
            });
            console.log(response.status)

            if (response.status == 200) {
                const content = await response.json();
                let expires = new Date();
                expires.setTime();
                setCookie('avatar', content.avatar);
                // avatar = content.avatar;
                message.success('change IMG successful😊')
                setshowAvater(false);
                // document.location.reload(true)
            }
            else {
                console.log('request failed', response);
                setName(cookie.name)
                message.error('request failed')
            }
        } catch (err) {
            if (err.response?.status === 500) {
                message.error('Missing Image');
            } else {
                message.error('Failed!');
            }
        }
    }
    const handlePostNew = async () => {

    }

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

    const handlePost = async (e) => {
        setShowCard(false);
        message.info('Post Received.');
        if (cookie.access_token) {
            console.log("content(pick) " + pick);
            console.log("postText " + postText);
            console.log("user_id " + cookie.access_token);
            console.log("user_name " + cookie.name);
            const response = await fetch('https://server-demo.ai-for-fun-backend.com/createpost', {
                //const response = await fetch('http://127.0.0.1:8080/faceswap', {
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

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const handletogglePop = () => {
        setSeen(!seen);
        //console.log(seen);
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

    const Cardtransition = {
        type: "spring",
        damping: 10,
        stiffness: 100
    }
    const breakpointColumnsObj = {
        default: 5,
        1800: 4,
        1300: 3,
        1000: 2,
        500: 1
    };

    return (
        <Container style={{ minHeight: '100vh' }}>
            <div className="container">
                <div className="row mt-3">
                    <div className="panel profile-cover" style={{ marginBottom: '20px' }}>
                        <div className="profile-cover__img" style={{ marginBottom: '20px', marginLeft: '5px' }}>
                            <Image src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" />
                            <h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2">{email}</i></h6>
                            <h6 class="d-flex align-items-center mb-3">{name}</h6>

                        </div>
                        <div className="profile-cover__action bg--img" data-overlay="0.3">
                            <button className="btn btn-rounded btn-info" onClick={handleEditName} >
                                <i className="fa fa-plus"></i>
                                <span>Edit Name</span>
                            </button>

                            <button className="btn btn-rounded btn-info" onClick={handleEditAvater} >
                                <i className="fa fa-plus"></i>
                                <span>Edit Avatar</span>
                            </button>

                            <button className="btn btn-rounded btn-info" onClick={handleEditPsw} >
                                <i className="fa fa-plus"></i>
                                <span>Edit Password</span>
                            </button>
                            {/* 
                            <button className="btn btn-rounded btn-info">
                                <Button variant="outline-dark" size="sm" onClick={handleEditName} >Edit Name</Button> {' '}
                                <Button variant="outline-dark" size="sm" onClick={handleEditAvater} >Edit Avatar</Button> {' '}
                                <Button variant="outline-dark" size="sm" onClick={handleEditPsw} >Edit Password</Button>
                            </button> */}
                        </div>
                        <div className="profile-cover__info" style={{ marginBottom: '20px' }}>
                            <ul className="nav">
                                {compid == 'post' ? (
                                    <>
                                        <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('works')} ><strong>{worksnum}</strong><p >Works</p></motion.li>
                                        <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('post')} style={{ "fontWeight": "bolder" }}><strong>{postnum}</strong><p >Post</p></motion.li>
                                        <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('followers')}><strong>{followers}</strong>Followers</motion.li>
                                        <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('following')}><strong>{following}</strong>Following</motion.li>
                                    </>
                                )
                                    : compid == 'followers' ? (
                                        <>
                                            <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('works')}><strong>{worksnum}</strong><p >Works</p></motion.li>
                                            <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('post')}><strong>{postnum}</strong>Post</motion.li>
                                            <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('followers')} style={{ "fontWeight": "bolder" }}><strong>{followers}</strong>Followers</motion.li>
                                            <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('following')}><strong>{following}</strong>Following</motion.li>
                                        </>
                                    )
                                        : compid == 'works' ? (
                                            <>
                                                <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('works')} style={{ "fontWeight": "bolder" }}><strong>{worksnum}</strong><p >Works</p></motion.li>
                                                <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('post')}><strong>{postnum}</strong>Post</motion.li>
                                                <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('followers')} ><strong>{followers}</strong>Followers</motion.li>
                                                <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('following')}><strong>{following}</strong>Following</motion.li>
                                            </>
                                        )
                                            :
                                            <>
                                                <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('works')} ><strong>{worksnum}</strong><p >Works</p></motion.li>
                                                <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('post')}><strong>{postnum}</strong>Post</motion.li>
                                                <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('followers')}><strong>{followers}</strong>Followers</motion.li>
                                                <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('following')} style={{ "fontWeight": "bolder" }}><strong>{following}</strong>Following</motion.li>
                                            </>

                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {compid == 'post' ? (
                        <Gallery props={userposts} />)
                        : compid == 'followers' ? (
                            <FriendList props={fowlist} />
                        )
                            : compid == 'works' ? (
                                <Container style={{ height: '20vh', borderRadius: '20px', marginTop: '1%', maxHeight: '90vh' }}>
                                    <motion.div
                                        initial="hide"
                                        animate="show"
                                        variants={galleryAnimation}
                                    >
                                        <Masonry
                                            breakpointCols={breakpointColumnsObj}
                                            className="my-masonry-grid"
                                            columnClassName="my-masonry-grid_column"
                                        >
                                            {hiswork.map((item) => {
                                                { console.log(item) }
                                                return <motion.div
                                                    key={item._id}
                                                    // variants={cardAnimation}
                                                    animate={{ y: [-5, 5, 0] }}
                                                    transition={Cardtransition}
                                                    whileHover={{ scale: 1.05 }}
                                                    className="gallery"
                                                >
                                                    <Card>
                                                        {
                                                            item.url.includes("images") || item.url.includes("jpg") ?
                                                                <Card.Img as={Image} src={item.url} alt="item._id" />
                                                                :
                                                                <Video props={{ "videoSrc": item.url }} />
                                                        }
                                                    </Card>
                                                </motion.div>
                                            })}
                                        </Masonry>
                                    </motion.div>
                                </Container>
                            )
                                :
                                <FriendList props={finglist} />

                    }
                </div>
            </div>

            <Modal
                visible={seen && showEditPsw}
            >
                <Content style={{ marginLeft: '30%', marginRight: '30%' }} className='center-box'>
                    <div>
                        <center>
                            {/* */}
                            <h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2">Please type your old password and new password</i></h6>
                            <hr />
                        </center>
                        <Form>
                            <Form.Item
                                label="Original"
                                name="original"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your original password!',
                                    },
                                ]}
                            >
                                <Input.Password onChange={e => setOriPsw(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password onChange={e => setPassword(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                label="Confirm "
                                name="confirm"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    compareToFirstPassword,
                                ]}
                            >
                                <Input.Password onChange={e => setPassword(e.target.value)} />
                            </Form.Item>
                            <Form.Item>
                                <center>
                                    <Button variant="outline-dark" onClick={handleAffirmPsw} >Confirm</Button>{' '}
                                    <Button variant="outline-dark" onClick={handleClosePsw} >Cancel</Button>
                                </center>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>

            </Modal>


            {seen && showInputName && <PopupPost
                content={<>
                    <Content style={{ marginLeft: '30%', marginRight: '30%' }} className='center-box'>
                        <Form>
                            <Form.Item>
                                <center>
                                    {/* <Button variant="outline-dark" size="sm" onClick={handleCloseName} >Cancel</Button> */}
                                    <h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2">Please input your new name</i></h6>
                                    <hr />
                                </center>
                            </Form.Item>
                            <Form.Item
                                name="editName"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input onChange={e => setName(e.target.value)} placeholder="Enter Name" />
                            </Form.Item>
                            <Form.Item>
                                <center>
                                    <Button variant="outline-dark" onClick={handleAffirmName} >Confirm</Button>
                                    {'   '}
                                    <Button variant="outline-dark" onClick={handleCloseName} >Cancel</Button>
                                </center>
                            </Form.Item>
                        </Form>
                    </Content>
                </>}
                handleClose={handleCloseName}
            />}

            {seen && showAvater && <PopupPost
                content={<>
                    <Content style={{ marginLeft: '30%', marginRight: '30%' }} className='center-box'>
                        <div>
                            <center>
                                {/* */}
                                <h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2">Please upload your new avater</i></h6>
                                <hr />
                                <UploadPicinProfile />
                                <Button variant="outline-dark" onClick={handleImg}>Confirm</Button>{'    '}
                                <Button variant="outline-dark" onClick={handleCloseAvater} >Cancel</Button>
                            </center>
                        </div>
                    </Content>
                </>}
                handleClose={handleCloseAvater}
            />}

            {/* <Row style={{ marginTop: '3%' }}>
                <Col>
                    <Card style={{ width: '30rem' }} >
                        <Card.Header>Personal Info</Card.Header>
                        <Card.Body>
                            <Row className='mt-4'>
                                <div style={{ width: '100px' }} className="mx-auto">
                                    <Image
                                        width={'90%'}
                                        src={avatar}
                                        center={'true'}
                                    />
                                </div>
                            </Row>
                            <br />
                            <center>
                                <Card.Title>{cookie.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{cookie.email}</Card.Subtitle>
                            </center>
                            {showEditPsw ?
                                

                                :
                                showInputName ?
                                    
                                    :
                                    showAvater ?
                                        
                                        :
                                        <center>
                                            <Button variant="outline-dark" size="sm" onClick={handleEditName} >Edit Name</Button> {' '}
                                            <Button variant="outline-dark" size="sm" onClick={handleEditAvater} >Edit Avatar</Button> {' '}
                                            <Button variant="outline-dark" size="sm" onClick={handleEditPsw} >Edit Password</Button>
                                            <hr />
                                        </center>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row > */}
        </Container >
    )
}
export default Profile;
