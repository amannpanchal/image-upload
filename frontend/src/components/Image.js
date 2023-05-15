import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { increament } from '../redux/actions';
const Image = ({element}) => {
    const dispatch = useDispatch();
    const [show,setShow] = useState(false);
    console.log(element)
 const seePic = () => {
    
     setShow(!show)
    dispatch(increament(element._id))
    
 }

  return (
    <div className='Images'>
    <img src = {element.pic} style = {{ width : "300px" , height : "300px" ,marginBottom : "0" ,padding : "0" , borderRadius : "20px 20px 0 0"}}/>
     <div className = "image" style = {{color : "#ff6601" ,fontWeight : "bold"}}> 
     <div > Title : {element.title}<br/>
   Views :  {element.views}
    <div style = {{padding  :"0px" ,position : 'relative' , top : "-10px"}}>
        <button onClick = {seePic}> See pic</button>

    </div>
        </div>
    <div className = "Detail">
        
        <div className="detail">
           {
            show &&  <div className = "showDetail">
            <button onClick={ () => {setShow(!show)}} id = "button">✖</button>
            <img src = {element.pic} />
            

            </div>
           }
          </div>
        
     </div>
    </div>
    </div>
  )
}

export default Image