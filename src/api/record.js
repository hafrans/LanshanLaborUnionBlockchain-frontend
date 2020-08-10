import request from '@/utils/request'

export function creatRecord(data) {
  return request({
    url: '/v1/record/create',
    method: 'post',
    data
  })
}

export function upLoad(data) {
  return request({
    url: '/v1/upload',
    method: 'post',
    data
  })
}
export function deleteRecord(id) {
  return request({
    url: '/v1/record/delete/' + id,
    method: 'get'
  })
}
