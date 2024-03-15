
var slideIndex = 0;

function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdownContent");
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
    }
}



function togglePopup() {
    var popup = document.getElementById("popup-create");
    if (popup.style.display === "none") {
        popup.style.display = "block";
    } else {
        popup.style.display = "none";
    }
}
function changeColor(button) {
    if (button.classList.contains('clicked')) {
        // If the button is already clicked, revert the colors
        button.style.backgroundColor = '#d1ae8d'; // Revert to the default background color
        button.style.borderColor = '#d1ae8d'; // Revert to the default border color
        button.style.color = 'white'; // Revert to the default text color
        button.classList.remove('clicked'); // Remove the 'clicked' class
    } else {
        // If the button is not clicked, apply the new colors
        button.style.backgroundColor = '#F4E4C9';
        button.style.borderColor = '#4D2D18';
        button.style.color = '#000'; // Change color to black or any other valid color value
        button.classList.add('clicked'); // Add the 'clicked' class
    }
}

function openModal() {
    var modal = document.getElementById("myModal");
    var img = document.getElementById("image");
    var modalImg = document.getElementById("modal-image");
    modal.style.display = "block";
    modalImg.src = img.src;
  }
  
  function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }  


function toggleDropdown2() {
    var dropdownContent2 = document.getElementById("dropdownContent2");
    if (dropdownContent2.style.display === "block") {
        dropdownContent2.style.display = "none";
    } else {
        dropdownContent2.style.display = "block";
    }
}

window.addEventListener('scroll', () => {
    const userIcon = document.querySelector('.user-button img');
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 0) {
        userIcon.classList.add('scrolled');
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
        userIcon.classList.remove('scrolled');
    }
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

    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    
    setTimeout(showSlides, 4000); 
}

document.addEventListener("DOMContentLoaded", function() {
   
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
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
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
    slides[index-1].style.display = "block";  
    dots[index-1].className += " active";
}




