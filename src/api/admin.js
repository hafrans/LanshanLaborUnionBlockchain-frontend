import request from '@/utils/request'

export function updateUser(data) {
  return request({
    url: 'v1/admin/user/update/' + data.id,
    method: 'post',
    data
  })
}

export function createNewUser(data) {
  return request({
    url: 'v1/admin/user/add_department_user',
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
export function getAllUser(data) {
  return request({
    url: 'v1/admin/user' + "?page=" + data.currentPage + "&pageSize=" + data.pageSize,
    method: 'get'
  })
}

export function delUser(id) {
  return request({
    url: 'v1/admin/user/' + id,
    method: 'delete'
  })
}

export function getCase(params) {
  return request({
    url: 'v1/case/caseId/' + params.caseId,
    method: 'get'
  })
}

