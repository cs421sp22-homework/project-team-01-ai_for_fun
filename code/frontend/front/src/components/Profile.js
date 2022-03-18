
import React,{useState,useContext} from 'react';
import {message, Input,Form} from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons';
import UploadPic from './UploadPic';
import '../style/Profile.css';
import {Row, Col, Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css";
import {LoginContext} from '../context/AuthProvider';
import { useCookies } from 'react-cookie';

const compareToFirstPassword = ({getFieldValue}) => ({
    validator(rule, value){
      if (getFieldValue('password')=== value) return Promise.resolve();
      return Promise.reject("Two passwords that you enter is inconsistent!")
    }
  });

function Profile(props) {
    props = props.props
    // const {user,setUser,email,setEmail} = useContext(LoginContext);
    const [cookie, setCookie] = useCookies(['access_token', 'refresh_token','name','email'])
    const [name, setName] = useState(cookie.name);
    const [email, setEmail] = useState(cookie.email);
    const [password, setPassword] = useState('');
    const [oriPsw, setOriPsw] = useState('');
    const [showInputEmail, setshowInputEmail] = useState(false);
    const { avatarimg } = useContext(LoginContext);
    const [showEditPsw,setShowEditPsw] = useState(false)
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
                let url = 'https://server-demo.ai-for-fun-backend.com/changeinfo/:'+cookie.access_token
                
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
                  let expires = new Date();
                  expires.setTime(expires.getTime() + (30*60*1000));
                  setCookie('name', content.name, { path: '/',  expires});
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

    const handleEditPsw = () => {
        setShowEditPsw(true)
    }
    const handleClosePsw = () => {
        setShowEditPsw(false)
    }
    const handleAffirmPsw = async() => {
        if (password && oriPsw){
            try{
                let url = 'https://server-demo.ai-for-fun-backend.com/changeinfo/:'+cookie.access_token
                const response = await fetch(url,{
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        "old_password":oriPsw,
                        "new_password":password
                    })
                });
                console.log(response.status)
    
              if (response.status == 200){
                  const content = await response.json();
                  let expires = new Date();
                  expires.setTime(expires.getTime() + (30*60*1000));
                  setCookie('name', content.name, { path: '/',  expires});
              }
              else {
                  console.log('request failed', response);
                  setName(cookie.name)
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
            message.error("Please input password")
        }
        
    }
    
    return (
        <Container style={{minHeight: '100vh'}}>
            <Row className='pt-3'>
            <Col md={4} style={{backgroundColor: 'whitesmoke'}} className="mr-1">
                <Row className='mt-4'>
                    <div style={{width: 180}} className="mx-auto">
                    <Image roundedCircle src={pic} fluid />
                    </div>
                </Row>
                <br/>
                <Row>
                    <p className="font-weight-bold text-center">{cookie.name}</p>
                    <p className="text-center">{cookie.email}</p>
                    
                </Row>
                {showEditPsw?
                <div>
                <center>
                <Button variant="outline-dark" size="sm" onClick={handleClosePsw} >Cancle</Button>
                <hr/>
                </center>
                <Form>
                <Form.Item
                    label="Original"
                    name="original"
                    rules={[
                    {required: true,
                    message: 'Please input your original password!',
                    },
                ]}
                >
                    <Input.Password  onChange={e=> setOriPsw(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                    {required: true,
                    message: 'Please input your password!',
                    },
                ]}
                >
                <Input.Password  onChange={e=> setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Confirm "
                    name="confirm"
                    rules={[
                    {required: true,
                    message: 'Please confirm your password!',
                    },
                    compareToFirstPassword,
                ]}
                >
                <Input.Password  onChange={e=> setPassword(e.target.value)} />
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
                <hr/>
            </center>

                
            }
                 
            </Col>
            <Col md={7}>
            <Row style={{backgroundColor: 'whitesmoke'}}>
                <Row className='mt-4' >
                    <Col md={9}>
                       <UploadPic />
                    </Col>
                    <Col md={3} className='pt-4'>
                        <Button variant="outline-dark">Submit</Button>
                    </Col>
                </Row>
                <br />
            {!showInputName?
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
                    <Col md = {9} sm = {5}>
                        <Form.Item
                        name="editName"
                        >
                        <Input  onChange={e=> setName(e.target.value)} placeholder="Enter Name"/>
                        </Form.Item>
                    </Col>
                    <Col md = {3} sm = {7}>
                        <CheckCircleOutlined onClick={handleAffirmName}/>
                        <CloseCircleOutlined onClick={handleCloseName} />
                    </Col>
                </Row>
            }
            </Row>
            <Row className="mt-1" style={{backgroundColor: 'whitesmoke',minHeight: '80vh'}}>
                <h2>My work</h2>
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