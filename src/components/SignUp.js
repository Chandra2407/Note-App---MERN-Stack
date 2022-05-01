import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const SignUp = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    passwordconfirm: ""
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password,passwordconfirm} = credentials;
    if((password===passwordconfirm)&&password!==""){
      const response = await fetch('http://localhost/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name,email,password})
      });
      const json = await response.json();
        if(json.success){
        localStorage.setItem('token', json.token);
        navigate('/');
        props.showAlert('User created successfully','success');
        }
        else{
          props.showAlert('Invalid Credentials','danger');
        }
    }
  }
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
      <form className='login-container container' onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputName">User name</label>
          <input type="text" className="form-control" onChange={handleChange} name='name' id="exampleInputName" placeholder="Enter user name" minLength={4} required/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" onChange={handleChange} name='email' id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" minLength={4} required/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" onChange={handleChange} name='password' id="exampleInputPassword1" placeholder="Password" minLength={4} required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPasswordConfirm">Confirm Password</label>
          <input type="password" className="form-control" onChange={handleChange} name='passwordconfirm' id="exampleInputPasswordConfirm" placeholder="Confirm password" minLength={4} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default SignUp