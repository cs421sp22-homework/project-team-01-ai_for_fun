import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import Alert from 'react-bootstrap/Alert'
import { useRef, useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css";
import 'antd/dist/antd.css';
import '../style/loginComp.css'
import { Center } from '@chakra-ui/react';


const NormalLoginForm = () => {
  const [cookie, setCookie] = useCookies(['access_token', 'refresh_token', 'user_id', 'name', 'email', 'avatar'])
  const userRef = useRef();
  const errRef = useRef();

  const [email_login, setEmail_login] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email_login, pwd])

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email_login, pwd }))
    try {
      let url = 'https://server-demo.ai-for-fun-backend.com/user/login'

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'email': email_login,
          'password': pwd
        })
      });
      console.log(response);

      if (response.status == 200) {
        const content = await response.json();
        let expires = new Date();
        console.log(content);
        expires.setTime(expires.getTime() + (30 * 60 * 1000));
        setCookie('access_token', content.token);
        setCookie('refresh_token', content.refresh_token);
        setCookie('name', content.name);
        setCookie('email', content.email);
        setCookie('avatar', content.avatar);
        setCookie('user_id', content.user_id);
        console.log(content.token)
        console.log(content.user_id)
        localStorage.setItem('global_userID', content.user_id);
        localStorage.setItem('global_token', content.token);
        setSuccess(true);
        setRedirect(true)
      }
      else {
        console.log('request failed', response);
        setErrMsg('Wrong Email or Password');
      }
    } catch (err) {
      if (err.response?.status === 500) {
        setErrMsg('Missing Email or Password');
      } else {
        setErrMsg('Login Failed!');
      }
      errRef.current.focus();
    }
  }

  if (redirect) {
    return <Navigate to="/" />
  }


  return (
    <Container style={{marginTop:200}}>
      {errMsg ? (
        <Alert variant={'danger'}>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        </Alert>)
        : (<></>)
      }
      <Row>
        <Col lg={4} md={6} sm={12} style={{marginTop:100}}>
          <img className="icon-img" src={"images/user.svg"} alt="icon"/>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input ref={userRef} onChange={(e) => setEmail_login(e.target.value)} />
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
              <Input.Password ref={userRef} onChange={(e) => setPwd(e.target.value)} />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button style={{color: "#fff", backgroundColor: "#813AFE", borderColor: "#813AFE"}} 
                      htmlType="submit" 
                      onClick={handleSubmit}>
                Login Now
              </Button>
              <a href="/register" style={{ marginLeft: '13%', fontSize: "16px"}}>Not a user?</a>
            </Form.Item>
          </Form>


        </Col>
        <Col lg={8} md={6} sm={12}>
              <img className="w-100" src={"images/login.svg"} alt=""/>
          </Col>
      </Row>
    </Container>
  );
}

export default NormalLoginForm;