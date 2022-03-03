import React, { Component, useState, memo, createRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import '../style/Login.css';
import {LeftCircleOutlined, RightCircleOutlined} from '@ant-design/icons';
import '../bootstrap-4.3.1-dist/css/bootstrap.min.css'


ReactDom
async function loginUser(credential){
    return fetch('http://localhost:8080/login',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credential)
    })
        .then(data =>data.json())
}

export default class Login extends React.Component{
    // [username, setUserName] = useState();
    // [password, setPassword] = useState();
    constructor(props) {
        super(props);
        this.info = props;
        console.log(this.info.props.name);
        this.state = {
            username:"",
            password:""         
        }
    }

    handleSubmit = async e => {
        console.log(this.state)
        e.preventDefault();
        let error = false
        this.props.for.validateFields((err,values)=>{
            console.log('huxb')
            console.log(err)
            console.log(values)
            if (!err){
                console.log('error'+error)
                console.log("Received values of form:", values);
                return
            }
        });
        
        
    }
    handleSignInRedirect = () => {

    }
    render(){
        console.log(this.props)
        const { getFieldDecorator} = this.props.form;
        return(

            <div className="login-wrapper">
                <h2> Log in </h2>
                <form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                onChange={this.handleChangeUsername}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                onChange={this.handleChangePwd}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember',{
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<CheckBox style={{marginLeft:'13%'}}>Remember Me</CheckBox>)}
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{marginLeft: '5%'}}>
                            Login in
                        </Button>
                    </Form.Item>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                    <div className = "sign-in-button">
                        <button onClick={this.handleSignInRedirect}>Don't have an account yet?</button>
                    </div>
                </form>
            </div>
        )
    }
}