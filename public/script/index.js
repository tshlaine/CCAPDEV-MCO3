var slideIndex = 0;

function replaceContainers() {
  var cafe1Container = document.querySelector(".cafe1container");
  var cafe2Container = document.querySelector(".cafe2container");
  var cafe3Container = document.querySelector(".cafe3container");
  var cafe4Container = document.querySelector(".cafe4container");
  var backSlideButton = document.querySelector(".next-slide");

  var cafe1DisplayStyle = window
    .getComputedStyle(cafe1Container)
    .getPropertyValue("display");

  if (cafe1DisplayStyle === "block") {
    cafe1Container.style.display = "none";
    cafe2Container.style.display = "none";
    cafe3Container.style.display = "none";
    cafe4Container.style.display = "block";
    backSlideButton.src = "images/backdark.png";
  } else {
    cafe1Container.style.display = "block";
    cafe2Container.style.display = "block";
    cafe3Container.style.display = "block";
    cafe4Container.style.display = "none";
    backSlideButton.src = "images/backlight.png";
  }
}

function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdownContent");
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var nextSlideBtn = document.querySelector(".next-slide");

  nextSlideBtn.addEventListener("click", function () {
    replaceContainers();
  });
});

function showSlides() {
  var i;

  slides = document.getElementsByClassName("slide");
  dots = document.getElementsByClassName("dot");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";

  setTimeout(showSlides, 4000);
}

document.addEventListener("DOMContentLoaded", function () {
  showSlides();
});

function plusSlides(position) {
  slideIndex += position;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  } else if (slideIndex < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function currentSlide(index) {
  if (index > slides.length) {
    index = 1;
  } else if (index < 1) {
    index = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[index - 1].style.display = "block";
  dots[index - 1].className += " active";
}

window.addEventListener("scroll", () => {
  const userIcon = document.querySelector(".user-button img");
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 0) {
    userIcon.classList.add("scrolled");
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
    userIcon.classList.remove("scrolled");
  }
});

function scrollToSection() {
  document.getElementById("lowerpanel").scrollIntoView({ behavior: "smooth" });
}

const view = document.getElementById("view");
const popupprelude = document.getElementById("popupprelude");
const closePopupBtnprelude = document.getElementById("closePopupBtnprelude");
const closePopupBtndrip = document.getElementById("closePopupBtnprelude");
const popupdrip = document.getElementById("popupprelude");

function showSummary() {
  const popupprelude = document.getElementById("popupprelude");
  popupprelude.style.display = "block";
}

function closeSummary() {
  const popupprelude = document.getElementById("popupprelude");
  popupprelude.style.display = "none";
}

function showSummarydrip() {
  const popupprelude = document.getElementById("popupdrip");
  popupprelude.style.display = "block";
}

function closeSummarydrip() {
  const popupprelude = document.getElementById("popupdrip");
  popupprelude.style.display = "none";
}

function showSummaryobsecure() {
  const popupprelude = document.getElementById("popupobsecure");
  popupprelude.style.display = "block";
}

function closeSummaryobsecure() {
  const popupprelude = document.getElementById("popupobsecure");
  popupprelude.style.display = "none";
}

function showSummarytomo() {
  const popupprelude = document.getElementById("popuptomo");
  popupprelude.style.display = "block";
}

function closeSummarytomo() {
  const popupprelude = document.getElementById("popuptomo");
  popupprelude.style.display = "none";
}

function showSummarycloudscape() {
  const popupprelude = document.getElementById("popupcloudscape");
  popupprelude.style.display = "block";
}

function closeSummarycloudscape() {
  const popupprelude = document.getElementById("popupcloudscape");
  popupprelude.style.display = "none";
}

function showSummarycloudscape() {
  const popupprelude = document.getElementById("popupcloudscape");
  popupprelude.style.display = "block";
}

function closeSummarysb() {
  const popupprelude = document.getElementById("popupsb");
  popupprelude.style.display = "none";
}

function showSummarysb() {
  const popupprelude = document.getElementById("popupsb");
  popupprelude.style.display = "block";
}

window.addEventListener("click", function (event) {
  if (event.target == popupprelude) {
    popupprelude.style.display = "none";
  }
});

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  var navbar = document.getElementById("navbar");
  var lowerpanel = document.getElementById("lowerpanel");

  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  var threshold = lowerpanel.offsetTop - navbar.offsetHeight;

  if (scrollPosition > threshold) {
    navbar.classList.add("show-search");
  } else {
    navbar.classList.remove("show-search");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var homeLink = document.getElementById("home-link");
  var currentLocation = window.location.href;
  if (currentLocation.includes("/index")) {
    homeLink.querySelector("a").classList.add("active-link");
  }
});

const returnButton = document.getElementById("returnButton");

returnButton.addEventListener("click", function () {
  closeResponse();
});

function closeResponse() {
  console.log("Response closed");
}
