const industries = {
  manufacturing: {
    image: "assets/industry-manufacturing.png",
    alt: "Manufacturing and Suppliers collage",
    markets: ["Manufacturing Companies", "Wholesale Suppliers", "Industrial Distributers", "Retail Companies"],
  },
  technology: {
    image: "assets/industry-technology.png",
    alt: "Technology and Innovation collage",
    markets: ["Cloud Computing and Cybersecurity", "High Tech Product Manufactures", "Blockchains", "IT Companies", "AI"],
  },
  finance: {
    image: "assets/industry-finance.png",
    alt: "Financial Services collage",
    markets: ["Banks", "Financial Companies", "Fintech"],
  },
  realestate: {
    image: "assets/industry-realestate.png",
    alt: "Construction and Real Estate collage",
    markets: ["Property Developers", "Construction Firms", "Real Estate Agencies", "Architecture and Engineering Companies"],
  },
  startups: {
    image: "assets/industry-startups.png",
    alt: "Startups collage",
    markets: ["Emerging Tech Ventures", "New Market Entrants", "Disruptive Innovators", "Seed and Series A Startups"],
  },
};

const serviceDetail = {
  lead: {
    badge: "Most popular",
    title: "Lead Generation",
    copy: "Strategically attracting your ideal customer using LinkedIn, Email, WhatsApp, Facebook and other channels. LeadGen includes curated databases, automated campaigns, and CRM integrations for seamless lead management.",
    points: ["Curated databases", "Automated outbound campaigns", "CRM-connected lead management"],
  },
  demand: {
    badge: "Pipeline awareness",
    title: "Demand Generation",
    copy: "A set of marketing strategies designed to create awareness, interest, and demand through content marketing, SEO, paid media, and audience engagement.",
    points: ["Content and SEO", "Paid advertising", "Awareness-to-demand strategy"],
  },
  consulting: {
    badge: "Strategy support",
    title: "Consultancy and Training",
    copy: "Empowering businesses with knowledge, strategy, and operating systems needed to navigate challenges, grow sustainably, and compete more efficiently.",
    points: ["Market and competitor analysis", "Go-to-market planning", "Team training"],
  },
  automation: {
    badge: "Systems",
    title: "Marketing Automation",
    copy: "Using software platforms to build omnichannel systems, automate repetitive workflows, set up dashboards, and track customer behavior.",
    points: ["CRM setup", "Dashboards", "Omnichannel workflows"],
  },
  brand: {
    badge: "Identity",
    title: "Brand Developing",
    copy: "Creating and nurturing a brand identity, from brandbook to PR, to establish a strong and distinctive presence in the specified market.",
    points: ["Brandbook and guidelines", "Rebranding", "Landing pages"],
  },
  influencer: {
    badge: "Coming soon",
    title: "Influencer Marketing",
    copy: "A strategy where businesses advertise through influential leaders, social platforms, and communities to reach a target market with stronger trust.",
    points: ["Influencer channels", "Community placements", "Campaign coordination"],
  },
};

const serviceHighlights = {
  lead: {
    kicker: "Lead generation",
    title: "Where Service Meets Excellence.",
    copy: "Let us help you.",
    image: "/assets/figma-05-image5_912_1604.png",
    alt: "Lead generation illustration",
  },
  demand: {
    kicker: "Demand generation",
    title: "Where Service Meets Excellence.",
    copy: "Let us help you.",
    image: "/assets/figma-14-image14_912_1604.png",
    alt: "Demand generation illustration",
  },
  consultancy: {
    kicker: "Consultancy and training",
    title: "Where Service Meets Excellence.",
    copy: "Let us help you.",
    image: "/assets/hero-site.jpeg",
    alt: "Consultancy and training illustration",
  },
  automation: {
    kicker: "Marketing automation",
    title: "Where Service Meets Excellence.",
    copy: "Let us help you.",
    image: "/assets/services-rup4.png",
    alt: "Marketing automation illustration",
  },
  brand: {
    kicker: "Brand developing",
    title: "Where Service Meets Excellence.",
    copy: "Let us help you.",
    image: "/assets/figma-08-image8_912_1604.png",
    alt: "Brand developing illustration",
  },
  influencer: {
    kicker: "Coming soon",
    title: "Where Service Meets Excellence.",
    copy: "Let us help you.",
    image: "/assets/recommendation-card.svg",
    alt: "Influencer marketing illustration",
  },
};

const faqs = [
  { question: "Who are our clients?", answer: "Mostly B2B and B2C teams that need structured marketing support." },
  { question: "Where do we operate?", answer: "We work globally, with projects across the US, Europe, MENA, and Asia." },
  { question: "How much do the services cost?", answer: "Pricing depends on scope, market, and growth goals." },
  { question: "What does full-cycle mean?", answer: "Strategy, execution, measurement, and optimization under one roof." },
];

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const serviceCards = document.querySelectorAll(".service-card");
const servicePromoKicker = document.querySelector("[data-service-promo-kicker]");
const servicePromoTitle = document.querySelector("[data-service-promo-title]");
const servicePromoCopy = document.querySelector("[data-service-promo-copy]");
const servicePromoImage = document.querySelector("[data-service-promo-image]");
const industryButtons = document.querySelectorAll("[data-industry]");
const industryList = document.querySelector("[data-industry-list]");
const industryImage = document.querySelector("[data-industry-image]");
const processButtons = document.querySelectorAll("[data-step]");
const processTrack = document.querySelector("[data-process-track]");
const processSlides = document.querySelectorAll(".process-slide");
const processPrev = document.querySelector("[data-process-prev]");
const processNext = document.querySelector("[data-process-next]");
const faqList = document.querySelector("[data-faq]");
const leadgenTabs = document.querySelector("[data-leadgen-tabs]");
const leadgenCalculator = document.querySelector("[data-leadgen-calculator]");
const modal = document.querySelector("[data-modal]");
const form = document.querySelector("#lead-form");
let activeProcessStep = 0;
let lastModalTrigger = null;
let lastSearchTrigger = null;

function syncBodyLock() {
  document.body.classList.toggle(
    "is-locked",
    Boolean(document.querySelector(".modal.is-open, .search-panel.is-open, .site-header.is-open")),
  );
}

function renderServiceHighlight(key) {
  const highlight = serviceHighlights[key] || serviceHighlights.lead;
  if (servicePromoKicker) servicePromoKicker.textContent = highlight.kicker;
  if (servicePromoTitle) servicePromoTitle.textContent = highlight.title;
  if (servicePromoCopy) servicePromoCopy.textContent = highlight.copy;
  if (servicePromoImage) {
    servicePromoImage.src = highlight.image;
    servicePromoImage.alt = highlight.alt;
  }
}

const searchItems = [
  { title: "Lead Generation", url: "/services/lead-generation/", description: "Outbound, databases, LinkedIn, email, scripts and campaign setup." },
  { title: "Demand Generation", url: "/services/demand-generation/", description: "Content, paid media, email marketing, webinars and community management." },
  { title: "Consultancy and Training", url: "/services/consultancy-and-training/", description: "Market analysis, audits, go-to-market strategy and team training." },
  { title: "Marketing Automation", url: "/services/marketing-automation/", description: "CRM setup, dashboards and omnichannel systems." },
  { title: "Brand Developing", url: "/services/brand-developing/", description: "Brandbook, rebranding, SEO, landing pages and websites." },
  { title: "About Ligeniqo", url: "/about/", description: "Company, values, team and achievements." },
  { title: "Pricing", url: "/#pricing", description: "Flexible pricing by scope and growth goals." },
  { title: "FAQ", url: "/#faq", description: "Common questions about services and process." },
];

function renderIndustries(key) {
  const industry = industries[key];
  industryList.innerHTML = industry.markets.map((item) => `<span>${item}</span>`).join("");

  if (industryImage.getAttribute("src") === industry.image) {
    industryImage.alt = industry.alt;
    return;
  }

  industryImage.classList.add("is-switching");
  const nextImage = new Image();
  nextImage.onload = () => {
    industryImage.src = industry.image;
    industryImage.alt = industry.alt;
    requestAnimationFrame(() => industryImage.classList.remove("is-switching"));
  };
  nextImage.src = industry.image;
}

function renderStep(index) {
  activeProcessStep = (index + processSlides.length) % processSlides.length;
  processButtons.forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.step) === activeProcessStep);
  });
  processTrack.style.transform = `translateX(-${processSlides[activeProcessStep].offsetLeft}px)`;
}

function renderFaqs() {
  faqList.innerHTML = faqs
    .map(
      (faq, index) => `
        <article class="faq-item ${index === 0 ? "is-open" : ""}">
          <button class="faq-question" type="button">
            <span>${faq.question}</span>
            <span>${index === 0 ? "−" : "+"}</span>
          </button>
          <div class="faq-answer">${faq.answer}</div>
        </article>
      `,
    )
    .join("");
}

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  syncBodyLock();
});

serviceCards.forEach((card) => {
  card.addEventListener("click", () => {
    serviceCards.forEach((c) => c.classList.remove("is-active"));
    card.classList.add("is-active");
    serviceCards.forEach((item) => item.setAttribute("aria-pressed", String(item === card)));
    renderServiceHighlight(card.dataset.serviceKey);
  });
});

renderServiceHighlight(document.querySelector(".service-card.is-active")?.dataset.serviceKey || "lead");

industryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    industryButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderIndustries(button.dataset.industry);
  });
});

processButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderStep(Number(button.dataset.step));
  });
});

if (processPrev && processNext) {
  processPrev.addEventListener("click", () => {
    renderStep(activeProcessStep - 1);
  });

  processNext.addEventListener("click", () => {
    renderStep(activeProcessStep + 1);
  });

  window.addEventListener("resize", () => {
    renderStep(activeProcessStep);
  });
}

if (faqList) {
  faqList.addEventListener("click", (event) => {
    const question = event.target.closest(".faq-question");
    if (!question) return;
    const item = question.closest(".faq-item");
    const wasOpen = item.classList.contains("is-open");
    document.querySelectorAll(".faq-item").forEach((faq) => {
      faq.classList.remove("is-open");
      const marker = faq.querySelector(".faq-question span:last-child");
      if (marker) marker.textContent = "+";
    });
    if (!wasOpen) {
      item.classList.add("is-open");
      const marker = question.querySelector("span:last-child");
      if (marker) marker.textContent = "−";
    }
  });
}

if (leadgenTabs) {
  const tabButtons = leadgenTabs.querySelectorAll("[data-leadgen-tab]");
  const tabPanels = leadgenTabs.querySelectorAll("[data-leadgen-panel]");

  const setLeadgenTab = (key) => {
    tabButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.leadgenTab === key));
    tabPanels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.leadgenPanel === key));
  };

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => setLeadgenTab(button.dataset.leadgenTab));
  });
}

if (leadgenCalculator) {
  const contactsInput = leadgenCalculator.querySelector("[data-calc-contacts]");
  const responseInput = leadgenCalculator.querySelector("[data-calc-response]");
  const demoInput = leadgenCalculator.querySelector("[data-calc-demo]");
  const closeInput = leadgenCalculator.querySelector("[data-calc-close]");
  const dealInput = leadgenCalculator.querySelector("[data-calc-deal]");
  const costInput = leadgenCalculator.querySelector("[data-calc-cost]");
  const responsesOutput = leadgenCalculator.querySelector("[data-calc-responses]");
  const demosOutput = leadgenCalculator.querySelector("[data-calc-demos]");
  const customersOutput = leadgenCalculator.querySelector("[data-calc-customers]");
  const revenueOutput = leadgenCalculator.querySelector("[data-calc-revenue]");
  const roiOutput = leadgenCalculator.querySelector("[data-calc-roi]");
  const contactsDisplay = leadgenCalculator.querySelector('[data-calc-display="contacts"]');
  const responseDisplay = leadgenCalculator.querySelector('[data-calc-display="response"]');
  const demoDisplay = leadgenCalculator.querySelector('[data-calc-display="demo"]');
  const closeDisplay = leadgenCalculator.querySelector('[data-calc-display="close"]');
  const dealDisplay = leadgenCalculator.querySelector('[data-calc-display="deal"]');
  const costDisplay = leadgenCalculator.querySelector('[data-calc-display="cost"]');
  const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const readNumber = (input, fallback = 0) => {
    const value = Number.parseFloat(input?.value);
    return Number.isFinite(value) ? value : fallback;
  };

  const formatPercent = (value) => `${Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1).replace(/\.0$/, "")}%`;

  const renderCalculator = () => {
    const contacts = readNumber(contactsInput, 0);
    const responseRate = readNumber(responseInput, 0) / 100;
    const demoRate = readNumber(demoInput, 0) / 100;
    const closeRate = readNumber(closeInput, 0) / 100;
    const dealValue = readNumber(dealInput, 0);
    const monthlyCost = readNumber(costInput, 0);

    const responses = contacts * responseRate;
    const demos = responses * demoRate;
    const customers = demos * closeRate;
    const revenue = customers * dealValue;
    const roi = monthlyCost > 0 ? ((revenue - monthlyCost) / monthlyCost) * 100 : 0;

    if (contactsDisplay) contactsDisplay.textContent = Math.round(contacts).toString();
    if (responseDisplay) responseDisplay.textContent = formatPercent(responseRate * 100);
    if (demoDisplay) demoDisplay.textContent = formatPercent(demoRate * 100);
    if (closeDisplay) closeDisplay.textContent = formatPercent(closeRate * 100);
    if (dealDisplay) dealDisplay.textContent = currency.format(dealValue);
    if (costDisplay) costDisplay.textContent = currency.format(monthlyCost);
    if (responsesOutput) responsesOutput.textContent = Math.round(responses).toString();
    if (demosOutput) demosOutput.textContent = demos.toFixed(1).replace(/\.0$/, "");
    if (customersOutput) customersOutput.textContent = customers.toFixed(1).replace(/\.0$/, "");
    if (revenueOutput) revenueOutput.textContent = currency.format(revenue);
    if (roiOutput) roiOutput.textContent = `${Math.round(roi)}%`;
  };

  [contactsInput, responseInput, demoInput, closeInput, dealInput, costInput].forEach((input) => {
    input?.addEventListener("input", renderCalculator);
  });

  renderCalculator();
}

function initSearchPanel() {
  const searchButtons = document.querySelectorAll(".search-button");
  if (!searchButtons.length) return;

  const panel = document.createElement("div");
  panel.className = "search-panel";
  panel.setAttribute("aria-hidden", "true");
  panel.innerHTML = `
    <div class="search-panel__box" role="dialog" aria-modal="true" aria-label="Site search">
      <div class="search-panel__top">
        <input type="search" placeholder="Search services, pricing, FAQ..." aria-label="Search query" />
        <button class="search-panel__close" type="button" aria-label="Close search">×</button>
      </div>
      <div class="search-panel__results"></div>
    </div>
  `;
  document.body.append(panel);

  const input = panel.querySelector("input");
  const results = panel.querySelector(".search-panel__results");
  const close = () => {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    syncBodyLock();
    if (lastSearchTrigger && typeof lastSearchTrigger.focus === "function") {
      lastSearchTrigger.focus();
    }
  };

  const handleKeydown = (event) => {
    if (event.key === "Escape") close();
  };

  const render = () => {
    const query = input.value.trim().toLowerCase();
    const matches = searchItems.filter((item) => {
      const haystack = `${item.title} ${item.description}`.toLowerCase();
      return !query || haystack.includes(query);
    }).slice(0, 6);
    results.innerHTML = matches.length
      ? matches.map((item) => `<a href="${item.url}">${item.title}<span>${item.description}</span></a>`).join("")
      : `<div class="search-panel__empty">No matches yet. Try “lead”, “CRM”, “pricing” or “FAQ”.</div>`;
  };

  searchButtons.forEach((button) => {
    button.addEventListener("click", () => {
      lastSearchTrigger = button;
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      render();
      input.focus();
      syncBodyLock();
    });
  });

  input.addEventListener("input", render);
  panel.querySelector(".search-panel__close").addEventListener("click", close);
  panel.addEventListener("click", (event) => {
    if (event.target === panel) close();
  });
  document.addEventListener("keydown", handleKeydown);
}

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    lastModalTrigger = button;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    syncBodyLock();
    const firstField = modal.querySelector("input, textarea, button");
    if (firstField) firstField.focus();
  });
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    syncBodyLock();
    if (lastModalTrigger && typeof lastModalTrigger.focus === "function") {
      lastModalTrigger.focus();
    }
  });
});

document.querySelectorAll("form").forEach((formEl) => {
  formEl.addEventListener("submit", (event) => {
    let note = formEl.querySelector("[data-form-note]");
    event.preventDefault();
    if (!note) {
      note = document.createElement("p");
      note.className = "form-note";
      note.dataset.formNote = "";
      formEl.append(note);
    }
    note.textContent = "Thanks. We will get back to you shortly.";
    formEl.reset();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (modal?.classList.contains("is-open")) {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    syncBodyLock();
    if (lastModalTrigger && typeof lastModalTrigger.focus === "function") {
      lastModalTrigger.focus();
    }
  }
  if (header?.classList.contains("is-open")) {
    header.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.focus();
    syncBodyLock();
  }
});

initSearchPanel();

if (industryList && industryImage && industryButtons.length) {
  renderIndustries("manufacturing");
}

if (processTrack && processSlides.length && processButtons.length) {
  renderStep(0);
}

if (faqList) {
  renderFaqs();
}

/* ── Globe markets section ── */
(function initMarketsGlobe() {
  const el = document.getElementById("globe");
  const tooltip = document.getElementById("globe-tooltip");
  if (!el || typeof Globe === "undefined") return;

  const targetCountries = new Set([
    "United Arab Emirates",
    "United States of America",
    "Singapore",
    "United Kingdom",
    "Portugal",
    "France",
    "Kazakhstan",
    "Russia",
    "Germany",
    "Australia",
  ]);

  const countryNames = {
    "United Arab Emirates": "UAE",
    "United States of America": "United States",
    "Singapore": "Singapore",
    "United Kingdom": "United Kingdom",
    "Portugal": "Portugal",
    "France": "France",
    "Kazakhstan": "Kazakhstan",
    "Russia": "CIS",
    "Germany": "Germany",
    "Australia": "Australia",
  };

  const projects = {
    "United Arab Emirates": "Statum Capital, Oncount, RETAILHUB, CODEVELOPMENT, Nevestate, Organic Mix, InTone",
    "United States of America": "Duck Fund, Immtech, Kinestex, EYRENE, Simple and Clear",
    "Singapore": "KILDE, TOTACHI",
    "United Kingdom": "Dapio, KP Pay",
    "Portugal": "Cryptoindex, Fasqon",
    "France": "Greenlock, Saga Houses",
    "Russia": "TECHNAXIS, Onkostrahovanie",
    "Kazakhstan": "CHOICE",
    "Germany": "Silberpappel",
    "Australia": "Platinum Fund",
  };

  const marketDots = [
    { lat: 25.2048, lng: 55.2708, label: "UAE", projects: 7 },
    { lat: 1.3521, lng: 103.8198, label: "Singapore", projects: 2 },
    { lat: 51.5074, lng: -0.1278, label: "United Kingdom", projects: 2 },
    { lat: 40.7128, lng: -74.006, label: "United States", projects: 5 },
    { lat: 38.7223, lng: -9.1393, label: "Portugal", projects: 2 },
    { lat: 48.8566, lng: 2.3522, label: "France", projects: 2 },
    { lat: 43.222, lng: 76.8512, label: "Kazakhstan", projects: 1 },
    { lat: 55.7558, lng: 37.6173, label: "CIS", projects: 2 },
    { lat: 52.52, lng: 13.405, label: "Germany", projects: 1 },
    { lat: -33.8688, lng: 151.2093, label: "Australia", projects: 1 },
  ];

  const globe = Globe()(el)
    .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
    .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
    .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
    .showGlobe(true)
    .showAtmosphere(true)
    .atmosphereColor("#0b0aa3")
    .atmosphereAltitude(0.18)
    .polygonCapColor((d) => {
      if (targetCountries.has(d.properties.name)) {
        return "rgba(2, 210, 254, 0.25)";
      }
      return "rgba(255, 255, 255, 0.02)";
    })
    .polygonSideColor(() => "rgba(2, 210, 254, 0.08)")
    .polygonStrokeColor((d) => {
      if (targetCountries.has(d.properties.name)) {
        return "rgba(2, 210, 254, 0.6)";
      }
      return "rgba(255, 255, 255, 0.04)";
    })
    .polygonLabel(
      (d) => {
        const name = countryNames[d.properties.name] || d.properties.name;
        const projs = projects[d.properties.name];
        if (!projs) return "";
        return `<div style="font-family:Lato,sans-serif;padding:8px 12px;background:rgba(255,255,255,0.95);border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,0.12);max-width:260px"><strong style="color:#0b0aa3">${name}</strong><br/><span style="font-size:12px;color:#425466;line-height:1.4">${projs}</span></div>`;
      }
    )
    .onPolygonHover((polygon) => {
      el.style.cursor = polygon && targetCountries.has(polygon?.properties?.name) ? "pointer" : "default";
    })
    .pointAltitude(0.08)
    .pointRadius(0.3)
    .pointColor(() => "#02d2fe")
    .pointsData(marketDots)
    .pointLabel(
      (d) => `<div style="font-family:Lato,sans-serif;padding:6px 10px;background:rgba(255,255,255,0.95);border-radius:6px;font-weight:700;font-size:13px;box-shadow:0 2px 10px rgba(0,0,0,0.12);color:#0b0aa3">${d.label} — ${d.projects} project${d.projects > 1 ? "s" : ""}</div>`
    );

  fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
    .then((r) => r.json())
    .then((data) => {
      globe.polygonsData(data.features);
    });

  globe.pointOfView({ lat: 25, lng: 40, altitude: 2.0 }, 0);
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.25;
  globe.controls().enableZoom = false;
  globe.controls().enablePan = false;

  /* Card hover → fly to country */
  const cards = document.querySelectorAll(".market-card");
  const cardCoords = {
    ARE: { lat: 25, lng: 55 },
    USA: { lat: 39, lng: -98 },
    SGP: { lat: 1.35, lng: 103.8 },
    GBR: { lat: 54, lng: -2 },
    PRT: { lat: 39.5, lng: -8 },
    FRA: { lat: 46.5, lng: 2.5 },
    RUS: { lat: 60, lng: 40 },
    KAZ: { lat: 48, lng: 67 },
    DEU: { lat: 51, lng: 10 },
    AUS: { lat: -25, lng: 134 },
  };

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const code = card.dataset.country;
      const coords = cardCoords[code];
      if (coords) {
        globe.pointOfView({ lat: coords.lat, lng: coords.lng, altitude: 1.8 }, 700);
      }
    });
    card.addEventListener("mouseleave", () => {
      globe.pointOfView({ lat: 25, lng: 40, altitude: 2.0 }, 900);
    });
  });
})();
