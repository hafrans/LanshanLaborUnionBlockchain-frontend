import request from "@/utils/request";

export function getCaptcha(params) {
  return request({
    url: "/auth/captcha/" + params.id + "?random=" + Math.random(),
    method: "get"
  });
}

export function getBaseAddr() {
  return process.env.NODE_ENV === "production"
    ? "http://server.ls.dev.scanf.cc:8081"
    : "http://fnl.vip.qydev.com";
}


export function sendShortMessage(data){
  return request({
    url: '/auth/sms/captcha/request',
    method: 'post',
    /**
     * phone
     * captcha_code
     * captcha_time
     * captcha_challenge
     */
    data 
  })
}

