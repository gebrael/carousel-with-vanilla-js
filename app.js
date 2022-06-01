var imgList = Array.from(document.querySelectorAll(".item img"));
var layer = document.getElementById("layer");
var img = document.getElementById("img");
var currentIndex;
var nextBtn = document.getElementById("next");
var prevBtn = document.getElementById("prev");
var closeBtn = document.getElementById("close");

for (var i = 0; i < imgList.length; i++) {
  imgList[i].addEventListener("click", function (e) {
    var Imgsrc = e.target.getAttribute("src");
    currentIndex = imgList.indexOf(e.target);
    layer.classList.replace("d-none", "d-flex");
    img.style.backgroundImage = `url(${Imgsrc})`;
  });
}

function next() {
  currentIndex++;
  if (currentIndex >= imgList.length) {
    currentIndex = 0;
  }
  var Imgsrc = imgList[currentIndex].getAttribute("src");
  img.style.backgroundImage = `url(${Imgsrc})`;
}
function prev() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = imgList.length - 1;
  }

  var Imgsrc = imgList[currentIndex].getAttribute("src");
  img.style.backgroundImage = `url(${Imgsrc})`;
}
function close() {
  layer.classList.replace("d-flex", "d-none");
}

nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);
closeBtn.addEventListener("click", close);

document.addEventListener("keyup", function (e) {
  if (layer.classList.contains("d-flex")) {
    if (e.key == "ArrowRight") {
      next();
    } else if (e.key == "ArrowLeft") {
      prev();
    } else if (e.key == "Escape") {
      close();
    }
  }
});

layer.addEventListener("click", function (e) {
  if (e.target !== img && e.target !== nextBtn && e.target !== prevBtn) {
    layer.classList.replace("d-flex", "d-none");
  }
});

var startY, moveY;
var touchStart = function (e) {
  startY = e.touches[0].clientY;
};
var touchMove = function (e) {
  moveY = e.touches[0].clientY;
};
var touchEnd = function (e) {
  if (moveY - startY > 50) {
    next();
  } else if (startY - moveY > 50) {
    prev();
  }
};
img.addEventListener("touchstart", touchStart);
img.addEventListener("touchmove", touchMove);
img.addEventListener("touchend", touchEnd);
