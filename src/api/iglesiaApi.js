import axios from 'axios';

const iglesiaApi = axios.create({
    baseURL: "http://localhost:8000"
})

//Todo: configurar interceptores
iglesiaApi.interceptors.request.use(config => {
    
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config
})

export default iglesiaApi;