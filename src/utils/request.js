import axios from "axios";
import { Message } from "element-ui";

// 创建axios，赋给变量service
const BASEURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API : process.env.VUE_APP_API;
const service = axios.create({
    baseURL: BASEURL,
    timeout: 15000,   //网络请求接口，假设15000, 超过则超时
});


/**
 * 请求接口前，做一些数据处理（请求拦截器）
 */
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


/**
 * 请求接口后，返回数据进行拦截（响应拦截器）
 */
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data
    // 业务需求
    if (data.resCode !== 0) {
        Message.error(data.message);
        return Promise.reject(data);
    } else {
        return response;
        // return Promise.resolve(data);
    }

}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;