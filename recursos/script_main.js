const $nav = document.querySelector(".nav"),
  $scrollBtn = document.getElementById("scroll-top"),
  $navItems = document.querySelectorAll(".nav__botones li");

const mostrarMenu = () => {
  $nav.classList.toggle("nav-active");
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0
  })
}

document.addEventListener("DOMContentLoaded",() => {
  $navItems.forEach(item => {
    item.addEventListener("click",() => {
      $nav.classList.remove("nav-active")
    })
  })
})

document.addEventListener("click",e => {
  if(e.target.matches(".hamburgerSvg") || e.target.matches(".hamburger") || e.target.matches(".hamburgerSvg line")) mostrarMenu(); 


  if(e.target.matches("#scroll-top svg") || e.target.matches("#scroll-top svg line")) scrollToTop();
})

/* FORMULARIO */

const $form = document.querySelector(".contact__form"),
  $formResponse = document.querySelector(".contact-response-container"),
  $formResponseMsg = document.querySelector(".contact-response-msg");

$form.addEventListener("submit",(e) => {
  e.preventDefault();

  fetch("https://formsubmit.co/ajax/donimen1@gmail.com",{
    method: "POST",
    body: new FormData(e.target)
  })
  .then(respuesta => {
    if(respuesta.ok){
      respuesta.json;
    }else{
      Promise.reject(respuesta);
    }
  })
  .then(json => {
    console.log(json);
    /* Hacer otras cosas */
    $formResponseMsg.textContent = "Mensaje enviado!";
    $formResponse.style.display = "flex";
    $form.reset();
  })
  .catch(err => {
    console.log(err);
    /* Imprimir mensaje de error */
    $formResponseMsg.textContent = "Ocurrió un error :(";
    $formResponse.style.display = "flex";
  })
  .finally(() => {
    /* Se completo el proceso del formulario */
    setTimeout(() => {
      $formResponseMsg.textContent = "Nada nuevo";
      $formResponse.style.display = "none";
    },3000)
  })
})