import { type Router } from 'vue-router'
import { useUserStore } from '@/store/user'
import { UserRoleEnum } from '@/constants/user'
import { hasPermission, useRouteStore } from '@/store/route'
import { getToken } from '@/utils'

export const initPerssion = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    if (to.meta.roles === UserRoleEnum.GUEST) {
      return next()
    }

    const userStore = useUserStore()
    const routeStore = useRouteStore()

    // 如果用户token不存在，跳转到登录页
    if (!getToken()) {
      return next('/login')
    }
    // 如果用户角色不存在，获取用户信息
    if (!userStore.role) {
      await userStore.getUserInfo()
      routeStore.initRoutes()
    }

    if (hasPermission(to.meta, userStore.role!)) {
      return next()
    } else {
      return next({ path: '/404', replace: true })
    }
  })
}
