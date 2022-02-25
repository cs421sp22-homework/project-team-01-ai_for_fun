import {Row, Col, Button, Form} from 'react-bootstrap';
import React from 'react';
import {Input, message, Tooltip} from 'antd';
import {CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons';

export default class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.info = props;
        console.log(this.info.props.name);
        this.state = {
            showInputName:false,     //输入框显示隐藏
            showInputEmail:false,
            NameVal:'',         //input框回显字段
            EmailVal:'',
        }
    }
    handleEditName = () => {
        console.log(1);
        this.setState({
            showInputName:true
        })
    };
    handleAffirmName = () => {

    };
    handleCloseName = () => {
        this.setState({
            showInputName:false
        })
    };

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
        <div>
            <div>
          {!this.state.showInputName?
            <Row>
                <Col md={7}>
                    <p>{this.info.props.name}</p>
                </Col>
                <Col md={5}>
                    <Button onClick={this.handleEditName}>Edit</Button>
                </Col>
            </Row>
            :
            <Row>
                <Col md = {7} sm = {5}>
                    <Input placeholder="请输入"
                            defaultValue={this.props.value==='-'?'':this.props.value}
                            onChange={(e) => this.setState({NameVal:e.target.value})}
                    />
                </Col>
                <Col md = {5} sm = {7}>
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
                <Col md={7}>
                    <p>{this.info.props.name}</p>
                </Col>
                <Col md={5}>
                    <Button onClick={this.handleEditEamil}>Edit</Button>
                </Col>
            </Row>
            :
            <Row>
                <Col md = {7} sm = {5}>
                    <Input placeholder="请输入"
                            defaultValue={this.info.props.name==='-'?'':this.info.props.name}
                            onChange={(e) => this.setState({EmailVal:e.target.value})}
                    />
                </Col>
                <Col md = {5} sm = {7}>
                    <CheckCircleOutlined onClick={this.handleAffirmEmail}/>
                    <CloseCircleOutlined onClick={this.handleCloseEmail} />
                </Col>
            </Row>
        }
        </div>
      </div>
    
        )
    }
}