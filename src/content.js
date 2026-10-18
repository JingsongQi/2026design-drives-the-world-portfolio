export const places = [
  {
    id: "hengshui",
    city: "Hengshui",
    label: "Hengshui",
    coords: [37.7353, 115.6659],
    year: "Birthplace · Origin",
    title: "Hengshui",
    description:
      "My hometown and birthplace. Hengshui is where my earliest memories, daily observations, and first sense of objects began.",
    role: "Origin, memory, early observation",
    output: "Personal foundation",
    tags: ["Birthplace", "Hometown", "Origin", "Observation"],
    colors: ["rgba(56, 189, 248, 0.72)", "rgba(120, 242, 189, 0.58)"],
    cover: "./assets/places/hengshui/hengshui-lake.jpg",
    gallery: [
      "./assets/places/hengshui/hengshui-lake.jpg",
      "./assets/places/hengshui/old-town-bridge.jpg",
      "./assets/places/hengshui/skyline.jpg",
      "./assets/places/hengshui/high-school.jpg",
    ],
  },
  {
    id: "shanghai",
    city: "Shanghai",
    label: "Shanghai",
    coords: [31.2304, 121.4737],
    year: "Portfolio Project",
    title: "IC AR Glasses System",
    description: "The next generation of AR glasses system, exploring wearable interaction and future device ecosystems.",
    role: "Product system, interaction thinking, industrial design",
    output: "AR glasses system",
    tags: ["AR", "Wearable", "Product system"],
    colors: ["rgba(56, 189, 248, 0.72)", "rgba(255, 191, 87, 0.7)"],
    cover: "./assets/projects/ic-ar-glasses-system.png",
    gallery: [
      "./assets/projects/ic-ar-glasses-system.png",
      "./assets/projects/ic-ar-glasses-system-02.png",
      "./assets/projects/ic-ar-glasses-system-03.png",
    ],
    sourceUrl: "https://kingsdesign.framer.website/ic-ar-glasses-system",
  },
  {
    id: "shenzhen",
    city: "Shenzhen",
    label: "Shenzhen",
    coords: [22.5431, 114.0579],
    year: "Portfolio Project",
    title: "Cartpal",
    description: "A self-checkout system designed for Costco, focused on improving the retail checkout experience.",
    role: "Service system, UX thinking, product design",
    output: "Self-checkout system",
    tags: ["Retail", "Checkout", "Service design"],
    colors: ["rgba(56, 189, 248, 0.7)", "rgba(120, 242, 189, 0.64)"],
    cover: "./assets/projects/cartpal.png",
    gallery: ["./assets/projects/cartpal.png", "./assets/projects/cartpal-02.png", "./assets/projects/cartpal-03.png"],
    sourceUrl: "https://kingsdesign.framer.website/cartpal",
  },
  {
    id: "san-jose",
    city: "San Jose",
    label: "San Jose",
    coords: [37.3382, -121.8863],
    year: "Portfolio Project",
    title: "Project Y",
    description: "A conceptual ankle brace designed for Adidas, exploring sports protection, comfort, and product identity.",
    role: "Industrial design, sports product concept, form development",
    output: "Conceptual ankle brace",
    tags: ["Sports product", "Adidas", "Wearable support"],
    colors: ["rgba(255, 107, 107, 0.68)", "rgba(255, 191, 87, 0.66)"],
    cover: "./assets/projects/project-y.png",
    gallery: ["./assets/projects/project-y.png", "./assets/projects/project-y-02.png", "./assets/projects/project-y-03.png"],
    sourceUrl: "https://kingsdesign.framer.website/projecty",
  },
  {
    id: "new-york",
    city: "New York",
    label: "New York",
    coords: [40.7128, -74.006],
    year: "Portfolio Project",
    title: "Luminhub",
    description:
      "A multifunctional bus stop sign with a unified design style for the New York transit system.",
    role: "Urban product design, transit system research, visual language",
    output: "Multifunctional bus stop sign",
    tags: ["Transit", "New York", "Public infrastructure"],
    colors: ["rgba(120, 242, 189, 0.72)", "rgba(56, 189, 248, 0.58)"],
    cover: "./assets/projects/luminhub.png",
    gallery: ["./assets/projects/luminhub.png", "./assets/projects/luminhub-02.png", "./assets/projects/luminhub-03.png"],
    sourceUrl: "https://kingsdesign.framer.website/luminhub",
  },
  {
    id: "london",
    city: "London",
    label: "London",
    coords: [51.5074, -0.1278],
    year: "Portfolio Project",
    title: "Shy Onion",
    description: "A cyber-physical systems project exploring responsive behavior between digital logic and physical interaction.",
    role: "Cyber-physical system, interaction prototype, speculative design",
    output: "Interactive system concept",
    tags: ["Cyber Physical Systems", "Interaction", "Prototype"],
    colors: ["rgba(255, 191, 87, 0.68)", "rgba(255, 255, 255, 0.52)"],
    cover: "./assets/projects/shy-onion.png",
    gallery: ["./assets/projects/shy-onion.png", "./assets/projects/shy-onion-02.png", "./assets/projects/shy-onion-03.png"],
    sourceUrl: "https://kingsdesign.framer.website/shy-onion",
  },
];

export const journeyStops = [
  {
    placeId: "hengshui",
    city: "Hengshui",
    phase: "Origin",
    title: "Where I Was Born",
    description:
      "Hengshui is my starting point. It shaped my earliest memories of family, daily life, and the quiet details that later became part of how I observe design.",
  },
  {
    placeId: "shanghai",
    city: "Shanghai",
    phase: "First Expansion",
    title: "Seeing a Larger Design World",
    description:
      "Shanghai represents my first step into a faster, denser, and more contemporary design environment, where products, cities, and people move with a different rhythm.",
  },
  {
    placeId: "san-jose",
    city: "San Jose",
    phase: "Undergraduate Foundation",
    title: "Building My Industrial Design Base",
    description:
      "San Jose became the place where I developed my industrial design foundation, from sketching and modeling to prototyping and understanding products as systems.",
  },
  {
    placeId: "new-york",
    city: "New York",
    phase: "Graduate Study",
    title: "Designing With More Complexity",
    description:
      "New York pushed my work into broader questions: public systems, user behavior, manufacturing, technology, and how design decisions live in the real world.",
  },
  {
    placeId: "london",
    city: "London",
    phase: "Global Innovation Design",
    title: "Learning Across Cultures",
    description:
      "London opened a more global way of thinking, connecting design with innovation, research, and collaboration across different cultures and disciplines.",
  },
  {
    placeId: "new-york",
    city: "New York",
    phase: "Practice And Refinement",
    title: "Turning Ideas Into Stronger Work",
    description:
      "Returning to New York, I refined my process through projects, workshops, teaching, and hands-on making, becoming more precise about what kind of designer I want to be.",
  },
  {
    placeId: "san-jose",
    city: "San Jose",
    phase: "Next Chapter",
    title: "Connecting Back To Product Practice",
    description:
      "San Jose closes this current loop as a place connected to product practice, technology, and the next stage of my industrial design career.",
  },
];

const hxxProject = {
  id: "m01-portable-charger",
  year: "09/2024–12/2024",
  title: "M01",
  description: "A versatile portable charger developed for HYX, combining a compact geometric form with a precise monochrome visual language.",
  role: "Industrial design, form development, visualization",
  output: "Portable charger",
  tags: ["Product Design", "Form Development", "Visualization"],
  colors: ["rgba(32, 32, 32, 0.72)", "rgba(0, 47, 167, 0.5)"],
  cover: "./assets/projects/hxx-product.png",
  gallery: ["./assets/projects/hxx-product.png"],
  cardSubtitle: "A versatile portable charger",
  client: "HYX",
  clientLogo: "./assets/projects/hyx-logo.jpg",
  designers: ["Jingsong Qi", "Yunqi Wang", "Yuancong Jing"],
};

// Dates and artwork bounds come from the original portfolio cover sheets.
const projectCards = {
  "ic-ar-glasses-system": {
    cardTitle: "IC",
    cardDate: "09/2024\u201305/2025",
    cardContext: { label: "Focus", value: "Wearables" },
    cardArtwork: { x: 634, y: 221, width: 865, height: 458, sourceWidth: 1600, sourceHeight: 900, background: "#000", indexColor: "#fff" },
  },
  cartpal: {
    cardDate: "01/2024\u201305/2024",
    client: "Costco",
    cardArtwork: { x: 865, y: 160, width: 1183, height: 905, sourceWidth: 2048, sourceHeight: 1152, background: "#eee" },
  },
  "project-y": {
    cardDate: "01/2022\u201305/2022",
    client: "Adidas",
    cardArtwork: { x: 895, y: 0, width: 1153, height: 1152, sourceWidth: 2048, sourceHeight: 1152, background: "#eee" },
  },
  luminhub: {
    cardDate: "01/2024\u201305/2024",
    cardContext: { label: "Context", value: "New York" },
    cardArtwork: { x: 1020, y: 120, width: 1028, height: 1032, sourceWidth: 2048, sourceHeight: 1152, background: "#eee" },
  },
  "shy-onion": {
    cardDate: "01/2024\u201305/2024",
    cardContext: { label: "Focus", value: "Interaction" },
    cardArtwork: { x: 1030, y: 0, width: 1018, height: 1152, sourceWidth: 2048, sourceHeight: 1152, background: "#eee" },
  },
};

// Project identity and routing are independent of the cities on the globe.
export const projects = [
  hxxProject,
  ...places.filter((place) => place.sourceUrl).map((place) => {
    const id = place.cover.split("/").pop().replace(".png", "");
    return { ...place, id, ...projectCards[id], designers: ["Jingsong Qi"] };
  }),
];

