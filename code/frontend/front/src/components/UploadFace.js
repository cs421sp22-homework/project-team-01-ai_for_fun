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
Amplify.configure(config)



function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


class UploadFace extends React.Component {
  // static contextType = LoginContext;

  state = {
    filename: null,
    loading: false,
  };

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

  handleRequest = async () => {

    // const formData = new FormData();
    // formData.append('file',filename);
    this.setState({
      loading: true,
    });
    try {
      const { filename } = this.state;
      const result = await Storage.put(filename.name, filename);
      console.log(result);
      const signedURL = await Storage.get(result.key);
      console.log(signedURL);

      this.setState({
        imageUrl: signedURL,
        loading: false,
      });

      this.context.faceimg = signedURL;

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
UploadFace.contextType = LoginContext;

export default UploadFace;