import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addpic } from '../redux/actions';

const Uploadpic = () => {
    const dispatch = useDispatch();
    const [picture,setPicture] = useState('');
    const [pic , setPic] = useState('');
    const [title , setTitle] = useState('');
    const id  = localStorage.getItem('id')
    const uploadPic = async(e)=> {
        try {
            console.log("hello")
            if (picture.type === "image/jpeg" || picture.type === "image/jpg" || picture.type === "image/png"){
                console.log("The ")
                const data = new FormData();
                data.append('file',picture);
                data.append('upload_preset',"amanpanchal");
                data.append('cloud_name','dk2scs5jz');
                await fetch('https://api.cloudinary.com/v1_1/dk2scs5jz/image/upload', {
                    method: 'POST',
                    body: data
                }).then(response => response.json())
                    .then((data)  => {
                       
                       setPic(data.secure_url)
                       console.log("the pic is ",pic)
                    }
                    )
                    .catch(error => console.error(error))
            }
            else {
                alert("The image is not of image type")
            }
    
    
        }catch(e) {
            console.log("The error in the request is ",e);
        }
        }


console.log("The pic is :",pic);
const onSubmit = (e) => {
    e.preventDefault();
  if(title && pic) {
    const data = {
        title,
        pic ,id
    }
    console.log(data);
    dispatch(addpic(data))

  }else if(!title) {
    alert(
        "Enter image title"
    )
  }
  else if(!pic) {
alert("Submit your pic ")
  }
  else {
    alert("Add image and title")
  }
    
}
   
    return (
        <div>

            <div className='inputside'>
                <input type='text' value={title} placeholder='Enter image title...' onChange={(e) => {
                    setTitle(e.target.value);
                }}
                /> <br />
                <input type='file'
                    accept='image/*'
                    onChange={ (e) => {
                        setPicture(e.target.files[0]);
                 uploadPic()
                    }}
                />
                <br />
                <button className='upload' onClick = {onSubmit}>Upload</button>


            </div>
        </div>
    )
}

export default Uploadpic