$(function () {

    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    // 定义美化事件的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }

    // 定义补零的函数
    function padZero(n) {
        n > 9 ? n : '0' + n
    }

    // 定义一个查询的参数对象
    var q = {
        pagenum: 1,//页码值
        pagesize: 2,//每页显示几条数据
        cate_id: '',//文章分类的id
        state: ''//文章的发布状态
    }

    initTable()
    initCate()

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

                renderPage(res.total)
            }
        })
    }

    // 初始化分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败!')
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    // 为表单绑定事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取表单中选中项
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state

        initTable()
    })

    // 定义渲染分页的方法
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', // 分页的ID
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中
            jump: function (obj, first) {
                q.pagenum = obj.curr
                if (!first) {
                    initTable()
                }
            }
        })
    }
})