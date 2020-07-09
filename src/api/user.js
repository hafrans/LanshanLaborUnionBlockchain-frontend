import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function employerReg(data) {
  return request({
    url: '/auth/employer/register',
    method: 'post',
    data
  })
}

export function laborReg(data) {
  return request({
    url: '/auth/labor/register',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/v1/user/info',
    method: 'get',
    headers: {
      "Authorization": "Bearer " + token
    }
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'get'
  })
}

export function setPass(data) {
  return request({
    url: '/v1/user/reset_password',
    method: 'post',
    data
  })
}

export function setEmail(data) {
  return request({
    url: '/v1/user/update_info',
    method: 'post',
    data
  })
}
