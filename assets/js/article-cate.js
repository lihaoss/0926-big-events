$(function(){
  const layer = layui.layer
  const form = layui.form
  loadCateList()
  function loadCateList(){
    $.ajax({
      method:'GET',
      url:'/my/cate/list',
      success(res){
        if(res.code!==0)return layer.msg('获取列表信息失败')
        const html = template('tpl-cate',res)
        $('tbody').empty().append(html)
      }
    })
  }
  let index = null
  $('#btnAdd').on('click',function(){
   index = layer.open({
      type:1,
      area:['500px','260px'],
      content:$('#addDialog').html()
    })
  })
  let isEdit = false
  $('body').on('submit','#addForm',function(e){
  e.preventDefault()
  if(isEdit){
    $.ajax({
      method:'PUT',
      url:'/my/cate/info',
      data:$(this).serialize(),
      success(res){
        if(res.code!==0) return layer.msg('修改分类失败')
        isEdit =false

        layer.msg('修改分类成功')
        layer.close(index)
        loadCateList()
      }
    })
  }else{
    $.ajax({
      method:'POST',
      url:'/my/cate/add',
      data:$(this).serialize(),
      success(res){
        if(res.code!==0) return layer.msg('添加分类失败')
        layer.msg('添加分类成功')
        isEdit =false
        layer.close(index)
        loadCateList()
      }
    })
  }
  
  })
  $('tbody').on('click','.btnEdit',function(){
    isEdit = true
  //  console.log(data-id);
   index = layer.open({
    type:1,
    area:['500px','260px'],
    content:$('#addDialog').html()
  })
  const id = $(this).attr('data-id')
  $.ajax({
    method:'GET',
    url:`/my/cate/info?id=${id}`,
    success(res){
      if(res.code!==0) return layer.msg('获取分类详情失败')
      form.val('addFormFilter',res.data)
    }
  })
  })
  $('tbody').on('click','.btnDelete',function(){
    const result = confirm('确定删除吗')
  const id = $(this).attr('data-id')

    if(result){
      $.ajax({
        method:'DELETE',
        url:`/my/cate/del?id=${id}`,
        success(res){
         if(res.code!==0) return layer.msg('删除失败')
         layer.msg('删除成功')
        loadCateList()
         
        }
      })
    }
  })
})