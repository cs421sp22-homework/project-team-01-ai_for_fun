import React, { useContext } from 'react';
import { Row, Button } from 'react-bootstrap';
import UploadFace from '../components/UploadFace';
import Card from 'react-bootstrap/Card';
import "../style/EditVideo.css"
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css"
import { LoginContext } from '../context/AuthProvider';
import 'antd/dist/antd.css';
import { useCookies } from 'react-cookie';
import { Input } from 'antd';
import { Layout, message } from 'antd';
import Amplify, { Storage } from 'aws-amplify'
import{EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, PinterestIcon, PinterestShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WeiboIcon, WeiboShareButton, WhatsappIcon, WhatsappShareButton} from "react-share"
import config from '../aws-exports';
Amplify.configure(config)


const { Content, Footer } = Layout;
const { TextArea } = Input;

function EditVideo() {
    const {sourceimg, setSourceimg, faceimg, setFaceimg, dst, setDst,} = useContext(LoginContext);
    const [cookie, setCookie] = useCookies(['access_token', 'user_id', 'refresh_token', 'name', 'email', 'avatar']);
    var postText = "empty";

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

    const handlePost = async (e) => {
        try {
            console.log(dst);
            const hashname = makeid(16)
            const result = await Storage.put(hashname, dst);
            console.log("resultkey " + result.key);
            const signedURL = await Storage.get(result.key);
            console.log("url from key get" + signedURL);
        } catch (error) {
            console.log("Error uploading file:", error)
            message.error(`file upload failed.`);
        }

        message.info('Post Received.');
        if (cookie.access_token) {
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

    const handleSubmit = async (e) => {
        console.log("soureImg "+sourceimg)
        console.log("faceImg "+faceimg)
        if(!sourceimg || !faceimg){
            message.error("Please set the src image and dest image!")
        }else{
            if(cookie.access_token){
                //const response = await fetch('https://server-python.ai-for-fun-backend.com/faceswap', {
                const response = await fetch('http://127.0.0.1:80/faceswap', {

                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "src_url": sourceimg,
                        "dst_url": faceimg,
                        "user_id": cookie.user_id,
                        "src_s3_id": localStorage.getItem('src_s3_id'),
                        "dst_s3_id": localStorage.getItem('dst_s3_id'),
                        "type":"face"
                    })
                });
                if (response.status == 200) {
                    const content = await response.json();
                    setDst(content.res_url)
                    message.success('Completed');
                    setSourceimg("")
                    setFaceimg("")
                    localStorage.setItem('src_s3_id', "")
                    localStorage.setItem('dst_s3_id', "")
                } else{
                    console.log('request failed', response);
                    message.error('failed.');
                }
            } else{
                localStorage.setItem('src_s3_id', "")
                localStorage.setItem('dst_s3_id', "")
                alert('Login first!')
            }
        }
    }

    const handleReset = () => {
        setSourceimg("")
        setFaceimg("")
        localStorage.setItem('src_s3_id', "")
        localStorage.setItem('dst_s3_id', "")
        setDst("")
    }


    return (
        <Layout className="site-layout" style={{ minHeight: '100vh' }}>
            {
                 dst?
                    <Content style={{ margin: '0 16px' }} className='center-box'>
                        <Card style={{ height: '100%', weight: '100%', margin: 35 }}>
                            <center>
                                <Card.Img variant="top" src={dst} style={{width:"60%", maxHeight: "200vh" }} />
                            </center>
                            <Card.Body>
                                <Card.Title>Post to Community</Card.Title>
                                <Card.Text>
                                    <TextArea showCount maxLength={100} style={{ height: 200, margin: 25 }} onChange={onChangeText} placeholder="Tell us what you would like to share in community" />,
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Button onClick={handlePost} variant="dark" size="lg" style={{ float: "right", marginRight: '20px' }}>Post</Button>
                                <Button onClick={handleReset} variant="secondary" size="lg" style={{ float: "right", marginRight: '15px' }}>Cancel</Button>{''}
                            </Card.Footer>
                        </Card>
                        <div style={{display:"flex", marginLeft:"18vw"}}>
                                <EmailShareButton url={dst}>
                                    <EmailIcon/>
                                </EmailShareButton>
                                <FacebookShareButton url={dst}>
                                    <FacebookIcon/>   
                                </FacebookShareButton>
                                <PinterestShareButton url={dst} media={dst}>
                                    <PinterestIcon/>
                                </PinterestShareButton>
                                <TwitterShareButton url={dst}>
                                    <TwitterIcon/>
                                </TwitterShareButton>
                                <WhatsappShareButton url={dst} image={dst}>
                                    <WhatsappIcon/>
                                </WhatsappShareButton>
                                <TelegramShareButton url={dst}>
                                    <TelegramIcon/>
                                </TelegramShareButton>
                                <WeiboShareButton url={dst}>
                                    <WeiboIcon/>
                                </WeiboShareButton>
                        </div>
                    </Content>
                    :
                    <Content style={{ margin: '0 16px' }} className='center-box'>
                        <Row>
                            <ul>
                                <UploadFace control="src" text="Click to Upload"/>
                                <UploadFace control="dest" text="Click to Upload"/>
                            </ul>
                        </Row>
                        <Footer >
                            <Button onClick={handleSubmit} variant="dark" size="lg" style={{ float:'right', marginTop: '0%', marginRight: "14%"}}>Submit</Button>
                            <Button onClick={handleReset} variant="secondary" size="lg" style={{ float:'right', marginTop: '0%', marginRight: "1%"}}>Reset</Button>
                        </Footer>
                    </Content>

            }

        </Layout >
    )
}

export default EditVideo;