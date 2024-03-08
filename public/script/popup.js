// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Show the popup by adding the 'active' class to it
    document.getElementById("popup-1").classList.add("active");
});

// Add event listener to the dismiss button if needed
document.getElementById("dismiss-popup-btn-1").addEventListener("click", function(){
    // Hide the popup by removing the 'active' class from it
    document.getElementById("popup-1").classList.remove("active");
});
