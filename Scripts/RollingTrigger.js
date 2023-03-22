gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray("img");

const loader = document.querySelector(".loader--text");
const updateProgress = (instance) =>
  (loader.textContent = `${Math.round(
    (instance.progressedCount * 100) / images.length
  )}%`);

const showDemo = () => {
  const LayoutFooter = document.getElementsByClassName("LayoutFooter")[0];
  console.log(LayoutFooter);
  LayoutFooter.style.overflow = "auto";
  document.scrollingElement.scrollTo(0, 0);
  gsap.to(document.querySelector(".loader"), { autoAlpha: 0 });
  gsap.utils.toArray("main").forEach((section, index) => {
    const w = section.querySelector(".wrapperSlider");
    console.log(w);
    const [x, xEnd] =
      index % 2
        ? ["100%", (w.scrollWidth - section.offsetWidth) * -1]
        : [w.scrollWidth * -1, 0];
    console.log(x, xEnd);
    gsap.fromTo(
      w,
      { x },
      {
        x: xEnd,
        scrollTrigger: {
          trigger: section,
          scrub: 0.2,
        },
      }
    );
  });
};

imagesLoaded(images).on("progress", updateProgress).on("always", showDemo);
