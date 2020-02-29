$(function () {
  var form = layui.form

  // 自定义校验规则
  form.verify({
    // 密码的基本验证规则
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    newPwd: function (value) {
      var pwd = $('[name=oldPwd]').val()
      if (value === pwd) {
        return '新旧密码不能重复！'
      }
    },
    samePwd: function (value) {
      var pwd = $('[name=newPwd]').val()
      if (value !== pwd) {
        return '两次密码不一致！'
      }
    }
  })

  // 绑定submit事件
  $('#form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg('更新密码失败！')
        }
        layui.layer.msg('更新密码成功！')
        // 重置表单中的数据
        // 1. 在 jQuery 中，可以通过 [0] 的形式，把 jQuery 对象转化为原生 DOM 对象
        // 2. 表单的原生 DOM 对象提供了 reset() 方法，可以重置表单
        $('#form')[0].reset()
      }
    })
  })
})