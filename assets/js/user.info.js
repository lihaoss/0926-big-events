$(function(){
const form = layui.form
const layer = layui.layer
form.verify({
  nickname:function(value){
    if(value.length>6){
      return '昵称必须是1-6位字符'
    }
  }
})
const initinfo = function(){
 $.ajax({
  method:'GET',
  url:'/my/userinfo',
  success(res){
    if(res.code!==0) return layer.msg
    // console.log(res.data);
    form.val('userForm',res.data)
  }
 })
}
initinfo()


$('#btnReset').on('clickdss',function(e){
e.preventDefault()
initinfo()
})
$('.layui-form').on('submit',function(e){
  e.preventDefault()
  $.ajax({
    method:'PUT',
    url:'/my/userinfo',
    data:$(this).serialize(),
    success(res){
      if(res.code!==0) return layer.msg('更新用户信息失败')
       window.parent.getUserInfo()
       layer.msg('更新用户成功')
    }

  })
})
})