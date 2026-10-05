import React ,{useContext, useState}from 'react'
import '../assest/css/form.css'
import { Link, useNavigate } from 'react-router-dom'
import validation from '../Components/validation'
import axios from 'axios'
import {toast} from 'react-toastify'
import { UserContext } from '../App'

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const {user,setUser} = useContext(UserContext)
    const [errors, setErrors] = useState({})
    const [serverErrors,setServerErrors]=useState([])
    const navigate = useNavigate()

    const handleInput = (event) => {
       setValues({ ...values, [event.target.name]: event.target.value }); 
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validation(values)
        setErrors(errs);
        if(errs.email===""&&errs.password===""){
            axios.post('http://localhost:3000/login', values)
            .then(res=>{
                if(res.data.success){
             toast.success("Login Successfully",{
                position:"top-right",
                autoClose:5000
             })
             localStorage.setItem("token",res.data.token)
             setUser(res.data.user)
             navigate('/')
            }
            }).catch(err=>{
                console.log(err)
                if(err.response && err.response.data && err.response.data.errors){
                    setServerErrors(err.response.data.errors);
                }else{
                     console.log("Axios error details:", err)
                    toast.error("Failed to connect to the backend server.")
                }
            });
        }
    } ;
  return (
    <div className='form-container'>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
       <div className='form-group'>
        <label >Email</label>
        <input type='email' placeholder='Enter the email' className='form-control' name='email' autoComplete='off' onChange={handleInput}/>
        {
            errors.email && <span className='errors'>{errors.email}</span>
        }
       </div>
         <div className='form-group'>
        <label>Password</label>
        <input type='password' placeholder='Enter the password' className='form-control' name='password' onChange={handleInput}/>
       {
            errors.password && <span className='errors'>{errors.password}</span>
        }
     </div>
{serverErrors.length > 0 && (
    serverErrors.map((error, index) => (
        <p className="error" key={index}>{error.msg || error}</p>
    ))
)}
        <button className='form-button'>Login</button> 
       <p>Don't Have Account? <Link to = "/register">Register</Link></p>
       </form>
    </div>
  )
}

export default Login;