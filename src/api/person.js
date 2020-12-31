import request from '@/utils/request'

export function getPersonList(data,page,limit) {
  return request({
    url: `/shop-impl-member/getAllUser?page=${page}&limit=${limit}`,
    method: 'post',
    data
  })
}

export function updatePerson(userMessageDTO){
  // console.log(data);
  // let userMessageDTO = data
  return request({
    url: `/shop-impl-member/updateUser`,
    method: 'post',
    data:userMessageDTO
    // userMessageDTO:data
  })
}

export function deletePerson(id) {
  return request({
    url: `/shop-impl-member/deleteUser?userId=${id}`,
    method: 'delete',
    // params: {id}
  })
}
