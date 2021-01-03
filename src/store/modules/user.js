import { login, logout, getInfo } from '@/api/user'
import router, { resetRouter } from '@/router'
import store from "@/store";

const state = {
  userId: '',
  username: '',
  grade: '',
  dept: '',
  sclass: '',
  typeId: 0,
  role: [],
  startyear: '',
  endyear: '',
  phone:'',
  email: ''
}

const mutations = {
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_GRADE: (state, grade) => {
    state.grade = grade
  },
  SET_DEPT: (state, dept) => {
    state.dept = dept
  },
  SET_SCLASS: (state, sclass) => {
    state.sclass = sclass
  },
  SET_TYPEID: (state, typeId) => {
    state.typeId = typeId
  },
  SET_ROLE: (state,role) => {
    state.role = role
  },
  SET_STARTYEAR: (state,startyear)=>{
    state.startyear = startyear
  },
  SET_ENDYEAR: (state,endyear)=>{
    state.endyear = endyear
  },
  SET_PHONE: (state,phone)=>{
    state.phone = phone
  },
  SET_EMAIL: (state,email) => {
    state.email = email
  }
}

const actions = {
  login({ commit }, userInfo) {
    // console.log(userInfo);
    const { userId, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userId, password}).then(response => {
        console.log(response);
        const { data } = response
        const {id,username, userId, grade, dept, sclass, type, startyear, endyear,phone,email} = data
        sessionStorage.setItem("id",JSON.stringify(id))
        sessionStorage.setItem("userId",JSON.stringify(userId))
        sessionStorage.setItem("username",JSON.stringify(username))
        commit('SET_USERID',userId)
        commit('SET_USERNAME',username)
        commit('SET_GRADE',grade)
        commit('SET_DEPT',dept)
        commit('SET_SCLASS',sclass)
        commit('SET_TYPEID',type)
        commit('SET_STARTYEAR',startyear)
        commit('SET_ENDYEAR',endyear)
        // commit('SET_ROLE', [type])
        commit('SET_PHONE',phone)
        commit('SET_EMAIL',email)
        // console.log(response,store.getters.role,sessionStorage.getItem("role"));
        sessionStorage.setItem("role",JSON.stringify(type))
        sessionStorage.setItem("phone",JSON.stringify(phone))
        sessionStorage.setItem("email",JSON.stringify(email))
        resolve()
      }).catch(error => {
        console.log(error);
        reject(error)
      })
    })
  },

  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        const type =JSON.parse(sessionStorage.getItem("role"))
        commit('SET_ROLE', [type])
        resolve([type])
      },500)
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        sessionStorage.clear();
        commit('SET_ROLE', [])
        resetRouter()
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
