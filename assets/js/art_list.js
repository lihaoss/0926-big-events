$(function () {
  const layer = layui.layer
  const form = layui.form
  const laypage = layui.laypage;
  template.defaults.imports.formatTime = function (time) {
    const date = new Date(time)
    const y = date.getFullYear()
    const m = (date.getMonth() + 1 + '').padStart(2, '0')
    const d = (date.getDate() + '').padStart(2, '0')
    const hh = (date.getHours() + '').padStart(2, '0')
    const mm = (date.getMinutes() + '').padStart(2, '0')
    const ss = (date.getSeconds() + '').padStart(2, '0')
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
  let qs = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }
  loadArticleList()

  function loadArticleList() {
    $.ajax({
      method: 'GET',
      url: `/my/article/list?pagenum=${qs.pagenum}&pagesize=${qs.pagesize}&cate_id=${qs.cate_id}&state=${qs.state}`,
      success(res) {
        if (res.code !== 0) layer.msg('获取失败')
        // console.log(res);
        const htmlstr = template('tpl-list', res)
        $('tbody').empty().append(htmlstr)
        pagerender(res.total)
      }
    })
  }
  loadCateList()
  function loadCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/cate/list',
      success(res) {
        if (res.code !== 0) return layer.msg('获取列表信息失败')
        const html = template('tpl-cate', res)
        // $('tbody').empty().append(html)
        $('[name = cate_id]').html(html)
        form.render()
      }
    })
  }
  $('#choose-form').on('submit', function (e) {
    e.preventDefault()
    const cate_id = $('[name = cate_id]').val()
    qs.cate_id = cate_id
    const state = $('[name = state]').val()
    qs.state = state
    loadArticleList()
  })
  function pagerender(total) {
    // console.log(total);
    laypage.render({
      elem: 'pageBox',
      count: total,
      limit: qs.pagesize,
      curr: qs.pagenum,
      layout: ['count', 'limit', 'prev', 'page', 'first', 'next', 'skip'],
      limits: [2, 3, 5, 8],
      jump(obj, first) {
        // console.log(obj.curr);
        qs.pagenum = obj.curr
        qs.pagesize = obj.limit
        //  loadArticleList()
        if (!first) {
          loadArticleList()
        }
      }
    })
  }
  $('tbody').on('click', '.btn-delete', function () {
    const result = confirm('你真的要删除吗')
    let len = $('.btn-delete').length
    if (result) {
      const id = $(this).attr('data-id')
      $.ajax({
        method: 'DELETE',
        url: `/my/article/info?id=${id}`,
        success(res) {
          if (res.code !== 0) return layer.msg('删除失败')

          if (len === 1) {
            qs.pagenum = qs.pagenum === 1 ? 1 : qs.pagenum - 1
          }
          loadArticleList()

        }
      })
    }
  })
})