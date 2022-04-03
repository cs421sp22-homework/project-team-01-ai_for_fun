
import React, { useState, useContext, createRef } from 'react';
import { message, Input, Form } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import UploadPicinProfile from './UploadPicinProfile';
import UploadPic from './UploadPic'
import '../style/Profile.css';
import { Row, Col, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css";
import { LoginContext } from '../context/AuthProvider';
import { useCookies } from 'react-cookie';
// import "../style/EditVideo.css"
const previousSelectedPost = [];
const compareToFirstPassword = ({ getFieldValue }) => ({
    validator(rule, value) {
        if (getFieldValue('password') === value) return Promise.resolve();
        return Promise.reject("Two passwords that you enter is inconsistent!")
    }
});

function Profile(props) {
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
    const [pic, setPic] = useState(props.pic);
    var user_id = localStorage.getItem('global_userID');
    var globla_token = localStorage.getItem('global_token');
    var profileimg = localStorage.getItem('global_profile_IMG');
    console.log(user_id);
    console.log(globla_token);
    console.log("img" + profileimg)
    const ref = createRef();
    const [pick, setPick] = useState('');

    // Edit Name
    const handleEditName = () => {
        console.log(1);
        // console.log(user);
        setshowInputName(true)
    };


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
    // Edit Email
    const handleEditEamil = () => {
        setshowInputEmail(true)
    };
    const handleAffirmEamil = () => {

    };
    const handleCloseEmail = () => {
        setshowInputEmail(false)
    };

    const handleEditPsw = () => {
        setShowEditPsw(true)
    }
    const handleClosePsw = () => {
        setShowEditPsw(false)
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

    return (
        <Container style={{ minHeight: '100vh' }}>
            <Row className='pt-3'>
                <Col md={4} style={{ backgroundColor: 'whitesmoke' }} className="mr-1">
                    <Row className='mt-4'>
                        <div style={{ width: '100px' }} className="mx-auto">
                            {/* <Image roundedCircle src={pic} fluid /> */}
                            {/* <UploadPicinProfile /> */}
                            <Image
                                width={'90%'}
                                src={avatar}
                                center={'true'}
                            />
                        </div>
                    </Row>
                    <br />
                    <Row>
                        <p className="font-weight-bold text-center">{cookie.name}</p>
                        <p className="text-center">{cookie.email}</p>

                    </Row>
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

                        <center>
                            <Button variant="outline-dark" size="sm" onClick={handleEditPsw} >Edit Password</Button>
                            <hr />
                        </center>


                    }

                </Col>
                <Col md={7}>
                    <Row style={{ backgroundColor: 'whitesmoke' }}>
                        <Row className='mt-4' >
                            <Col md={9}>
                                <UploadPicinProfile />
                            </Col>
                            <Col md={3} className='pt-4'>
                                <Button variant="outline-dark" onClick={handleImg}>Change IMG</Button>
                            </Col>
                        </Row>
                        <br />
                        {!showInputName ?
                            <Row className='mt-4 md-4'>
                                <Col md={9}>
                                    <p>{name}</p>
                                </Col>
                                <Col md={3}>
                                    <Button variant="outline-dark" onClick={handleEditName}>Edit</Button>
                                </Col>
                            </Row>
                            :
                            <Row className='mt-4 md-4'>
                                <Col md={9} sm={5}>
                                    <Form.Item
                                        name="editName"
                                    >
                                        <Input onChange={e => setName(e.target.value)} placeholder="Enter Name" />
                                    </Form.Item>
                                </Col>
                                <Col md={3} sm={7}>
                                    <CheckCircleOutlined onClick={handleAffirmName} />
                                    <CloseCircleOutlined onClick={handleCloseName} />
                                </Col>
                            </Row>
                        }
                    </Row>
                    <Row className="mt-1" style={{ backgroundColor: 'whitesmoke', minHeight: '80vh' }}>
                        <Row>
                            <Col md={9} sm={5}>
                                <h2>My work</h2>
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
                                                    onClick={(e) => selectedToPost(e)}
                                                />
                                            </li>
                                        })}
                                    </ul>
                                </Col>
                            </Col>
                            <Col md={3} sm={7}>
                                <Button variant="outline-dark" onClick={handlePostNew}>Post</Button>{' '}
                            </Col>
                        </Row>
                    </Row>
                    <div>

                        {/* {!showInputEmail?
                <Row>
                    <Col md={9}>
                        <p>{email}</p>
                    </Col>
                    <Col md={3}>
                        <Button variant="outline-dark" onClick={handleEditEamil}>Edit</Button>
                    </Col>
                </Row>
                :
                <Row>
                    <Col md = {9} sm = {5}>
                        <Form.Control
                             type="text"
                             placeholder="Enter Email"
                             onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Col>
                    <Col md = {3} sm = {7}>
                        <CheckCircleOutlined onClick={handleAffirmEamil}/>
                        <CloseCircleOutlined onClick={handleCloseEmail} />
                    </Col>
                </Row>
            } */}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default Profile;

const imgData = [
    { imgUrl: 'https://s1.r29static.com/bin/entry/43a/0,200,2000,2000/x,80/1536749/image.jpg', name: '01', topic: 'Star' },
    { imgUrl: 'https://hips.hearstapps.com/cosmouk.cdnds.net/15/33/1439714614-celebrity-face-mashups-taylor-swift-emma-watson.jpg', name: '02', topic: 'House' },
    { imgUrl: 'https://stylesatlife.com/wp-content/uploads/2021/11/Emma-Watson-face-shape.jpg.webp', name: '03', topic: 'New Year' },
    { imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScxopB3Y_Z0Yu1v5JpXdx-3NOKX7yqg1iIHg&usqp=CAU', name: '04', topic: 'Amazing' },
    { imgUrl: 'https://c4.wallpaperflare.com/wallpaper/485/848/917/actresses-mckenna-grace-actress-blonde-blue-eyes-hd-wallpaper-preview.jpg', name: '05', topic: 'Fashion' },
]