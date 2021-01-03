import request from '@/utils/request'

export function getPersonList(classId) {
  return request({
    url: `/teacher/findStudent?classId=${classId}`,
    method: 'get'
  })
}

export function deleteSelect(data) {
  return request({
    url:'/selectClass/deleteSelect',
    method: 'post',
    data
  })
}

export function selectOne(data) {
  return request({
    url:'/selectClass/selectClass',
    method: 'post',
    data
  })
}
