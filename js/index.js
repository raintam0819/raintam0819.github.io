// onload 事件
window.onload = function () {
    // 滚动 修改颜色
    scrollChangeColor();
    // 轮播图
    banner();
    // 倒计时
    countDownTime();
}

// 滚动修改颜色
/**
 * 默认颜色为 透明
 * 滚动的时候
 *  计算滚动距离
 *  最大滚动到 轮播图的高度
 *  颜色 最终 也保有一定的透明度
 */
function scrollChangeColor() {

    // 先定义变量
    // 最大的滚动高度
    var maxScrollHeight = document.querySelector('.banner').offsetHeight;
    // 获取 需要修改透明度的 dom元素
    var headerDom = document.querySelector('header');
    // 直接设置为透明
    headerDom.style.backgroundColor = 'rgba(201, 21, 35,0)';

    // 最大的 alpha  
    var maxAlpha = 0.8;

    // 写逻辑 建议 逻辑中 如非必要 不要添加 写死的数值(magic number)
    window.onscroll = function () {
        // 获取 滚动的距离 (高度)
        var scrollTop = document.body.scrollTop;

        // 获取的值 从0到0.8即可
        var percent = scrollTop / maxScrollHeight;

        // 修正 percent的值 最大为0.8
        if (percent >= maxAlpha) {
            percent = maxAlpha;
        }

        // 设置给 headerDom的 背景色
        headerDom.style.backgroundColor = 'rgba(201, 21, 35,' + percent + ')';
    }

}
// 自动倒计时
/**
 * 1.获取变量
 *  获取需要倒计时的值
 *  获取需要修改的dom元素们
 * 
 * 2.定时器 倒计时操作
 *  时间--
 *  修改显示的效果
 * 一般商业网站中 倒计时的速度 会非常快
 */
function countDownTime() {
    // 总秒数
    var totalSecond = 5 * 60 * 60;
    // var totalSecond =  5;
    // 获取 倒计时显示的 
    var liLists = document.querySelectorAll('.second-kill .top li');

    // 做成局部的
    var setTime = function () {
        // 转化为 时分秒 假设 有 3780秒
        var hour = Math.floor(totalSecond / 3600);
        var minute = Math.floor(totalSecond % 3600 / 60);
        // 秒
        var second = totalSecond % 60;

        // console.log(hour + '|' + minute + '|' + second);

        // 设置给 li标签 时分秒
        // 时 十位
        liLists[0].innerHTML = Math.floor(hour / 10);
        // 时 个位
        liLists[1].innerHTML = hour % 10;

        // 分 十位
        liLists[3].innerHTML = Math.floor(minute / 10);
        // 分 个位
        liLists[4].innerHTML = minute % 10;

        // 秒 十位
        liLists[6].innerHTML = Math.floor(second / 10);
        // 秒 个位
        liLists[7].innerHTML = second % 10;
    }

    // 默认 调用一次即可
    setTime();

    // 定义定时器
    var interId = setInterval(function () {
        // 时间递减
        totalSecond--;

        // 倒计时 结束之后 
        // 关掉定时器 提示用户
        if (totalSecond < 0) {
            clearInterval(interId);
            alert('哥们,早不买,后悔了吧,哈哈哈哈哈,但是 明天还有哦');

            // 后续代码不执行
            return;
        }

        // 再次调用
        setTime();

    }, 1000);

}

// 轮播图
/**
 * css3推出之后 建议 使用 变换transform 结合 过渡transition 来实现动画
 * 在移动端 性能 比 定位要好
 * 官方的推荐是 
 */

/**
 * 轮播逻辑
 * 1. 获取必须知道的变量
 *  获取屏幕的宽度
 *  改变位置的 ul
 *  索引的li标签
 *  索引值 
 * 
 * 2.自动轮播
 *   定时器
 *      索引值++;
 *      判断是否为 最后一张 特殊处理
 * 
 */
function banner() {
    // 定义变量
    // 移动的ul
    var imgUl = document.querySelector('.banner_imgs');
    // 一倍的屏幕宽度
    var screenWidth = document.body.offsetWidth;
    // 索引的li标签们
    var indexLis = document.querySelectorAll('.banner_index li');
    // 定义变量 记录 当前显示的 索引值
    // 默认 已经往左边 移动了 一倍的屏幕宽度
    // 0 1 2 3 4 5 6 7 8 9
    var index = 1;

    // 最大的索引值
    var maxIndex = 9;

    // 轮播图的时间
    var time = 1000;

    // 默认 为 移动的ul 添加过渡属性
    // 定时器的间隔是 1s 过渡时间 建议 小于1秒
    imgUl.style.transition = 'all .5s';

    // 开启定时器 进行切换
    var interId = setInterval(function () {
        // 索引++
        index++;
        // 开启过渡
        imgUl.style.transition = 'all .5s';
        // 在设置之前 修正 index的值 迁移到 过渡结束事件中
        // if(index>maxIndex){
        //     index=1;
        //     // 关闭过渡
        //     imgUl.style.transition = 'none';
        // }

        // 修改 轮播图 UL的 transform
        imgUl.style.transform = 'translateX(' + screenWidth * -index + 'px)';

    }, time)

    // 注册过渡结束事件
    // 事件注册不了的时候
    // imgUl.ontransitionEnd = function(){
    //     console.log('过渡结束了');
    // }
    // 需要通过 addEventListener来进行绑定
    imgUl.addEventListener('transitionend', function () {
        console.log('结束了');
        // 如果 已经 到了 最后一张

        if (index >= maxIndex) {
            // 把索引值换成 1
            index = 1;
            // 关闭过渡
            imgUl.style.transition = 'none';
            // 瞬间 跳回索引为1的 那一张
            imgUl.style.transform = 'translateX(' + screenWidth * -index + 'px)';
        }

        // 修改索引的 显示即可
        // 轮播图的索引 0 1 2 3 4 5 6 7 8 9
        // li标签的索引   0 1 2 3 4 5 6 7
        // 清空其他li标签的 current class
        for(var i = 0; i<indexLis.length;i++){
            indexLis[i].classList.remove('current');
        }

        // 设置索引显示即可
        indexLis[index-1].classList.add('current');

    })

}