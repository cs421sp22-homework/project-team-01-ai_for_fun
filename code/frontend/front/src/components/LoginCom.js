import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import '../style/loginComp.css'
import axios from 'axios'
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import { SyntheticEvent, useRef, useState, useEffect } from "react";
import { Navigate} from "react-router-dom";


  const  NormalLoginForm = () => {
      const userRef = useRef();
      const errRef = useRef();

      const [email,setEmail] = useState('');
      const [pwd, setPwd] = useState('');
      const [errMsg, setErrMsg] = useState('');
      const [success, setSuccess] = useState(false);

      useEffect(() => {
          userRef.current.focus();
      },[])

      useEffect(()=> {
          setErrMsg('');
      },[email,pwd])

      const onFinish = (values) => {
        console.log('Success:', values);
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const handleSubmit = async (e) => {
          e.preventDefault();
          console.log(JSON.stringify({email, pwd}))
          try{
              let url = 'http://44.202.107.241:8000/user/login'
            //   const response = await axios.post(url,JSON.stringify({user, pwd}),
            //   {
            //       headers:{'Content-type':'application/json',
            //     },
            //       withCredentials:true
            //   }
            //   ).then(res=>{
            //     if(res.status === 200){
            //         alert('Success!')
            //         this.props.history.push('/')
            //     }
            //         else{
            //             console.log(res)
            //             alert('Failed!' + res.data.msg)
            //     }
            // });
            const response = await fetch(url,{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    'email':email,
                    'password':pwd
                })
            });
              console.log(JSON.stringify(response?.data));
              const accessToken = response?.data?.accessToken;
              setEmail('');
              setPwd('');
              setSuccess(true);
          }catch(err){
              if(!err?.response){
                  setErrMsg('No Server Response');
              }else if (err.response?.status ===400){
                  setErrMsg('Missing Email or Password');
              }
          }
      }

      return(
          <>
           <div className='login-div'>
               <div className='loginTitle'>Login</div>
              <p ref = {errRef} className={errMsg ? "errmsg": "offscreen"} aria-live="assertive">{errMsg}</p>
          
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
                onSubmit={handleSubmit}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="Email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Email!',
                    },
                  ]}
                >
                  <Input ref={userRef} onChange={(e) => setEmail(e.target.value)} />
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
                </Form.Item>
              </Form>
              <a className="login-form-forgot" href="http://www.baidu.com" style={{marginLeft: '25%'}}>
                                      Forget Password
                  </a>
                   <a href="/register" style={{marginLeft: '5%'}}>Not a user?</a>
            </div>
        </>
      )
  }

export default NormalLoginForm;