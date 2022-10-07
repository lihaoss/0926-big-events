$(function(){
  $('#go2reg').on('click',function(){
    $('.login-wrap').hide()
    $('.reg-wrap').show()
  })
  $('#go2login').on('click',function(){
    $('.reg-wrap').hide()
    $('.login-wrap').show()
  })
  const form = layui.form
  const layer = layui.layer
  form.verify({
    pwd: [
    /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
  ] 
,
  repwd: function(value){
    if($('#password').val()!==value){
  return '两次密码输入不一致，请重新输入'
    }
 } 
})




$('#formReg').on('submit',function(e){
e.preventDefault()
$.ajax({
  method:'POST',
  url:'/api/reg',
  // contentType:'application/json',
  // data:JSON.stringify({
  //   username:$('.reg-wrap [name=username]').val(),
  //   password:$('.reg-wrap [name=password]').val(),
  //   repassword:$('.reg-wrap [name=repassword]').val()
  // }),
  data:$(this).serialize(),
  success(res){
  if(res.code!==0)  return layer.msg(res.message)
  layer.msg('注册成功');
  $('#go2login').click()
  }
})
})
$('#formLogin').on('submit',function(e){
  e.preventDefault()
  $.ajax({
    method:'POST',
    url:'/api/login',
    // contentType:'application/json',
    // data:JSON.stringify({
    //   username:$('.reg-wrap [name=username]').val(),
    //   password:$('.reg-wrap [name=password]').val(),
    //   repassword:$('.reg-wrap [name=repassword]').val()
    // }),
    data:$(this).serialize(),
    success(res){
    if(res.code!==0)  return layer.msg(res.message)
    layer.msg('注册成功');
    // $('#go2login').click()
    localStorage.setItem('token',res.token)
    location.href = '/index.html'
    }
  })
})
})
// const format2Json = (source)=>{
//   let target = {}
//    source.split('&').forEach((el)=>{

//     let kv = el.split('=')
//     target[kv[0]] = kv[1]
//    })
// return JSON.stringify(target)

// }