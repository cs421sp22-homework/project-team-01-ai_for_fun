import React, { useState, createRef, useContext, useEffect } from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';
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
import config from '../aws-exports';
Amplify.configure(config)


const { Content, Footer } = Layout;
const { TextArea } = Input;

function EditStyle() {
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
            console.log("content url ID   " + dst.substring(31, 51));
            console.log("content url" + dst);
            console.log("postText " + postText);
            console.log("user_id " + cookie.user_id);
            console.log("user_name " + cookie.name);
            const response = await fetch('https://server-demo.ai-for-fun-backend.com/createpost', {
                //const response = await fetch('http://127.0.0.1:80/createpost', {
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
                //const response = await fetch('https://server-python.ai-for-fun-backend.com/styletransfer', {
                const response = await fetch('http://127.0.0.1:80/styletransfer', {

                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "content_url": sourceimg,
                        "style_url": faceimg,
                        "user_id": cookie.user_id,
                        "content_s3_id": sourceimg
                    })
                });
                if (response.status == 200) {
                    const content = await response.json();
                    setDst(content.res_url)
                    message.success('Completed');
                    setSourceimg("")
                    setFaceimg("")
                } else{
                    console.log('request failed', response);
                    message.error('failed.');
                }
            } else{
                alert('Login first!')
            }
        }
    }

    const handleReset = () => {
        setSourceimg("")
        setFaceimg("")
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
                                <Button onClick={handlePost} style={{ float: "right", marginRight: '20px' }}>Post</Button>
                                <Button onClick={handleReset} variant="danger" style={{ float: "right", marginRight: '15px' }}>Cancel</Button>{''}
                            </Card.Footer>
                        </Card>
                    </Content>
                    :
                    <Content style={{ margin: '0 16px' }} className='center-box'>
                        <Row>
                            <ul>
                                <UploadFace control="src" text="Upload Content Image"/>
                                <UploadFace control="dest" text="Upload Style Image"/>
                            </ul>
                        </Row>
                        <Footer >
                            <Button onClick={handleSubmit} variant="dark" size="lg"  style={{ float:'right', marginTop: '0%', marginRight: "14%"}}>Submit</Button>
                            <Button onClick={handleReset} variant="secondary" size="lg" style={{ float:'right', marginTop: '0%', marginRight: "1%"}}>Reset</Button>
                        </Footer>
                    </Content>

            }

        </Layout >
    )
}

export default EditStyle