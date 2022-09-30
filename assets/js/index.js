let layer = layui.layer
$(function(){
  getUserInfo()
})
function getUserInfo(){
  $.ajax({
    method:'GET',
    url:'/my/userinfo',
    //请求头配置对象
    headers:{
      Authorization:localStorage.getItem('token') || ''
    },
    success(res){
      if(res.code !==0){
        return layer.msg('获取信息失败')
      }
      renderAvatar(res.data)
    },
//     complete:function(res){

//   console.log(res);
//   if(res.responseJSON.status ===1 && res.responseJSON.message === '身份认证失败！'){
//  localStorage.removeItem('token')
//  location.href = '/login2.html'
//   }
//     }
  })
}
function renderAvatar(res){
if(res.user_pic){
  $('.text-avatar').hide()
  $('.user-box img').css('src',res.user_pic)
}else{
  $('.layui-nav-img').hide()
  const name = res.nickname || res.username
  const char = name[0].toUpperCase()
  $('.text-avatar').html(char)
}
$('.text').html(`欢迎&nbsp;&nbsp;${res.username}`)
}