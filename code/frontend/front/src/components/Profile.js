
import React,{useState} from 'react';
// import {Input, message, Tooltip} from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons';
import UploadPic from './UploadPic';
import '../style/Profile.css';
import {Row, Col, Button, Form} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css"

function Profile(props) {
    props = props.props
    const [email,setEmail] = useState(props.email);
    const [name,setName] = useState(props.name);
    const [showInputEmail, setshowInputEmail] = useState(false);
    const [showInputName, setshowInputName] = useState(false);
    const [pic, setPic] = useState(props.pic);
 
    // Edit Name
    const handleEditName = () => {
        console.log(1);
        setshowInputName(true)
    };
    // TODO: Interaction with backend
    const handleAffirmName = () => {

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
    
    return (
        <Container style={{minHeight: '100vh'}}>
            <Row className='pt-3'>
            <Col md={3} style={{backgroundColor: 'whitesmoke'}} className="mr-1">
                <Row className='mt-4'>
                    <div style={{width: 180}} className="mx-auto">
                    <Image roundedCircle src={pic} fluid />
                    </div>
                </Row>
                <br/>
                <Row>
                    <p class="font-weight-bold text-center">{name}</p>
                    <p class="text-center">{email}</p>
                    
                </Row>
                <center>
                <Button variant="outline-dark" size="sm" onClick={handleEditEamil} >Edit Password</Button>
                </center>
                <hr/>
            </Col>
            <Col md={8} style={{backgroundColor: 'whitesmoke',minHeight: '100vh'}}>
            <div>
                <Row className='mt-4'>
                    <Col md={9}>
                    <img src={pic} className="App-logo" alt="logo" />
                    </Col>
                    <Col md={3} className='pt-4'>
                        <UploadPic />
                    </Col>
                </Row>
                <hr />
            </div>
            <div>
            {!showInputName?
                <Row>
                    <Col md={9}>
                        <p>{name}</p>
                    </Col>
                    <Col md={3}>
                        <Button variant="outline-dark" onClick={handleEditName}>Edit</Button>
                    </Col>
                </Row>
                :
                <Row>
                    <Col md = {9} sm = {5}>
                        <Form.Control
                             type="text"
                             placeholder="Enter Name" 
                             onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Col>
                    <Col md = {3} sm = {7}>
                        <CheckCircleOutlined onClick={handleAffirmName}/>
                        <CloseCircleOutlined onClick={handleCloseName} />
                    </Col>
                </Row>
            }
            </div>
            <hr />
            <div>

            {!showInputEmail?
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
            }
            </div>
            </Col>
            </Row>
      </Container>
    )
}
export default Profile;