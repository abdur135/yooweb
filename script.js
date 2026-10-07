
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

// Theme
const savedTheme = localStorage.getItem("yooweb-theme");

if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
}

function updateThemeIcon() {
    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    themeToggle.innerHTML =
        currentTheme === "dark"
            ? '<i data-lucide="sun"></i>'
            : '<i data-lucide="moon"></i>';

    lucide.createIcons();
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {
    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    const newTheme =
        currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);

    localStorage.setItem("yooweb-theme", newTheme);

    updateThemeIcon();
});

// Mobile menu
menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    menuToggle.innerHTML = navMenu.classList.contains("active")
        ? '<i data-lucide="x"></i>'
        : '<i data-lucide="menu"></i>';

    lucide.createIcons();
});

// Close menu after clicking a link
document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");

        menuToggle.innerHTML = '<i data-lucide="menu"></i>';

        lucide.createIcons();
    });
});

// Initialize icons
lucide.createIcons();


// =================================
// YOOWEB CONSULTATION FORM
// =================================

const yoowebNumber = "6282118134540";

const consultationForm = document.getElementById("consultationForm");

if (consultationForm) {

    const packageSelect = document.getElementById("selectedPackage");

    // Mengambil paket yang dipilih dari pricing section
    const savedPackage = sessionStorage.getItem("yooweb-package");

    if (savedPackage) {

        const packageOptions = {
            "Starter": "Starter - Rp750.000",
            "Business": "Business - Rp1.500.000",
            "Professional": "Professional - Rp2.500.000"
        };

        if (packageOptions[savedPackage]) {
            packageSelect.value = packageOptions[savedPackage];
        }

        sessionStorage.removeItem("yooweb-package");
    }

    consultationForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!consultationForm.reportValidity()) return;

        const name = document.getElementById("clientName").value.trim();

        const business = document.getElementById("businessName").value.trim();

        const type = document.getElementById("websiteType").value;

        const selectedPackage = packageSelect.value;

        const domain = document.getElementById("domainType").value;

        const details = document.getElementById("projectDetails").value.trim();

        const message = `
Halo YooWeb! Saya tertarik menggunakan jasa pembuatan website.

*DATA CALON KLIEN*
Nama: ${name}
Bisnis: ${business || "Belum ditentukan"}

*KEBUTUHAN WEBSITE*
Jenis Website: ${type}
Paket: ${selectedPackage}
Domain : ${domain}

*DETAIL KEBUTUHAN*
${details}

Saya ingin berdiskusi lebih lanjut mengenai proyek ini.

Terima kasih!
        `.trim();

        const whatsappURL =
            `https://wa.me/${yoowebNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank", "noopener,noreferrer");

    });
}

// Automatic copyright year
const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

// =================================
// PORTFOLIO FILTER
// =================================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach((card) => {

            const category = card.dataset.category;

            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {
                card.classList.remove("is-hidden");
            } else {
                card.classList.add("is-hidden");
            }

        });

    });

});


// =================================
// PORTFOLIO IMAGE GALLERY
// =================================

document.querySelectorAll(".project-gallery").forEach((gallery) => {

    const mainImage =
        gallery.querySelector(".gallery-main-image");

    const thumbnails =
        gallery.querySelectorAll(".gallery-thumb");

    const previousButton =
        gallery.querySelector(".gallery-prev");

    const nextButton =
        gallery.querySelector(".gallery-next");

    if (!mainImage || !thumbnails.length) return;

    let currentIndex = 0;


    function showImage(index) {

        if (index < 0) {
            index = thumbnails.length - 1;
        }

        if (index >= thumbnails.length) {
            index = 0;
        }

        currentIndex = index;

        const thumbnail = thumbnails[currentIndex];

        const imageSource =
            thumbnail.dataset.image;

        mainImage.src = imageSource;

        thumbnails.forEach((thumb) => {
            thumb.classList.remove("active");
        });

        thumbnail.classList.add("active");

    }


    thumbnails.forEach((thumbnail, index) => {

        thumbnail.addEventListener("click", () => {
            showImage(index);
        });

    });


    if (previousButton) {

        previousButton.addEventListener("click", () => {
            showImage(currentIndex - 1);
        });

    }


    if (nextButton) {

        nextButton.addEventListener("click", () => {
            showImage(currentIndex + 1);
        });

    }

});