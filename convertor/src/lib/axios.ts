import axios from "axios";

const axiosCustom = axios.create({
    validateStatus: ()=>true
});

export default axiosCustom