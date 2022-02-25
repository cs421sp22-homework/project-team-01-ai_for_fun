import React from 'react';
import {Input, message, Tooltip} from 'antd';
import {EditOutlined,DeleteOutlined,CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons';
import '../bootstrap-4.3.1-dist/css/bootstrap.min.css';
import '../style/Edit.css';


export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.setting = props;
        this.state = {
            showInput:false,     //输入框显示隐藏
            valueCon:'',         //input框回显字段
        }
    }
    //点击展示输入框
    handleChangeClick = () => {
      this.setState({
          showInput:true
      })
    };
    //点击关闭输入框
    handleCloseClick = () => {
        this.setState({
            showInput:!this.state.showInput
        })
    };
    //去空格
    trim = (str) => {
        return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');
    };
    //点击确定按钮
    handleAffirmClick = () => {
    
        //判断不为空
        if(this.props.required&&this.trim(this.state.valueCon)===''||this.props.required&&this.trim(this.state.valueCon)==='-') {
            message.error(`此字段不能为空及特殊字符'-'`);
            return false
        }
    
        //判断为数字
        if(this.props.type&&this.props.type==="number"&&isNaN(this.trim(this.state.valueCon))) {
            message.error(`请输入数字`);
            return false
        }
    
        //判断网址
        let reg=/^\\{2}[\w-]+\\(([\w-][\w-\s]*[\w-]+[$$]?$)|([\w-][$$]?$))/;
        if(this.props.type&&this.props.type==="url"&&!reg.test(this.props.valueCon)){
            message.error("这网址不是以http://https://开头，或者不是网址！");
            return false
        }
    
        //判断字数长度
        if(this.trim(this.state.valueCon).length>this.props.amount){
            message.error(`字数不得超过${this.props.amount}个字`);
            return false
        }
    
    
    
        //回调确定方法
        let obj = {};
        // obj.value = this.state.valueCon;
        // obj.label = this.props.name;
        obj[ this.props.name] = this.state.valueCon;
        //判断是否需要id
        if(this.props.idName){
            obj[this.props.idName] = this.props.id;
        }
        this.props.handleOk(obj);
    
        //关闭输入框
        this.setState({
            showInput:this.props.isShow
        })
    };
    //input改变
    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            valueCon:e.target.value
        })
    };
    componentDidMount() {
        this.setState({
            valueCon:this.props.value,
        })
    }
    handleDeleteClick = () =>{
        let obj = {};
        // obj.value = this.state.valueCon;
        // obj.label = this.props.name;
        obj[ this.props.name] = this.state.valueCon;
        //判断是否需要id
        if(this.props.idName){
            obj[this.props.idName] = this.props.id;
        }
        this.props.handleDelete(obj);
    };
    
    render() {
        // const {value,fontSize,iconColor,inputWidth,showSize} = this.setting;
    
        console.log(this.setting.value)
    
        return (
            <div>
                {!this.state.showInput?
                    <div className="change_input">
                        <span className="change_input_name"  style={{fontSize:this.setting.fontSize}} >
                            {this.setting.showSize&&this.setting.value.length>this.setting.showSize?
                                <Tooltip title={this.setting.value}>
                                     <span>{this.setting.value.slice(0,this.setting.showSize)+"..."}</span>
                                </Tooltip> :this.setting.value
                            }
                            <EditOutlined 
                                  style={{color:this.setting.iconColor}}
                                  className="change_input_hide_change"
                                  onClick={this.handleChangeClick}
                            />
                            {this.props.handleDelete&&
                            <DeleteOutlined
                                  style={{color:this.setting.iconColor}}
                                  className="change_input_hide_change"
                                  onClick={this.handleDeleteClick}
                            />
                            }
                        </span>
    
                    </div>
                    :
                    <div className="write_input">
                        <div className="write_input_name" style={{width:this.setting.inputWidth?this.setting.inputWidth:'100px'}}>
                            <Input placeholder="请输入"
                                   defaultValue={this.props.value==='-'?'':this.props.value}
                                   onChange={this.handleChange}
                                   style={{height:'25px',margin:'0'}}
                            />
                        </div>
                        <div className="write_input_hide" style={{color:this.setting.iconColor}}>
                            <CheckCircleOutlined  className="write_input_hide_yes" onClick={this.handleAffirmClick}/>
                            <CloseCircleOutlined  className="write_input_hide_no" onClick={this.handleCloseClick} />
                        </div>
                    </div>
                }
            </div>
    
        )
    }
}    