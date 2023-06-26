import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
// import {useHistory} from 'react-router-dom'




const Login = (props) => {

  const [credentials, setcredentials] = useState({email:"" , password:""})
  let history= useNavigate();
  const handleSubmit= async (e)=>{
    e.preventDefault();
  
    const response = await fetch("https://inotebookbackend-lfqh.onrender.com/api/auth/login", {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
        //  "auth-token":
        //    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjZWJlNmM1NTViOWRiNmI2ZWFjOTg3In0sImlhdCI6MTY1Nzc5MTI4Nn0.gv1RNL37_u25xEQYvIJ0_IxlWqCbxcQ0HEG0TDI64Uc"
        
           
      },
       body: JSON.stringify({ email: credentials.email,password: credentials.password }),
     });
     const json= await response.json();


     if(json.success){
      // save the auth token and redirect
      props.showAlert("Logged in Successfully" , "success");
      localStorage.setItem('token' , json.authToken);
       history("/");
     }
     else{
      props.showAlert("Invalid Credentials" , "danger");
     }

}

const onChange = (e)=>{
  setcredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    <div>
       <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
  </div>
 
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login