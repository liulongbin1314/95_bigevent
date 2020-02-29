$(function () {
  var layer = layui.layer
  var form = layui.form

  form.verify({
    // 昵称的验证规则
    nickname: [
      /^[\S]{2,6}$/
      , '昵称必须2到6位，且不能出现空格'
    ]
  })

  // 初始化用户的基本信息
  initUserInfo()

  // 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        // 获取用户信息成功
        // $('[name=username]').val(res.data.username)
        // 使用 form.val() 方法，快速为指定的表单赋值
        form.val('f1', res.data)
      }
    })
  }

  // 监听重置按钮的点击事件
  $('#btnReset').on('click', function (e) {
    // 1. 阻止重置的默认行为
    e.preventDefault()
    // 2. 重新获取用户信息，并渲染表单数据
    initUserInfo()
  })

  // 修改用户信息
  $('#form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')
        // 更新 index.html 页面中的欢迎文本
        window.parent.getUserInfo()
      }
    })
  })
})