import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  document.title = getPageTitle(to.meta.title)

  const hasLogin = sessionStorage.getItem("username")

  if (hasLogin) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.role && store.getters.role.length > 0
      // console.log(hasRoles)
      if (hasRoles) {
        next()
      } else {
        try {
          const role = await store.dispatch('user/getInfo')
          // console.log(role);
          const accessRoutes = await store.dispatch('permission/generateRoutes', role)

          router.addRoutes(accessRoutes)

          next({ ...to, replace: true })

        } catch (error) {
          console.log("cuowu");
          Message.error(error.message || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {

    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
