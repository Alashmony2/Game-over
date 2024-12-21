window.onscroll = function() {
  var navbar = document.getElementById("navbar");
  if (window.scrollY > 25) { 
      navbar.classList.add("sticky-nav"); 
  } else {
      navbar.classList.remove("sticky-nav"); 
  }
};
