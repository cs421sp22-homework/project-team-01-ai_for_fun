
import React,{useState,useContext} from 'react';
import {message} from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons';
import UploadPic from './UploadPic';
import '../style/Profile.css';
import {Row, Col, Button, Form} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css";
import {LoginContext} from '../context/AuthProvider';
import { useCookies } from 'react-cookie';

function Profile(props) {
    props = props.props
    // const {user,setUser,email,setEmail} = useContext(LoginContext);
    const [cookie, setCookie] = useCookies(['access_token', 'refresh_token','name','email'])
    const [name, setName] = useState(cookie.name);
    const [email, setEmail] = useState(cookie.email);
    const [showInputEmail, setshowInputEmail] = useState(false);
    const [showInputName, setshowInputName] = useState(false);
    const [pic, setPic] = useState(props.pic);
 
    // Edit Name
    const handleEditName = () => {
        console.log(1);
        // console.log(user);
        setshowInputName(true)
    };
    // TODO: Interaction with backend
    const handleAffirmName = async () => {
        if (name != cookie.name){
            try{
                let url = 'https://server-demo.ai-for-fun-backend.com/'
                
                const response = await fetch(url,{
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        "new_name":name
                    })
                });
                console.log(response.status)
    
                if (response.status == 200){
                  const content = await response.json();
                  // TODO
              }
              else {
                  console.log('request failed', response);
                  message.error('request failed')
              } 
              }catch(err){
                  if (err.response?.status ===500){
                      message.error('Missing Email or Password');
                  }else{
                      message.error('Login Failed!');
                  }
              }
        }else{
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
                    <p className="font-weight-bold text-center">{name}</p>
                    <p className="text-center">{email}</p>
                    
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