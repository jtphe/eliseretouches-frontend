document.addEventListener("DOMContentLoaded", function () {
  // Load header
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("header").innerHTML = data
    })

  // Load testimonials only on index.html
  if (/index\.html/.test(window.location.pathname)) {
    fetch("testimony.html")
      .then((response) => response.text())
      .then((data) => {
        document.querySelector("#testimonials").innerHTML = data
      })
  }

  // Load footer
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("footer").innerHTML = data
    })

  // Affiche le bouton quand l'utilisateur scroll vers le bas
  window.onscroll = function () {
    const backToTopBtn = document.getElementById("back-to-top-btn")
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      backToTopBtn.style.display = "block"
    } else {
      backToTopBtn.style.display = "none"
    }
  }

  // Scroll vers le haut quand on clique sur le bouton
  document
    .getElementById("back-to-top-btn")
    .addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
})
