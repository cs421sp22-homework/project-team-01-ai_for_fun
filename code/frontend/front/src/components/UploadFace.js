import React, {useContext} from "react";
import ImgCrop from 'antd-img-crop';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { LoginContext } from "../context/AuthProvider";
import Amplify, { Storage } from 'aws-amplify'
import config from '../aws-exports';
import 'antd/es/modal/style';
import "antd/dist/antd.css";
Amplify.configure(config)



function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


class UploadFace extends React.Component {

  state = {
    filename: null,
  };



  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
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
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      message.success(`${info.file.name} file uploaded successfully`);
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
        }),
      );
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  handleRequest = async () => {
    try {
      const { filename } = this.state;
      var fileExtension = filename.name.split('.').pop()
      const hashname = this.makeid(16) + "." + fileExtension
      const result = await Storage.put(hashname, filename);
      const signedURL = await Storage.get(result.key);
      this.setState({
        imageUrl: signedURL,
      });

      if (this.props.control == "src"){
        this.context.setSourceimg(signedURL)
        localStorage.setItem('src_s3_id', hashname)
      }
      else{
        this.context.setFaceimg(signedURL)
        localStorage.setItem('dst_s3_id', hashname)
      }

    } catch (error) {
      console.log("Error uploading file:", error)
      message.error(`file upload failed.`);
    }

  }

  render() {
    return (
      <div style={{marginTop: "0%", marginBottom: "2%"}}>
        <ImgCrop>
          <Upload
            name="file"
            showUploadList={false}
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
            customRequest={this.handleRequest}
          >
            <ul>
              <img src={this.props.control=="src"? 
                        (this.context.sourceimg? this.context.sourceimg:"images/upload_icon.png"):(this.context.faceimg?this.context.faceimg:"images/upload_icon.png")} 
                    alt="avatar" 
                    style={{ width: '28vw', height: '19vw' }} />
            </ul>
            <Button icon={<UploadOutlined />}>{this.props.text}</Button>
          </Upload>
        </ImgCrop>
      </div>
  
    );
  }
}


UploadFace.contextType = LoginContext;

export default UploadFace;
