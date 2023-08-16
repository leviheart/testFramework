import axios from "axios";
import { Message } from "element-ui";

// 创建axios，赋给变量service
const BASEURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API : process.env.VUE_APP_API;
console.log(BASEURL,"BASEURL")
const service = axios.create({
    baseURL: BASEURL,
    timeout: 10000,   //网络请求接口，假设15000, 超过则超时
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
    console.log(response,data,"response.data")
    // if (data.resCode !== 0) {
    if (response.status !== 200) {
        // Message.error(data.message);
        Message.error("请求成功,但没有完全成功");
        return Promise.reject(data);
    } else {
        Message.success("请求成功");
        console.log(response,"response")
        return response;
        // return Promise.resolve(data);
    }

}, function (error) {
    Message.error("请求失败");

    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;