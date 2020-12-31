import request from '@/utils/request'

export function getGoodsDataList(data, page, limit) {
  return request({
    url: `/shop-impl-goods/getAllGoods?page=${page}&limit=${limit}`,
    method: 'post',
    data
  })
}

export function getTree() {
  return request({
    url: `/shop-impl-goods/getTree`,
    method: 'get'
  })
}

export function addCategory(categoryMessageDTO) {
  return request({
    url: `/shop-impl-goods/addCategory`,
    method: 'post',
    data:categoryMessageDTO
  })
}

export function addGood(data) {
  return request({
    url: `/shop-impl-goods/addGoods`,
    method: 'post',
    data
  })
}

export function addSpec(specDTO) {
  return request({
    url: `/shop-impl-goods/addSpec`,
    method: 'post',
    data:specDTO
  })
}

export function updateGoods(goodsMessageDTO) {
  // console.log(goodsMessageDTO);
  return request({
    url: '/shop-impl-goods/updateGoods',
    method: 'post',
    data:goodsMessageDTO
  })
}

export function deleteGood(good_id) {
  return request({
    url: `/shop-impl-goods/deleteGoods?id=${good_id}`,
    method: 'delete'
  })
}

export function deleteSpec(id) {
  return request({
    url: `/shop-impl-goods/deleteSpec?specId=${id}`,
    method: 'delete'
  })
}

export function updateSpec(specDTO) {
  return request({
    url: `/shop-impl-goods/updateSpec`,
    method: 'post',
    data:specDTO
  })
}
