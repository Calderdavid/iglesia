import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables'

const { VITE_API_URL } = getEnvVariables();

const iglesiaApi = axios.create({
    baseURL: VITE_API_URL
})

//Todo: configurar interceptores

export default iglesiaApi;