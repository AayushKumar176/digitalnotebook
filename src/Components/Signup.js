import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {
  const [credentials, setcredentials] = useState({name: "" ,email:"" , password:"" ,cpassword: ""})
  let history= useNavigate();
  const handleSubmit= async (e)=>{
    e.preventDefault();
  
    const {name,email,password}=credentials;
    const response = await fetch("https://inotebookbackend-lfqh.onrender.com/api/auth/createuser", {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
        //  "auth-token":
        //    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjZWJlNmM1NTViOWRiNmI2ZWFjOTg3In0sImlhdCI6MTY1Nzc5MTI4Nn0.gv1RNL37_u25xEQYvIJ0_IxlWqCbxcQ0HEG0TDI64Uc"
        // "auth-token": localStorage.getItem('token')
       
      },
       body: JSON.stringify({ name, email, password }),
     });
     const json= await response.json();
     console.log(json);

     if(json.success){
      // save the auth token and redirect
      localStorage.setItem('token' , json.authToken);
       history("/");
       props.showAlert("Account Created Successfully" , "success");
     }
     else{
       props.showAlert("Invalid Details" , "danger");
     }

}

const onChange = (e)=>{
  setcredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    <div className="container">
       <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup