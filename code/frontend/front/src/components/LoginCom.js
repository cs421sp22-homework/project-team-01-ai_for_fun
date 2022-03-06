import React,{SyntheticEvent, useState} from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import '../style/loginComp.css'
import axios from 'axios'
import {LockOutlined, UserOutlined} from '@ant-design/icons';

class NormalLoginForm extends React.Component {

    state = {
        email: '',
        password: ''
    }

    submitHandle = async (e) =>{
        e.preventDefault();

        const response = await fetch("http://localhost:8000/user/login",{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'email':this.email,
                'password':this.password
            })
        });

        if (response.ok){
            const content = await response.json();
            console.log(content);

        }
        else {
            console.log('request failed', response);
        }
    }
    

    // handleSubmit = (e) => {
    //     console.log(this.state)
    //     e.preventDefault();
    //     let error = false
    //     // this.props.form.validateFields((err, values) => {
    //     //     console.log('huxb')
    //     //     console.log(err)
    //     //     console.log(values)
    //     //     if (!err) {
    //     //         console.log('error'+error)
    //     //         console.log('Received values of form: ', values);
    //     //         return
    //     //     }
    //     // });
    //     this.submitHandle()    
    // }

    handleChangeemail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleChangePwd = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        console.log(this.props)
        return (
            <div className='login-div'>
                <div className='loginTitle'>Login</div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item
                        label="email"
                        name="email"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        ]}>
                    <Input
                                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="email"
                                onChange={this.handleChangeemail}
                        />
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
                         <Input.Password
                                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                onChange={this.handleChangePwd}
                        />
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
                        <Button type="primary" onClick={this.submitHandle} className="login-form-button" style={{marginLeft: '25%'}}>
                            Submit
                        </Button>
                     </Form.Item>
                        <a className="login-form-forgot" href="http://www.baidu.com" style={{marginLeft: '25%'}}>
                            Forget Password
                        </a>
                         <a href="/register" style={{marginLeft: '5%'}}>Not a user?</a>
                </Form>
            </div>
        );
    }
}

export default NormalLoginForm;
