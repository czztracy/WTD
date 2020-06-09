import axios from "axios";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // 请求时间
  timeout: 500000
});

// 请求 拦截
service.interceptors.request.use(
  config => {
    // 请求头
    config.headers["admin"] = "";

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// 返回 拦截
service.interceptors.response.use(
  response => {
    if (response.data.code === 500) {
      // 错误信息处理
    }
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
