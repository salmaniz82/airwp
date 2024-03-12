document.addEventListener("DOMContentLoaded", (e) => {
  console.log("content has been loaded herer");

  const cookieWrapper = document.querySelector(".cookies-wrapper");

  const cookieClose = document.querySelector(".cookie-close");

  cookieClose.addEventListener("click", (e) => {
    console.log(e.target);

    cookieWrapper.classList.add("close");
  });

  gsap.registerPlugin(ScrollTrigger);

  const heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#promo-wrapper",
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: true,
      markers: false,
      scrub: true,

      /*
      onLeave: (self) => {
        // Get the final position of the pinned element when pinning is about to end
        const finalTopOffset = self.spacer.getBoundingClientRect().top;
        // Set the pinned element to position: absolute and adjust the top offset
        gsap.set(".promo-wrapper", { position: "absolute", top: finalTopOffset });
      },
      */
    },
  });

  heroTl.to(".peep-wrapper", { scale: 2 });
  heroTl.to(".cities-wrapper", { opacity: 0.5 }, "0");
  heroTl.to("#promo-wrapper .text-wrapper", { opacity: 0 }, "-=0.3");
  heroTl.to(".peep-wrapper", { scale: 4, opacity: 0 });
  heroTl.to(".cities-wrapper", { opacity: 1, zIndex: 2100 }, "-=0.5");

  heroTl.to("#citiesWrapper", { y: "-95%", duration: 1 }, "+=0.5");

  /* INSPIRATION SCROLL 

  .inpiration-pinedItem

  
  
  */

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

  /*
  inpirationTl.to("#loyaltyProgram", { scale: 1 }, "+=1");
  inpirationTl.to("#loyaltyProgram", { scale: 1, duration: 1, ease: "power1.inOut" }, "+=10");
  */

  /*
  inpirationTl.to("#loyaltyProgram", { scale: 1 });
  */

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

  // Add a mouseover event listener to the cities wrapper
  citiesWrapper.addEventListener("mouseover", function (event) {
    // Check if the mouseover event occurred on a city element
    if (event.target.classList.contains("city")) {
      // Get the index of the hovered city
      var index = Array.from(citiesWrapper.children).indexOf(event.target);

      // Output the index (you can use it as needed)
      console.log("Hovered on city with index: " + index);

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
});
