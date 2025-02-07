import axios from "axios"

const uploadImage =async (image)=>{
      try {
        const formData = new FormData()
        formData.append("image",image)
        const response = await axios.post("http://localhost:3000/api/file/upload",formData,{withCredentials:true}) 
         return response
      } catch (error) {
        return error
      }
}

export default uploadImage