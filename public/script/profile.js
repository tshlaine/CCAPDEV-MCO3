let slideIndex = 1;

function showSlide(slideIndex) {
    const reviewSets = document.querySelectorAll('.review-set');
    const dots = document.querySelectorAll('.dot');

    reviewSets.forEach((reviewSet, index) => {
        if (index + 1 === slideIndex) {
            reviewSet.style.display = 'block';
        } else {
            reviewSet.style.display = 'none';
        }
    });

    dots.forEach((dot, index) => {
        if (index + 1 === slideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    slideIndex++;
    const totalSlides = document.querySelectorAll('.review-set').length;
    if (slideIndex > totalSlides) {
        slideIndex = 1;
    }
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex--;
    const totalSlides = document.querySelectorAll('.review-set').length;
    if (slideIndex < 1) {
        slideIndex = totalSlides;
    }
    showSlide(slideIndex);
}

showSlide(slideIndex);

document.getElementById('cafeLogo').addEventListener('click', function() {
    const cafeId = this.getAttribute('data-cafeid');
    window.location.href = '/establishment?cafeId=' + cafeId;
});

function openEditPopup() {
const editPopup = document.getElementById('editPopup');
editPopup.style.display = 'block';
}

function closeEditPopup() {
const editPopup = document.getElementById('editPopup');
editPopup.style.display = 'none';
}

function saveChanges() {
    const newUsername = document.getElementById('newUsername').value.trim();
    const thisFirstName = document.getElementById('thisFirstName').value.trim();
    const thisLastName = document.getElementById('thisLastName').value.trim();    
    const newBio = document.getElementById('newBio').value.trim();

    // Check if username, first name, and last name are empty
    if (newUsername === '') {
        alert('Username is required.');
        return;
    }

    // Send updated user information to the server
    fetch('/update-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newUsername: newUsername,
            thisFirstName: thisFirstName,
            thisLastName: thisLastName,
            newBio: newBio
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Profile updated successfully.');
            window.location.href = '/profile?username=' +  encodeURIComponent(newUsername);
        } else {
            throw new Error('Failed to update profile.');
        }
    })
    .catch(error => {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating profile. Please try again later.');
    });

}

function toggleDropdown() { var dropdownContent =
    document.getElementById("dropdownContent"); if
    (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none"; } else {
    dropdownContent.style.display = "block"; } }
    
// THIS FUNCTION WILL KEEP THE DATA EVEN AFTER CLOSING THE SERVER, BUT THE DATA WOULD PERSIST EVEN WHEN VIEWING A DIFFERENT USER'S PROFILE PAGE

/*
window.onload = function() {
const storedProfileImg = localStorage.getItem('profile');
const storedCoverImg = localStorage.getItem('coverImg');
const storedUsername = localStorage.getItem('username');
const storedRealname = localStorage.getItem('realname');
const storedBio = localStorage.getItem('bio');

if (storedUsername) {
document.querySelector('.username').textContent = storedUsername;
}

if (storedRealname) {
document.querySelector('.realname').textContent = storedRealname;
}

if (storedBio) {
document.querySelector('.bio').textContent = storedBio;
}

if (storedProfileImg) {
document.getElementById('profilePic').src = storedProfileImg;
}

if (storedCoverImg) {
document.getElementById('coverPic').src = storedCoverImg;
}
};
*/

function loadProfile(event) {
const profilePic = document.getElementById('profilePic');
const file = event.target.files[0];

if (file) {
    const reader = new FileReader();
    reader.onload = function() {
        profilePic.src = reader.result;
    };
    reader.readAsDataURL(file);
}
}

function loadCover(event) {
const coverPic = document.getElementById('coverPic');
const file = event.target.files[0];

if (file) {
    const reader = new FileReader();
    reader.onload = function() {
        coverPic.src = reader.result;
    };
    reader.readAsDataURL(file);
}
}
