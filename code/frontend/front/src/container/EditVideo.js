import React,{useState,createRef,useContext} from 'react';
import Container from 'react-bootstrap/Container';
import {Row, Col, Button} from 'react-bootstrap';
import Video from '../components/Video';
import UploadFace from '../components/UploadFace';
import "../style/EditVideo.css"
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css"
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { LoginContext } from '../context/AuthProvider';
import 'antd/dist/antd.css';

import { Layout, Menu, Image } from 'antd';




const { Header, Content, Footer, Sider } = Layout;


const tempvideo = {
    videoSrc:"http://media.w3.org/2010/05/bunny/movie.mp4",
    poster:"https://epe.brightspotcdn.com/f8/ca/abde5f4f4a30a6a3d1a0eaa23821/test-032021-968416412.jpg"
  }
function EditVideo(props){
    const ref = createRef();
    const { imgData } = props;
    const {faceimg, setFaceimg, sourceimg, setSourceimg} = useContext(LoginContext);
    const [pick, setPick] = useState('');
    const handleSubmit = () =>{
        // TODO: Upload image data as API
        //   fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
        //     method: 'POST',
        //     body: formData,
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ title: 'React POST Request Example' })
        //   })
        //     .then(res => res.json())
        //     .then(() => {
        //       message.success('upload successfully.');
        //     })
        console.log(faceimg);
        console.log(pick);
        console.log(sourceimg);
    
    };

    return(
        <Layout className="site-layout" style={{ minHeight: '100vh' }}>
        <Content style={{ margin: '0 16px' }}  className='center-box'>
        <Row>
        <Col md={1} xl={2}> </Col>
            <Col md={10} xl={8}>
                <center>
                {sourceimg ?
                <Image src={sourceimg}/>
                :
                <Video props={tempvideo} />
                }
                    
                </center>
            </Col>
            <Col md={1} xl={2}></Col>
            </Row>
        </Content>
        <Footer >
            <Row >
            <Col md={2} lg={1} >
                <div className="mx-auto">
                <UploadFace />
                </div>
            </Col>
            <Col md={10} lg={10}>
            <ul ref={ref} >
            <Image.PreviewGroup>
            {imgData.map(item => {
            return <li key={item.name} className="pl-3 mt-1" style={{ display: 'inline-block'}} onClick={() => setPick(item.imgUrl)}>
            <Image
            className='res-img'
            src={item.imgUrl}
            preview = {true}
          />
          </li>
            })}
            </Image.PreviewGroup>
        </ul>
            </Col>
            </Row>
        <Button onClick={handleSubmit} style={{ float:"right" }}>Combine</Button>
        </Footer>
        </Layout>
    )
}

export default EditVideo;