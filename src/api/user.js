import request from '@/utils/request'

export function login(data) {
  return request({
    url:'/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/userInfo',
    method: 'get'
  })
}


export function logout() {
  return request({
    url: '/user/loginOut',
    method: 'post'
  })
}

export function updatePassword(data) {
  return request({
    url: '/user/updatePassword',
    method: 'post',
    data
  })
}

export function countIndex() {
  return request({
    url:'/user/index',
    method: 'post'
  })
}
