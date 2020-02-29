$(function () {
  var layer = layui.layer

  // 调用这个函数，获取用户的信息
  getUserInfo()

  // 为退出的按钮绑定点击事件
  $('#btnLogout').on('click', function () {
    // 问题：如果在用户点击按钮的时候，提示用户是否退出呢？？？
    layer.confirm('确认退出登录吗?', { icon: 3, title: '提示' }, function (index) {
      //do something
      // 1. 清 token
      localStorage.removeItem('token')
      // 2. 跳页面
      location.href = '/login.html'

      // layer.close 表示关闭指定的弹出层
      layer.close(index)
    });
  })
})


// 获取用户的基本信息
// 注意：一定要在 jQuery 入口函数之外，定义这个方法
function getUserInfo() {
  // 发起 ajax 请求，获取用户信息
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    // 成功的回调
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      // 获取用户信息成功
      // 渲染用户的头像和欢迎的文本内容
      // render 渲染的意思
      // Avatar 头像的意思
      renderAvatar(res.data)
    }
  })
}

// // 获取用户的基本信息
// // 注意：一定要在 jQuery 入口函数之外，定义这个方法
// function getUserInfo() {
//   // 发起 ajax 请求，获取用户信息
//   $.ajax({
//     type: 'GET',
//     url: '/my/userinfo',
//     // 成功的回调
//     success: function (res) {
//       if (res.status !== 0) {
//         return layui.layer.msg('获取用户信息失败！')
//       }
//       // 获取用户信息成功
//       // 渲染用户的头像和欢迎的文本内容
//       // render 渲染的意思
//       // Avatar 头像的意思
//       renderAvatar(res.data)
//     },
//     complete: function (res) {
//       // 使用 res.responseJSON 获取到服务器的响应内容
//       if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
//         // 用户没有登录，就来访问 index 页面
//         // 1. 清空假 token
//         localStorage.removeItem('token')
//         // 2. 强制用户跳转到 登录页面
//         location.href = '/login.html'
//       }
//     }
//   })
// }

// 渲染用户头像和欢迎文本
function renderAvatar(user) {
  // 获取用户的名称
  var name = user.nickname || user.username
  // 1. 设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 2. 按需渲染头像
  if (user.user_pic) {
    // 渲染图片的头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    // 渲染文本的头像
    $('.layui-nav-img').hide()
    // 获取用户名的第一个字符串
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}



// // 获取用户的基本信息
// // 注意：一定要在 jQuery 入口函数之外，定义这个方法
// function getUserInfo() {
//   // 发起 ajax 请求，获取用户信息
//   $.ajax({
//     type: 'GET',
//     url: '/my/userinfo',
//     // 指定请求头
//     headers: {
//       // 通过 Authorization 字段，把 token 发送给服务器，进行身份认证
//       Authorization: localStorage.getItem('token')
//     },
//     success: function (res) {
//       console.log(res)
//     }
//   })
// }
