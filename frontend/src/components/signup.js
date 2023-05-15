import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState('');
    const [pic, setPic] = useState('');

   
    const submitButton = async (e) => {
        e.preventDefault();
        try {
            if (name && email && password) {
                await axios.post("http://localhost:4000/signup", {
                    name, email, password, pic
                }).then((res) => {
                   
                    if(res.data.error) {
                        alert("User already exists");
                        

                    }
                    else {
                        const token = res.data.token
                    const id = res.data.resp._id
                    const namee = res.data.resp.name
                    const emaill = res.data.resp.email
                    localStorage.setItem('id',id);
                    localStorage.setItem('name',namee);
                    localStorage.setItem('email',emaill);
                    localStorage.setItem('token' , token);
                    navigate('/')
                    }


                }).catch((e) => {
                    console.log("The error is ", e);
                })
            } else {
                alert("Filled details ");
            }

        } catch (e) {
            console.log("The error in register request is ", e);

        }
    }

    return (
        <div className='login'>
            <div className = "loginn">
            <h1>Sign up</h1> <br></br>
            <form>
                <input type="text" placeholder="Enter your name" value={name} onChange={(e) => { setName(e.target.value) }} /> <br />
                <input style = {{ borderRadius  : "0"}} type="email" placeholder='Enter your email' value={email} onChange={(e) => { setEmail(e.target.value) }} /><br />
                <input style = {{ borderRadius  : "0 0 8px 8px"}} type="password" placeholder='Enter your Password' value={password} onChange={(e) => { setPassword(e.target.value) }} /><br /> <br />
                <button onClick={submitButton}>Sign up</button>
            </form>
            <div>
            <span className= "signup" >  Already have account ? </span> <br/> <Link to = "/login"> Login </Link>
            </div>

            </div>
        </div>

    )
}
export default Signup