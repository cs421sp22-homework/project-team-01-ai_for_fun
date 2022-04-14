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
    //const { faceimg, setFaceimg, sourceimg, dst, setDst, setSourceimg } = useContext(LoginContext);
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
    };

    const [hiswork, setHiswork] = useState([]);
    const [hisupload, setHisupload] = useState([]);

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
    }
    const handleClosePsw = () => {
        setShowEditPsw(false)
    }

    const handleEditAvater = () => {
        setshowAvater(true)
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

    return (
        <Container style={{ minHeight: '100vh' }}>
            <Row style={{ marginTop: '3%' }}>
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
                                <div>
                                    <center>
                                        <Button variant="outline-dark" size="sm" onClick={handleClosePsw} >Cancle</Button>
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
                                                <Button variant="outline-dark" size="sm" onClick={handleAffirmPsw} >Confirm</Button>
                                            </center>
                                        </Form.Item>
                                    </Form>
                                </div>

                                :
                                showInputName ?
                                    <Form>
                                        <Form.Item>
                                            <center>
                                                <Button variant="outline-dark" size="sm" onClick={handleCloseName} >Cancel</Button>
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
                                                <Button variant="outline-dark" size="sm" onClick={handleAffirmName} >Confirm</Button>
                                            </center>
                                        </Form.Item>
                                    </Form>
                                    :
                                    showAvater ?
                                        <div>
                                            <center>
                                                <Button variant="outline-dark" size="sm" onClick={handleCloseAvater} >Cancel</Button>
                                                <hr />
                                                <UploadPicinProfile />
                                                <Button variant="outline-dark" onClick={handleImg}>Confirm</Button>
                                            </center>
                                        </div>
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
                <Col md={7}>
                    {/* <Row className="mt-1" style={{ backgroundColor: 'whitesmoke', minHeight: '80vh' }}> */}
                    <Row>
                        <center>
                            <h2 class="d-flex align-items-center mb-3">My work</h2>
                            <h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2">Historical</i>AI work</h6>
                        </center>
                        {/* <Col md={10} lg={10}> */}
                        <Container style={{ height: '20vh', borderRadius: '20px', marginTop: '4%', maxHeight: '90vh' }}>
                            <div className='wrap_scrollImg' style={{ width: '100%', height: '100%' }}>
                                <span className='left_icon' onClick={clickLeftIcon}><LeftCircleOutlined /></span>
                                <span className='right_icon' onClick={clickRightIcon}><RightCircleOutlined /></span>
                                <ul style={{ transform: `translateX(${translateX}px)` }} ref={ref}>
                                    {hiswork.map(item => {
                                        return <li key={item.name}>
                                            {item.type === 'image' ?
                                                <Image as={Image} style={{ height: '100%', witdh: '200%', objectFit: 'cover', maxHeight: '100vh' }} src={item.url} fluid={true} alt="item.name" />
                                                :
                                                <Video props={{ "videoSrc": item.url }} style={{ height: '100%', witdh: '200%', objectFit: 'cover', maxHeight: '100vh' }} />
                                            }
                                        </li>;
                                    })}
                                </ul>
                                {/* <h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2">There is no historical work, Let's start creating</i></h6>
                                <Button variant="outline-primary" size="lg" href="/AI_face_topic" style={{ marginTop: 20, marginRight: 10 }}>Get Start</Button>{' '}
 */}
                            </div>
                        </Container>
                    </Row>
                </Col>
            </Row >
        </Container >
    )
}
export default Profile;
