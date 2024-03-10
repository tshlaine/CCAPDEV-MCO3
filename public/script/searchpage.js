function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdownContent");
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
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
