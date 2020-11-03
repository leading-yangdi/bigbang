$(function () {

    var layer = layui.layer
    var form = layui.form

    initCate()

    initEditor()

    // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败!')
                }
                // 调用模板引擎 渲染下拉菜单
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 绑定点击事件
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })

    // 监听caverFile 的change事件,获取用户选择的文件
    $('#coverFile').on('change', function (e) {
        var files = e.target.files

        if (files.length === 0) {
            return
        }

        var newImgURL = URL.createObjectURL(files[0])

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 定义文章的发布状态
    var art_state = '已发布'

    // 为存为草稿按钮,绑定点击事件
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })
})