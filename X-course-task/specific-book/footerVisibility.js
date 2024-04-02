window.addEventListener('scroll', function() {
  var footer = document.getElementById('footer');
  var scrollPosition = window.innerHeight + window.scrollY;
  var documentHeight = document.body.offsetHeight;

  if (scrollPosition >= documentHeight) {
    footer.style.display = 'block';
  } else {
    footer.style.display = 'none';
  }
});
