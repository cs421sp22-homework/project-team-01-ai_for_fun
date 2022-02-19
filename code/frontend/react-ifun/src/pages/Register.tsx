import React, { SyntheticEvent, useState } from "react";
import { Navigate} from "react-router-dom";


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user_type] = useState('USER');
    const[redirect, setRedirect] = useState(false);

    const submit = async (e:SyntheticEvent) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/user/register",{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({
                'name':name, 
                'email':email,
                'password':password,
                'user_type':user_type
                
            })
        });
        if (response.ok){
            const content = await response.json();
            console.log(content);
            setRedirect(true)
        }
        else {
            console.log('request failed', response);
        }
    }

    if(redirect){
        return <Navigate to="/login"/>
    }

    return(
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please Register</h1>
            <div>Name</div>
            <div className="form-floating">
                <input type="name" className="form-control" placeholder="Name" required
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div>Email</div>
            <div className="form-floating">
                <input type="email" className="form-control" placeholder="name@example.com" required
                    onChange={e=> setEmail(e.target.value)}
                />
            </div>
            <div>Password</div>
            <div className="form-floating">
                <input type="password" className="form-control" placeholder="Password" required
                    onChange={e=> setPassword(e.target.value)}
                />
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    );
};

export default Register;