import request from '@/utils/request'
export function curriculaList() {
  return request({
    url: '/admin/findAllClass',
    method: 'get'
  })
}

export function addCurricula(data) {
  // console.log(data);
  return request({
    url: '/teacher/addClass',
    method: 'post',
    data
  })
}

export function findClassByContent(className, classTeacher) {
  if(className){
    return request({
      url: `/class/search?className=${className}`,
      method: 'get'
    })
  }else if(classTeacher){
    return request({
      url: `/class/search?classTeacher=${classTeacher}`,
      method: 'get'
    })
  }else{
    return request({
      url: `/class/search`,
      method: 'get'
    })
  }

}

export function deleteCurricula(classId) {
  return request({
    url: `/class/deleteClass?classId=${classId}`,
    method: 'get'
  })
}

export function showClass(classId) {
  return request({
    url: `/class/showClass?classId=${classId}`,
    method: 'get'
  })
}

export function updateClass(data) {
  return request({
    url: '/class/updateClass',
    method: 'post',
    data
  })
}
