// import React from 'react';
// import {Input, Form, Button, AutoComplete} from 'antd';
// import 'antd/dist/antd.css';
// // import axios from "axios";
// const API_URL = "http://localhost:8080/api/auth/";

// // const {Option } = Select;
// const AutoCompleteOption = AutoComplete.Option;
// export default class Register extends React.Component{
//     constructor(props) {
//         super(props);
//         this.info = props;
//         console.log(this.info.props.name); 
//         this.state = {
//             username:"",
//             email:"",
//             password:"",
//         }
//     }

//     //TODO: 提交信息至后端，如果成功入库则显示注册成功，反之失败
//     handleRegister = ()=>{

//     }

//     handleEmail = (e) =>{
//         this.setState({
//             email:e.target.value
//         })
//     }

//     handlePassword = (e) =>{
//         this.setState({
//             password:e.target.value
//         })
//     }

//     handleUsername = (e) =>{
//         this.setState({
//             username:e.target.value
//         })
//     }
//     handleSubmit = (e) =>{
//         e.preventDefault();
//         this.props.form.validateFieldsAndScroll((err,values) =>{
//             if (!err){
//                 console.log('Received value:', values);
//             }
//         });
//         this.handleRegister();
//     };

//     PassWordCompare = (rule, value, callback) =>{
//         const form = this.props.form;
//         if (value && value != form.getFieldValue('password')){
//             callback('password is not the same!');
//         }
//         else {
//             callback();
//         }
//     };

//     handleConfirmBlur = e => {
//         const value = e.target.value;
//         this.setState({ confirmDirty: this.state.confirmDirty || !!value });
//       };
//     render(){
//         const { getFieldDecorator } = this.props.form;
//         const { autoComResult } = this.state;

//         return (
//             <div>
//                 <div className='Title'>Register</div>
//                 <Form onSubmit={this.handleSubmit}>
//                     <Form.Item label="Email">
//                         {getFieldDecorator('email',{
//                             rules:[
//                                 {
//                                     type:'email',
//                                     message: 'The input is not valid Email!',

//                                 },
//                                 {
//                                     required: true,
//                                     message: 'Input your Email!',
//                                 },
//                             ],
//                         })(<Input onChange={this.handleEmail} />)}
//                     </Form.Item>
//                     <Form.Item label="UserName">
//                         {getFieldDecorator('username',{
//                             rules:[
                                
//                                 {
//                                     required: true,
//                                     message: 'Input your Username',
//                                     whitespace: true,
//                                 },
//                             ],
//                         })(<Input onChange={this.handleUsername} />)}
//                     </Form.Item>
//                     <Form.Item label="Password">
//                         {getFieldDecorator('password',{
//                             rules:[
//                                 {
//                                     required: true,
//                                     message: 'Please input your pasword!',

//                                 },
                                
//                             ],
//                         })(<Input onChange={this.handlePassword} />)}
//                         </Form.Item>
//                         <Form.Item label="Confirm Password" hasFeedback>
//                             {getFieldDecorator('confirm', {
//                             rules: [
//                                 {
//                                 required: true,
//                                 message: 'Please confirm your password!',
//                                 },
//                                 {
//                                 validator: this.PassWordCompare,
//                                 },
//                             ],
//                             })(<Input.Password onBlur={this.handleConfirmBlur} />)}
//                         </Form.Item>
//                         <Form.Item >
//                             <Button type="primary" htmlType="submit">
//                             Register
//                             </Button>
//                             <Button type="primary1" className='toLogin'>
//                             <a href='/login'>
//                             back to login
//                             </a>
//                             </Button>
//                         </Form.Item>
//                 </Form>
//             </div>
//         )
//     }
// }

// // import { Form, Input, Button, Checkbox } from 'antd';

// // const Demo = () => {
// //   const onFinish = (values) => {
// //     console.log('Success:', values);
// //   };

// //   const onFinishFailed = (errorInfo) => {
// //     console.log('Failed:', errorInfo);
// //   };

// //   return (
// //     <Form
// //       name="basic"
// //       labelCol={{
// //         span: 8,
// //       }}
// //       wrapperCol={{
// //         span: 16,
// //       }}
// //       initialValues={{
// //         remember: true,
// //       }}
// //       onFinish={onFinish}
// //       onFinishFailed={onFinishFailed}
// //       autoComplete="off"
// //     >
// //       <Form.Item
// //         label="Username"
// //         name="username"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please input your username!',
// //           },
// //         ]}
// //       >
// //         <Input />
// //       </Form.Item>

// //       <Form.Item
// //         label="Password"
// //         name="password"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please input your password!',
// //           },
// //         ]}
// //       >
// //         <Input.Password />
// //       </Form.Item>

// //       <Form.Item
// //         name="remember"
// //         valuePropName="checked"
// //         wrapperCol={{
// //           offset: 8,
// //           span: 16,
// //         }}
// //       >
// //         <Checkbox>Remember me</Checkbox>
// //       </Form.Item>

// //       <Form.Item
// //         wrapperCol={{
// //           offset: 8,
// //           span: 16,
// //         }}
// //       >
// //         <Button type="primary" htmlType="submit">
// //           Submit
// //         </Button>
// //       </Form.Item>
// //     </Form>
// //   );
// // };

// // ReactDOM.render(<Demo />, mountNode);