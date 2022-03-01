
import React from 'react';
// import {Input, message, Tooltip} from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons';
import UploadPic from './UploadPic';
import '../style/Profile.css';
import {Row, Col, Button, Form} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.info = props;
        console.log(this.info.props.name);
        this.state = {
            showInputName:false,     //hide input
            showInputEmail:false,
            NameVal:'',         
            EmailVal:'',
        }
    }
    // Edit Name
    handleEditName = () => {
        console.log(1);
        this.setState({
            showInputName:true
        })
    };
    // TODO: Interaction with backend
    handleAffirmName = () => {

    };
    handleCloseName = () => {
        this.setState({
            showInputName:false
        })
    };
    // Edit Email
    handleEditEamil = () => {
        this.setState({
            showInputEmail:true
        })
    };
    handleAffirmEamil = () => {

    };
    handleCloseEmail = () => {
        this.setState({
            showInputEmail:false
        })
    };
    
    render() {
        return (
        <Container>
        <div>
            <div>
                <Row>
                    <Col md={9}>
                    <img src={this.info.props.pic} className="App-logo" alt="logo" />
                    </Col>
                    <Col md={3}>
                        <UploadPic/>
                    </Col>
                </Row>
                <hr />
            </div>
            <div>
            {!this.state.showInputName?
                <Row>
                    <Col md={9}>
                        <p>{this.info.props.name}</p>
                    </Col>
                    <Col md={3}>
                        <Button onClick={this.handleEditName}>Edit</Button>
                    </Col>
                </Row>
                :
                <Row>
                    <Col md = {9} sm = {5}>
                        {/* <Input placeholder="Input here"
                                defaultValue={this.info.props.name==='-'?'':this.info.props.name}
                                onChange={(e) => this.setState({NameVal:e.target.value})}
                        /> */}
                        <Form.Control
                             type="text"
                             placeholder="Enter Name"
                             value={this.info.props.name==='-'?'':this.info.props.name}
                             onChange={(e) => this.setState({NameVal:e.target.value})}></Form.Control>
                    </Col>
                    <Col md = {3} sm = {7}>
                        <CheckCircleOutlined onClick={this.handleAffirmName}/>
                        <CloseCircleOutlined onClick={this.handleCloseName} />
                    </Col>
                </Row>
            }
            </div>
            <hr />
            <div>
            {!this.state.showInputEmail?
                <Row>
                    <Col md={9}>
                        <p>{this.info.props.email}</p>
                    </Col>
                    <Col md={3}>
                        <Button onClick={this.handleEditEamil}>Edit</Button>
                    </Col>
                </Row>
                :
                <Row>
                    <Col md = {9} sm = {5}>
                        {/* <Input placeholder="Input here"
                                defaultValue={this.info.props.email==='-'?'':this.info.props.email}
                                onChange={(e) => this.setState({EmailVal:e.target.value})}
                        /> */}
                        <Form.Control
                             type="text"
                             placeholder="Enter Name"
                             value={this.info.props.name==='-'?'':this.info.props.name}
                             onChange={(e) => this.setState({NameVal:e.target.value})}></Form.Control>
                    </Col>
                    <Col md = {3} sm = {7}>
                        <CheckCircleOutlined onClick={this.handleAffirmEmail}/>
                        <CloseCircleOutlined onClick={this.handleCloseEmail} />
                    </Col>
                </Row>
            }
            </div>
      </div>
      </Container>
        )
    }
}
