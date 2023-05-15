import React, { useEffect } from 'react'
import { allpic } from '../redux/actions'
import { useDispatch ,useSelector} from 'react-redux';
import Image from './Image';

const Allpics = () => {
    const dispatch = useDispatch();
    const pics = useSelector(state => state.pics );
    
    console.log("The all pics are ",pics);

    const id = localStorage.getItem("id");

    useEffect(()=> {
dispatch(allpic(id))

    },[])
  return (
    <div>
      {
        pics.map((e) => {
          return(
            <div>
              <Image element = {e}/>
            </div>
          )

        })
      }


    </div>
  
  )
}

export default Allpics