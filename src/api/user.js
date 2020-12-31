import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/shop-impl-member/login',
    method: 'post',
    data
  })
}

// export function getInfo() {
//   return request({
//     url: '/shop-impl-member/web/index',
//     method: 'get'
//   })
// }

export function getInfo(token) {
  return request({
    url: '/shop-impl-member/web/index',
    method: 'get',
    params: {token}
  })
}

export function sendSms(phone) {
  return request({
    url: `/shop-impl-member/sendSms?phone=${phone}`,
    method: 'post'
  })
}

export function logout(token) {
  return request({
    url: '/shop-impl-member/logout',
    method: 'post',
    params: {token}
  })
}

export function registerSendSms(phone) {
  return request({
    url: `/shop-impl-member/registerSendSms?phone=${phone}`,
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: '/shop-impl-member/Register',
    method: 'post',
    data
  })
}
