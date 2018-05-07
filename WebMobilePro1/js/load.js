var page = 1, //分页码
    off_on = false, //分页开关(滚动加载方法 1 中用的)
    timers = null; //定时器(滚动加载方法 2 中用的)

//加载数据
var LoadingDataFn = function() {
    var dom = '';
    for (var i = 0; i < 10; i++) {
    	dom += '<li class="news-item"><div class="news-content"><img class="news-img" src="img/timg01.jpg"/><p class="news-title">为什么那么多的白人会认为中国女孩是easy girl？</p><span id="" class="news-time">1小时前</span><span id="" class="news-num">88</span></div></li>';
        
    }
    $("#footer-more").text("玩命加载中...");
    setTimeout(function () {
		$('#list_box').append(dom);
    		off_on = true; //[重要]这是使用了 {滚动加载方法1}  时 用到的 ！！！[如果用  滚动加载方法1 时：off_on 在这里不设 true的话， 下次就没法加载了哦！]
    		$("#footer-more").text("加载更多...");
    }, 1000);
    
};

//初始化， 第一次加载
$(document).ready(function() {
    LoadingDataFn();
});

//底部切换
$(document.body).on('click', '#footer div', function() {
    $(this).addClass('active').siblings().removeClass('active');
});

//滚动加载方法1
$('#main').scroll(function() {
    //当时滚动条离底部60px时开始加载下一页的内容
    if (($(this)[0].scrollTop + $(this).height() + 60) >= $(this)[0].scrollHeight) {
        //这里用 [ off_on ] 来控制是否加载 （这样就解决了 当上页的条件满足时，一下子加载多次的问题啦）
        if (off_on) {
            //off_on = false;
            //page++;
            //console.log("第"+page+"页");
            //LoadingDataFn();  //调用执行上面的加载方法
        }
    }
});

//滚动加载方法2
$('#main').scroll(function() {
    //当时滚动条离底部60px时开始加载下一页的内容
    if (($(this)[0].scrollTop + $(this).height() + 60) >= $(this)[0].scrollHeight) {
        clearTimeout(timers);
        //这里还可以用 [ 延时执行 ] 来控制是否加载 （这样就解决了 当上页的条件满足时，一下子加载多次的问题啦）
        timers = setTimeout(function() {
            page++;
            console.log("第" + page + "页");
            LoadingDataFn(); //调用执行上面的加载方法
        }, 100);
    }
});

//还可以基window窗口（body）来添加滚动事件, (因为布局不同,所以在这里没效果，因为[上面是基于body中的某个元素来添加滚动事的])
$(window).scroll(function() {
    //当时滚动条离底部60px时开始加载下一页的内容
    if (($(window).height() + $(window).scrollTop() + 60) >= $(document).height()) {
        clearTimeout(timers);
        timers = setTimeout(function() {
            page++;
            console.log("第" + page + "页");
            LoadingDataFn();
        }, 100);
    }
});