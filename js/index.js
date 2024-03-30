$(document).ready(() => {





    // for the theme change btn.
    $("#theme-changer").on("click", (e) => {
        $(document.body).toggleClass("bg-dark");

        $("#theme-changer i").toggleClass(function togglerIcn() {
            if($(this).hasClass("fa-sun")){
                $(this).removeClass("fa-sun")
                return "fa-moon"
            }else{
                $(this).removeClass("fa-moon")
                return "fa-sun"
            }
        })
    });
});

// for mouse cursor
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#000", "#060a0c", "#121b21", "#1a303d", "#214b62", "#256a8c", "#2689b6", "#22a4db", "#1cb7f5", "#1cb7f5"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.7;
    y += (nextCircle.y - y) * 0.8;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();


// for box light eff
document.getElementById("cards").onmousemove = e => {
    for(const card of document.getElementsByClassName("card")) {
      const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
  
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };
  }