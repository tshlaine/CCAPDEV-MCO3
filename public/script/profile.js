let slideIndex = 1;

function showSlide(slideIndex) {
  const reviewSets = document.querySelectorAll(".review-set");
  const dots = document.querySelectorAll(".dot");

  reviewSets.forEach((reviewSet, index) => {
    if (index + 1 === slideIndex) {
      reviewSet.style.display = "block";
    } else {
      reviewSet.style.display = "none";
    }
  });

  dots.forEach((dot, index) => {
    if (index + 1 === slideIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function nextSlide() {
  slideIndex++;
  const totalSlides = document.querySelectorAll(".review-set").length;
  if (slideIndex > totalSlides) {
    slideIndex = 1;
  }
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex--;
  const totalSlides = document.querySelectorAll(".review-set").length;
  if (slideIndex < 1) {
    slideIndex = totalSlides;
  }
  showSlide(slideIndex);
}

showSlide(slideIndex);

// document.getElementById('cafeLogo').addEventListener('click', function() {
//     const cafeId = this.getAttribute('data-cafeid');
//     window.location.href = '/establishment?cafeId=' + cafeId;
// });

function openEditPopup() {
  const editPopup = document.getElementById("editPopup");
  editPopup.style.display = "block";
}

function closeEditPopup() {
  const editPopup = document.getElementById("editPopup");
  editPopup.style.display = "none";
}

function saveChanges() {
  const newUsername = document.getElementById("newUsername").value.trim();
  const newFirstName = document.getElementById("newFirstName").value.trim();
  const newLastName = document.getElementById("newLastName").value.trim();
  const newBio = document.getElementById("newBio").value.trim();

  // Check if any of the fields are empty
  if (
    newUsername === "" &&
    newFirstName === "" &&
    newLastName === "" &&
    newBio === ""
  ) {
    alert("Please enter at least one value to save.");
    return;
  }

  // Update username if not empty
  if (newUsername !== "") {
    const usernameElement = document.querySelector(".username");
    usernameElement.textContent = newUsername;
    localStorage.setItem("username", newUsername);
  }

  // Update real name if not empty
  if (newFirstName !== "" || newLastName !== "") {
    const realnameElement = document.querySelector(".realname");
    realnameElement.textContent = newFirstName + " " + newLastName;
    localStorage.setItem("realname", newFirstName + " " + newLastName);
  }

  // Update bio if not empty
  if (newBio !== "") {
    const bioElement = document.querySelector(".bio");
    bioElement.textContent = newBio;
    localStorage.setItem("bio", newBio);
  }

  // Close the edit popup
  closeEditPopup();
}

function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdownContent");
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
  }
}

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
  const profilePic = document.getElementById("profilePic");
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      profilePic.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

function loadCover(event) {
  const coverPic = document.getElementById("coverPic");
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      coverPic.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
