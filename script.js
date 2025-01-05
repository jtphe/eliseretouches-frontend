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

    // Initialisation de la date et récupération du jour et de l'heure actuels
    const now = new Date()
    const day = now.getDay() // 0 (dimanche) à 6 (samedi)
    const currentWeekStart = new Date(now)
    currentWeekStart.setDate(now.getDate() - (day === 0 ? 6 : day - 1)) // Début de la semaine (lundi)

    const indicator = document.getElementById("status-indicator")
    const statusText = document.getElementById("status-text")

    // Jours spécifiques de fermeture
    const specificClosedDays = ["2025-01-06", "2025-01-31"] // Liste des jours fermés

    // Statut des jours de la semaine
    const weekDays = [
      { name: "Lundi", openHours: "10h-12h / 14h-18h" },
      { name: "Mardi", openHours: "10h-12h / 14h-18h" },
      { name: "Mercredi", openHours: null },
      { name: "Jeudi", openHours: "10h-12h / 14h-18h" },
      { name: "Vendredi", openHours: "10h-12h / 14h-18h" },
      { name: "Samedi", openHours: "10h-12h" },
      { name: "Dimanche", openHours: null },
    ]

    // Récupération et stockage des heures et minutes actuelles
    const currentHours = now.getHours()
    const currentMinutes = now.getMinutes()

    // Vérifie l'état de chaque jour et met à jour l'affichage
    weekDays.forEach((dayInfo, index) =>
      updateDayStatus(
        dayInfo,
        index,
        currentWeekStart,
        specificClosedDays,
        currentHours
      )
    )

    // Vérification du statut actuel
    const isClosedToday = weekDays[day].isClosed // Vérifie si aujourd'hui est fermé
    updateCurrentStatus(
      isClosedToday,
      indicator,
      statusText,
      day,
      currentHours,
      currentMinutes
    )
  }
  // Intervalles de dates spécifiques de fermeture
  const specificClosedDateRanges = [{ start: "2024-12-25", end: "2025-01-01" }]

  // Jours avec des horaires spécifiques
  const specificPartialClosures = {
    "2024-12-10": { openMorning: true, openAfternoon: false },
  }

  function isDateInRange(date, range) {
    const currentDate = new Date(date)
    const startDate = new Date(range.start)
    const endDate = new Date(range.end)
    return currentDate >= startDate && currentDate <= endDate
  }

  function updateDayStatus(
    dayInfo,
    index,
    currentWeekStart,
    specificClosedDays,
    currentHours
  ) {
    const dayDate = new Date(currentWeekStart)
    dayDate.setDate(currentWeekStart.getDate() + index) // Obtient la date du jour correspondant

    const formattedDate = dayDate.toISOString().split("T")[0]
    const partialClosure = specificPartialClosures[formattedDate]
    let statusMessage

    // Vérifie si la date est dans la liste des jours spécifiques de fermeture
    if (partialClosure) {
      // Gestion des fermetures partielles
      if (partialClosure.openMorning && !partialClosure.openAfternoon) {
        statusMessage = `${dayInfo.name} :  10h-12h / Fermé l'après-midi`
        dayInfo.isClosed = currentHours >= 14 // Fermé l'après-midi
      } else if (!partialClosure.openMorning && partialClosure.openAfternoon) {
        statusMessage = `${dayInfo.name} : Fermé le matin / 14h-18h`
        dayInfo.isClosed = currentHours < 14 // Fermé le matin
      } else if (!partialClosure.openMorning && !partialClosure.openAfternoon) {
        statusMessage = `${dayInfo.name} : Fermé toute la journée`
        dayInfo.isClosed = true
      }
    } else {
      // Logique de fermeture classique
      dayInfo.isClosed =
        specificClosedDays.includes(formattedDate) ||
        dayInfo.openHours === null ||
        specificClosedDateRanges.some((range) =>
          isDateInRange(formattedDate, range)
        )
      statusMessage = `${dayInfo.name} : ${
        dayInfo.isClosed ? "Fermé" : dayInfo.openHours
      }`
    }

    // Met à jour l'affichage pour le jour
    const statusElement = document.getElementById(
      `status-${dayInfo.name.toLowerCase()}`
    )
    if (statusElement) {
      statusElement.textContent = statusMessage
      console.log(statusMessage)
    } else {
      console.warn(`Element pour ${dayInfo.name} non trouvé`)
    }
  }

  function updateCurrentStatus(
    isClosedToday,
    indicator,
    statusText,
    day,
    currentHours,
    currentMinutes
  ) {
    // Stockage des classes à ajouter/supprimer
    const classClosed = "status-closed"
    const classOpen = "status-open"
    const classClosing = "status-closing"

    // Réinitialisation des classes
    indicator.classList.remove(classOpen, classClosing)

    if (isClosedToday) {
      indicator.classList.add(classClosed)
      statusText.textContent = "Fermé"
    } else {
      const closingTimes = {
        1: [18, 0], // Lundi
        2: [18, 0], // Mardi
        4: [18, 0], // Jeudi
        5: [18, 0], // Vendredi
        6: [12, 0], // Samedi
      }

      // Vérification des heures d'ouverture
      const isOpen = checkIfOpen(day, currentHours)

      // Calcul de l'indicateur d'état
      if (isOpen) {
        const closingTime = closingTimes[day] || [18, 0] // Obtenir l'heure de fermeture pour aujourd'hui
        const closingHour = closingTime[0]
        const closingMinute = closingTime[1]

        // Calculer le temps restant avant la fermeture
        const minutesUntilClosing =
          (closingHour - currentHours) * 60 + (closingMinute - currentMinutes)

        if (minutesUntilClosing <= 30 && minutesUntilClosing > 0) {
          indicator.classList.add(classClosing)
          statusText.textContent = "Ferme bientôt"
        } else {
          indicator.classList.add(classOpen)
          statusText.textContent = "Ouvert actuellement"
        }
      }
    }
  }

  function checkIfOpen(day, currentHours) {
    return (
      (day === 1 &&
        ((currentHours >= 10 && currentHours < 12) ||
          (currentHours >= 14 && currentHours < 18))) || // Lundi
      (day === 2 &&
        ((currentHours >= 10 && currentHours < 12) ||
          (currentHours >= 14 && currentHours < 18))) || // Mardi
      (day === 4 &&
        ((currentHours >= 10 && currentHours < 12) ||
          (currentHours >= 14 && currentHours < 18))) || // Jeudi
      (day === 5 &&
        ((currentHours >= 10 && currentHours < 12) ||
          (currentHours >= 14 && currentHours < 18))) || // Vendredi
      (day === 6 && currentHours >= 10 && currentHours < 12)
    ) // Samedi
  }
})
