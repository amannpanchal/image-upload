import axios from 'axios'
import { ADD_PIC,ALL_PIC,INCRE_VIEW } from './type'
export const addpic = (data) => async(dispatch) => {
    try {
        const res = axios.post("http://localhost:4000/pic",data)

        dispatch({
            type : ADD_PIC,
            payload : data
        })
    console.log("The data is ",data);

    }catch(e){
console.log("Error ",e);
    }
}

export const allpic = (data) => async(dispatch) => {
    const res =await  axios.post('http://localhost:4000/getallpic',{
        id : data
    }) ;
  
    dispatch({
        type : ALL_PIC,
        payload : res.data.res
      
    })
}
export const increament  = (id) => async (dispatch) => {
    try {
        const res = await axios.put(`http://localhost:4000/save/${id}`)

        dispatch({
            type : INCRE_VIEW,
            payload : res.data.picUpdate
        })


    }catch(e) {
        console.log("The errror in increament")
    }
}