document.addEventListener("DOMContentLoaded", function () {
  // Toggle
  document.querySelectorAll(".form-toggle-button").forEach(function (element) {
    element.addEventListener("click", function (e) {
      toggleForms();
    });
  });

  // Profile Preview
  document.getElementById("avatar").addEventListener("change", function () {
    updatePreview(this);
  });

  // Check current page
  const currentPageUrl = window.location.href;
  // Check if the URL contains 'signup'
  if (currentPageUrl.includes("signup")) {
    toggleForms();
  }

  // Register
  document
    .getElementById("registration-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(e.target);

      fetch("/register", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            alert(response.message);
            window.location.href = "/login";
          } else {
            alert(response.message);
          }
        })
        .catch((err) => {
          console.error("Error during login:", err);
        });
    });

  // Login
  document
    .getElementById("login-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(e.target);
      const username = formData.get("username");
      const password = formData.get("password");

      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            openLoginPopUp();
          } else {
            alert(response.message);
          }
        })
        .catch((err) => {
          console.error("Error during login:", err);
        });
    });

  // After authentication user
  //   setTimeout(() => {
  //     container.classList.add("sign-in");
  //   }, 200);
  //   document
  //     .getElementById("signinbutton")
  //     .addEventListener("click", function () {
  //       signIn();
  //     });
  //   function signIn() {
  //     var userIcon = document.getElementById("icon");
  //     userIcon.src = "../../images/dog.jpg";
  //   }
  //   function loadFile(event) {
  //     var reader = new FileReader();
  //     reader.onload = function () {
  //       var output = document.getElementById("profilePic");
  //       output.src = reader.result;
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }

  //   document
  //     .querySelector(".form.sign-in button")
  //     .addEventListener("click", function () {
  //       setTimeout(function () {
  //         document.getElementById("popup-1").classList.add("active");
  //       }, 2000);
  //     });
});

// FUNCTIONS
toggleForms = () => {
  document
    .getElementById("form-container")
    .classList.toggle("right-panel-active");
};

const updatePreview = (input) => {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    var imageElement = document.getElementById("avatar-preview");

    reader.onload = function (e) {
      imageElement.src = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  }
};

const openLoginPopUp = () => {
  document.getElementById("popup-1").classList.add("active");
};
