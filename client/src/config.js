import axios from "axios"
export const axiosInstance=axios.create({
    baseURL :"https://gamewizo.herokuapp.com/api/"
})