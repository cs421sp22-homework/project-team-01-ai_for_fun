import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import 'antd/dist/antd.css';
import React from 'react'
import '../style/registerComp.css'
import axios from 'axios'
import {QuestionCircleOutlined} from '@ant-design/icons';

// const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    email: '', 
    password: '', 
    username: '', 
    residence: '', 
    website: ''
  };

  submitH = () =>{
    if(!this.state.email || !this.state.password){
      return
    }
    console.log(this.state.email)
    // let data = {email: this.state.email, password: this.state.password}
    let url = 'http://44.202.107.241:8000/user/register/'
    axios({
      method:'post',
      url: url,
      data:{
        email: this.state.email,
        password: this.state.password
      }
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }

  handleEmail = (e) =>{
    this.setState({
      email: e.target.value
    })
  }
  handlePassword = (e) =>{
    this.setState({
      password: e.target.value
    })
  }
  handleUsername = (e) =>{
    this.setState({
      username: e.target.value
    })
  }
  handleResidence = (e) =>{
    this.setState({
      email: e.target.value
    })
  }
  handleWebsite = (e) =>{
    this.setState({
      email: e.target.value
    })
  }


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    this.submitH();     
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { autoCompleteResult } = this.state;

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

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <div className='registerDiv'>
          <div className='redisterTitle'>Register</div>
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className='register-form'>
      <Form.Item
        name={['user', 'email']}
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
        <Input onChange={this.handleEmail} />
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
          <Input.Password  onChange={this.handlePassword} />
        </Form.Item>
        <Form.Item
              label="Confirm Password"
              name="confirm"
              rules={[
              {required: true,
              message: 'Please confirm your password!',
              },
          ]}
          >
          <Input.Password  onChange={this.handlePassword} />
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
          <Button type="primary" onClick={this.submitH} htmlType="submit">
            Register
          </Button>
          <Button type="primary1" className='toLogin'>
            <a href='/login'>
            Return to Login
            </a>
          </Button>
        </Form.Item>
      </Form>
      </div>
    );
  }
}

export default RegistrationForm;