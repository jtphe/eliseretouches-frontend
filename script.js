document.addEventListener("DOMContentLoaded", function () {
  // Load header
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("header").innerHTML = data
      // Appeler la bannière estivale ici pour garantir qu'elle s'affiche sous le header
      displayGlobalSummerBanner()
      console.log("Affichage bannière estivale") // Debug
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

  // Fonction pour afficher la bannière estivale générale en haut du site
  function displayGlobalSummerBanner() {
    const now = new Date()
    const date = now.toISOString().split("T")[0]
    const summerClosure = {
      startDate: "2025-07-31",
      endDate: "2025-08-31",
    }
    // Vérifier si on est pendant la fermeture estivale
    if (date >= summerClosure.startDate && date <= summerClosure.endDate) {
      if (!document.querySelector(".summer-closure-banner-global")) {
        const banner = document.createElement("div")
        banner.className = "summer-closure-banner-global"
        banner.innerHTML = `
          <div class="banner-couture-bg">
            <span class="banner-icon">✂️</span>
            <span class="banner-text">
              Fermeture estivale du 31 juillet au 31 août 2025
            </span>
            <span class="banner-icon">🧵</span>
          </div>
        `
        const header = document.querySelector("header")
        if (header && header.parentNode) {
          header.parentNode.insertBefore(banner, header.nextSibling)
        } else {
          document.body.insertBefore(banner, document.body.firstChild)
        }
      }
    } else {
      const existingBanner = document.querySelector(
        ".summer-closure-banner-global"
      )
      if (existingBanner) existingBanner.remove()
    }
  }

  // Fonction pour afficher la notice de fermeture estivale dans le footer
  function displaySummerNotice() {
    const now = new Date()
    const date = now.toISOString().split("T")[0]

    // Fermeture estivale (du 31 juillet au 31 août 2025) - TEMPORAIREMENT MODIFIÉ POUR TEST
    const summerClosure = {
      startDate: "2025-01-01", // Temporairement modifié pour test
      endDate: "2025-12-31", // Temporairement modifié pour test
      message: "Fermeture estivale",
    }

    const summerNotice = document.getElementById("summer-notice")
    if (summerNotice) {
      if (date >= summerClosure.startDate && date <= summerClosure.endDate) {
        summerNotice.style.display = "block"
      } else {
        summerNotice.style.display = "none"
      }
    }
  }

  function updateStatus() {
    const now = new Date()
    const day = now.getDay()
    const hour = now.getHours()
    const minute = now.getMinutes()
    const date = now.toISOString().split("T")[0]
    const indicator = document.getElementById("status-indicator")
    const statusText = document.getElementById("status-text")
    // Définir la période estivale
    const summerClosure = {
      startDate: "2025-07-31",
      endDate: "2025-08-31",
    }
    if (date >= summerClosure.startDate && date <= summerClosure.endDate) {
      indicator.classList.remove("status-open", "status-closing")
      indicator.classList.add("status-closed")
      statusText.textContent = "Fermeture estivale"
      // Mettre tous les horaires à Fermé
      const days = [
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi",
        "dimanche",
      ]
      days.forEach((jour) => {
        const li = document.getElementById(`status-${jour}`)
        if (li)
          li.textContent = `${
            jour.charAt(0).toUpperCase() + jour.slice(1)
          } : Fermé`
      })
    } else {
      // --- Logique normale d'ouverture/fermeture ---
      // Liste des fermetures exceptionnelles
      const specialClosures = [
        // { date: "2025-04-21", allDay: true },
        // { date: "2025-05-16", afternoon: true }
        { date: "2025-09-18", allDay: true } // Fermé aujourd'hui
      ]
      function isSpecialClosureForDay(formattedDate, hour) {
        const closure = specialClosures.find(
          (closure) => closure.date === formattedDate
        )
        if (closure) {
          if (closure.allDay) return true
          if (closure.afternoon && hour >= 12) return true
          if (closure.morning && hour < 12) return true
        }
        return false
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
          const dayName = li.textContent.split(" :")[0]
          let dayToCheck = null
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
            const futureDate = new Date(now)
            futureDate.setDate(now.getDate() + ((dayToCheck + 7 - day) % 7))
            const formattedFutureDate = futureDate.toISOString().split("T")[0]
            if (isSpecialClosureForDay(formattedFutureDate, hour)) {
              li.textContent = `${dayName} : Fermé`
            } else {
              // Remettre les horaires normaux
              switch (dayName) {
                case "Lundi":
                case "Mardi":
                case "Jeudi":
                case "Vendredi":
                  li.textContent = `${dayName} : 10h-12h / 14h-18h`
                  break
                case "Samedi":
                  li.textContent = `${dayName} : 10h-12h`
                  break
                case "Mercredi":
                case "Dimanche":
                  li.textContent = `${dayName} : Fermé`
                  break
              }
            }
          }
        })
      }
      updateHoursForSpecialClosure()
      // Vérifie si aujourd'hui est une fermeture exceptionnelle
      const isSpecialClosureToday = isSpecialClosureForDay(date, hour)
      // Vérification si c'est le matin et que l'on est normalement ouvert
      const isMorning = hour < 12
      const isOpenMorning =
        (day === 1 && hour >= 10 && hour < 12) ||
        (day === 2 && hour >= 10 && hour < 12) ||
        (day === 4 && hour >= 10 && hour < 12) ||
        (day === 5 && hour >= 10 && hour < 12) ||
        (day === 6 && hour >= 10 && hour < 12)
      if (isSpecialClosureToday || (isMorning && !isOpenMorning)) {
        indicator.classList.remove("status-open", "status-closing")
        indicator.classList.add("status-closed")
        statusText.textContent = "Fermé actuellement"
      } else {
        // Vérification des horaires d'ouverture réguliers
        const isOpen =
          (day === 1 &&
            ((hour >= 10 && hour < 12) || (hour >= 14 && hour < 18))) ||
          (day === 2 &&
            ((hour >= 10 && hour < 12) || (hour >= 14 && hour < 18))) ||
          (day === 4 &&
            ((hour >= 10 && hour < 12) || (hour >= 14 && hour < 18))) ||
          (day === 5 &&
            ((hour >= 10 && hour < 12) || (hour >= 14 && hour < 18))) ||
          (day === 6 && hour >= 10 && hour < 12)
        const isClosedOnWednesday = day === 3
        const isClosedOnSunday = day === 0
        if (isClosedOnWednesday || isClosedOnSunday) {
          indicator.classList.remove("status-open", "status-closing")
          indicator.classList.add("status-closed")
          statusText.textContent = "Fermé actuellement"
        } else if (isOpen) {
          const closingTime = closingTimes[day] || [18, 0]
          const closingHour = closingTime[0]
          const closingMinute = closingTime[1]
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
    }
    // Afficher la bannière générale si besoin
    displayGlobalSummerBanner()
  }
})
