import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: "/devLog",
    component: Layout,
    children: [
      {
        path: '/devLog',
        component: () => import('@/views/devLog/index'),
        name: 'DevLog',
        meta: { title: '开发日志',icon: 'edit' }
      }
    ]
  },
  {
    path: "/team",
    component: Layout,
    children: [
      {
        path: '/team',
        component: () => import('@/views/team/index'),
        name: 'team',
        meta: { title: '团队介绍',icon: 'user' }
      }
    ]
  },
]

export const asyncRoutes = [
  {
    path: "/person",
    component: Layout,
    children: [
      {
        path: '/person/messagePerson',
        component: () => import('@/views/person/messagePerson'),
        name: 'AddPerson',
        meta: { title: '人员管理',icon: 'edit', roles: [1] }
      }
    ]
  },
  {
    path: "/curricula",
    component: Layout,
    children: [
      {
        path: '/curricula/curriculaList',
        component: () => import('@/views/curriculaList/CurriculaList'),
        name: 'CurriculaList',
        meta: { title: '课程管理',icon: 'list', roles: [0,1] }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    // hidden: true,
    children: [
      {
        path:'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true, roles: [0,1] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
