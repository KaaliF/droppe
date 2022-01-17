import axios from 'axios';

axios.defaults.baseURL = 'https://fakestoreapi.com/';
// axios.interceptors.request.use((value: any) => {
//     value.headers['Authorization'] = localStorage.getItem('token');
//     value.headers['Access-Control-Allow-Origin'] = '*';

//     return value;
// }, (error: any) => {
// });
// axios.interceptors.response.use((value: any) => {
//     return value;
// }, (error: any) => {
//     if (error.config && error.response && error.response.status === 401) {

// });

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};


