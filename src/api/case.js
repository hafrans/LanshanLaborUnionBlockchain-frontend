import request from '@/utils/request'

export function formSunmit(data) {
  return request({
    url: 'v1/labor/create',
    method: 'post',
    data
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/v1/user/info',
//     method: 'get',
//     headers: {
//       "Authorization": "Bearer " + token
//     }
//   })
// }

// export function logout() {
//   return request({
//     url: '/auth/logout',
//     method: 'get'
//   })
// }
