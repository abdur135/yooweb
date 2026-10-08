
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

(() => {
    const demos = [
        { file: "demo_1.html", type: "LANDING PAGE", title: "Brewlab Cold Brew",
          desc: "Halaman promosi produk yang fokus mengubah pengunjung jadi pembeli, dengan form pesan langsung ke WhatsApp.",
          feats: ["Hero & CTA kuat", "Varian & testimoni", "Pesan via WhatsApp"] },
        { file: "demo_2.html", type: "COMPANY PROFILE", title: "Nusantara Konstruksi",
          desc: "Website perusahaan yang membangun kepercayaan: profil, layanan, proyek, tim, dan kontak dalam satu tampilan rapi.",
          feats: ["Statistik animasi", "Layanan & proyek", "Form kontak ke WhatsApp"] },
        { file: "demo_3.html", type: "KATALOG PRODUK", title: "Batik Laras",
          desc: "Katalog produk interaktif. Pelanggan bisa mencari, memfilter, memasukkan ke keranjang, lalu checkout lewat WhatsApp.",
          feats: ["Pencarian & filter", "Keranjang belanja", "Checkout WhatsApp"] },
        { file: "demo_4.html", type: "PORTFOLIO PERSONAL", title: "Rizky Pratama",
          desc: "Portfolio personal yang menonjolkan karya, skill, dan pengalaman, lengkap dengan mode gelap dan terang.",
          feats: ["Efek mengetik", "Mode gelap / terang", "Timeline pengalaman"] },
        { file: "demo_5.html", type: "WEBSITE BISNIS", title: "Gentleman Barbershop",
          desc: "Website usaha jasa dengan daftar harga, status buka otomatis, jam operasional, dan booking online.",
          feats: ["Status buka real-time", "Daftar harga", "Booking via WhatsApp"] }
    ];

    const $ = (id) => document.getElementById(id);
    const frame = $("demoFrame"), viewport = $("demoViewport"), device = $("demoDevice");
    const tabs = document.querySelectorAll(".demo-tab");
    const modeBtns = document.querySelectorAll(".demo-switch button");
    if (!frame || !viewport) return;

    let current = 0, mode = "desktop";

    function fit() {
        const w = mode === "mobile" ? 390 : 1280;
        const scale = viewport.clientWidth / w;
        frame.style.width = w + "px";
        frame.style.height = viewport.clientHeight / scale + "px";
        frame.style.transform = "scale(" + scale + ")";
    }

    function show(i) {
        current = i;
        const d = demos[i];

        tabs.forEach((t, n) => {
            t.classList.toggle("active", n === i);
            t.setAttribute("aria-selected", n === i);
        });

        const info = $("demoInfo");
        info.classList.add("swap");
        void info.offsetWidth;
        info.classList.remove("swap");

        $("demoType").textContent = d.type;
        $("demoTitle").textContent = d.title;
        $("demoDesc").textContent = d.desc;
        $("demoFeats").innerHTML = d.feats.map((f) => "<li>" + f + "</li>").join("");
        $("demoOpen").href = d.file;
        $("demoUrl").textContent = d.file;

        viewport.classList.remove("ready");
        frame.src = d.file;
    }

    frame.addEventListener("load", () => viewport.classList.add("ready"));
    tabs.forEach((t) => t.addEventListener("click", () => show(+t.dataset.i)));

    modeBtns.forEach((b) => b.addEventListener("click", () => {
        mode = b.dataset.mode;
        modeBtns.forEach((x) => x.classList.toggle("active", x === b));
        device.classList.toggle("is-mobile", mode === "mobile");
        setTimeout(fit, 460);
        fit();
    }));

    new ResizeObserver(fit).observe(viewport);

    let loaded = false;
    new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting && !loaded) {
            loaded = true; show(0); fit(); obs.disconnect();
        }
    }, { rootMargin: "200px" }).observe(device);
})();