import { constantRouterMap } from '@/router/routes/staticRoutes'
// import { aysncRoutesMap } from '@/router/routes/aysncRoutes'

// layout component
import Layout from '@/views/Layout'
// api
import { getGenerateRoutes } from '@/api/route'
// async load
const _import_ = file => () => import('@/views/' + file + '.vue')

/**
 * TODO: 应该将超管独立出去
 * 判断传入的权限是否能和路由匹配
 * @param {} roles
 * @param {*} route
 */
// function hasPermission (roles, route) {
//   // admin is the super user
//   if (roles.indexOf('admin') >= 0) return true
//   // 跳转路由不包含meta.role,则表示不需要验证权限
//   if (route.meta && route.meta.role) {
//     return roles.some(role => route.meta.role.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

/**
 * 通过权限过滤出可供访问的路由表
 * @param {*} asyncRoutesMap
 * @param {*} roles
 */
// function filterAsyncRoutes (asyncRoutesMap, roles) {
//   const filterRoutes = asyncRoutesMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         filterAsyncRoutes(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return filterRoutes
// }

/**
 * 动态路由创建, 可以读取静态文件,也可以后端维护实现权限分级菜单;
 *
 * @param {Array} remoteRoutes 远程获取到的路由表数据
 * @returns {Array} 重构的vueRouter路由表
 */
function generateNewRoutes (remoteRoutes) {
  let addRouters = []
  /**
   * 创建子路由
   * @param { Array } childRoute
   */
  const _createRoutes = (childRoute) => {
    const newRoute = childRoute.map(route => {
      const addChildRoute = {
        path: route.path,
        name: route.name,
        component: _import_(route.component),
        meta: { ...route.meta }
      }
      // 如果有子路由,则递归创建
      if (route.children && route.children.length) {
        addChildRoute.children = _createRoutes(route.children)
      }
      return addChildRoute
    })
    return newRoute
  }

  /**
   * 创建父路由
   */
  remoteRoutes.forEach(route => {
    let newRoute = {
      path: route.path,
      component: Layout,
      meta: { ...route.meta }
    }
    // 判断是否有子路由
    if (route.children && route.children.length) {
      newRoute.children = _createRoutes(route.children)
    }
    addRouters.push(newRoute)
  })
  return addRouters
}

const asyncRouter = {
  //
  state: {
    addRouters: null, // 动态添加的路由表
    router: constantRouterMap // 静态路由表或和动态路由表合并后的总路由表
  },

  mutations: {
    SET_ROUTERS: (state, router) => {
      state.addRouters = router
      state.router = constantRouterMap.concat(router)
    },
    RESET_ROUTERS: (state, router) => {
      state.addRouters = null
      state.router = constantRouterMap
    }
  },

  actions: {
    generateRouters: ({ commit }, roles) => {
      // 动态读取数据,构建路由表,这里可以后端通过传入用户ID来获取对应的路由表
      return getGenerateRoutes({}).then(res => {
        const addRoutes = generateNewRoutes(res)
        commit('SET_ROUTERS', addRoutes)
      })
      // return new Promise((resolve, reject) => {
      //   // 这里通过权限来过滤出该权限所拥有的动态路由表,然后再SET_ROUTERS
      //   const filterRoutes = filterAsyncRoutes(aysncRoutesMap, roles)

      //   commit('SET_ROUTERS', filterRoutes)
      //   resolve()
      // })
    }
  }

}

export default asyncRouter
