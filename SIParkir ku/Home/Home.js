document.addEventListener('DOMContentLoaded', () => {
  const hamberger = document.querySelector('.hamberger');
  const navLinks = document.querySelector('.nav-links');
  const user = document.querySelector('.user')

  hamberger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    user.classList.toggle('active');
    hamberger.classList.toggle('active');
  });
});