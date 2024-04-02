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

document.addEventListener("DOMContentLoaded", function() {
    // Get all review boxes
    var reviewBoxes = document.querySelectorAll('.review-box');

    // Loop through each review box
    reviewBoxes.forEach(function(box) {
        // Get the average rating value for this review box
        var averageRating = Math.round(parseFloat(box.querySelector('.ratings #averageRatingValue').textContent));

        // Get all the stars within this review box
        var stars = box.querySelectorAll('.star');

        // Add active class to stars based on average rating
        for (var i = stars.length - 1; i >= 0; i--) {
            if (averageRating > 0) {
                stars[i].classList.add('active');
                averageRating--;
            } else {
                break;
            }
        }
    });
});
