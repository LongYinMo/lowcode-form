import axios from 'axios';

const request = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 从localStorage获取token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.errno !== 0) {
      console.error('API Error:', res.msg);
      return Promise.reject(new Error(res.msg || 'Error'));
    }
    return res;
  },
  (error) => {
    console.error('Network Error:', error);
    return Promise.reject(error);
  }
);

export default request;