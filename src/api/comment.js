import request from '@/utils/request'

export function creatCE(data) {
  return request({
    url: '/v1/comment/create',
    method: 'post',
    data
  })
}

export function deleteCE(id) {
  return request({
    url: '/v1/comment/delete/' + id,
    method: 'get'
  })
}
