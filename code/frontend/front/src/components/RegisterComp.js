import {
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';
import 'antd/dist/antd.css';
import React from 'react'
import '../style/registerComp.css'
import axios from 'axios'
import { useState } from "react";
import { Navigate } from "react-router-dom";
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css";
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';


const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user_type] = useState('USER');
  const [redirect, setRedirect] = useState(false);

  const compareToFirstPassword = ({ getFieldValue }) => ({
    validator(rule, value) {
      if (getFieldValue('password') === value) return Promise.resolve();
      return Promise.reject("Two passwords that you enter is inconsistent!")
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://server-demo.ai-for-fun-backend.com/user/register", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'name': name,
        'email': email,
        'password': password,
        'user_type': user_type
      })
    });
    if (response.ok) {
      const content = await response.json();
      console.log(content);
      alert("Success!")
      setRedirect(true)
    }
    else {
      console.log('request failed', response);
    }
  }

  if (redirect) {
    return <Navigate to="/login" />
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <>
      <Container style={{marginTop:100}}>
        <div className='redisterTitle'>Register</div>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Form {...formItemLayout} onSubmit={handleSubmit} className='register-form'>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Name!',
                  },
                ]}
              >
                <Input onChange={e => setName(e.target.value)} />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input onChange={e => setEmail(e.target.value)} />
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
                <Input.Password onChange={e => setPassword(e.target.value)} />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="confirm"
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  compareToFirstPassword,
                ]}
              >
                <Input.Password onChange={e => setPassword(e.target.value)} />
              </Form.Item>
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>I have read the <a href="http://www.baidu.com">agreement</a></Checkbox>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                  Register
                </Button>
                <Button type="primary1" className='toLogin'>
                  <a href='/login'>
                    Return to Login
                  </a>
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </>
  );
};

export default RegistrationForm;