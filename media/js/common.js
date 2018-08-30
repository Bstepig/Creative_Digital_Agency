'use strict';
function offsetLeft(element) {
    var offsetLeft = 0;
    do {
        offsetLeft += element.offsetLeft;
    } while (element = element.offsetParent);
    return offsetLeft;
}


var nav__border = document.querySelector('.nav__border');
var nav__item = document.querySelectorAll('.nav__item');
var nav__item_active = document.querySelector('.nav__item_active');
var offsets = [];
var widths = [];

function returnBorder(item) {
  nav__border.style.width = item.offsetWidth - 60 + 'px';
  nav__border.style.left = offsetLeft(item) + 'px';
}

returnBorder(nav__item_active);

for (var i = 0; i < nav__item.length; i++) {
  nav__item[i].addEventListener('mouseenter', function (el) {
    nav__border.style.width = el.target.offsetWidth - 60 + 'px';
    nav__border.style.left = offsetLeft(el.target) + 'px';
  })
  
  nav__item[i].addEventListener('mouseleave', function () {
    returnBorder(nav__item_active);
  })
  
  nav__item[i].addEventListener('click', function (el) {
    nav__item_active = el.target;
  })
}

var linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
  V = 0.2;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
        e.preventDefault(); //отменяем стандартное поведение
        var w = window.pageYOffset,  // производим прокрутка прокрутка
            hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
        var t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
            start = null;
        requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
        function step(time) {
            if (start === null) start = time;
            var progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash  // URL с хэшем
            }
        }
    }, false);
}