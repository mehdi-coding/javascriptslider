var current = 0;
var imgs = [
  'http://127.0.0.1:5500/img/1.jpg',
  'http://127.0.0.1:5500/img/2.jpg',
  'http://127.0.0.1:5500/img/3.jpg'
]

function start() {
  slideShow(imgs)
}

function slideShow(imgs) {
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

  // Create overlay div
  var overlay = document.createElement("div");
  overlay.classList.add("overlay");

  // Create Close button
  var closeBtn = document.createElement("span");
  overlay.appendChild(closeBtn);
  closeBtn.classList.add("close");

  closeBtn.addEventListener("click", function () {
    overlay.parentNode.removeChild(overlay);
  })

  // Create Image holder div
  var slider = document.createElement("div");
  overlay.appendChild(slider);
  slider.classList.add("mySlider");
  slider.classList.add("loader");

  var swipePageXinit = 0, swipePageXlast = 0, thr = 40;

  slider.addEventListener('touchstart', function (evt) {
    swipePageXinit = evt.changedTouches[0].pageX;
  })
  slider.addEventListener('touchmove', function (evt) {
    swipePageXlast = evt.changedTouches[0].pageX;
  })
  slider.addEventListener('touchend', function (evt) {
    var diff = swipePageXlast - swipePageXinit;
    if (Math.abs(diff) > thr) {
      if (diff < 0) slideLeft();
      else slideRight();
    }
    console.log(diff);
  })

  // Create Left Arrow
  var leftArrow = document.createElement("div");
  overlay.appendChild(leftArrow);
  leftArrow.classList.add("arrow");
  leftArrow.classList.add("arrow-left")
  leftArrow.addEventListener("click", function () {
    slideLeft();
  });

  // Create Right Arrow
  var rightArrow = document.createElement("div");
  overlay.appendChild(rightArrow);
  rightArrow.classList.add("arrow");
  rightArrow.classList.add("arrow-right")
  rightArrow.addEventListener("click", function () {
    slideRight();
  });

  document.body.appendChild(overlay);
  overlay.style.display = "block";



  updateBgdImg('.mySlider', imgs[0]);
  current = 0;
}
