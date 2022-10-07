const format2Json = (source)=>{
  let target = {}
   source.split('&').forEach((el)=>{

    let kv = el.split('=')
    target[kv[0]] = decodeURIComponent(kv[1])
    // target[kv[0]] = kv[1]

   })
return JSON.stringify(target)

}
$.ajaxPrefilter(function(option){
  option.url = 'http://big-event-vue-api-t.itheima.net' + option.url
 option.contentType='application/json'
 option.data = option.data && format2Json(option.data)
 if(option.url.includes('/my')){
  option.headers={
    Authorization:localStorage.getItem('token') || ''
  }
}
option.error =function(err){
  if(err.responseJSON.code===1&&err.responseJSON.message === '身份认证失败！'){
    localStorage.removeItem('token')
    location.href = '/login.html'
  }
}
})