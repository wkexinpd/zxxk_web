const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  userId: state => state.user.userId,
  username: state => state.user.username,
  grade: state => state.user.grade,
  dept: state => state.user.dept,
  sclass: state => state.user.sclass,
  typeId: state => state.user.typeId,
  role: state => state.user.role,
  startyear: state => state.user.startyear,
  endyear: state => state.user.endyear,
  phone: state => state.user.phone,
  email: state => state.user.email,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
