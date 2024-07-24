function toggleMenu() {
  var navLinks = document.getElementById("navLinks");
  var hamIcon = document.getElementById("hamIcon");
  var closeIcon = document.getElementById("closeIcon");
  if (navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    hamIcon.style.display = "block";
    closeIcon.style.display = "none";
  } else {
    navLinks.classList.add("active");
    hamIcon.style.display = "none";
    closeIcon.style.display = "block";
  }
}
