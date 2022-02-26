import React, { Component, useState, memo, createRef } from 'react';
import '../style/Login.css';
import {LeftCircleOutlined, RightCircleOutlined} from '@ant-design/icons';
import '../bootstrap-4.3.1-dist/css/bootstrap.min.css'

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

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.info = props;
        console.log(this.info.props.name);
        this.state = {
            NameVal:'',         
            EmailVal:'',
        }
    }
    handleSignInRedirect = () => {

    }
    render(){
        return(
            <div className="login-wrapper">
                <h2> Log in </h2>
                <form>
                    <label>
                        <p>Username</p>
                        <input type="text" />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" />
                    </label>
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