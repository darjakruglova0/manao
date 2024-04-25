window.addEventListener("DOMContentLoaded", (event) => {
  let modal = document.querySelector(".modal");

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


  // Modal

  const modalTrigger = document.querySelectorAll("[data-modal]");
  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });
  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const form = document.querySelector(".form");
  const input = document.querySelectorAll(".input");

  const text = document.querySelector(".textarea");
  const check = document.querySelectorAll(".check");

  const message = {
    success: "Спасибо! Наш менеджер свяжется с Вами в ближайщее время ",
    failure: "Что-то пошло не так...",
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    input.forEach((item) => {
      console.log(item.value);
    });
    for (var index = 0; index < check.length; index++) {
      if (check[index].checked) {
        console.log(check[index].value);
      }
    }
    const mail = document.querySelector(".mail");
    const name = document.querySelector(".name");
    const err_name = document.querySelector(".input__error-name");
    const err_mail = document.querySelector(".input__error-mail");

    if (name.value === "") {
      err_name.textContent = "Вы не ввели ничего";
      return;
    } else {
      showThanksModal(message.success);
    }
    //showThanksModal(message.success);
    form.reset();

    // const request = new XMLHttpRequest();
    // request.open('POST', 'server.php');
    // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    //const formData = new FormData(form);

    // const object = {};
    //formData.forEach(function(value, key){
    //object[key] = value;
    // });
    // const json = JSON.stringify(object);

    // request.send(json);

    // request.addEventListener('load', () => {
    //     if (request.status === 200) {
    //         console.log(request.response);
    //         showThanksModal(message.success);
    //         statusMessage.remove();
    //         form.reset();
    //     } else {
    //         showThanksModal(message.failure);
    //     }
    // });
  });

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
          <div class="modal__content">
          <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_3616_2)">
    <path d="M49.4751 20.8289C48.5458 19.8591 47.5855 18.8583 47.1995 17.9266C46.8421 17.0617 46.823 15.7821 46.8016 14.4287C46.7682 12.1936 46.7301 9.66305 45.0335 7.96648C43.337 6.26992 40.7969 6.2318 38.5713 6.19844C37.2179 6.17699 35.9502 6.15793 35.0734 5.80051C34.1417 5.41449 33.1409 4.45422 32.1711 3.52492C30.5889 2.00945 28.797 0.289062 26.5 0.289062C24.203 0.289062 22.4111 2.00945 20.8289 3.52492C19.8591 4.45422 18.8583 5.41449 17.9266 5.80051C17.0617 6.15793 15.7821 6.17699 14.4287 6.19844C12.1936 6.2318 9.66305 6.26992 7.96648 7.96648C6.26992 9.66305 6.2318 12.2031 6.19844 14.4287C6.17699 15.7821 6.15793 17.0498 5.80051 17.9266C5.41449 18.8583 4.45422 19.8591 3.52492 20.8289C2.00945 22.4111 0.289062 24.203 0.289062 26.5C0.289062 28.797 2.00945 30.5889 3.52492 32.1711C4.45422 33.1409 5.41449 34.1417 5.80051 35.0734C6.15793 35.9383 6.17699 37.2179 6.19844 38.5713C6.2318 40.8064 6.26992 43.337 7.96648 45.0335C9.66305 46.7301 12.2031 46.7682 14.4287 46.8016C15.7821 46.823 17.0498 46.8421 17.9266 47.1995C18.8583 47.5855 19.8591 48.5458 20.8289 49.4751C22.4111 50.9905 24.203 52.7109 26.5 52.7109C28.797 52.7109 30.5889 50.9905 32.1711 49.4751C33.1409 48.5458 34.1417 47.5855 35.0734 47.1995C35.9383 46.8421 37.2179 46.823 38.5713 46.8016C40.8064 46.7682 43.337 46.7301 45.0335 45.0335C46.7301 43.337 46.7682 40.8064 46.8016 38.5713C46.823 37.2179 46.8421 35.9502 47.1995 35.0734C47.5855 34.1417 48.5458 33.1409 49.4751 32.1711C50.9905 30.5889 52.7109 28.797 52.7109 26.5C52.7109 24.203 50.9905 22.4111 49.4751 20.8289ZM47.4116 30.1934C46.2988 31.3514 45.1479 32.5523 44.5522 33.982C43.9851 35.3498 43.9612 36.9653 43.9374 38.5284C43.9112 40.3012 43.8826 42.136 43.0081 43.0129C42.1336 43.8898 40.2965 43.916 38.5237 43.9422C36.9605 43.966 35.345 43.9898 33.9773 44.557C32.5476 45.1479 31.3562 46.2988 30.1862 47.4163C28.9352 48.6077 27.6414 49.8563 26.4952 49.8563C25.3491 49.8563 24.0552 48.6149 22.8019 47.4163C21.6438 46.3036 20.4429 45.1527 19.0132 44.557C17.6455 43.9898 16.0299 43.966 14.4668 43.9422C12.694 43.916 10.8592 43.8874 9.98234 43.0129C9.10547 42.1384 9.07926 40.3012 9.05305 38.5284C9.02922 36.9653 9.00539 35.3498 8.43828 33.982C7.84734 32.5523 6.69645 31.3609 5.57891 30.191C4.38988 28.94 3.14844 27.6461 3.14844 26.5C3.14844 25.3539 4.38988 24.06 5.58844 22.8066C6.70121 21.6486 7.85211 20.4477 8.44781 19.018C9.01492 17.6502 9.03875 16.0347 9.06258 14.4716C9.08879 12.6987 9.11738 10.864 9.99188 9.98711C10.8664 9.11023 12.7035 9.08402 14.4763 9.05781C16.0395 9.03398 17.655 9.01016 19.0227 8.44305C20.4524 7.85211 21.6438 6.70121 22.8138 5.58367C24.06 4.38988 25.3539 3.14844 26.5 3.14844C27.6461 3.14844 28.94 4.38988 30.1934 5.58844C31.3514 6.70121 32.5523 7.85211 33.982 8.44781C35.3498 9.01492 36.9653 9.03875 38.5284 9.06258C40.3012 9.08879 42.136 9.11738 43.0129 9.99188C43.8898 10.8664 43.916 12.7035 43.9422 14.4763C43.966 16.0395 43.9898 17.655 44.557 19.0227C45.1479 20.4524 46.2988 21.6438 47.4163 22.8138C48.6077 24.0648 49.8563 25.3586 49.8563 26.5048C49.8563 27.6509 48.6101 28.94 47.4116 30.1934ZM37.0416 19.7709C37.3093 20.039 37.4597 20.4024 37.4597 20.7812C37.4597 21.1601 37.3093 21.5235 37.0416 21.7916L23.6978 35.1353C23.4297 35.403 23.0664 35.5534 22.6875 35.5534C22.3086 35.5534 21.9453 35.403 21.6772 35.1353L15.9584 29.4166C15.7059 29.1455 15.5684 28.7871 15.5749 28.4167C15.5815 28.0463 15.7315 27.6929 15.9935 27.431C16.2554 27.169 16.6088 27.019 16.9792 27.0124C17.3496 27.0059 17.708 27.1434 17.9791 27.3959L22.6875 32.102L35.0209 19.7709C35.289 19.5032 35.6524 19.3528 36.0312 19.3528C36.4101 19.3528 36.7735 19.5032 37.0416 19.7709Z" fill="white" />
  </g>
  <defs>
    <clipPath id="clip0_3616_2">
      <rect width="53" height="53" fill="white" />
    </clipPath>
  </defs>
</svg>
         
              <div class="modal__title">${message}</div>
          </div>
      `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

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

const form = document.forms["form"];
const formArr = Array.from(form);
const validFormArr = [];
const button = form.elements["button"];

formArr.forEach((el) => {
  if (el.hasAttribute("data-reg")) {
    el.setAttribute("is-valid", "0");
    validFormArr.push(el);
  }
});

form.addEventListener("input", inputHandler);
button.addEventListener("click", buttonHandler);

function inputHandler({ target }) {
  if (target.hasAttribute("data-reg")) {
    inputCheck(target);
  }
}

function inputCheck(el) {
  const inputValue = el.value;
  const inputReg = el.getAttribute("data-reg");
  const reg = new RegExp(inputReg);
  if (reg.test(inputValue)) {
    el.setAttribute("is-valid", "1");
    el.style.border = "2px solid rgb(0, 196, 0)";
  } else {
    el.setAttribute("is-valid", "0");
    el.style.border = "2px solid rgb(255, 0, 0)";
  }
}

function buttonHandler(e) {
  const allValid = [];
  validFormArr.forEach((el) => {
    allValid.push(el.getAttribute("is-valid"));
  });
  const isAllValid = allValid.reduce((acc, current) => {
    return acc && current;
  });

  if (!Boolean(Number(isAllValid))) {
    e.preventDefault();
  }
}
