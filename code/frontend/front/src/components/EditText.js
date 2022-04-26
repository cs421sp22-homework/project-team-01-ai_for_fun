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
import Card from 'react-bootstrap/Card';

const { Content, Footer } = Layout;
const { SubMenu } = Menu;
const { TextArea } = Input;

const tempvideo = {
    videoSrc: "http://media.w3.org/2010/05/bunny/movie.mp4",
    poster: "https://epe.brightspotcdn.com/f8/ca/abde5f4f4a30a6a3d1a0eaa23821/test-032021-968416412.jpg"
}

const test = {
    videoSrc: "code/frontend/front/public/video/test.mp4",
    //poster: "https://epe.brightspotcdn.com/f8/ca/abde5f4f4a30a6a3d1a0eaa23821/test-032021-968416412.jpg"
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
    const [cookie, setCookie] = useCookies(['access_token', 'user_id', 'refresh_token', 'name', 'email'])
    const [pick, setPick] = useState('');
    const [loading, setLoading] = useState(false)
    const [changeToVedio, SetchangeToVedio] = useState(false);
    const [showCard, setShowCard] = useState(false);
    var inputText = "Sorry, please input any text in the below box again";

    const onChangeText = e => {
        inputText = e.target.value;
    };


    //TODO need change API
    const handleInput = async (e) => {
        console.log('input: ', inputText);
        console.log('voice source id: ', person);
        if (!inputText || !person) {
            message.error('Please choose one voice source and type text you want to use!');
        } else {
            try{
                if (cookie.access_token) {
                    setLoading(true)
                    const response = await fetch('https://server-python.ai-for-fun-backend.com/exchangeaudio', {
                        // const response = await fetch('http://127.0.0.1:8080/exchangeaudio', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            "text": inputText,
                            "person": person,
                            "user_id": cookie.user_id,
                        })
                    });
                    setLoading(false)
                    if (response.status == 200) {
                        const content = await response.json();
                        setDst(content.res_url)
                        message.success('complete!');
                        SetchangeToVedio(true);
                    }
                    else {
                        console.log('request failed', response);
                        message.error('failed.');
                    }
                } else {
                    alert('Login first!')
                }
            }catch{
                setLoading(false)
            }
        }
    }

    const handleShowCard = () => {
        setShowCard(true);
    }

    const handleHideCard = () => {
        setShowCard(false);
        console.log('Change:', inputText);
    }
    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const getS3Id = (url) => {
        var words = url.split("?")
        if(words[0].length<31){
            return url
        }
        return ("id=" + words[0].substr(31))
    }

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
            //message.error(`file upload failed.`);
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
            let avatar_s3id = getS3Id(cookie.avatar)
            console.log("content url ID   " + dst.substring(31, 51));
            console.log("content url" + dst);
            console.log("postText " + inputText);
            console.log("user_id " + cookie.user_id);
            console.log("user_name " + cookie.name);
            try{
                setLoading(true)
                const response = await fetch('https://server-demo.ai-for-fun-backend.com/createpost', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "content_url": "id=" + dst.substring(31, 51),
                    "post_text": inputText,
                    "user_id": cookie.user_id,
                    "user_name": cookie.name,
                    "user_avater": avatar_s3id
                })
            });
            setLoading(false)
            if (response.status == 200) {
                const content = await response.json();
                setDst(content.res_url)
                message.success('Post success!');
            }
            else {
                console.log('post failed', response);
                message.error('failed.');
            }
            }catch{
                setLoading(false)
            }
            
        } else {
            alert('Login first!')
        }
    };

    return (
        <Layout className="site-layout" style={{ background: 'white' }}>
            {
            loading ?
            <div className='loading'>
               <img src = "images/processing.gif" style={{height:120,width:120}}/>
            </div>
            :
            <div>

            </div>
            }
            {
                showCard ?
                    <Content style={{ margin: '0 16px' }} className='center-box' >
                        <Row>
                            <Col>
                                <center>
                                    <center style={{ width: "60%", height: "50%" }}>
                                        <Video props={{ "videoSrc": dst }} />
                                    </center>
                                </center>
                            </Col>
                            <Col>
                                <center>
                                    <h3 style={{ margin: 10 }}>Post to Community</h3>
                                    <TextArea showCount maxLength={100} style={{ height: 100, margin: 25 }} onChange={onChangeText} placeholder="Tell us what you would like to share in community" />,
                                    <Button onClick={handlePost} style={{ float: "right", marginRight: '20px' }}>Submit</Button>
                                    <Button onClick={handleHideCard} variant="danger" style={{ float: "right", marginRight: '15px' }}>Cancel</Button>{''}
                                </center>
                            </Col>
                        </Row>
                    </Content >
                    :
                    <Content>
                        <Content style={{ margin: '0 16px' }} className='center-box'>
                            <Row>
                                <Col>
                                    <center>
                                        {console.log(dst)}
                                        {dst ?
                                            <center style={{ width: "60%", height: "50%" }}>
                                                <Video props={{ "videoSrc": dst }} />
                                            </center>
                                            :
                                            sourceimg ?
                                                <Image src={sourceimg} fluid />
                                                :
                                                <Image src="images/text_instruction.gif" fluid/>
                                        }
                                        {console.log("person" + person)}
                                    </center>
                                </Col>
                                <Col>
                                    <center>
                                        <h3 style={{ margin: 10 }}>Please input the content you would like to manipulate</h3>
                                        <TextArea showCount maxLength={100} style={{ height: 100, margin: 25 }} onChange={onChangeText} />
                                        {dst ?
                                            <Button onClick={handleShowCard} size="lg" style={{ float: "right", marginRight: '50px' }}>Post</Button> :
                                            <Button onClick={handleShowCard} size="lg" style={{ float: "right", marginRight: '50px' }} disabled>Post</Button>
                                        }
                                        <Button variant="outline-dark" size="lg" onClick={handleInput}>Continue</Button>{' '}
                                    </center>
                                </Col>
                            </Row>
                        </Content>
                    </Content>
            }
        </Layout >
    )
}

export default EditText;