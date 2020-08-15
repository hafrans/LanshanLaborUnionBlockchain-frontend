import request from '@/utils/request'

export function getMeetingList({pageNum,pageSize}){
    return request({
        method: 'get',
        url:'/v1/meeting/list'+ "?page=" + pageNum + "&pageSize=" + pageSize + "&random="+Math.random()
    })
}

export function cancelMeeting({meetingId}) {
    return request({
        url:"/v1/meeting/cancel/" + meetingId,
        method:'get'
    })
}

export function createMeeting(data) {
    return request({
        url:"/v1/meeting/create",
        method:'post',
        data
    })
}


export function deleteMeetingAccount(){
    return request({
        url:"/v1/meeting/account/delete",
        method:'get'
    })
}