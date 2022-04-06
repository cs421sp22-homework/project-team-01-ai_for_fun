import {LikeOutlined,LikeFilled} from '@ant-design/icons';
import React from 'react';


class LikeBtn extends React.Component{
    constructor(props){
        super(props)
        this.state={
            disable:props.props.disable,
            like:props.props.times,
            liked:props.props.liked,
        };
    }
    islike =()=>{
        if (this.state.disable == true){
            return;
        }
        let liked=this.state.liked;
        if(liked){
            if(liked===true){
            this.setState({liked:false}) 
            this.setState({like:this.state.like-1});
        }
            else
            {
                this.setState({liked:true});
                this.setState({ like:this.state.like+1,});
                
            }     
    }
    else {
        this.setState({
            like:this.state.like+1,
        });
        this.setState({liked:true});
    }
};
     render(){
        
         return(
               <div style={
                 {width:60,float:"left"}}>
                    <span onClick={this.islike}>
                    {React.createElement(this.state.liked===true ?
                     LikeFilled 
                     : 
                     LikeOutlined
                     )}
                     </span>
                {this.state.like}
                </div> 
         );
     }
 }
 export default LikeBtn;