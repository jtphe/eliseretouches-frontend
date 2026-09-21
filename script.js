// ============================================================================
// CONFIGURATION DES HORAIRES — seule source à modifier pour changer les horaires
// hebdomadaires, ajouter une fermeture ponctuelle (un jour de congé) ou déclarer
// une fermeture prolongée (vacances). Utilisée à la fois par la liste d'horaires
// du footer, celle de la page Contact, et l'indicateur "Ouvert / Fermé".
// ============================================================================
const SCHEDULE_CONFIG = {
  // Horaires hebdomadaires. Clé = jour de la semaine, même convention que
  // Date.getDay() en JS : 0 = dimanche ... 6 = samedi.
  // Chaque jour a une liste de créneaux ["HH:MM", "HH:MM"] (ouverture, fermeture).
  // Un jour fermé = tableau vide [].
  weeklyHours: {
    0: [], // Dimanche
    1: [
      ["10:00", "12:00"],
      ["14:00", "18:00"],
    ], // Lundi
    2: [
      ["10:00", "12:00"],
      ["14:00", "18:00"],
    ], // Mardi
    3: [], // Mercredi
    4: [
      ["10:00", "12:00"],
      ["14:00", "18:00"],
    ], // Jeudi
    5: [
      ["10:00", "12:00"],
      ["14:00", "18:00"],
    ], // Vendredi
    6: [["10:00", "12:00"]], // Samedi
  },

  // Fermetures ponctuelles : un jour précis fermé exceptionnellement (congé,
  // jour férié...). Ajouter une ligne par date, au format :
  //   { date: "AAAA-MM-JJ", allDay: true }
  // ou pour ne fermer qu'une demi-journée :
  //   { date: "AAAA-MM-JJ", morning: true }   (ferme le matin)
  //   { date: "AAAA-MM-JJ", afternoon: true } (ferme l'après-midi)
  specialClosures: [
    // { date: "2026-12-24", allDay: true },
  ],

  // Fermeture prolongée (vacances). Laisser startDate/endDate à null quand
  // inactif : ça évite qu'une fermeture d'une année précédente, oubliée dans
  // le code, se réactive toute seule l'année suivante.
  // Pour activer : renseigner les deux dates au format "AAAA-MM-JJ".
  extendedClosure: {
    startDate: null, // ex : "2026-07-30"
    endDate: null, // ex : "2026-08-24"
    label: "Fermeture estivale",
  },
}

const DAY_NAMES = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
]
// Ordre d'affichage habituel (Lundi → Dimanche), différent de l'ordre JS natif
// (Dimanche → Samedi) utilisé par Date.getDay().
const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0]
const FRENCH_MONTHS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
]

// -- Fonctions utilitaires sur la config (pures, sans dépendance au DOM) ----

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number)
  return h * 60 + m
}

function formatTime(hhmm) {
  // "10:00" -> "10h", "17:30" -> "17h30"
  const [h, m] = hhmm.split(":")
  return m === "00" ? `${h}h` : `${h}h${m}`
}

// Date locale au format "AAAA-MM-JJ" — volontairement pas toISOString(),
// qui convertit en UTC et peut afficher la mauvaise date en pleine nuit
// selon le fuseau horaire du visiteur.
function formatLocalISODate(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function formatClosureRangeLabel(startDate, endDate) {
  const [, ms, ds] = startDate.split("-").map(Number)
  const [ye, me, de] = endDate.split("-").map(Number)
  return `${ds} ${FRENCH_MONTHS[ms - 1]} au ${de} ${FRENCH_MONTHS[me - 1]} ${ye}`
}

function formatHoursForDay(dayIndex) {
  const slots = SCHEDULE_CONFIG.weeklyHours[dayIndex] || []
  if (!slots.length) return "Fermé"
  return slots
    .map(([open, close]) => `${formatTime(open)}-${formatTime(close)}`)
    .join(" / ")
}

function isExtendedClosureActive(dateStr) {
  const { startDate, endDate } = SCHEDULE_CONFIG.extendedClosure
  if (!startDate || !endDate) return false
  return dateStr >= startDate && dateStr <= endDate
}

function isSpecialClosureForDate(dateStr, hour) {
  const closure = SCHEDULE_CONFIG.specialClosures.find(
    (c) => c.date === dateStr
  )
  if (!closure) return false
  if (closure.allDay) return true
  if (closure.afternoon && hour >= 12) return true
  if (closure.morning && hour < 12) return true
  return false
}

// Texte à afficher pour la prochaine occurrence d'un jour de la semaine donné
// (ex: le prochain lundi à venir), en tenant compte d'une éventuelle fermeture
// ponctuelle ou prolongée qui tomberait ce jour-là.
function getUpcomingDayHoursText(dayIndex) {
  const now = new Date()
  const today = now.getDay()
  const futureDate = new Date(now)
  futureDate.setDate(now.getDate() + ((dayIndex + 7 - today) % 7))
  const dateStr = formatLocalISODate(futureDate)
  if (
    isExtendedClosureActive(dateStr) ||
    isSpecialClosureForDate(dateStr, 12) // 12h : couvre "allDay" et "afternoon"
  ) {
    return "Fermé"
  }
  return formatHoursForDay(dayIndex)
}

// -- Rendu de la liste d'horaires (footer + page Contact), à partir de la même
// config et du même balisage, pour ne plus jamais avoir à maintenir deux
// listes en parallèle. Marque le jour du jour ("is-today") et les jours
// fermés ("data-closed") pour que le CSS puisse les mettre en valeur.
// Regroupe les jours qui partagent exactement les mêmes horaires sur une seule
// ligne ("Lundi, Mardi, Jeudi, Vendredi : 10h-12h / 14h-18h" plutôt que 4
// lignes identiques) : 7 lignes deviennent 3 dans le cas courant, ce qui
// change tout sur mobile en particulier, sans rien cacher derrière un clic.
function renderHoursList(ul) {
  if (!ul) return
  const today = new Date().getDay()
  const groups = new Map() // "10h-12h / 14h-18h" -> [1, 2, 4, 5]
  DISPLAY_ORDER.forEach((dayIndex) => {
    const hoursText = getUpcomingDayHoursText(dayIndex)
    if (!groups.has(hoursText)) groups.set(hoursText, [])
    groups.get(hoursText).push(dayIndex)
  })

  const rows = Array.from(groups.entries())
    .map(([hoursText, days]) => ({ hoursText, days }))
    // Ordonne les groupes selon le premier jour où ils apparaissent, pour
    // rester dans l'ordre naturel de la semaine (Lundi... en premier)
    .sort(
      (a, b) =>
        DISPLAY_ORDER.indexOf(a.days[0]) - DISPLAY_ORDER.indexOf(b.days[0])
    )

  ul.innerHTML = rows
    .map(({ hoursText, days }) => {
      const isClosed = hoursText === "Fermé"
      const includesToday = days.includes(today)
      const dayLabel = days.map((d) => DAY_NAMES[d]).join(", ")
      const todayBadge = includesToday
        ? '<span class="today-badge">(aujourd\'hui)</span>'
        : ""
      return `<li class="${includesToday ? "is-today" : ""}"${
        isClosed ? ' data-closed="true"' : ""
      }><span class="hours-day">${dayLabel}${todayBadge}</span><span class="hours-value">${hoursText}</span></li>`
    })
    .join("")
}

document.addEventListener("DOMContentLoaded", function () {
  // Load header
  const headerLoaded = fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("header").innerHTML = data
      // Appeler la bannière estivale ici pour garantir qu'elle s'affiche sous le header
      displayGlobalSummerBanner()

      // Ombre discrète sur la nav une fois que la page est scrollée (rendu plus premium qu'une nav plate)
      const navbar = document.querySelector(".navbar")
      if (navbar) {
        const toggleNavbarShadow = () => {
          navbar.classList.toggle("navbar-scrolled", window.scrollY > 10)
        }
        toggleNavbarShadow()
        window.addEventListener("scroll", toggleNavbarShadow, {
          passive: true,
        })
      }
    })

  // Load testimonials only on index.html
  const isIndexPage = /index\.html/.test(window.location.pathname)
  const testimonyLoaded = isIndexPage
    ? fetch("testimony.html")
        .then((response) => response.text())
        .then((data) => {
          document.querySelector("#testimonials").innerHTML = data
        })
    : Promise.resolve()

  // Load footer
  const footerLoaded = fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("footer").innerHTML = data

      // Année du copyright toujours à jour, sans retouche manuelle chaque année
      const copyrightYear = document.getElementById("copyright-year")
      if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear()
      }

      // Appeler updateStatus() après que le footer ait été chargé
      updateStatus()
    })

  // L'apparition au scroll ne démarre qu'une fois header/footer/témoignages injectés :
  // tant que ces blocs arrivent en asynchrone, ils décalent la mise en page et faussent
  // la toute première mesure d'intersection (élément qui reste bloqué invisible).
  Promise.all([headerLoaded, testimonyLoaded, footerLoaded]).then(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initScrollReveal()
      })
    })
  })

  // Bouton "retour en haut" : présent uniquement sur certaines pages (ex. index.html)
  const backToTopBtn = document.getElementById("back-to-top-btn")
  if (backToTopBtn) {
    // Affiche le bouton quand l'utilisateur scroll vers le bas
    window.onscroll = function () {
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
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Fonction pour afficher la bannière estivale générale en haut du site,
  // pilotée par SCHEDULE_CONFIG.extendedClosure (seule source pour ces dates).
  function displayGlobalSummerBanner() {
    const dateStr = formatLocalISODate(new Date())
    const existingBanner = document.querySelector(
      ".summer-closure-banner-global"
    )
    if (isExtendedClosureActive(dateStr)) {
      if (!existingBanner) {
        const { startDate, endDate, label } = SCHEDULE_CONFIG.extendedClosure
        const banner = document.createElement("div")
        banner.className = "summer-closure-banner-global"
        banner.innerHTML = `
          <div class="banner-couture-bg">
            <span class="banner-icon">✂️</span>
            <span class="banner-text">
              ${label} du ${formatClosureRangeLabel(startDate, endDate)}
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
    } else if (existingBanner) {
      existingBanner.remove()
    }
  }

  function updateStatus() {
    const now = new Date()
    const day = now.getDay()
    const hour = now.getHours()
    const minute = now.getMinutes()
    const dateStr = formatLocalISODate(now)
    const indicator = document.getElementById("status-indicator")
    const statusText = document.getElementById("status-text")

    // Régénère les deux listes d'horaires (footer + page Contact) à partir de
    // la config commune : impossible qu'elles désynchronisent l'une de l'autre.
    // Sur la page Contact, le détail est déjà affiché dans "Nous Contacter" :
    // on masque la liste du footer pour ne pas répéter la même info sur la même
    // page, en gardant juste l'indicateur Ouvert/Fermé (repère utile en scrollant).
    const isContactPage = /contact\.html/.test(window.location.pathname)
    const footerHoursTitle = document.querySelector(".hours-title")
    const footerHoursList = document.getElementById("footer-hours-list")
    if (isContactPage) {
      if (footerHoursTitle) footerHoursTitle.style.display = "none"
      if (footerHoursList) footerHoursList.style.display = "none"
    } else {
      if (footerHoursTitle) footerHoursTitle.style.display = ""
      renderHoursList(footerHoursList)
    }
    renderHoursList(document.getElementById("contact-hours-list"))

    if (indicator && statusText) {
      const setStatus = (cls, text) => {
        indicator.classList.remove(
          "status-open",
          "status-closed",
          "status-closing"
        )
        indicator.classList.add(cls)
        statusText.textContent = text
      }

      if (isExtendedClosureActive(dateStr)) {
        setStatus("status-closed", SCHEDULE_CONFIG.extendedClosure.label)
      } else if (isSpecialClosureForDate(dateStr, hour)) {
        setStatus("status-closed", "Fermé actuellement")
      } else {
        const nowMinutes = hour * 60 + minute
        const slots = SCHEDULE_CONFIG.weeklyHours[day] || []
        const openSlot = slots.find(
          ([open, close]) =>
            nowMinutes >= toMinutes(open) && nowMinutes < toMinutes(close)
        )
        if (!openSlot) {
          setStatus("status-closed", "Fermé actuellement")
        } else {
          const minutesUntilClosing = toMinutes(openSlot[1]) - nowMinutes
          if (minutesUntilClosing <= 30) {
            setStatus("status-closing", "Ferme bientôt")
          } else {
            setStatus("status-open", "Ouvert actuellement")
          }
        }
      }
    }

    // Afficher la bannière générale si besoin
    displayGlobalSummerBanner()
  }

  // Carrousel de la modal galerie (utilisé sur index.html et gallery.html)
  // Factorisé ici pour éviter la duplication du même script inline sur les deux pages
  function initGalleryModal() {
    const galleryItems = document.querySelectorAll(".gallery-item")
    const modalImage = document.getElementById("modalImage")
    const prevBtn = document.getElementById("prevBtn")
    const nextBtn = document.getElementById("nextBtn")

    // Ne s'exécute que sur les pages qui possèdent effectivement une galerie/modal
    if (!galleryItems.length || !modalImage || !prevBtn || !nextBtn) return

    const imageSources = Array.from(galleryItems).map((item) =>
      item.getAttribute("data-src")
    )
    let currentIndex = 0

    galleryItems.forEach((item, index) => {
      item.addEventListener("click", function () {
        modalImage.src = imageSources[index]
        currentIndex = index
      })
    })

    function showPrevImage() {
      currentIndex =
        (currentIndex - 1 + imageSources.length) % imageSources.length
      modalImage.src = imageSources[currentIndex]
    }

    function showNextImage() {
      currentIndex = (currentIndex + 1) % imageSources.length
      modalImage.src = imageSources[currentIndex]
    }

    prevBtn.addEventListener("click", showPrevImage)
    nextBtn.addEventListener("click", showNextImage)

    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        showPrevImage()
      } else if (event.key === "ArrowRight") {
        showNextImage()
      }
    })
  }

  initGalleryModal()

  // Apparition douce des éléments ".reveal" au scroll (cascade légère entre voisins)
  function initScrollReveal() {
    const revealEls = document.querySelectorAll(".reveal:not(.is-visible)")
    if (!revealEls.length) return

    // Environnement sans IntersectionObserver (très rare) : on affiche direct, pas de dégradation silencieuse
    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"))
      return
    }

    // Petit décalage entre éléments d'un même parent pour un effet de cascade (ex: les cartes services)
    const siblingCounters = new Map()
    revealEls.forEach((el) => {
      const parent = el.parentElement
      const count = siblingCounters.get(parent) || 0
      el.style.transitionDelay = `${Math.min(count, 5) * 90}ms`
      siblingCounters.set(parent, count + 1)
    })

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    )

    // On attend deux frames avant de démarrer l'observation : juste après le chargement,
    // la mise en page peut encore bouger (chargement des polices custom, etc.), ce qui fausse
    // la toute première mesure d'intersection et peut laisser un élément bloqué invisible.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        revealEls.forEach((el) => observer.observe(el))
      })
    })

    // Filet de sécurité : si un élément n'a toujours pas été révélé après quelques secondes
    // (cas limite non prévu), on l'affiche quand même. Le contenu ne doit jamais rester
    // invisible indéfiniment.
    setTimeout(() => {
      revealEls.forEach((el) => el.classList.add("is-visible"))
    }, 4000)
  }
})
