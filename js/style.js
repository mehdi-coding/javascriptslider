var current = 0;

function on() {
  document.querySelector(".overlay").style.display = "block";
  updateBgdImg('.mySlider', imgs[0]);
  current = 0;
}

function off() {
  document.querySelector(".overlay").style.display = "none";
}

var imgs = [
  'http://127.0.0.1:5500/img/1.jpg',
  'http://127.0.0.1:5500/img/2.jpg',
  'http://127.0.0.1:5500/img/3.jpg'
]

function slideLeft() {
  current--;
  if (current < 0) current = imgs.length - 1;
  updateBgdImg('.mySlider', imgs[current]);
}

function slideRight() {
  current++;
  if (current > imgs.length - 1) current = 0;
  updateBgdImg('.mySlider', imgs[current]);
}

window.onload = function () {
  var arrowLeft = document.querySelector(".arrow-left"),
    arrowRight = document.querySelector(".arrow-right");

  arrowLeft.addEventListener("click", function () {
    slideLeft();
  });

  arrowRight.addEventListener("click", function () {
    slideRight();
  });
  var myElement = document.getElementById('myElement');
  var swipePageXinit = 0, swipePageXlast = 0, thr = 40;
    myElement.addEventListener('touchstart', function (evt) {
      swipePageXinit = evt.changedTouches[0].pageX;
    })
    myElement.addEventListener('touchmove', function (evt) {
      swipePageXlast = evt.changedTouches[0].pageX;
    })
    myElement.addEventListener('touchend', function (evt) {
      var diff = swipePageXlast - swipePageXinit;
      if (Math.abs(diff) > thr){
        if(diff < 0) slideLeft();
        else slideRight();
      } 
      console.log(diff);
    })
}

function updateBgdImg(selector, url) {
  var img = new Image();
  img.onload = function () {

    document.querySelector(selector).classList.remove("loader");
    // document.querySelector(selector).classList.remove("loading-lg");
    document.querySelector(selector).style.backgroundImage = "url(" + url + ")";
  };
  img.src = url;
  if (!img.complete) {
    if (!document.querySelector(selector).classList.contains("loader")) {
      document.querySelector(selector).style.backgroundImage = "";
      document.querySelector(selector).classList.add("loader");
      // document.querySelector(selector).classList.add("loading-lg");
    }
  }
}

