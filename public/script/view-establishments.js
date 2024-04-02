document.addEventListener('DOMContentLoaded', function () {
    const review1Stars = document.querySelectorAll('#review1-rating .star');
    const review2Stars = document.querySelectorAll('#review2-rating .star');
    const reviewStars = document.querySelectorAll('#review3-rating .star');

    function handleStarClick(stars) {
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                // Remove 'checked' class from all stars
                stars.forEach((s, i) => {
                    s.classList.remove('checked');
                    // If the clicked star or any star before it, add 'checked' class
                    if (i <= index) {
                        s.classList.add('checked');
                    }
                });
            });
            // Add hover effect
            star.addEventListener('mouseover', () => {
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('hover');
                    } else {
                        s.classList.remove('hover');
                    }
                });
            });
            // Remove hover effect
            star.addEventListener('mouseout', () => {
                stars.forEach((s, i) => {
                    s.classList.remove('hover');
                });
            });
        });
    }

    // Handle star clicks for each review section
    handleStarClick(review1Stars);
    handleStarClick(review2Stars);
    handleStarClick(review3Stars);

    

});



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

function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdownContent");
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var reviewLink = document.getElementById('view-establishments-link');
    var currentLocation = window.location.href;
    if (currentLocation.includes('/view-establishments')) {
        reviewLink.querySelector('a').classList.add('active-link');
    }
});

