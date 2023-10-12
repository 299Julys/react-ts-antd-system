import axios from 'axios';
import {message,Modal} from 'antd';
import NProgress from 'nprogress';
import {clear,get} from './storage';

const service=axios.create({
    baseURL:process.env.REACT_APP_URL,
    timeout:5000
})
//  请求拦截器
service.interceptors.request.use(function(config){
    //在发送请求之前做些什么
    NProgress.start();
    config.headers['Authorization'] = get('token');
    return config;
},
function(error){
    //对请求错误做些什么
    NProgress.done();
    return Promise.reject(error)
});

//响应拦截器
service.interceptors.response.use(function(response){
    //2xx 范围内的状态码都会触发该函数
    //对响应数据做点什么
    NProgress.done();
    if(response.status===200){
        const {code}=response.data
        if(code===4003){
            message.warning('登陆状态已失效');
            return Promise.reject("请重新登录")
        }else if(code === 4000){
            clear();
            return Promise.reject("认证失败")
        }
        return response;
    }else{
        Modal.error({title: '网络请求错误',});
        return Promise.reject('网络请求错误');
    }
    
},function(error){
    //2xx 范围内的状态码都会触发该函数
    //对响应错误做点什么
    Modal.error({title: '网络请求错误',});
    NProgress.done();
    return Promise.reject(error);
});

export default service;