import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email:"",
        password:""
    })
    let navigate = useNavigate ();
    const handleChange = (e) => {
       setCredentials({...credentials,[e.target.name]:e.target.value})
      }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost/api/auth/signin',{
            method:'POST',
            headers:{
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVjMzM0NzNmNjQ1ODQyMmVhZjRiMmIiLCJuYW1lIjoiZ3JheSIsImVtYWlsIjoiZ3JheUBnbWFpbC5jb20iLCJpYXQiOjE2NTAyMTAxMzB9.3GVw_eRgEx6_4B3aBJmqyATRcAgLf3Zz_za2k_jSBcw',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json();
        if(json.success){
            //reirect
            localStorage.setItem('token',json.token);
            navigate('/');
        }
        else{
            alert('invalid creentials')
        }
    }
    return (
        <>
            <form className='login-container container' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" onChange={handleChange} name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" onChange={handleChange} name='password' value={credentials.password} id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Login