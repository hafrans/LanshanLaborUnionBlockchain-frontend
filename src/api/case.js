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

export function modifyForm({ id, data }) {
  return request({
    url: 'v1/case/update/' + id,
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
export function getAllCase(data) {
  return request({
    url: 'v1/case/' + "?page=" + data.currentPage + "&pageSize=" + data.pageSize,
    method: 'get'
  })
}

export function getOneCase({ id }) {
  return request({
    url: 'v1/case/id/' + id + "?random=" + Math.random(),
    method: 'get'
  })
}

export function getCase(params) {
  return request({
    url: 'v1/case/caseId/' + params.caseId,
    method: 'get'
  })
}

export function CaseStatus(data) {
  return request({
    url: 'v1/case/status_change/' + data.id,
    method: 'post',
    data
  })
}
