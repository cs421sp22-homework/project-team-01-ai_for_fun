import React from "react";
import ImgCrop from 'antd-img-crop';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/es/modal/style';
import "antd/dist/antd.css";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { LoginContext } from "../context/AuthProvider";
import Amplify, { Storage } from 'aws-amplify'
import config from '../aws-exports';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

Amplify.configure(config)



function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


class UploadPic extends React.Component {
  // static contextType = LoginContext;

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    this.state = {
      imageUrl: cookies.get('avatar') || '',
      filename: null,
      loading: false,
    };
  }

  // state = {
  //   imageUrl: this.cookie.avatar,
  //   filename: null,
  //   loading: false,
  // };

  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    this.setState({ filename: file });
    return isJpgOrPng && isLt2M;
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      message.success(`${info.file.name} file uploaded successfully`);
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
      this.setState({ loading: false });
    }
  };

  makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
  }

  handleRequest = async () => {

    // const formData = new FormData();
    // formData.append('file',filename);
    this.setState({
      loading: true,
    });
    try {
      const { filename } = this.state;
      var fileExtension = filename.name.split('.').pop()
      const hashname = this.makeid(16)+"."+fileExtension
      const result = await Storage.put(hashname, filename);
      console.log(result);
      const signedURL = await Storage.get(result.key);
      console.log(signedURL);
      //localStorage.setItem('global_profile_img',signedURL);

      this.setState({
        imageUrl: signedURL,
        loading: false,
      });

      this.context.avatarimg = signedURL;

    } catch (error) {
      console.log("Error uploading file:", error)
      message.error(`file upload failed.`);
      this.setState({ loading: false });
    }

  }

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <ImgCrop rotate>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          customRequest={this.handleRequest}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </ImgCrop>
    );
  }
}
UploadPic.contextType = LoginContext;

export default withCookies(UploadPic);