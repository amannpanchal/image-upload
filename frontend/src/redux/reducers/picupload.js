import * as actionTypes from '../actions/type'

export const picReducers  = (state =[] , action) =>{
switch(action.type) {
    case actionTypes.ADD_PIC : 
    return [action.payload ,...state]
    case actionTypes.ALL_PIC : 
    return action.payload
    case actionTypes.INCRE_VIEW : 
    return state.map((element) => {

        return (
        element._id === action.payload._id ? { ...element , views : element.views + 1} : element

        )
    })
    default :
    return state
}


}
