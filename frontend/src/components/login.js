import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const user = {
                email,
                password
            }
            if (email && password) {
                await axios.post("http://localhost:4000/login", {
                    email, password
                }).then((res) => {

                    if(res.data.error) {
                        alert("Invalid email or password");
                        

                    }
                    else {
                        const token = res.data.token
                        const id = res.data.resp[0]._id
                        const namee = res.data.resp[0].name
                        const emaill = res.data.resp[0].email
                        localStorage.setItem('id',id);
                        localStorage.setItem('name',namee);
                        localStorage.setItem('email',emaill);
                        localStorage.setItem('token' , token);
                        navigate('/')
                     
                    }


                   

                }).catch((e) => {

                    console.log("The error is sending response in log in is ", e);
                })
            }
        }
        catch (e) {
            console.log("There is error in login that is :", e);
        }

    }



    return (
        <div  className='login'>
         <div className  = "loginn">
         <h1>Login</h1> <br></br>
            <form>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value) }} /> <br />
                <input className='input2' type="password" placeholder='Enter your password' value={password} onChange={(e) => { setPassword(e.target.value) }} /><br /> <br />
                <button onClick={submitForm}>Login</button>
            </form>
            
            <div>
 <div>
 <span className= "signup" > Don't have account ?  <br/></span>
                <Link  style ={{color : "#ff6601"}} to = "/signup"> Sign up </Link>
            </div>
            </div>
         </div>


        </div>

    )
}
export default Login