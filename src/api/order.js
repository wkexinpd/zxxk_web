import request from '@/utils/request'

export function userGetOrder(page,limit,u_id,status,isAdmin,orderQuery) {
  return request({
    url: `/shop-impl-order/getOrderList?page=${page}&limit=${limit}&userId=${u_id}&status=${status}&isAdmin=${isAdmin}`,
    method: 'post',
    data:orderQuery
  })
}

export function updateOrderMessage(data) {
  return request({
    url: `/shop-impl-order/updateOrderMessage`,
    method: 'post',
    data
  })
}

export function updateOrderAddress(orderAddressInputDTO) {
  return request({
    url: `/shop-impl-order/updateOrderAddress`,
    method: 'post',
    data:orderAddressInputDTO
  })
}

export function deleteOrder(id) {
  return request({
    url: `/shop-impl-order/deleteOrder?orderId=${id}`,
    method: 'delete'
  })
}

export function getAllStatus() {
  return request({
    url: '/shop-impl-order/getAllStatus',
    method: 'get'
  })
}
