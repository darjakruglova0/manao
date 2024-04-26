window.addEventListener("DOMContentLoaded", (event) => {
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener("click", function (e) {
      e.preventDefault();
      const id = smoothLink.getAttribute("href");

      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  const swiper = new Swiper(".swiper", {
    slidesPerView: 3,
    spaceBetween: 30,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
      },

      // when window width is >= 640px
      740: {
        slidesPerView: 2,
      },
      940: {
        slidesPerView: 3,
      },
    },
  });

  let burger = document.querySelector(".header__burger");
  let menu = document.querySelector(".header__navigation");
  const menuLinks = document.querySelectorAll(".header__navigation");
  burger.addEventListener("click", function () {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
  });
  menuLinks.forEach((link) =>
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      burger.classList.remove("active");
    })
  );
});
