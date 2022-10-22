import React, { createContext, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import './Login.css'
const Login = () => {
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const {signIn} = useContext(AuthContext);

    const navigate = useNavigate();

    const handelSubmit = event =>{
        event.preventDefault();
        const form = event.target;
        const email  = form.email.value;
        const password  = form.password.value;
        console.log(email, password)

        signIn(email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
            form.reset();
            navigate(from, {replace:true})

        })
        .catch(error => {
            console.error(error)
        })
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Please Login</h2>
            <form onSubmit={handelSubmit}>
            <div className="form-control">
                <label htmlFor='email'> Email</label>
                <input type="email" name="email" required/>
                 </div>
            <div className="form-control">
                <label htmlFor='password'> Password</label>
                <input type="password" name="password" required/>
                 </div>
            
                 <input className='btn-submit' type="submit" value="Log In" />
            </form>
            <p>New here! <Link to='/signup'>Sign Up</Link></p>
        </div>
    );
};

export default Login;