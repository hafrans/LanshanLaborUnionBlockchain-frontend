import request from '@/utils/request'

export function formSunmit(data) {
  return request({
    url: 'v1/labor/create',
    method: 'post',
    data
  })
}

export function createNewCases(data) {
  return request({
    url: 'v1/case/create',
    method: 'post',
    data
  })
}

export function modifyForm(data) {
  return request({
    url: 'v1/case/update/' + data.id,
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

export function getFormExm() {
  return request({
    url: 'v1/test/case/template',
    method: 'get'
  })
}
export function getAllCase() {
  return request({
    url: 'v1/case/',
    method: 'get'
  })
}

export function getOneCase({id}) {
  return request({
    url: 'v1/case/id/'+id,
    method: 'get'
  })
}

export function getCase(params) {
  return request({
    url: 'v1/case/caseId/' + params.caseId,
    method: 'get'
  })
}
