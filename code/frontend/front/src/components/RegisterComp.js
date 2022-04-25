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
      <Container style={{ marginTop: 100}}>
        <Row>
          <Col lg={4} md={6} sm={12}>
            <img className="icon-register" src={"images/register_icon.png"} alt="icon"/>
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
                <Checkbox>I have read the <a href="https://cs421sp22-homework.github.io/project-team-01-ai_for_fun/">User Manual</a></Checkbox>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button style={{color: "#fff", backgroundColor: "#813AFE", borderColor: "#813AFE"}}
                        htmlType="submit" 
                        onClick={handleSubmit}>
                  Register Now
                </Button>
                <Button type="primary1" className='toLogin'>
                  <a href='/login'>
                    Return to Login
                  </a>
                </Button>
              </Form.Item>
            </Form>
          </Col>

          <Col lg={8} md={6} sm={12}>
              <img src={"images/register_background.png"} alt="" style={{padding:"5vw", width:"1000px"}}/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegistrationForm;