function animate(obj, target, callback) {
  //当我们不断地点击按钮,这个元素会越来越快,因为开启了太多定时器
  //解决办法 先清除以前的定时器,只保留当前的一个定时器\
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    //缓动动画步长公式
    //把步长值取为整数 不要出现小数问题
    var step = (target - obj.offsetLeft) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (obj.offsetLeft != target) {
      obj.style.left = obj.offsetLeft + step + 'px';
    } else {
      clearInterval(obj.timer);
      //定时器最后调用
      if (callback) {
        callback();
      }
    }
  }, 15);
}