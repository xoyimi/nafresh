window.addEventListener('load', function () {
  //动态生成小圆圈

  //1.获取元素
  var focus = document.querySelector('.focus');
  var ul = focus.querySelector('ul');
  var ol = focus.querySelector('ol');
  var focusWidth = focus.offsetWidth;
  var arrow_l = this.document.querySelector('.arrow-l');
  var arrow_r = this.document.querySelector('.arrow-r');

  focus.addEventListener('mouseenter', function () {
    clearInterval(auto);
    auto = null; //清空对象 释放内存
  })
  focus.addEventListener('mouseleave', function () {
    auto = setInterval(function () {
      arrow_r.click();
    }, 2000);
  })


  for (var i = 0; i < ul.children.length; i++) {
    //创建一个小li;
    var li = document.createElement('li');
    //记入索引号
    li.setAttribute('index', i);
    //把li插入
    ol.appendChild(li);

    //小圆圈的排他事件
    li.addEventListener('click', function () {
      //清除所有
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = '';
      }
      //留下自己
      this.className = 'current';
      //点击小圆圈,移动图片
      //ul的移动距离就是小圆圈的索引号 乘以 图片的宽度 负值
      //当我们点击了某个小圆圈 ,拿到当前的索引号
      var index = this.getAttribute('index');
      //把index 赋给 num
      num = index;
      //把index 赋给 cilcle
      circle = num;

      var focusWidth = focus.offsetWidth;
      animate(ul, -index * focusWidth)
    })
  }

  //把 ol 里面的第一个小li设置为类名 current;
  ol.children[0].className = 'current';
  //克隆第一个图片(li)
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);
  //给右箭头创建事件
  var num = 0;
  var circle = 0;
  var flag = true; //节流阀
  //右侧按钮
  arrow_r.addEventListener('click', function () {
    if (flag) {
      flag = false;
      if (num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      //小圆圈跟着一起变化
      circle++;
      if (circle == ol.children.length) {
        circle = 0;
      }
      circleChange()
    }
  })

  //左侧按钮
  arrow_l.addEventListener('click', function () {
    if (flag) {
      flag = false;
      if (num == 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * focusWidth + 'px';
      }
      num--;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      //小圆圈跟着一起变化
      circle--;
      if (circle < 0) {
        circle = ol.children.length - 1;
      }
      circleChange()
    }
  })

  function circleChange() {

    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = '';
    }
    //保留自己
    ol.children[circle].className = 'current';

  }

  //自动轮播
  var auto = this.setInterval(function () {
    //手动调用点击事件
    arrow_r.click();
  }, 2000)
  //
  let goBack = document.querySelector('.go-back');
  goBack.style.display = 'none';
  window.addEventListener('scroll', function () {
    if (this.pageYOffset > 200) {
      goBack.style.display = 'block';
    } else goBack.style.display = 'none';

  })
  goBack.addEventListener('click', function () {
    scrollTo(0, 0);
  })
})