import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import Alert from 'react-bootstrap/Alert'
import 'antd/dist/antd.css';
import '../style/loginComp.css'
import { useRef, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css";
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';


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
        console.log(content.avatar);
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
    <Container style={{marginTop:100}}>
      <Row ><div className="loginTitle" style={{ marginLeft: '5%' }}>Login</div></Row>
      {errMsg ? (
        <Alert variant={'danger'}>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        </Alert>)
        : (<></>)
      }
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
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
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Submit
              </Button>
              <a className="login-form-forgot" href="http://www.baidu.com" style={{ marginLeft: '5%' }}>
                Forget Password
              </a>
              <a href="/register" style={{ marginLeft: '5%' }}>Not a user?</a>
            </Form.Item>
          </Form>


        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
}

export default NormalLoginForm;