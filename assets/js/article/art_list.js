$(function () {

    var layer = layui.layer

    // 定义一个查询的参数对象
    var q = {
        pagenum: 1,//页码值
        pagesize: 2,//每页显示几条数据
        cate_id: '',//文章分类的id
        state: ''//文章的发布状态
    }

    initTable()

    // 获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败!')
                }
                //使用模板引擎渲染页面的数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
})