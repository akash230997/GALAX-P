// var swiper = new Swiper(".mySwiper", {
//   direction: "vertical",
//   slidesPerView: 1,
//   spaceBetween: 30,
//   mousewheel: true,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
// });
gsap.registerPlugin(ScrollTrigger);
let sections = gsap.utils.toArray(".panel");

let scrollTween = gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none", // <-- IMPORTANT!
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 0.1,
    //snap: directionalSnap(1 / (sections.length - 1)),
    end: "+=3000",
  },
});

gsap.set(".box-1, .box-2", { y: 100 });
// ScrollTrigger.defaults({ markers: { startColor: "white", endColor: "white" } });

// red section
gsap.to(".box-1", {
  y: -130,
  duration: 2,
  ease: "elastic",
  scrollTrigger: {
    trigger: ".box-1",
    containerAnimation: scrollTween,
    // start: "left center",
    toggleActions: "play none none reset",
    id: "1",
  },
});

// gray section
gsap.to(".box-2", {
  y: -120,
  backgroundColor: "#1e90ff",
  ease: "none",
  scrollTrigger: {
    trigger: ".box-2",
    containerAnimation: scrollTween,
    // start: "center 80%",
    end: "center 20%",
    scrub: true,
    id: "2",
  },
});

// purple section
ScrollTrigger.create({
  trigger: ".box-3",
  containerAnimation: scrollTween,
  toggleClass: "active",
  // start: "center 60%",
  id: "3",
});

// green section
ScrollTrigger.create({
  trigger: ".green",
  containerAnimation: scrollTween,
  // start: "center 65%",
  end: "center 51%",
  onEnter: () => console.log("enter"),
  onLeave: () => console.log("leave"),
  onEnterBack: () => console.log("enterBack"),
  onLeaveBack: () => console.log("leaveBack"),
  onToggle: (self) => console.log("active", self.isActive),
  id: "4",
});

// only show the relevant section's markers at any given time
gsap.set(
  ".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, gsap-marker-scroller-end",
  { autoAlpha: 0 }
);
["red", "gray", "purple", "green"].forEach((triggerClass, i) => {
  ScrollTrigger.create({
    trigger: "." + triggerClass,
    containerAnimation: scrollTween,
    // start: "left 30%",
    // end: i === 3 ? "right right" : "right 30%",
    markers: false,
    onToggle: (self) =>
      gsap.to(".marker-" + (i + 1), {
        duration: 0.25,
        autoAlpha: self.isActive ? 1 : 0,
      }),
    //testing......(changed)
  });
});

// helper function for causing the sections to always snap in the direction of the scroll (next section) rather than whichever section is "closest" when scrolling stops.
// function directionalSnap(increment) {
//   let snapFunc = gsap.utils.snap(increment);
//   return (raw, self) => {
//     let n = snapFunc(raw);
//     return Math.abs(n - raw) < 1e-4 || (n < raw) === self.direction < 0 ? n : self.direction < 0 ? n - increment : n + increment;
//   };
// }

// making the code pretty/formatted.
PR.prettyPrint();

// Canvas------------------------------------------------------
var scene = new THREE.Scene();
document.addEventListener("mousemove", onMouseMove, false);
var camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var mouseX;
var mouseY;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
const canvasCheck = document.getElementById("canvasCheck");
console.log(canvasCheck);
canvasCheck.appendChild(renderer.domElement);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

var distance = Math.min(70, window.innerWidth / 4);
var geometry = new THREE.Geometry();

for (var i = 0; i < 1600; i++) {
  var vertex = new THREE.Vector3();

  // var theta = THREE.Math.randFloatSpread(360);
  var theta = Math.acos(THREE.Math.randFloatSpread(2));
  var phi = THREE.Math.randFloatSpread(360);

  vertex.x = distance * Math.sin(theta) * Math.cos(phi);
  vertex.y = distance * Math.sin(theta) * Math.sin(phi);
  vertex.z = distance * Math.cos(theta);

  geometry.vertices.push(vertex);
}
var particles = new THREE.Points(
  geometry,
  new THREE.PointsMaterial({ color: 0xfff, size: 2 })
);
particles.boundingSphere = 50;

var renderingParent = new THREE.Group();
renderingParent.add(particles);

var resizeContainer = new THREE.Group();
resizeContainer.add(renderingParent);
scene.add(resizeContainer);

camera.position.z = 400;

var animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
var myTween;
function onMouseMove(event) {
  if (myTween) myTween.kill();
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  myTween = gsap.to(particles.rotation, {
    duration: 0.1,
    x: mouseY * -1,
    y: mouseX,
  });
  //particles.rotation.x = mouseY*-1;
  //particles.rotation.y = mouseX;
}
animate();

// Scaling animation
var animProps = { scale: 1, xRot: 0, yRot: 0 };
gsap.to(animProps, {
  duration: 10,
  scale: 1.3,
  repeat: -1,
  yoyo: true,
  ease: "sine",
  onUpdate: function () {
    renderingParent.scale.set(
      animProps.scale,
      animProps.scale,
      animProps.scale
    );
  },
});

gsap.to(animProps, {
  duration: 120,
  xRot: Math.PI * 2,
  yRot: Math.PI * 4,
  repeat: -1,
  yoyo: true,
  ease: "none",
  onUpdate: function () {
    renderingParent.rotation.set(animProps.xRot, animProps.yRot, 0);
  },
});

// Slider---------------------
var currentImg = undefined,
  currentImgProps = { x: 0, y: 0 },
  isZooming = false,
  column = -1,
  mouse = { x: 0, y: 0 },
  delayedPlay;

for (var i = 0; i < 12; i++) {
  if (i % 4 == 0) column++;

  var b = document.createElement("span");
  $(".mainBoxes").append(b);

  gsap.set(b, {
    attr: { id: "b" + i, class: "photoBox pb-col" + column },
    // backgroundImage:URL('');
    // backgroundImage: 'url(https://assets.codepen.io/721952/' + i + '.jpg)',
    backgroundImage: "url(images/Slider/updatedImages/" + i + ".jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
    x: [60, 280, 500][column],
    width: 400,
    height: 640,
    borderRadius: 20,
    scale: 0.5,
    zIndex: 1,
    border: "1.5px solid rgb(54,47,217)",
  });

  b.tl = gsap
    .timeline({ paused: true, repeat: -1 })
    .fromTo(
      b,
      { y: [-575, 800, 800][column], rotation: -0.05 },
      {
        duration: [40, 35, 26][column],
        y: [800, -575, -575][column],
        rotation: 0.05,
        ease: "none",
      }
    )
    .progress((i % 4) / 4);
}

function pauseBoxes(b) {
  var classStr = "pb-col0";
  if ($(b).hasClass("pb-col1")) classStr = "pb-col1";
  if ($(b).hasClass("pb-col2")) classStr = "pb-col2";
  for (var i = 0; i < $(".mainBoxes").children().length; i++) {
    var b = $(".mainBoxes").children()[i];
    if ($(b).hasClass(classStr)) gsap.to(b.tl, { timeScale: 0, ease: "sine" });
  }
}

function playBoxes() {
  for (var i = 0; i < $(".mainBoxes").children().length; i++) {
    var tl = $(".mainBoxes").children()[i].tl;
    tl.play();
    gsap.to(tl, {
      duration: 0.4,
      timeScale: 1,
      ease: "sine.in",
      overwrite: true,
    });
  }
}

window.onload = function () {
  var _tl = gsap
    .timeline({ onStart: playBoxes })
    .set(".main", { perspective: 800 })
    .set(".photoBox", { opacity: 1, cursor: "pointer" })
    .set(".mainBoxes", {
      left: "75%",
      xPercent: -50,
      width: 1200,
      rotationX: 14,
      rotationY: -23,
      rotationZ: 10,
    })
    .set(".mainClose", {
      autoAlpha: 0,
      width: 60,
      height: 60,
      left: -30,
      top: -31,
      pointerEvents: "none",
    })
    .fromTo(
      ".main",
      { autoAlpha: 0 },
      { duration: 0.6, ease: "power2.inOut", autoAlpha: 1 },
      0.2
    );

  $(".photoBox").on("mouseenter", function (e) {
    console.log($(e.currentTarget).hasClass("pb-col0"));
    if (currentImg) return;
    if (delayedPlay) delayedPlay.kill();
    pauseBoxes(e.currentTarget);
    var _t = e.currentTarget;
    gsap.to(".photoBox", {
      duration: 0.2,
      overwrite: "auto",
      opacity: function (i, t) {
        return t == _t ? 1 : 0.33;
      },
    });
    gsap.fromTo(
      _t,
      { zIndex: 100 },
      { duration: 0.2, scale: 0.62, overwrite: "auto", ease: "power3" }
    );
  });

  $(".photoBox").on("mouseleave", function (e) {
    if (currentImg) return;
    var _t = e.currentTarget;

    if (gsap.getProperty(_t, "scale") > 0.62)
      delayedPlay = gsap.delayedCall(0.3, playBoxes);
    // to avoid jump, add delay when mouseout occurs as big image scales back down (not 100% reliable because the scale value sometimes evaluates too late)
    else playBoxes();

    gsap
      .timeline()
      .set(_t, { zIndex: 1 })
      .to(_t, { duration: 0.3, scale: 0.5, overwrite: "auto", ease: "expo" }, 0)
      .to(".photoBox", { duration: 0.5, opacity: 1, ease: "power2.inOut" }, 0);
  });

  $(".photoBox").on("click", function (e) {
    if (!isZooming) {
      //only tween if photoBox isn't currently zooming

      isZooming = true;
      gsap.delayedCall(0.8, function () {
        isZooming = false;
      });

      if (currentImg) {
        gsap
          .timeline({ defaults: { ease: "expo.inOut" } })
          .to(".mainClose", { duration: 0.1, autoAlpha: 0, overwrite: true }, 0)
          .to(
            ".mainBoxes",
            {
              duration: 0.5,
              scale: 1,
              left: "75%",
              width: 1200,
              rotationX: 14,
              rotationY: -23,
              rotationZ: 10,
              overwrite: true,
            },
            0
          )
          .to(
            ".photoBox",
            { duration: 0.6, opacity: 1, ease: "power4.inOut" },
            0
          )
          .to(
            currentImg,
            {
              duration: 0.6,
              width: 400,
              height: 640,
              borderRadius: 20,
              x: currentImgProps.x,
              y: currentImgProps.y,
              scale: 0.5,
              rotation: 0,
              zIndex: 1,
            },
            0
          );
        // .add(playBoxes, 0.8)
        currentImg = undefined;
      } else {
        pauseBoxes(e.currentTarget);

        currentImg = e.currentTarget;
        currentImgProps.x = gsap.getProperty(currentImg, "x");
        currentImgProps.y = gsap.getProperty(currentImg, "y");

        gsap
          .timeline({ defaults: { duration: 0.6, ease: "expo.inOut" } })
          .set(currentImg, { zIndex: 100 })
          .fromTo(
            ".mainClose",
            { x: mouse.x, y: mouse.y, background: "rgba(0,0,0,0)" },
            { autoAlpha: 1, duration: 0.3, ease: "power3.inOut" },
            0
          )
          .to(".photoBox", { opacity: 0 }, 0)
          .to(
            currentImg,
            {
              width: "100%",
              height: "100%",
              borderRadius: 0,
              x: 0,
              top: 0,
              y: 0,
              scale: 1,
              opacity: 1,
            },
            0
          )
          .to(
            ".mainBoxes",
            {
              duration: 0.5,
              left: "50%",
              width: "100%",
              rotationX: 0,
              rotationY: 0,
              rotationZ: 0,
            },
            0.15
          )
          .to(
            ".mainBoxes",
            { duration: 5, scale: 1.06, rotation: 0.05, ease: "none" },
            0.65
          );
      }
    }
  });

  if (!!("ontouchstart" in window)) {
    console.log("touch device!");
    mouse.x = window.innerWidth - 50;
    mouse.y = 60;
  } else {
    $(".main").on("mousemove", function (e) {
      mouse.x = e.x;
      mouse.y = e.layerY;
      if (currentImg)
        gsap.to(".mainClose", {
          duration: 0.1,
          x: mouse.x,
          y: mouse.y,
          overwrite: "auto",
        });
    });
  }
};

// Search---------------------------------
const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
const input = document.querySelector(".input");

btn.addEventListener("click", () => {
  search.classList.toggle("active");
  input.focus();
});

// ScrollingFunc--------------------------------------
function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
    y = direction * 100;
  if (elem.classList.contains("gs_reveal_fromLeft")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(
    elem,
    { x: x, y: y, autoAlpha: 0 },
    {
      duration: 1.25,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: "expo",
      overwrite: "auto",
    }
  );
}

function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
    hide(elem); // assure that the element is hidden when scrolled into view
    ScrollTrigger.create({
      trigger: elem,
      // markers: true,
      onEnter: function () {
        animateFrom(elem);
      },
      onEnterBack: function () {
        animateFrom(elem, -1);
      },
      onLeave: function () {
        hide(elem);
      }, // assure that the element is hidden when scrolled into view
    });
  });
});
