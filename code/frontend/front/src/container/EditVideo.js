import React,{useState,createRef} from 'react';
import Container from 'react-bootstrap/Container';
import {Row, Col, Button} from 'react-bootstrap';
import Video from '../components/Video';
import UploadFace from '../components/UploadFace';
import "../style/EditVideo.css"
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css"
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { Layout, Menu, Image } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const handleSubmit = () =>{

}


const { Header, Content, Footer, Sider } = Layout;


const tempvideo = {
    videoSrc:"http://media.w3.org/2010/05/bunny/movie.mp4",
    poster:"https://epe.brightspotcdn.com/f8/ca/abde5f4f4a30a6a3d1a0eaa23821/test-032021-968416412.jpg"
  }
function EditVideo(props){
    const ref = createRef();
    const { imgData } = props;
    const [collapsed,setCollapsed] = useState(false);
    const onCollapse = collapsed => {
        console.log(collapsed);
        if (collapsed){
            setCollapsed(true);
        }else{
            setCollapsed(false);
        }
        
      };
    return(
        <Layout className="site-layout" style={{ minHeight: '100vh' }}>
        <Content style={{ margin: '0 16px' }}  className='center-box'>
        <Row>
        <Col md={1} xl={2}> </Col>
            <Col md={10} xl={8}>
                <center>
                    <Video props={tempvideo} />
                    </center>
                    </Col>
            <Col md={1} xl={2}></Col>
            </Row>
        </Content>
        <Footer >
            <Row>
            <Col md={2} lg={1}>
            <UploadFace />
            </Col>
            <Col md={10} lg={10}>
            <ul ref={ref} style={{ float:"left" }}>
            <Image.PreviewGroup>
            {imgData.map(item => {
            return <li key={item.name} className="pl-3" style={{ display: 'inline-block'}}>
            <Image
            width={110}
            height={110}
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