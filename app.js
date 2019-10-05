var express = require('express');

var app = express();

// 配置允许跨域请求；
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "*");//配置客户端 localhost与127.0.0.1是一个意思
    if (req.method == 'OPTIONS') {
        /*让options请求快速返回*/
        res.send(200);
    }
    else {
/*防止异步造成多次响应，出现错误*/
        var _send = res.send;
        var sent = false;
        res.send = function (data) {
            if (sent) return;
            _send.bind(res)(data);
            sent = true;
        };
        next();
    }
});

// 一定要放在路由之前，否则报错 undifinded
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//路由处理 根据不同的功能划分模块
app.use('/api',require('./controller/login'));



var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:10003/wx-food',(erorr)=>{
    if(erorr){
        console.log('no')
    }
    else {
        console.log('数据库连接成功');
        app.listen(8080,()=>{
            console.log('访问成功')
        }); 
    }
});