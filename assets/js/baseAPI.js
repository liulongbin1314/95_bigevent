// 注意：今后每个页面，凡是需要发起 ajax 请求，
// 都必须先导入这个 baseAPI.js 之后，再发起请求，
// 否则，就无法统一为 ajax 请求，拼接 URL 根路径
$.ajaxPrefilter(function (option) {
  // 这个 option 就是大家每次调用 $.get() 或 $.post() 或 $.ajax() 时候，
  // 提供的那个配置对象
  // console.log(option)
  option.url = 'http://www.liulongbin.top:3007' + option.url

  // 在这里统一为那些有权限的接口，添加 headers 请求头
  // 有权限的接口，URL路径中会包含 /my/ 这样的字符串
  if (option.url.indexOf('/my/') !== -1) {
    // 统一为有权限的接口，设置 Authorization 请求头
    option.headers = {
      Authorization: localStorage.getItem('token')
    }

    // 统一为有权限的接口，设置 complete 回调函数
    option.complete = function (res) {
      // 使用 res.responseJSON 获取到服务器的响应内容
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        // 用户没有登录，就来访问 index 页面
        // 1. 清空假 token
        localStorage.removeItem('token')
        // 2. 强制用户跳转到 登录页面
        location.href = '/login.html'
      }
    }
  }
})