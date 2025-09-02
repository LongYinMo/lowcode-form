import request from '../utils/request'

/**
 * 用户登录
 * @param data - 登录参数
 * @returns 登录结果
 */
export const login = (data: { username: string; password: string }) => {
  return request({
    url: '/api/user/login',
    method: 'post',
    data,
  })
}

/**
 * 用户注册
 * @param data - 注册参数
 * @returns 注册结果
 */
export const register = (data: { username: string; password: string; nickname?: string }) => {
  return request({
    url: '/api/user/register',
    method: 'post',
    data,
  })
}

/**
 * 获取用户信息
 * @returns 用户信息
 */
export const getUserInfo = () => {
  return request({
    url: '/api/user/info',
    method: 'get',
  })
}
