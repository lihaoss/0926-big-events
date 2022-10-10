$(function(){
  const form = layui.form
  initEditor()
  loadCateList()

  // 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
  aspectRatio: 400 / 280,
  preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)
  function loadCateList() {
    $.ajax({
      method: 'GET',
      url: 'http://big-event-vue-api-t.itheima.net/my/cate/list',
      headers:{
        Authorization:localStorage.getItem('token')
      },
      success(res) {
        if (res.code !== 0) return layer.msg('获取列表信息失败')
        const html = template('tpl-cate', res)
        // $('tbody').empty().append(html)
        $('[name = cate_id]').html(html)
        form.render()
      }
    })
  }
  $('#btn_pub').on('click',function(){
    file.click()
  })
  $('#file').on('change',function(e){
    const  fileList = e.target.files
    if(fileList.length === 0) return layer.msg('请选择文件')
    // 根据文件，创建对应的 URL 地址
    const newImgURL = URL.createObjectURL(fileList[0])
    // 为裁剪区域重新设置图片
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域

  })
  let state = '已发布'
  $('#btnSave1').on('click',function(){
    
  })
  $('#btnSave2').on('click',function(){
    state = '草稿'
  })
  $('#formPub').on('submit',function(e){
    e.preventDefault()
    let fd = new FormData($(this)[0])
    fd.append('state',state)
    $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 400,
      height: 280
    })
    .toBlob(function(blob) {
      // 将 Canvas 画布上的内容，转化为文件对象
      // 得到文件对象后，进行后续的操作
      // 5. 将文件对象，存储到 fd 中
      fd.append('cover_img', blob)
      // 6. 发起 ajax 数据请求
      $.ajax({
        method:'POST',
        url:'http://big-event-vue-api-t.itheima.net/my/article/add',
        data: fd,
        headers:{
          Authorization:localStorage.getItem('token')
        },
        contentType: false,
        processData: false,
        success: function(res) {
          if (res.code !== 0) {
            return layer.msg('发布文章失败！')
          }
          layer.msg('发布文章成功！')
          // 发布文章成功后，跳转到文章列表页面
          location.href = '/assets/article/art_list.html'
        }
      })
    })
    
  })
 
})