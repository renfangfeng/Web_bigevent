$(function() {
    //设置去注册的点击事件
    $('#login').on('click',function() {
        //登录页面隐藏
        $('.login-box').hide()
        //注册页面显示
        $('.reg-box').show()
    });
     //设置去登录的点击事件
    $('#reg').on('click',function() {
        //注册页面隐藏
        $('.reg-box').hide()
        //登录页面显示
        $('.login-box').show()
    })

    const form = layui.form

    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          repwd:function(value) {
              //通过获取输入的value值  来判定两次密码是否相同
              //利用name属性  获取输入框的值
              let pwd = $('.reg-box [name=password]').val()
              if(pwd !== value) {
                  return'两次密码不一样'
              }
          }
    })

    //注册页面
    $('#form_reg').on('submit',function(e) {
        e.preventDefault()
       $.ajax({
           url:'/api/reguser',
           type:'post',
           data:{
               username: $('#form_reg [name=username]').val(),
               password: $('#form_reg [name=password]').val()
           },
           success(res) {
               if(res.status !== 0) {
                   return layer.msg(res.message);
               }
               layer.msg('注册成功');
               $('#login').click()
           },
       })
    })

    //登录页面
    $('#form_login').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            type:'post',
            data:$(this).serialize(),
            success(res) {
                if(res.status !== 0) {
                    //layui封装的方法
                    return layer.msg('res.message');
                }
                //储存返回的keton数据
                localStorage.setItem('token',res.token);
                //登录成功后跳转到后台
                location.href = './index.html';
            }
        })
    })


    






})