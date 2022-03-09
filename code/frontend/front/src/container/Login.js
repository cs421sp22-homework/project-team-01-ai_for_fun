import React from 'react'
import NormalLoginForm from '../components/LoginCom'

class Login extends React.Component{
    render(){
        return(
            <div>
                <NormalLoginForm history={this.props.history}/>
            </div>
        )
    }
}


export default Login;


