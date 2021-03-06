const getters = {
  // 平台
  systemTheme: state => state.platform.systemTheme,
  shortcutMenu: state => state.platform.shortcutMenu,
  sidebarState: state => state.platform.sidebarState,
  windowMaxState: state => state.platform.windowMaxState,
  headerHeight: state => state.platform.headerHeight,
  tagTabHeight: state => state.platform.tagTabHeight,
  // 用户
  userAccount: state => state.user.userAccount,
  userName: state => state.user.userName,
  userId: state => state.user.userId,
  avatar: state => state.user.avatar,
  token: state => state.user.token,
  roles: state => state.user.roles,
  // 路由
  addRouters: state => state.routers.addRouters,
  asyncRouter: state => state.routers.router,
  // 页面
  cachedViews: state => state.views.cachedViews,
  visitedViews: state => state.views.visitedViews
}

export default getters
