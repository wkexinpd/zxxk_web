import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import {use} from "element-ui/src/locale";

const state = {
  token: getToken(),
  username: '',
  id: 0,
  phone: '',
  type: '',
  typeId: 0,
  sex: '男',
  role: [],
  createTime: '',
  // updateTime: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_TYPE: (state, type) => {
    state.type = type
  },
  SET_TYPEID: (state, typeId) => {
    state.typeId = typeId
  },
  SET_SEX: (state, sex) => {
    state.sex = sex
  },
  SET_ROLE: (state,role) => {
    state.role = role
  },
  SET_CREATETIME: (state,createTime)=>{
    state.createTime = createTime
  },
  // SET_UPDATETIME: (state,updateTime) => {
  //   state.updateTime = updateTime
  // }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // console.log(userInfo);
    const { username, password, phones, identify } = userInfo
    let type,code,phone
    if(username!==""){
      type = 1
      phone = username.trim()
      code = password
    }else if(phones!==""){
      type = 0
      phone = phones.trim()
      code = identify
    }
    return new Promise((resolve, reject) => {
      login({ phone: phone, code: code, type:type, loginType: "PC" }).then(response => {
        // console.log(response.data.token);
        const { data } = response
        // const {username, id, phone, type, typeId, sex} = data.user
        // sessionStorage.setItem('typeId',JSON.parse(typeId))
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        // commit('SET_USERNAME',username)
        // commit('SET_ID',id)
        // commit('SET_PHONE',phone)
        // commit('SET_TYPE',type)
        // commit('SET_TYPEID',typeId)
        // commit('SET_SEX',sex)
        resolve()
      }).catch(error => {
        console.log(error);
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // setTimeout(()=>{
      //   const arr = [
      //     sessionStorage.getItem('typeId')
      //   ]
      //   commit('SET_ROLE', arr)
      //   resolve(arr)
      // },100)
      getInfo(state.token).then(response => {
        const {data} = response
        if(!data){
          reject('验证失败，请再次登录')
        }
        const {username, id, phone, type, typeId, sex, createTime} = data.user
        // console.log(data);
        sessionStorage.setItem('typeId',JSON.stringify(typeId))
        const arr = [JSON.parse(sessionStorage.getItem('typeId'))]
        // console.log(arr);
        commit('SET_USERNAME',username)
        commit('SET_ID',id)
        commit('SET_PHONE',phone)
        commit('SET_TYPE',type)
        commit('SET_TYPEID',typeId)
        commit('SET_SEX',sex)
        commit('SET_CREATETIME',createTime)
        // commit('SET_UPDATETIME',updateTime)
        commit('SET_ROLE', arr)
        resolve(arr)
      }).catch(error=>{
        console.log(error);
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLE', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
