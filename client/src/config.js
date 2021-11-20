import axios from "axios"
export const axiosInstance=axios.create({
    baseURL :"https://gamewarzone.herokuapp.com/api/"
})
