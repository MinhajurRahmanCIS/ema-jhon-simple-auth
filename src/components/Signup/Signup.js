import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import './Signup.css'


const Signup = () => {
    const [error, setError] = useState(null);
    const {createUser} = useContext(AuthContext);


    const handelSubmit = event =>{
        event.preventDefault();
        const form = event.target;
        const email  = form.email.value;
        const password  = form.password.value;
        const confirm  = form.confirm.value;
        
        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
            form.reset();
        })
        .catch(error => {
            console.error(error)
        })



        if(password.length < 6){
            setError('Password should be 6 or more')
            return; 
        }
        if(password !== confirm){
            setError('Did not match')
            return;
        }
    }
    return (
        <div className='form-container'>
        <h2 className='form-title'>Please Sign Up</h2>
        <form onSubmit={handelSubmit}>
        <div className="form-control">
            <label htmlFor='email'> Email</label>
            <input type="email" name="email" required/>
             </div>
        <div className="form-control">
            <label htmlFor='password'> Password</label>
            <input type="password" name="password" required/>
             </div>
             <div className="form-control">
                <label htmlFor='confirm'> Confirm Password</label>
                <input type="password" name="confirm" required/>
                 </div>
             <input className='btn-submit' type="submit" value="Sign Up" />
        </form>
        <p>Already, have account! <Link to='/login'>Log in</Link></p>
        <p className='text-error'><small>{error}</small></p>
    </div>
    );
};

export default Signup;