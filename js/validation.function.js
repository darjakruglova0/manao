(function () {
  "use strict";
  const input = document.querySelectorAll(".input");
  const check = document.querySelectorAll(".check");
  let modal = document.querySelector(".modal");

  const message = {
    success: "Спасибо! Наш менеджер свяжется с Вами в ближайщее время ",
    failure: "Что-то пошло не так...",
  };
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

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
          <div class="modal__content">
          <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 40.375C23.11 40.375 25.6945 39.8609 28.1058 38.8621C30.5172 37.8633 32.7082 36.3993 34.5537 34.5537C36.3993 32.7082 37.8633 30.5172 38.8621 28.1058C39.8609 25.6945 40.375 23.11 40.375 20.5C40.375 17.89 39.8609 15.3055 38.8621 12.8942C37.8633 10.4828 36.3993 8.29182 34.5537 6.44625C32.7082 4.60069 30.5172 3.13671 28.1058 2.13789C25.6945 1.13908 23.11 0.625 20.5 0.625C15.2288 0.625 10.1735 2.71897 6.44625 6.44625C2.71897 10.1735 0.625 15.2288 0.625 20.5C0.625 25.7712 2.71897 30.8265 6.44625 34.5537C10.1735 38.281 15.2288 40.375 20.5 40.375ZM19.9877 28.5383L31.0293 15.2883L27.6373 12.4617L18.1415 23.8545L13.228 18.9387L10.1054 22.0613L16.7304 28.6863L18.4396 30.3955L19.9877 28.5383Z" fill="#4C0F75" />
        </svg> <div class="modal__title">${message}</div>
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
  class Form {
    // паттерны RegExp о которых было написано выше
    static patternName = /^[а-яёА-ЯЁ\s]+$/;
    static patternMail =
      /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;
    //static patternTel = /^\+375(\s+)?\(?(17|25|29|33|44)\)?(\s+)?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$/;

    // массив с сообщениями об ошибке
    // эти сообщения можно разместить и внутри кода валидации, но лучше,
    // если они будут находиться в одном месте
    // это облегчит их редактирование, а так же проще будет прописать новые,
    // если решите добавить критерии валидации
    static errorMess = [
      "Незаполненное поле ввода", // 0
      "Введите Ваше реальное имя", // 1
      "Укажите Вашу электронную почту", // 2
      "Неверный формат электронной почты", // 3
      "Напишите текст сообщения", // 4
      //'Неверный телефон', // 4
    ];

    constructor(form) {
      this.form = form;
      // коллекция полей формы из которой мы будем извлекать данные
      this.fields = this.form.querySelectorAll(".form-control");
      // объект кнопки, на который повесим обработчик события начала валидации формы
      // и отправки её значений на сервер
      this.btn = this.form.querySelector("[type=submit]");
      // флаг ошибки валидации
      this.iserror = false;
      // регистрируем обработчики событий
      this.registerEventsHandler();
    }

    static getElement(el) {
      // получение элемента, в который будет выводиться
      // текст ошибки
      return el.parentElement.nextElementSibling;
    }

    registerEventsHandler() {
      // запуск валидации при отправке формы
      this.btn.addEventListener("click", this.validForm.bind(this));
      // очистка ошибок при фокусе поля ввода
      this.form.addEventListener(
        "focus",
        () => {
          // находим активный элемент формы
          const el = document.activeElement;
          // если этот элемент не <button type="submit">,
          // вызываем функцию очистки <span class="error"> от текста ошибки
          if (el === this.btn) return;
          this.cleanError(el);
        },
        true
      );
      // запуск валидации поля ввода при потере им фокуса
      for (let field of this.fields) {
        field.addEventListener("blur", this.validBlurField.bind(this));
      }
    }

    validForm(e) {
      // отменяем действие браузера по умолчания при клике по
      // кнопке формы <button type="submit">, чтобы не происходило обновление страницы
      e.preventDefault();
      // объект представляющий данные HTML формы
      const formData = new FormData(this.form);
      // объявим переменную error, в которую будем записывать текст ошибки
      let error;

      // перебираем свойства объекта с данными формы
      for (let property of formData.keys()) {
        // вызываем функцию, которая будет сравнивать
        // значение свойства с паттерном RegExp и возвращать результат
        // сравнения в виде пустой строки или текста ошибки валидации
        error = this.getError(formData, property);
        if (error.length == 0) continue;
        // устанавливаем флаг наличия ошибки валидации
        this.iserror = true;
        // выводим сообщение об ошибке
        this.showError(property, error);
      }

      if (this.iserror) return;
      // вызываем функцию отправляющую данные формы,
      // хранящиеся в объекте formData, на сервер
      this.sendFormData(formData);
    }

    validBlurField(e) {
      const target = e.target;
      // имя поля ввода потерявшего фокус
      const property = target.getAttribute("name");
      // значение поля ввода
      const value = target.value;

      // создаём пустой объект и записываем в него
      // данные в формате 'имя_поля': 'значение', полученные
      // от поля ввода потерявшего фокус
      const formData = new FormData();
      formData.append(property, value);

      // запускаем валидацию поля ввода потерявшего фокус
      const error = this.getError(formData, property);
      if (error.length == 0) return;
      // выводим текст ошибки
      this.showError(property, error);
    }

    getError(formData, property) {
      let error = "";
      // создаём литеральный объект validate
      // каждому свойству литерального объекта соответствует анонимная функция, в которой
      // длина значения поля, у которого атрибут 'name' равен 'property', сравнивается с 0,
      // а само значение - с соответствующим паттерном
      // если сравнение истинно, то переменной error присваивается текст ошибки
      const validate = {
        username: () => {
          if (
            formData.get("username").length == 0 ||
            Form.patternName.test(formData.get("username")) == false
          ) {
            error = Form.errorMess[1];
          }
        },
        usermail: () => {
          if (formData.get("usermail").length == 0) {
            error = Form.errorMess[0];
          } else if (Form.patternMail.test(formData.get("usermail")) == false) {
            error = Form.errorMess[3];
          }
        },

        // userphone: () => {
        // 	if (formData.get('userphone').length == 0) {
        // 		error = Form.errorMess[0];
        // 	} else if (Form.patternTel.test(formData.get('userphone')) == false) {
        // 		error = Form.errorMess[4];
        // 	}
        // },

        textmess: () => {
          if (formData.get("textmess").length == 0) {
            error = Form.errorMess[4];
          }
        },
      };

      if (property in validate) {
        // если после вызова анонимной функции validate[property]() переменной error
        // было присвоено какое-то значение, то это значение и возвращаем,
        // в противном случае значение error не изменится
        validate[property]();
      }
      return error;
    }

    showError(property, error) {
      // получаем объект элемента, в который введены ошибочные данные
      const el = this.form.querySelector(`[name=${property}]`);
      // с помощью DOM-навигации находим <span>, в который запишем текст ошибки
      const errorBox = Form.getElement(el);

      el.classList.add("form-control_error");
      // записываем текст ошибки в <span>
      errorBox.innerHTML = error;
      // делаем текст ошибки видимым
      errorBox.style.display = "block";
    }

    cleanError(el) {
      // с помощью DOM-навигации находим <span>, в который записан текст ошибки
      const errorBox = Form.getElement(el);
      el.classList.remove("form-control_error");
      errorBox.removeAttribute("style");
      this.iserror = false;
    }

    sendFormData(formData) {
      let xhr = new XMLHttpRequest();

      input.forEach((item) => {
        console.log(item.value);
      });
      for (var index = 0; index < check.length; index++) {
        if (check[index].checked) {
          console.log(check[index].value);
        }
      }
      showThanksModal(message.success);
      form.reset();
      // указываем метод передачи данных, адрес php-скрипта, который эти данные
      // будет обрабатывать и способ отправки данных.
      // значение 'true' соответствует асинхронному запросу
      xhr.open("POST", "/server.php", true);
      // xhr.onreadystatechange содержит обработчик события,
      // вызываемый когда происходит событие readystatechange
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // здесь расположен код вашей callback-функции
            // например, она может выводить сообщение об успешной отправке письма
          } else {
            // здесь расположен код вашей callback-функции
            // например, она может выводить сообщение об ошибке
          }
        } else {
          // здесь расположен код вашей callback-функции
          // например, она может выводить сообщение об ошибке
        }
      };
      // отправляем данные формы
      xhr.send(formData);
    }
  }

  // коллекция всех HTML форм на странице
  const forms = document.querySelectorAll("[name=feedback]");
  // если формы на странице отсутствуют, то прекращаем работу функции
  if (!forms) return;
  // перебираем полученную коллекцию элементов
  for (let form of forms) {
    // создаём экземпляр формы
    const f = new Form(form);
  }
})();
