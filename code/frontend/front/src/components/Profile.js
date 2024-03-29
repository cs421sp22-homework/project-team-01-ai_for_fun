import React, { useState, createRef, useEffect } from 'react';
import { message, Input, Form, Layout } from 'antd';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import UploadPicinProfile from './UploadPicinProfile';
import Card from 'react-bootstrap/Card';
import '../style/Profile.css';
import '../style/PopupPost.css';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css";
import { useCookies } from 'react-cookie';
import Video from './Video';
import { motion } from 'framer-motion';
import FriendList from "./FriendList";
import Masonry from 'react-masonry-css';
import Gallery from "../container/Community_home";
import { Modal } from 'antd';
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
    const [compid, setCompid] = useState('post')
    const [userposts, setUserposts] = useState([])
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [likes, setLikes] = useState(0)
    const [fowlist, setfowlist] = useState([])
    const [finglist, setfinglist] = useState([])
    const [postnum, setPostnum] = useState(0)
    const [worksnum, setWorksnum] = useState(0);
    props = props.props
    const [cookie, setCookie] = useCookies(['access_token', 'user_id', 'refresh_token', 'name', 'email', 'avatar']);
    console.log(cookie);
    const [avatar, setAvatar] = useState(cookie.avatar);
    const [name, setName] = useState(cookie.name);
    const [email, setEmail] = useState(cookie.email);
    const [password, setPassword] = useState('');
    const [oriPsw, setOriPsw] = useState('');
    const [showEditPsw, setShowEditPsw] = useState(false)
    const [showInputName, setshowInputName] = useState(false);
    const [showAvater, setshowAvater] = useState(false);
    var user_id = localStorage.getItem('global_userID');
    var globla_token = localStorage.getItem('global_token');
    var profileimg = localStorage.getItem('global_profile_IMG');
    var postText = "empty";
    console.log(user_id);
    console.log(globla_token);
    console.log("img " + profileimg)
    const ref = createRef();
    const [pick, setPick] = useState('');
    const [s3_id, setS3ID] = useState('');
    const [showCard, setShowCard] = useState(false);
    const [seen, setSeen] = useState(false);
    const [translateX, setTranslateX] = useState(0);
    const [ImagePost, setImagePost] = useState(true);

    const handleEditName = () => {
        console.log(1);
        // console.log(user);
        setshowInputName(true)
        setSeen(!seen);
    };

    const [hiswork, setHiswork] = useState([]);

    useEffect(async () => {
        let url_follow = 'https://server-demo.ai-for-fun-backend.com/getfollowinfo/' + user_id;
        let url_like = 'https://server-demo.ai-for-fun-backend.com/postlikeinfo/' + user_id;
        let url = 'https://server-demo.ai-for-fun-backend.com/getuserpost/' + user_id;
        const res_follow = await fetch(url_follow)
        const res_like = await fetch(url_like)
        if (res_follow.status === 200) {
            const fer = await res_follow.json();
            setFollowers(fer[0].follower_count)
            setfowlist(fer[0].follower_list)
            setfinglist(fer[0].followed_list)
            setFollowing(fer[0].followed_count)
        }
        if (res_like.status === 200) {
            const lk = await res_like.json();
            setLikes(lk[0].liked_sum)
        }
        const response = await fetch(url)
        console.log(response);
        if (response.status === 200) {
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
        if (workFetch.status === 200) {
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

    const handleAffirmName = async () => {
        if (name !== cookie.name) {
            try {
                let url = 'https://server-demo.ai-for-fun-backend.com/changeinfo/' + user_id

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "new_name": name.toString()
                    })
                });

                if (response.status === 200) {
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

                if (response.status === 200) {
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
                    "new_avatar": localStorage.getItem('global_profile_IMG'),
                })
            });
            console.log("send out new avater: " + profileimg);

            if (response.status === 200) {
                const content = await response.json();
                console.log("return avater " + content.avatar);
                setCookie('avatar', content.avatar);
                setAvatar(content.avatar);
                console.log("return avater " + content.avatar);
                console.log("cookie avater " + cookie.avatar);
                console.log("avater  " + avatar);
                console.log("img upload by user, set as global variable " + profileimg)
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

    const handleShowCard = (s3id, url) => {
        setShowCard(true);
        setPick(url);
        setS3ID(s3id);
        setSeen(!seen);
        if (url.includes("images") || url.includes("jpg")) {
            ImagePost = true;
        } else {
            ImagePost = false;
        }
    }

    const handleHideCard = () => {
        setShowCard(false);
        setSeen(!seen);
        console.log('Change:', postText);

    }

    const onChangeText = (e) => {
        postText = e.target.value;
    };

    const handlePost = async () => {
        console.log("content(pick) " + pick);
        console.log("postText " + postText);
        console.log("user_id " + cookie.user_id);
        console.log("user_name " + cookie.name);
        console.log("user_avater " + cookie.avatar);
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
        if (response.status === 200) {
            message.success('Post success!');
            setShowCard(false);
            setSeen(!seen);
        }
        else {
            console.log('post failed', response);
            message.error('failed.');

        }
    };

    const handleDelete = async (work_id) => {
        let url = "https://server-demo.ai-for-fun-backend.com/deletework";
        console.log(JSON.stringify({
            '_id': work_id,
            'user_id': cookie.user_id,
        }))
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                '_id': work_id,
                'user_id': cookie.user_id,
            })
        });
        if (response.status === 200) {
            window.location.reload()
            message.success("delete success!")
        }
        else {
            console.log('request failed', response);
            message.error('Failure');
        }
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
        <Container style={{ minHeight: '100vh', marginTop: 100 }}>
            <div className="container">
                <div className="row mt-3">
                    <div className="panel profile-cover" style={{ marginBottom: '20px' }}>
                        <div className="profile-cover__img" style={{ marginBottom: '20px', marginLeft: '5px' }}>
                            {/* <Image src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" /> */}
                            <Image src={cookie.avatar} alt="" />
                            <h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2">{email}</i></h6>
                            <h6 class="d-flex align-items-center mb-3">{name}</h6>

                        </div>
                        <div className="profile-cover__action bg--img" data-overlay="0.3">
                            <button className="btn btn-rounded" style={{ backgroundColor: "rgb(251,156,7)" }} onClick={handleEditName}>
                                <i className="fa fa-plus"></i>
                                <span style={{ color: 'white' }}>Edit Name</span>
                            </button>

                            <button className="btn btn-rounded" style={{ backgroundColor: "rgb(251,156,7)" }} onClick={handleEditAvater} >
                                <i className="fa fa-plus"></i>
                                <span style={{ color: 'white' }}>Edit Avatar</span>
                            </button>

                            <button className="btn btn-rounded" style={{ backgroundColor: "rgb(251,156,7)" }} onClick={handleEditPsw} >
                                <i className="fa fa-plus"></i>
                                <span style={{ color: 'white' }}>Edit Password</span>
                            </button>
                        </div>
                        <div className="profile-cover__info" style={{ marginBottom: '20px' }}>
                            <ul className="nav">
                                {compid === 'post' ? (
                                    <>
                                        <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('works')} ><strong>{worksnum}</strong><p >Works</p></motion.li>
                                        <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('post')} style={{ "fontWeight": "bolder" }}><strong>{postnum}</strong><p >Post</p></motion.li>
                                        <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('followers')}><strong>{followers}</strong>Followers</motion.li>
                                        <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('following')}><strong>{following}</strong>Following</motion.li>
                                    </>
                                )
                                    : compid === 'followers' ? (
                                        <>
                                            <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('works')}><strong>{worksnum}</strong><p >Works</p></motion.li>
                                            <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('post')}><strong>{postnum}</strong>Post</motion.li>
                                            <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('followers')} style={{ "fontWeight": "bolder" }}><strong>{followers}</strong>Followers</motion.li>
                                            <motion.li whileHover={{ scale: 1.05 }} onClick={() => setCompid('following')}><strong>{following}</strong>Following</motion.li>
                                        </>
                                    )
                                        : compid === 'works' ? (
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
                    {compid === 'post' ? (
                        <Gallery props={userposts} />)
                        : compid === 'followers' ? (
                            <FriendList props={fowlist} />
                        )
                            : compid === 'works' ? (
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
                                                // { console.log(item) }
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
                                                        <Card.Footer>
                                                            <a herf="#" style={{ fontSize: "16px", float: "right", marginRight: '5%' }}>
                                                                <center>
                                                                    <DeleteOutlined onClick={() => handleDelete(item._id)} />
                                                                </center>
                                                            </a>
                                                            <a herf="#" style={{ fontSize: "16px", float: "right", marginRight: '5%' }} >
                                                                <FormOutlined onClick={(e) => {
                                                                    // selectedToPost(e); 
                                                                    setShowCard(true);
                                                                    setSeen(!seen);
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
                                                                }} />
                                                            </a>
                                                        </Card.Footer>
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
            </div >

            <Modal
                visible={seen && showEditPsw}
                onOk={handleAffirmPsw}
                onCancel={handleClosePsw}
            >
                <Content className='center-box'>
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
                        </Form>
                    </div>
                </Content>

            </Modal>

            <Modal
                visible={seen && showInputName}
                onOk={handleAffirmName}
                onCancel={handleCloseName}
            >
                <Content className='center-box'>
                    <Form>
                        <Form.Item>
                            <center>
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
                        {/* <Form.Item>
                            <center>
                                <Button variant="outline-dark" onClick={handleAffirmName} >Confirm</Button>
                                {'   '}
                                <Button variant="outline-dark" onClick={handleCloseName} >Cancel</Button>
                            </center>
                        </Form.Item> */}
                    </Form>
                </Content>
            </Modal>

            <Modal
                visible={seen && showAvater}
                onOk={handleImg}
                onCancel={handleCloseAvater}
            >
                <Content className='center-box'>
                    <div>
                        <center>
                            {/* */}
                            <h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2">Please upload your new avater</i></h6>
                            <hr />
                            <UploadPicinProfile />
                            {/* <Button variant="outline-dark" onClick={handleImg}>Confirm</Button>{'    '}
                            <Button variant="outline-dark" onClick={handleCloseAvater} >Cancel</Button> */}
                        </center>
                    </div>
                </Content>

            </Modal>

            <Modal
                visible={seen && showCard}
                onOk={handlePost}
                onCancel={handleHideCard}
            >
                <Container className='center-box' style={{ mmarginLeft: '5%', marginRight: '5%' }} >
                    <Row>
                        <Col md={6}>
                            {ImagePost ?
                                <Image src={pick ? pick : "https://joeschmoe.io/api/v1/random"} fluid alt="choose" style={{ height: 'auto', marginLeft: 'auto', marginRight: 'auto', witdh: '50%' }} />
                                :
                                <Video props={{ "videoSrc": pick }} />
                            }
                        </Col>
                        <Col md={6}>
                            <TextArea showCount maxLength={100} style={{ height: "90%" }} onChange={onChangeText} placeholder="Tell us what you would like to share in community" />,
                        </Col>
                    </Row>
                </Container>
            </Modal>
        </Container >
    )
}
export default Profile;
