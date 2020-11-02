// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // 统一为有权限的接口，设置 headers 请求头
    if (options.url.includes('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一拦截 complete 回调函数
    // 不论成功还是失败,最终都会调用 comlete 回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
            // 1.强制清空 token
            localStorage.removeItem('token')
            // 2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})