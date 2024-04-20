import axios from 'axios';

const API_URL = 'http://42.193.101.213:5000';

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
instance.interceptors.request.use(function (config) {
    // 可以在这里为请求头添加token等信息
    config.headers.Authorization = `Bearer yourToken`;
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance;
