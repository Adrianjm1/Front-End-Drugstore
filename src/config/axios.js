import axios from 'axios'
import { URL_API } from './constant';


const client = axios.create({
    baseURL: URL_API,
});


export default client;