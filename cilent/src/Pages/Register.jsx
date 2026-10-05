import React ,{useState}from 'react'
import '../assest/css/form.css'
import { Link, useNavigate } from 'react-router-dom'
import validation from '../Components/validation'
import axios from 'axios'
import {toast} from 'react-toastify'
import Login from './Login'

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [serverErrors,setServerErrors]=useState([])
    const navigate = useNavigate()

    const handleInput = (event) => {
       setValues({ ...values, [event.target.name]: event.target.value }); 
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validation(values);
        setErrors(errs);
        if(errs.name===""&&errs.email===""&&errs.password===""){
     axios.post('http://localhost:3000/register', values)
            .then(res=>{
                if(res.data.success){
             toast.success("Account Created Successfully",{
                position:"top-right",
                autoClose:5000
             });
             navigate('/login');
            }
            }).catch(err=>{
                if(err.response && err.response.data && err.response.data.errors){
                    setServerErrors(err.response.data.errors);
                }else{
                     console.log("Axios error details:", err);
                    toast.error("Failed to connect to the backend server.");
                }
            });
        }else{
            console.log("Validation failed,Axios not sent.Current errors:",errs);
        }
    } ;
  return (
    <div className='form-container'>
      <form className="form" onSubmit={handleSubmit}>
        <h2>CREATE ACCOUNT</h2>
       <div className='form-group'>
        <label>Name</label>
        <input type='text' placeholder='Enter the name' className='form-control' name='name' onChange={handleInput}/>
        {
            errors.name && <span className='errors'>{errors.name}</span>
        }
       </div>
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
        <button className='form-button'>Register</button> 
       <p>Already have an account? <Link to = "/login">Login</Link></p>
       </form>
    </div>
  )
}

export default Register;
