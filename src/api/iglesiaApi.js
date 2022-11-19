import axios from 'axios';

const iglesiaApi = axios.create({
    baseURL:  import.meta.env.VITE_API_URL
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