import React, {SyntheticEvent, useState} from "react";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e: SyntheticEvent) =>{
        e.preventDefault();

        const response = await fetch("http://localhost:8000/user/login",{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'email':email,
                'password':password
            })
        });

        if (response.ok){
            const content = await response.json();
            console.log(content);

        }
        else {
            console.log('request failed', response);
        }
    }

    return(
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div> Email </div>
            <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div> Password</div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    );
};

export default Login;