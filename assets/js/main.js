document.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOMContentLoaded");

  setTimeout(() => {
    document.querySelector(".loader-wrapper").classList.add("hidden");
  });

  setTimeout(() => {
    document.body.classList.remove("loading");
  });

  document.querySelector(".burger-icon-wrapper").addEventListener("click", (e) => {
    const mobileMenu = document.getElementById("mobile-menu");

    mobileMenu.classList.toggle("active");

    e.preventDefault();
  });

  const cookieWrapper = document.querySelector(".cookies-wrapper");

  const cookieClose = document.querySelector(".cookie-close");

  cookieClose.addEventListener("click", (e) => {
    console.log(e.target);

    cookieWrapper.classList.add("close");
  });

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#promo-wrapper",
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: true,
      markers: false,
      scrub: true,
    },
  });

  const logoImgs = document.querySelectorAll(".header-flex-container .left-menu .logo img");

  heroTl.to(".peep-wrapper", { scale: 2 });
  heroTl.to(".cities-wrapper", { opacity: 0.5 }, "0");
  heroTl.to("#promo-wrapper .text-wrapper", { opacity: 0 }, "-=0.3");
  heroTl.to(".peep-wrapper", {
    scale: 4,
    opacity: 0,
    onStart: function () {
      console.log("start of timeline");
      logoImgs[0].classList.add("show");
      logoImgs[1].classList.remove("show");
      logoImgs[2].classList.remove("show");
    },
    onComplete: function () {
      console.log("this done on timeline");
      logoImgs[0].classList.remove("show");
      logoImgs[1].classList.remove("show");
      logoImgs[2].classList.add("show");
    },
  });
  heroTl.to(".cities-wrapper", { opacity: 1, zIndex: 2100 }, "-=0.5");
  heroTl.addLabel("heroRevealed"); // Label the midway point
  heroTl.to("#citiesWrapper", { y: "-95%", duration: 1 }, "+=0.5");

  const revealHeroButton = document.querySelector(".start-journey-button");

  revealHeroButton.addEventListener("click", (e) => {
    e.preventDefault();

    /*
    heroTl.seek("heroRevealed");
    */

    console.log(heroTl.labels["heroRevealed"]);

    const revealTime = heroTl.labels["heroRevealed"];

    // Calculate scroll position based on ScrollTrigger and label position
    // (Replace with your specific logic based on ScrollTrigger setup)
    const trigger = heroTl.scrollTrigger; // Access your ScrollTrigger instance
    const start = trigger.start;
    const end = trigger.end;
    const labelProgress = revealTime / heroTl.totalDuration();
    const scrollPos = start + (end - start) * labelProgress;

    console.log(scrollPos);
    /*
    gsap.to(window, { duration: 0.5, scrollTo: scrollPos });
    */
    gsap.to(window, { duration: 0.3, scrollTo: { y: scrollPos, autoKill: true } });
  });

  if (window.innerWidth >= 768) {
    console.log("animation activated for larger devices");

    const inpirationTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#inspiration-pinItem",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        markers: false,
        scrub: true,
      },
    });

    inpirationTl.fromTo("#inspirations-wrapper .slider-wrapper", { x: "0" }, { x: "-200%", duration: 3 });

    inpirationTl.fromTo("#planeWrapper", { y: "0" }, { y: "-150%", duration: 2 });
    inpirationTl.to("#planeWrapper #overlay", { opacity: 0.5, display: "flex" }, "+=1");
    inpirationTl.to("#planeWrapper #overlay", { opacity: 1, display: "flex" });

    const loyaltyTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#loyaltyProgram",
        start: "top bottom",
        end: "bottom center",
        pin: false,
        pinSpacing: true,
        markers: false,
        scrub: true,
        onUpdate: ({ progress }) => {
          var myScrollProgress = progress.toFixed(2) * 100;
          let planeAnimateIcon = document.querySelector(".plane-icon");

          if (myScrollProgress < 90) {
            planeAnimateIcon.classList.remove("planeAnimation");
          }

          if (myScrollProgress > 90) {
            planeAnimateIcon.classList.add("planeAnimation");
          }
        },
      },
    });
    loyaltyTl.to("#loyaltyProgram", { scale: 1 });
  }

  const careerTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#career .inner-container",
      start: "top +=200",
      end: "top  +=400",
      pin: false,
      pinSpacing: true,
      markers: false,
      scrub: true,
    },
  });
  careerTL.to(".career-wrapper .text-wrapper", { opacity: 0, position: "sticky", zIndex: "-1" });

  const mediaTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#media",
      start: "top center",
      end: "top  +=400",
      pin: false,
      pinSpacing: true,
      markers: false,
      scrub: false,
    },
  });

  mediaTL.staggerTo(
    "#media .media-items-wrapper a",
    1, // duration
    {
      y: 0,
      opacity: 1,
      ease: "power2.out", // choose an easing function
    },
    0.2 // stagger amount in seconds
  );

  var citiesWrapper = document.getElementById("citiesWrapper");

  citiesWrapper.addEventListener("mouseover", function (event) {
    if (event.target.classList.contains("city")) {
      var index = Array.from(citiesWrapper.children).indexOf(event.target);

      let cityVideos = document.querySelectorAll(".city-video");

      let targetIndex = parseInt(index) + 1;

      cityVideos[targetIndex].classList.add("z-index");

      // Remove the "z-index" class from all other videos
      for (var i = 0; i < cityVideos.length; i++) {
        if (i !== targetIndex) {
          cityVideos[i].classList.remove("z-index");
        }
      }

      playVideo(cityVideos[targetIndex]);

      // Pause all other videos
      pauseOtherVideos(cityVideos, targetIndex);
    }
  });

  function playVideo(cityContainer) {
    var videoElement = cityContainer.querySelector("video");
    if (videoElement && typeof videoElement.play === "function") {
      videoElement.play();
    }
  }

  function pauseOtherVideos(cityVideos, currentIndex) {
    for (var i = 0; i < cityVideos.length; i++) {
      if (i !== currentIndex) {
        var otherVideoElement = cityVideos[i].querySelector("video");
        if (otherVideoElement && typeof otherVideoElement.pause === "function") {
          otherVideoElement.pause();
        }
      }
    }
  }

  let faqList = document.querySelector(".faqs-list");

  faqList.addEventListener("click", (e) => {
    closeNonActiveFaqs();

    if (e.target.classList.contains("item-question")) {
      console.log("clicked on question");
      let answer = e.target.closest(".faq-item").querySelector(".item-answer");

      if (e.target.closest(".faq-item").classList.contains("open")) {
        console.log("already opened");
        e.target.closest(".faq-item").classList.remove("open");
        e.target.closest(".faq-item").classList.add("closed");

        answer.classList.remove("open");
        answer.classList.add("closed");
      } else {
        console.log("close item deted");
        answer.classList.remove("closed");
        answer.classList.add("open");
        e.target.closest(".faq-item").classList.add("open");
        e.target.closest(".faq-item").classList.remove("closed");
      }
      e.target.closest(".faq-item").classList.add("clicked");
    }
  });

  function closeNonActiveFaqs() {
    const faqItems = document.querySelectorAll(".faq-item");

    // Remove the class .open from each selected element
    faqItems.forEach((faqItem) => {
      faqItem.classList.remove("clicked");
      faqItem.classList.remove("open");
      faqItem.classList.add("closed");

      let faqItemAnswer = faqItem.querySelector(".item-answer");

      faqItemAnswer.classList.remove("open");
      faqItemAnswer.classList.add("close");
    });
  }

  const menuLinkItems = document.querySelectorAll(".menu-item a");

  menuLinkItems.forEach((menuItem, index) => {
    console.log(menuItem, index);

    menuItem.addEventListener("click", (e) => {
      e.preventDefault();

      let linkHref = e.target.getAttribute("href");

      if (linkHref.includes("#")) {
        const scrollDivId = linkHref.replace(/^\/(.*)/, "$1"); // Removes the leading slash

        if (document.querySelector(scrollDivId)) {
          gsap.to(window, { duration: 1, scrollTo: { y: scrollDivId.toString(), offsetY: 0 } });
        }
      }
    });
  });
});
