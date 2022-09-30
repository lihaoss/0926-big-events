const format2Json = (source)=>{
  let target = {}
   source.split('&').forEach((el)=>{

    let kv = el.split('=')
    target[kv[0]] = kv[1]
   })
return JSON.stringify(target)

}
$.ajaxPrefilter(function(option){
  option.url = 'http://big-event-vue-api-t.itheima.net' + option.url
 option.contentType='application/json'
 option.data = option.data && format2Json(option.data)
})