$.ajaxPrefilter(function(option){
  option.url = 'http://big-event-vue-api-t.itheima.net' + option.url
 option.contentType='application/json'
 option.data = format2Json(option.data)
})