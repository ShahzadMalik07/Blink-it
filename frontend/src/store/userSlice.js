import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{_id:"",name:"",email:""},
    reducers:{
        setUserDetails:(state,action)=>{
            state = {...action.payload}
        }

    }
})

export const {setUserDetails} = userSlice.actions
export default userSlice.reducer