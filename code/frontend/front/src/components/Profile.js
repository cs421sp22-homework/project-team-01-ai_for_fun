
import React,{useState} from 'react';
// import {Input, message, Tooltip} from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons';
import UploadPic from './UploadPic';
import '../style/Profile.css';
import {Row, Col, Button, Form} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'

function Profile(props) {
    props = props.props
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [showInputEmail, setshowInputEmail] = useState(false);
    const [showInputName, setshowInputName] = useState(false);
 
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
        <Container>
        <div>
            <div>
                <Row>
                    <Col md={9}>
                    <img src={props.pic} className="App-logo" alt="logo" />
                    </Col>
                    <Col md={3}>
                        <UploadPic/>
                    </Col>
                </Row>
                <hr />
            </div>
            <div>
            {!showInputName?
                <Row>
                    <Col md={9}>
                        <p>{props.name}</p>
                    </Col>
                    <Col md={3}>
                        <Button onClick={handleEditName}>Edit</Button>
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
                        <p>{props.email}</p>
                    </Col>
                    <Col md={3}>
                        <Button onClick={handleEditEamil}>Edit</Button>
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
      </div>
      </Container>
    )
}
export default Profile;