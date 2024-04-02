
var slideIndex = 0;

function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdownContent");
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
    }
}


function editReview() {
    const newBody = document.getElementById('edit-review-title').value.trim();
    const newTitle = document.getElementById('edit-review').value.trim();
    const thisReview = document.getElementById('thisReview').value.trim();
    const rating = getSelectedRating();

    // Check if username, first name, and last name are empty
    if (newTitle === '' || newBody === '') {
        alert('Fields are required.');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const inf_id = urlParams.get('inf_id');
    const name = urlParams.get('name');
    const location = urlParams.get('location');
    const location_link = urlParams.get('location_link');
    const category1 = urlParams.get('category1');
    const category2 = urlParams.get('category2');
    const description = urlParams.get('description');
    const averageRating = urlParams.get('averageRating');
    const slideImages1 = urlParams.get('slideImages1');
    const slideImages2 = urlParams.get('slideImages2');
    const slideImages3 = urlParams.get('slideImages3');
    const username = urlParams.get('username');

    // Send updated user information to the server
    fetch('/update-review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newTitle: newTitle,
            newBody: newBody,
            thisReview: thisReview,
            rating : rating,
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Review updated successfully.');
            const redirectURL = `/reviewpage?inf_id=${inf_id}&name=${name}&location=${location}&location_link=${location_link}&category1=${category1}&category2=${category2}&description=${description}&averageRating=${averageRating}&slideImages1=${slideImages1}&slideImages2=${slideImages2}&slideImages3=${slideImages3}&username=${username}`;
            window.location.href = redirectURL;
        } else {
            throw new Error('Failed to update review.');
        }
    })
    .catch(error => {
        console.error('Error updating review:', error);
        alert('An error occurred while updating review. Please try again later.');
    });

}

document.addEventListener("DOMContentLoaded", function() {
    // Get all stars in the edit popup
    var stars = document.querySelectorAll('.popup-edit .ratings-popup input[type="radio"]');

    // Add event listeners to each star
    stars.forEach(function(star) {
        star.addEventListener('click', function() {
            // Remove "active" class from all stars
            stars.forEach(function(s) {
                s.nextElementSibling.classList.remove('active');
            });

            // Add "active" class to clicked star and all preceding stars
            var clickedIndex = Array.from(stars).indexOf(star);
            for (var i = 0; i <= clickedIndex; i++) {
                stars[i].nextElementSibling.classList.add('active');
            }
        });
    });
});

function toggleDeletePopup(_id) {
    var popup = document.getElementById("deletePopup_" + _id);
    if (popup.style.display === "none") {
        popup.style.display = "block";
    } else {
        popup.style.display = "none";
    }
}

function deleteReview(reviewId) {

    const thisReview = reviewId.trim();

    const urlParams = new URLSearchParams(window.location.search);
    const inf_id = urlParams.get('inf_id');
    const name = urlParams.get('name');
    const location = urlParams.get('location');
    const location_link = urlParams.get('location_link');
    const category1 = urlParams.get('category1');
    const category2 = urlParams.get('category2');
    const description = urlParams.get('description');
    const averageRating = urlParams.get('averageRating');
    const slideImages1 = urlParams.get('slideImages1');
    const slideImages2 = urlParams.get('slideImages2');
    const slideImages3 = urlParams.get('slideImages3');
    const username = urlParams.get('username');

    fetch('/delete-review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            thisReview: thisReview
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Review deleted successfully.');
            const redirectURL = `/reviewpage?inf_id=${inf_id}&name=${name}&location=${location}&location_link=${location_link}&category1=${category1}&category2=${category2}&description=${description}&averageRating=${averageRating}&slideImages1=${slideImages1}&slideImages2=${slideImages2}&slideImages3=${slideImages3}&username=${username}`;
            window.location.href = redirectURL;
        } else {
            throw new Error('Failed to delete review.');
        }
    })
    .catch(error => {
        console.error('Error deleting review:', error);
        alert('An error occurred while deleting review. Please try again later.');
    });
}


function getSelectedRating() {
    const ratingInputs = document.querySelectorAll('input[name="rate"]:checked');
    if (ratingInputs.length === 1) {
        return ratingInputs[0].value;
    }
    return null; // No rating selected
}

document.addEventListener("DOMContentLoaded", function() {
    const editPopup = document.getElementById("editPopup");
    const editButton = document.getElementById("openEditPopup");
    const closeEditPopup = document.querySelector("#editPopup .close");

    editButton.onclick = function() {
        editPopup.style.display = "block";
    }

    closeEditPopup.onclick = function() {
        editPopup.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == editPopup) {
            editPopup.style.display = "none";
        }
    }
});


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

// JavaScript code to handle like button click
document.addEventListener("DOMContentLoaded", function() {
    const likeButtons = document.querySelectorAll(".helpful");

    // Attach event listeners to like buttons
    likeButtons.forEach(button => {
        button.addEventListener("click", function() {
            const reviewId = button.dataset.reviewId; // Assuming you have a data attribute for reviewId
            
            // Check if the user has already liked this review
            const hasLiked = localStorage.getItem(`liked_${reviewId}`);
            if (hasLiked) {
                alert("You have already liked this review.");
                return;
            }
            
            // If the user hasn't liked the review yet, update the UI and send the like to the server
            updateLike(reviewId);
        });
    });

    function updateLike(reviewId) {
        // Send an AJAX request to the server to update the like count
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/update-like", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Update the UI based on the response from the server
                    const response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        // Update UI to indicate the like was successful
                        incrementLikeCount(reviewId);
                        // Store in local storage to prevent duplicate likes from the same user
                        localStorage.setItem(`liked_${reviewId}`, true);
                    } else {
                        console.error("Error updating like:", response.error);
                    }
                } else {
                    console.error("Error updating like:", xhr.status);
                }
            }
        };
        const data = JSON.stringify({ reviewId });
        xhr.send(data);
    }

    function incrementLikeCount(reviewId) {
        // Update the UI to increment the like count
        const likeCountSpan = document.querySelector(`#like-count-${reviewId}`);
        if (likeCountSpan) {
            const currentCount = parseInt(likeCountSpan.textContent);
            likeCountSpan.textContent = currentCount + 1;
        }
    }
});


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
   
  function toggleEditPopup(reviewId) {
    var editPopup = document.getElementById('editPopup_' + reviewId);
    editPopup.style.display = (editPopup.style.display === 'block') ? 'none' : 'block';
}

// Ensure that the toggleEditPopup function toggles the display of the edit popup correctly
function toggleDeletePopup() {
    var deletePopup = document.getElementById('deletePopup');
    deletePopup.style.display = (deletePopup.style.display === 'block') ? 'none' : 'block';
}


function toggleDropdown2(button, reviewId) {
    var dropdownContent = button.nextElementSibling;
    var editPopup = document.getElementById('editPopup_' + reviewId);

    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        // Hide all dropdowns before showing the clicked one
        hideAllDropdowns();
        dropdownContent.style.display = "block";

        // Hide all edit popups before showing the clicked one
        hideAllEditPopups();
        editPopup.style.display = "block";
    }
}

function hideAllDropdowns() {
    var dropdowns = document.querySelectorAll(".dropdownContent2");
    dropdowns.forEach(function(dropdown) {
        dropdown.style.display = "none";
    });
}

function hideAllEditPopups() {
    var popups = document.querySelectorAll(".popup-edit");
    popups.forEach(function(popup) {
        popup.style.display = "none";
    });
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

document.addEventListener("DOMContentLoaded", function() {
    // Get all review boxes
    var reviewBoxes = document.querySelectorAll('.review-box');

    // Loop through each review box
    reviewBoxes.forEach(function(box) {
        // Get the average rating value for this review box
        var cafeRating = Math.round(parseFloat(box.querySelector('.ratings #cafeRating').textContent));

        // Get all the stars within this review box
        var stars = box.querySelectorAll('.star');

        // Add active class to stars based on average rating
        for (var i = stars.length - 1; i >= 0; i--) {
            if (cafeRating > 0) {
                stars[i].classList.add('active');
                cafeRating--;
            } else {
                break;
            }
        }
    });
});