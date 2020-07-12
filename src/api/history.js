import request from '@/utils/request'

export function getHistory({ caseId, page, pageSize }) {
  return request({
    url: '/v1/blockchain/history/case/' + caseId + "?page=" + 1 + "&pageSize=" + 10000,
    method: 'get'
  })
}
