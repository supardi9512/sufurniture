/* MENU SHOW */ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}

showMenu('nav-toggle','nav-menu')

/* ACTIVE AND REMOVE MENU */
const navLink = document.querySelectorAll('.nav-link'); 
const navButton = document.querySelectorAll('.nav-button');  

function linkAction(){
  navLink.forEach(n => n.classList.remove('active'));
  navButton.forEach(n => n.classList.remove('active'));
  this.classList.add('active');
  
  const navMenu = document.getElementById('nav-menu')
  navMenu.classList.remove('show')
}

navLink.forEach(n => n.addEventListener('click', linkAction));
navButton.forEach(n => n.addEventListener('click', linkAction));

// SCROLL ANIMATION

const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
});

sr.reveal('.home',{}); 
sr.reveal('.home-title',{delay: 200}); 
sr.reveal('.home-button',{delay: 400}); 

sr.reveal('.prev',{delay: 400}); 
sr.reveal('.next',{delay: 400}); 

sr.reveal('.about-img',{}); 
sr.reveal('.about-subtitle',{delay: 400}); 
sr.reveal('.about-text',{delay: 400}); 

sr.reveal('.product-content',{interval: 200}); 
sr.reveal('.all-product-button',{interval: 400}); 

sr.reveal('.blog-content',{interval: 200}); 
sr.reveal('.all-blog-button',{interval: 400}); 

sr.reveal('.contact-input',{interval: 200}); 
sr.reveal('.contact-button',{interval: 400});

class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if(this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 50;

    if(this.isDeleting) {
      typeSpeed /= 2;
    }

    if(!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 50;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}
  
document.addEventListener('DOMContentLoaded', init);

function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  new TypeWriter(txtElement, words, wait);
}

// SLIDER

const slides = document.querySelector('.slider').children;
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let index = 0;

prev.addEventListener('click', function() {
  prevSlide()
})

next.addEventListener('click', function() {
  nextSlide()
})

function prevSlide() {
  if(index == 0) {
    index = slides.length - 1;
  } else {
    index--;
  }

  changeSlide();
}

function nextSlide() {
  if(index == slides.length - 1) {
    index = 0;
  } else {
    index++;
  }

  changeSlide();
}

function changeSlide() {
  for(let i=0; i<slides.length; i++) {
    slides[i].classList.remove('active');
  }
  slides[index].classList.add('active');
}

// TOOLTIP

const tooltips = document.querySelectorAll(".all-tooltip .tooltip");
const fullDiv = document.querySelector(".design");
const container = document.querySelector(".slide");
let timeoutId;
window.addEventListener("resize", contentPosition);
window.addEventListener("DOMContentLoaded", contentPosition);

function contentPosition() {
  tooltips.forEach((tooltip) => {
    const pin = tooltip.querySelector(".pin");
    const content = tooltip.querySelector(".tooltip-content");
    const arrow = tooltip.querySelector(".arrow");
    const pinLeft = pin.offsetLeft;
    if (pinLeft + content.offsetWidth / 2 > fullDiv.offsetWidth) {
      const extraLeft =
        fullDiv.offsetWidth - (pinLeft + content.offsetWidth / 2);
      content.style.left =
        pinLeft - content.offsetWidth / 2 + extraLeft - 30 + "px";
      content.style.top = pin.offsetTop + 30 + "px";
    } else if (
      pin.offsetLeft + container.offsetLeft <
      content.offsetWidth / 2
    ) {
      content.style.left = -container.offsetLeft + "px";
      content.style.top = pin.offsetTop + 30 + "px";
    } else {
      content.style.left = pinLeft - content.offsetWidth / 2 + "px";
      content.style.top = pin.offsetTop + 30 + "px";
    }
    arrow.style.left =
      pinLeft - content.offsetLeft + pin.offsetWidth / 2 + "px";
  });
}

tooltips.forEach((tooltip) => {
  const pin = tooltip.querySelector(".pin");
  const content = tooltip.querySelector(".tooltip-content");
  pin.addEventListener("click", () => {
    tooltip.classList.add("active");
  });
  pin.addEventListener("mouseleave", () => {
    timeoutId = setTimeout(() => {
      tooltip.classList.remove("active");
    }, 1000);
  });
  content.addEventListener("mouseover", () => {
    clearTimeout(timeoutId);
    tooltip.classList.add("active");
  });
  content.addEventListener("mouseleave", () => {
    timeoutId = setTimeout(() => {
      tooltip.classList.remove("active");
    }, 1000);
  });
});
