import request from '@/utils/request'

export function getCaptcha(params) {
  return request({
    url: '/auth/captcha/' + params.id + "?random=" + Math.random(),
    method: 'get'
  })
}
