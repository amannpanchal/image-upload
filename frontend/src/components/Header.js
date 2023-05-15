import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
const [name,setName]  = useState("")
const [email,setEmail]  = useState("")
const navigate = useNavigate();
const token = localStorage.getItem('token')
useEffect(() => {
    if(token) {
        setName(localStorage.getItem("name"))
        setEmail(localStorage.getItem("email"))
    }
    
},[])
const logout = () =>{
    localStorage.clear();
    navigate('/login')

}



  return (
    <div className='header' >
        <div > 
            <span> Name : {name} <br/> Email : {email}</span>
            <button onClick = {logout}>Logout</button>
            
        </div>
    </div>
  )
}

export default Header