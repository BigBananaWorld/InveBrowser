import axios from 'axios'
import Vue from 'vue'
// import store from '../store/index.js'

let baseURL = 'http://192.168.5.144:10081/v1/node/'; //测试
// let baseURL = 'https://www.chainfin.one/linker/'

axios.defaults.baseURL = baseURL; //测试

//axios请求拦截器
axios.interceptors.request.use(function(config) {
    // config.headers.token = store.getters.getUser.token; //这里设置请求头
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//axios回应拦截器
axios.interceptors.response.use(function(response) {
    return response;
}, function(error) {
   
    // 对响应错误做点什么
    return Promise.reject(error);
});



export default {
    myAxios: axios
}