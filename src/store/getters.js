const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  username: state => state.user.username,
  id: state => state.user.id,
  phone: state => state.user.phone,
  type: state => state.user.type,
  typeId: state => state.user.typeId,
  sex: state => state.user.sex,
  role: state => state.user.role,
  createTime: state => state.user.createTime,
  updateTime: state => state.user.updateTime,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
