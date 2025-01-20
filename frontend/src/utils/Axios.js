import axios from "axios";
import { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials:true

})

Axios.interceptors.request.use(
    async(config)=>{
        const accessToken = localStorage.getItem("accessToken")
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`     
            
        }
        return config

},
(error)=>{
    return Promise.reject(error)
}
)

Axios.interceptors.request.use(
    (response)=>{
        return response
    },
    async(error)=>{
        let request = error.config
        if (error.response.status === 401 && !request.retry) {
            request.retry = true
            const refreshToken = localStorage.getItem("refreshToken")
            
        }
    }
)

const refreshAccessToken = async (refreshToken)=>{
    try {
        const response = await Axios({})
    } catch (error) {
        
    }

}


export default Axios