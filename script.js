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

      // Appeler updateStatus() après que le footer ait été chargé
      updateStatus()
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

  function updateStatus() {
    console.log("Script exécuté")
    const now = new Date()
    const day = now.getDay() // 0 (dimanche) à 6 (samedi)
    const hour = now.getHours()
    const minute = now.getMinutes()
    const date = now.toISOString().split("T")[0] // Formate la date actuelle au format 'YYYY-MM-DD'
    const indicator = document.getElementById("status-indicator")
    const statusText = document.getElementById("status-text")

    // Liste des fermetures exceptionnelles au format 'YYYY-MM-DD'
    const specialClosures = ["2024-10-24", "2024-10-25", "2024-10-26"]

    // Fonction pour vérifier si un jour est dans les fermetures exceptionnelles
    function isSpecialClosureForDay(dayOfWeek, formattedDate) {
      return specialClosures.includes(formattedDate)
    }

    // Horaires de fermeture en heures et minutes
    const closingTimes = {
      1: [18, 0], // Lundi
      2: [18, 0], // Mardi
      4: [18, 0], // Jeudi
      5: [18, 0], // Vendredi
      6: [12, 0], // Samedi
    }

    // Fonction pour mettre à jour les horaires en "Fermé" si c'est une fermeture exceptionnelle
    function updateHoursForSpecialClosure() {
      const hoursList = document.querySelectorAll(".footer-hours ul li")
      hoursList.forEach((li) => {
        const dayName = li.textContent.split(" :")[0] // Extrait le nom du jour
        let dayToCheck = null

        // On détermine le jour en fonction de son nom
        switch (dayName) {
          case "Lundi":
            dayToCheck = 1
            break
          case "Mardi":
            dayToCheck = 2
            break
          case "Mercredi":
            dayToCheck = 3
            break
          case "Jeudi":
            dayToCheck = 4
            break
          case "Vendredi":
            dayToCheck = 5
            break
          case "Samedi":
            dayToCheck = 6
            break
          case "Dimanche":
            dayToCheck = 0
            break
          default:
            dayToCheck = null
        }

        if (dayToCheck !== null) {
          // On génère la date pour chaque jour à partir d'aujourd'hui
          const futureDate = new Date(now)
          futureDate.setDate(now.getDate() + ((dayToCheck + 7 - day) % 7)) // Calcul de la date pour ce jour de la semaine
          const formattedFutureDate = futureDate.toISOString().split("T")[0] // Formate la date future

          // Si ce jour est dans les fermetures exceptionnelles
          if (isSpecialClosureForDay(dayToCheck, formattedFutureDate)) {
            li.textContent = `${dayName} : Fermé`
          }
        }
      })
    }

    // Mettre à jour les horaires pour les jours futurs avec les fermetures exceptionnelles
    updateHoursForSpecialClosure()

    // Vérifie si aujourd'hui est une fermeture exceptionnelle
    const isSpecialClosureToday = isSpecialClosureForDay(day, date)

    if (isSpecialClosureToday) {
      // Fermeture exceptionnelle aujourd'hui
      indicator.classList.remove("status-open", "status-closing")
      indicator.classList.add("status-closed")
      statusText.textContent = "Fermé actuellement"
    } else {
      // Vérification des horaires d'ouverture réguliers
      const isOpen =
        (day === 1 &&
          ((hour >= 10 && hour < 12) || (hour >= 14 && hour < 18))) || // Lundi
        (day === 2 &&
          ((hour >= 10 && hour < 12) || (hour >= 14 && hour < 18))) || // Mardi
        (day === 4 &&
          ((hour >= 10 && hour < 12) || (hour >= 14 && hour < 18))) || // Jeudi
        (day === 5 &&
          ((hour >= 10 && hour < 12) || (hour >= 14 && hour < 18))) || // Vendredi
        (day === 6 && hour >= 10 && hour < 12) // Samedi

      const isClosedOnWednesday = day === 3 // Mercredi
      const isClosedOnSunday = day === 0 // Dimanche

      if (isClosedOnWednesday || isClosedOnSunday) {
        indicator.classList.remove("status-open", "status-closing")
        indicator.classList.add("status-closed")
        statusText.textContent = "Fermé actuellement"
      } else if (isOpen) {
        const closingTime = closingTimes[day] || [18, 0] // Obtenir l'heure de fermeture pour aujourd'hui
        const closingHour = closingTime[0]
        const closingMinute = closingTime[1]

        // Calculer le temps restant avant la fermeture
        const minutesUntilClosing =
          (closingHour - hour) * 60 + (closingMinute - minute)

        if (minutesUntilClosing <= 30 && minutesUntilClosing > 0) {
          indicator.classList.remove("status-open", "status-closed")
          indicator.classList.add("status-closing")
          statusText.textContent = "Ferme bientôt"
        } else {
          indicator.classList.remove("status-closed", "status-closing")
          indicator.classList.add("status-open")
          statusText.textContent = "Ouvert actuellement"
        }
      } else {
        indicator.classList.remove("status-open", "status-closing")
        indicator.classList.add("status-closed")
        statusText.textContent = "Fermé actuellement"
      }
    }

    console.log(
      `Jour: ${day}, Heure: ${hour}, Minute: ${minute}, Ouvert: ${
        !isSpecialClosureToday && isOpen
      }`
    )
  }
})
