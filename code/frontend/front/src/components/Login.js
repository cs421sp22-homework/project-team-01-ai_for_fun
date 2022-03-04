import React from 'react';
import '../style/Login.css';
import '../bootstrap-4.3.1-dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

// async function loginUser(credential){
//     return fetch('http://localhost:8080/login',{
//         method: 'POST',
//         headers:{
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credential)
//     })
//         .then(data =>data.json())
// }

export default class Login extends React.Component{
    // [username, setUserName] = useState();
    // [password, setPassword] = useState();
    constructor(props) {
        super(props);
        this.info = props;
        console.log(this.info.props.name);
        this.state = {
            username:"",
            password:""         
        }
    }

    handleSubmit = async e => {
        console.log(this.state)
        e.preventDefault();
        let error = false
        this.props.for.validateFields((err,values)=>{
            console.log('huxb')
            console.log(err)
            console.log(values)
            if (!err){
                console.log('error'+error)
                console.log("Received values of form:", values);
                return
            }
        });
        
        
    }
    handleSignInRedirect = () => {

    }
    render(){
        return(

            <Form>S
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}