let layer = layui.layer
$(function(){
  getUserInfo()
})
function getUserInfo(){
  $.ajax({
    method:'GET',
    url:'/my/userinfo',
    //请求头配置对象
    // headers:{
    //   Authorization:localStorage.getItem('token') || ''
    // },
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

  $('.user-box img').attr('src',res.user_pic).show()
}else{
  $('.layui-nav-img').hide()
  const name = res.nickname || res.username
  const char = name[0].toUpperCase()
  // $('.text-avatar').css()
  // $('.text-avatar').css('display',none).html(char).show()
  $('.text-avatar').html(char).show()

}
$('.text').html(`欢迎&nbsp;&nbsp;${res.nickname}`)
}
$('#btnLogout').on('click',function(){
  layer.confirm('确认是否退出', {icon: 3, title:'提示'}, function(index){
    localStorage.removeItem('token')
    location.href='/login.html'
    layer.close(index);
  })
})