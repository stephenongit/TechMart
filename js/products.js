/**
 * TechMart Product Catalog Data
 * Comprehensive collection of Laptops, Smartphones, Tablets, Smart Appliances, and Wearables.
 */

const PRODUCTS_DATA = [
  // --- LAPTOPS ---
  {
    id: "lap-01",
    name: "MacBook Pro 16\" M3 Max",
    category: "laptops",
    brand: "Apple",
    price: 3499,
    originalPrice: 3899,
    rating: 4.9,
    reviewCount: 312,
    badge: "Bestseller",
    inStock: true,
    stockCount: 14,
    featured: true,
    flashSale: true,
    shortDesc: "Liquid Retina XDR display, 36GB Unified Memory, 1TB SSD, Space Black.",
    description: "Engineered for extreme pro workflows. Powered by the M3 Max chip with a 16-core CPU and up to 40-core GPU, stunning 16.2-inch Liquid Retina XDR screen with 120Hz ProMotion, and up to 22 hours of battery life.",
    specs: {
      "Processor": "Apple M3 Max (16-core CPU)",
      "Graphics": "40-core GPU, Hardware-accelerated Ray Tracing",
      "Memory": "36GB Unified RAM",
      "Storage": "1TB Superfast PCIe Gen4 SSD",
      "Display": "16.2\" Liquid Retina XDR (3456x2234), 120Hz ProMotion",
      "Battery": "Up to 22 hours, 140W USB-C Fast Charger",
      "Weight": "2.16 kg (4.8 lbs)"
    },
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Space Black", "Silver"]
  },
  {
    id: "lap-02",
    name: "Dell XPS 16 OLED Ultra",
    category: "laptops",
    brand: "Dell",
    price: 2499,
    originalPrice: 2799,
    rating: 4.7,
    reviewCount: 184,
    badge: "Sale -11%",
    inStock: true,
    stockCount: 9,
    featured: true,
    flashSale: false,
    shortDesc: "Intel Core Ultra 9, RTX 4070 8GB, 4K+ OLED Touchscreen, 32GB RAM.",
    description: "Seamless futuristic glass touch bar and haptic trackpad. The Dell XPS 16 brings cutting edge Intel Core Ultra 9 AI processing paired with a jaw-dropping 4K+ InfinityEdge OLED panel.",
    specs: {
      "Processor": "Intel Core Ultra 9 185H (16 cores, 5.1GHz)",
      "Graphics": "NVIDIA GeForce RTX 4070 (8GB GDDR6)",
      "Memory": "32GB LPDDR5X 7467MHz",
      "Storage": "1TB NVMe M.2 SSD",
      "Display": "16.3\" 4K+ (3840x2400) OLED Touch, 400 nits",
      "Battery": "99.5Wh with 130W Type-C adapter",
      "Weight": "2.2 kg (4.85 lbs)"
    },
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Platinum Silver", "Graphite"]
  },
  {
    id: "lap-03",
    name: "ASUS ROG Zephyrus G16 Gaming",
    category: "laptops",
    brand: "Asus",
    price: 2199,
    originalPrice: 2399,
    rating: 4.8,
    reviewCount: 220,
    badge: "Gaming Beast",
    inStock: true,
    stockCount: 12,
    featured: false,
    flashSale: true,
    shortDesc: "ROG Nebula OLED 240Hz, Core Ultra 9, RTX 4080, CNC Aluminum Chassis.",
    description: "The thinnest and most luxurious gaming laptop on the market. Featuring Slash Lighting on the lid, OLED 2.5K 240Hz display, and ultra-quiet vapor chamber cooling.",
    specs: {
      "Processor": "Intel Core Ultra 9 185H",
      "Graphics": "NVIDIA GeForce RTX 4080 12GB (115W TGP)",
      "Memory": "32GB LPDDR5X",
      "Storage": "2TB PCIe 4.0 NVMe SSD",
      "Display": "16\" 2.5K (2560x1600) ROG Nebula OLED, 240Hz, 0.2ms",
      "Battery": "90Wh fast charge to 50% in 30 mins",
      "Weight": "1.85 kg (4.07 lbs)"
    },
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544731612-de292439cc4b?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Eclipse Gray", "Platinum White"]
  },
  {
    id: "lap-04",
    name: "Lenovo ThinkPad X1 Carbon Gen 12",
    category: "laptops",
    brand: "Lenovo",
    price: 1899,
    originalPrice: 2099,
    rating: 4.6,
    reviewCount: 140,
    badge: "Business Pro",
    inStock: true,
    stockCount: 18,
    featured: false,
    flashSale: false,
    shortDesc: "Ultra-lightweight carbon fiber, Intel Evo Core Ultra 7, 2.8K OLED.",
    description: "The gold standard of enterprise mobility. Crafted with carbon fiber and recycled magnesium, weighing just 1.09 kg with legendary ThinkPad keyboard ergonomics and military-spec durability.",
    specs: {
      "Processor": "Intel Core Ultra 7 155H",
      "Graphics": "Intel Arc Graphics",
      "Memory": "32GB LPDDR5X",
      "Storage": "1TB SSD PCIe Gen4",
      "Display": "14\" 2.8K (2880x1800) OLED 120Hz Anti-Glare",
      "Battery": "57Wh, Rapid Charge support",
      "Weight": "1.09 kg (2.42 lbs)"
    },
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Deep Black Carbon"]
  },

  // --- SMARTPHONES ---
  {
    id: "ph-01",
    name: "iPhone 16 Pro Max Titanium",
    category: "phones",
    brand: "Apple",
    price: 1199,
    originalPrice: 1299,
    rating: 4.9,
    reviewCount: 520,
    badge: "Trending",
    inStock: true,
    stockCount: 25,
    featured: true,
    flashSale: true,
    shortDesc: "A18 Pro Chip, Grade 5 Titanium, 48MP Camera System with Camera Control button.",
    description: "The most powerful iPhone ever. Grade 5 titanium design with razor-thin borders, 6.9-inch Super Retina XDR display, innovative Camera Control button, and next-generation 4K 120 fps Dolby Vision recording.",
    specs: {
      "Chip": "Apple A18 Pro 3nm with 6-core GPU",
      "Camera": "Triple 48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto",
      "Display": "6.9\" Super Retina XDR OLED ProMotion 1-120Hz",
      "Storage": "256GB / 512GB / 1TB NVMe",
      "Battery": "Up to 33 hours video playback, MagSafe 25W",
      "Features": "Camera Control, Action Button, Ceramic Shield, USB-C 3.0"
    },
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Natural Titanium", "Desert Titanium", "Black Titanium", "White Titanium"]
  },
  {
    id: "ph-02",
    name: "Samsung Galaxy S24 Ultra AI",
    category: "phones",
    brand: "Samsung",
    price: 1299,
    originalPrice: 1419,
    rating: 4.8,
    reviewCount: 410,
    badge: "Galaxy AI",
    inStock: true,
    stockCount: 16,
    featured: true,
    flashSale: true,
    shortDesc: "Snapdragon 8 Gen 3, 200MP Quad Tele, S-Pen included, Flat Titanium Frame.",
    description: "Welcome to the era of mobile AI. Featuring Galaxy AI live translate, Circle to Search with Google, a monstrous 200MP camera with 100x Space Zoom, and an anti-reflective Gorilla Armor glass display.",
    specs: {
      "Chip": "Qualcomm Snapdragon 8 Gen 3 for Galaxy",
      "Camera": "200MP Wide + 50MP 5x Periscope + 10MP 3x + 12MP Ultra-wide",
      "Display": "6.8\" Dynamic AMOLED 2X, QHD+ 2600 nits, 120Hz",
      "RAM / Storage": "12GB RAM, 512GB UFS 4.0",
      "Battery": "5000 mAh, 45W Super Fast Charging",
      "Features": "Built-in S-Pen Stylus, Titanium Shield, IP68"
    },
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Titanium Gray", "Titanium Violet", "Titanium Yellow", "Titanium Black"]
  },
  {
    id: "ph-03",
    name: "Google Pixel 9 Pro XL",
    category: "phones",
    brand: "Google",
    price: 1099,
    originalPrice: 1199,
    rating: 4.7,
    reviewCount: 195,
    badge: "Gemini AI Built-in",
    inStock: true,
    stockCount: 20,
    featured: false,
    flashSale: false,
    shortDesc: "Google Tensor G4, Super Actua Display, Pro Triple Camera with Magic Editor.",
    description: "Google's sleekest flagship with custom Tensor G4 processor and 16GB RAM tuned specifically for Gemini AI on-device tasks. Incredible computational photography and 7 years of OS updates guaranteed.",
    specs: {
      "Chip": "Google Tensor G4 with Titan M2 security coprocessor",
      "Camera": "50MP Wide + 48MP 5x Telephoto + 48MP Ultra-wide with Macro",
      "Display": "6.8\" Super Actua LTPO OLED (1-120Hz), 3000 nits peak",
      "RAM / Storage": "16GB RAM, 256GB Storage",
      "Battery": "5060 mAh, 37W wired, 23W wireless",
      "Features": "Magic Editor, Best Take, Add Me, Audio Magic Eraser"
    },
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Obsidian", "Porcelain", "Hazel", "Rose Quartz"]
  },
  {
    id: "ph-04",
    name: "OnePlus 12 Hasselblad Flagship",
    category: "phones",
    brand: "OnePlus",
    price: 799,
    originalPrice: 899,
    rating: 4.8,
    reviewCount: 165,
    badge: "Value Flagship",
    inStock: true,
    stockCount: 15,
    featured: false,
    flashSale: true,
    shortDesc: "Snapdragon 8 Gen 3, 5400mAh Battery with 100W SuperVOOC, 4th Gen Hasselblad.",
    description: "True flagship performance at an unbeatable price point. Features an astonishing 4500-nit ProXDR display, rapid 100W charging in 26 minutes, and Hasselblad color tuning.",
    specs: {
      "Chip": "Snapdragon 8 Gen 3",
      "Camera": "50MP Sony LYT-808 + 64MP 3x Periscope + 48MP Ultra-wide",
      "Display": "6.82\" 2K 120Hz ProXDR LTPO AMOLED",
      "RAM / Storage": "16GB LPDDR5X, 512GB UFS 4.0",
      "Battery": "5400 mAh Dual-cell, 100W SuperVOOC Charger in box",
      "Features": "Aqua Touch screen, IR Blaster, Alert Slider"
    },
    images: [
      "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Emerald Green", "Silky Black"]
  },

  // --- TABLETS ---
  {
    id: "tab-01",
    name: "iPad Pro 13\" M4 Ultra-Thin OLED",
    category: "tablets",
    brand: "Apple",
    price: 1299,
    originalPrice: 1399,
    rating: 4.9,
    reviewCount: 280,
    badge: "Ultra Thin 5.1mm",
    inStock: true,
    stockCount: 11,
    featured: true,
    flashSale: false,
    shortDesc: "Breakthrough M4 Chip, Tandem OLED Ultra Retina XDR, Apple Pencil Pro Ready.",
    description: "The thinnest Apple product ever made at just 5.1 mm! Introducing the world's most advanced Tandem OLED display technology paired with the powerhouse Apple M4 silicon.",
    specs: {
      "Chip": "Apple M4 chip (9-core CPU, 10-core GPU, 16-core NPU)",
      "Display": "13\" Tandem OLED Ultra Retina XDR (2752x2064), 1600 nits peak",
      "Storage": "256GB / 512GB / 1TB NVMe",
      "Audio": "Four studio mics and four speaker sound system",
      "Accessories": "Apple Pencil Pro, Magic Keyboard with function row (sold separately)",
      "Thickness & Weight": "5.1mm thin, 579g"
    },
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Space Black", "Silver"]
  },
  {
    id: "tab-02",
    name: "Samsung Galaxy Tab S9 Ultra 14.6\"",
    category: "tablets",
    brand: "Samsung",
    price: 1199,
    originalPrice: 1319,
    rating: 4.8,
    reviewCount: 175,
    badge: "Waterproof IP68",
    inStock: true,
    stockCount: 8,
    featured: false,
    flashSale: true,
    shortDesc: "Colossal 14.6\" Dynamic AMOLED 2X, S-Pen included in box, IP68 water resistance.",
    description: "Transform your tablet into an expansive mobile workstation. Dynamic AMOLED 2X screen with Vision Booster, bundled IP68 S Pen stylus, and Samsung DeX desktop mode.",
    specs: {
      "Processor": "Snapdragon 8 Gen 2 for Galaxy",
      "Display": "14.6\" Dynamic AMOLED 2X, 2960x1848, 120Hz",
      "RAM / Storage": "12GB RAM, 512GB Expandable via MicroSD up to 1TB",
      "Durability": "Armor Aluminum frame, IP68 water & dust resistant",
      "Battery": "11,200 mAh massive capacity with 45W fast charging",
      "Included": "S-Pen Stylus with ultra-low latency"
    },
    images: [
      "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Graphite", "Beige"]
  },
  {
    id: "tab-03",
    name: "Microsoft Surface Pro 11 Copilot+ PC",
    category: "tablets",
    brand: "Microsoft",
    price: 1199,
    originalPrice: 1299,
    rating: 4.7,
    reviewCount: 95,
    badge: "Copilot+ PC",
    inStock: true,
    stockCount: 14,
    featured: false,
    flashSale: false,
    shortDesc: "Snapdragon X Elite, 13\" 120Hz OLED, 45 TOPS NPU for AI, All-day battery.",
    description: "The 2-in-1 laptop-tablet reimagined. Powered by Snapdragon X Elite architecture with 45 TOPS NPU, running native Windows 11 with instantaneous resume and unmatched battery efficiency.",
    specs: {
      "Processor": "Snapdragon X Elite (12 cores) with 45 TOPS NPU",
      "Display": "13\" PixelSense Flow OLED 120Hz, 3:2 aspect ratio",
      "Memory": "16GB LPDDR5X",
      "Storage": "512GB Removable Gen4 SSD",
      "Battery": "Up to 14 hours active video playback",
      "Connectivity": "Dual USB4 / Thunderbolt 4 compatible Type-C ports, Wi-Fi 7"
    },
    images: [
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Sapphire Blue", "Platinum", "Dune Gold", "Black"]
  },

  // --- SMART APPLIANCES & SMART HOME ---
  {
    id: "app-01",
    name: "Dyson V15 Detect Cordless Vacuum",
    category: "appliances",
    brand: "Dyson",
    price: 749,
    originalPrice: 849,
    rating: 4.9,
    reviewCount: 430,
    badge: "Smart Laser",
    inStock: true,
    stockCount: 17,
    featured: true,
    flashSale: true,
    shortDesc: "Illuminates invisible dust with laser, Piezo sensor particle count display.",
    description: "Dyson's most intelligent cordless vacuum. Features a precisely-angled laser optic cleaner head revealing microscopic particles, acoustic piezo sensor that automatically reacts to dirt level, and LCD screen showing proof of deep clean.",
    specs: {
      "Suction Power": "240 Air Watts, Hyperdymium Motor spinning at 125,000 RPM",
      "Run Time": "Up to 60 minutes of fade-free power",
      "Filtration": "Whole-machine HEPA filtration traps 99.99% of particles to 0.1 microns",
      "Bin Volume": "0.77 Liters with 'Point and Shoot' hygienic bin emptying",
      "Weight": "3.1 kg (6.8 lbs)",
      "Smart Display": "Real-time LCD shows battery countdown and dust particle counts"
    },
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Iron / Yellow / Nickel"]
  },
  {
    id: "app-02",
    name: "Philips Smart Connected Air Fryer XXL",
    category: "appliances",
    brand: "Philips",
    price: 279,
    originalPrice: 329,
    rating: 4.8,
    reviewCount: 310,
    badge: "Hot Deal",
    inStock: true,
    stockCount: 22,
    featured: false,
    flashSale: true,
    shortDesc: "Rapid Air Tech, 7.2L Family Capacity, NutriU WiFi App Control, Fat Removal.",
    description: "Fry, bake, grill, roast and reheat with up to 90% less fat. Connected to your smartphone via NutriU app so you can monitor cooking progress from anywhere, with 16-in-1 versatile preset cooking modes.",
    specs: {
      "Capacity": "7.2 Liters / 1.4 kg (serves up to 6 people)",
      "Power": "2000 Watts Rapid CombiAir Technology",
      "Connectivity": "Wi-Fi enabled, Alexa & Google Assistant compatible",
      "Temperature Range": "40°C to 200°C with food thermometer included",
      "Cleaning": "QuickClean basket with non-stick coating, dishwasher safe parts"
    },
    images: [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Matte Black with Rose Gold Accents"]
  },
  {
    id: "app-03",
    name: "LG Smart InstaView Multi-Door Refrigerator",
    category: "appliances",
    brand: "LG",
    price: 2999,
    originalPrice: 3499,
    rating: 4.9,
    reviewCount: 88,
    badge: "Premium Home",
    inStock: true,
    stockCount: 5,
    featured: true,
    flashSale: false,
    shortDesc: "Knock twice to see inside, Craft Ice maker, ThinQ WiFi Smart Diagnostics.",
    description: "Knock twice on the sleek mirrored glass panel to illuminate the contents without opening the door and losing cold air. Features dual ice makers producing slow-melting spherical Craft Ice for craft drinks.",
    specs: {
      "Total Capacity": "30 cu. ft. (850 Liters)",
      "Cooling Tech": "Linear Cooling ±0.5°C with Door Cooling+",
      "Ice System": "Dual Ice Maker with Craft Ice spheres + crushed/cubed",
      "Smart Tech": "LG ThinQ Wi-Fi control, Smart Diagnosis, Sabbath Mode",
      "Finish": "PrintProof Stainless Steel resistant to fingerprints and smudges"
    },
    images: [
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Stainless Steel", "Matte Black Stainless"]
  },
  {
    id: "app-04",
    name: "iRobot Roomba Combo j9+ Robot Vacuum & Mop",
    category: "appliances",
    brand: "iRobot",
    price: 999,
    originalPrice: 1249,
    rating: 4.7,
    reviewCount: 160,
    badge: "Auto Empty & Fill",
    inStock: true,
    stockCount: 10,
    featured: false,
    flashSale: true,
    shortDesc: "Clean Base auto empties dirt for 60 days & refills mop liquid for 30 days.",
    description: "The ultimate hands-free 2-in-1 cleaning powerhouse. Automatically detects carpets and retracts mop pads to keep rugs bone dry. PrecisionVision navigation avoids pet waste, charging cords, and shoes.",
    specs: {
      "Cleaning Mode": "Simultaneous 4-Stage vacuum and wet mop",
      "Clean Base Dock": "Auto-empties dirt for 60 days + auto-refills liquid tank",
      "Navigation": "PrecisionVision AI with obstacle recognition and room mapping",
      "Suction": "100% more power-lifting suction than 600 series",
      "Smart Integrations": "iRobot OS, Apple Siri, Alexa, Google Home"
    },
    images: [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Warm Wood Bronze & Black"]
  },
  {
    id: "app-05",
    name: "De'Longhi Magnifica Smart Espresso Machine",
    category: "appliances",
    brand: "De'Longhi",
    price: 899,
    originalPrice: 1049,
    rating: 4.8,
    reviewCount: 235,
    badge: "Barista Choice",
    inStock: true,
    stockCount: 12,
    featured: false,
    flashSale: false,
    shortDesc: "Bean-to-cup automatic espresso, integrated burr grinder, LatteCrema foam.",
    description: "Enjoy cafe-quality Italian espresso, cappuccino, and latte macchiato at the touch of a button. Features 13 grind settings, active temperature control, and automated self-cleaning milk carafe.",
    specs: {
      "Grinder": "Integrated conical steel burr grinder with 13 settings",
      "Pressure": "15 Bar professional extraction pump",
      "Milk Frothing": "LatteCrema Automatic frothing system for silky microfoam",
      "Interface": "Intuitive soft-touch color icon display",
      "Water Tank": "1.8 Liters removable front-loading tank with filter"
    },
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Titanium Silver", "Piano Black"]
  },

  // --- WEARABLES & AUDIO ---
  {
    id: "aud-01",
    name: "Sony WH-1000XM5 Wireless ANC Headphones",
    category: "audio",
    brand: "Sony",
    price: 348,
    originalPrice: 399,
    rating: 4.9,
    reviewCount: 890,
    badge: "Top Rated ANC",
    inStock: true,
    stockCount: 30,
    featured: true,
    flashSale: true,
    shortDesc: "Industry-leading noise cancellation with 8 mics, 30hr battery, LDAC High-Res.",
    description: "Immerse yourself in crystal clear music with dual processors controlling eight microphones for unmatched noise cancellation. Ultra-lightweight soft fit leather headband and speak-to-chat automation.",
    specs: {
      "Driver": "30mm precision-engineered carbon fiber composite driver",
      "Noise Cancellation": "Auto NC Optimizer with Integrated Processor V1 + HD QN1",
      "Battery Life": "30 hours with ANC on (3 hours play on 3-min quick charge)",
      "Codecs Supported": "LDAC, AAC, SBC with DSEE Extreme AI upscaling",
      "Weight": "250 grams"
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Silver Cream", "Midnight Black", "Midnight Blue"]
  },
  {
    id: "aud-02",
    name: "Apple AirPods Max Spatial Audio",
    category: "audio",
    brand: "Apple",
    price: 499,
    originalPrice: 549,
    rating: 4.7,
    reviewCount: 650,
    badge: "Luxury Sound",
    inStock: true,
    stockCount: 19,
    featured: false,
    flashSale: false,
    shortDesc: "Computational audio, dynamic head tracking, anodized aluminum ear cups.",
    description: "An incredible balance of exhilarating high-fidelity audio and the effortless magic of Apple ecosystem. Designed with a breathable knit mesh canopy and memory foam acoustic ear cushions.",
    specs: {
      "Chip": "Apple H1 headphone chip in each ear cup",
      "Acoustics": "Apple-designed dynamic driver with neodymium ring magnets",
      "Spatial Audio": "Personalized Spatial Audio with dynamic head tracking",
      "Battery": "Up to 20 hours listening time with ANC enabled",
      "Material": "Anodized aluminum cups, stainless steel frame"
    },
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Space Gray", "Silver", "Sky Blue", "Pink", "Green"]
  },
  {
    id: "aud-03",
    name: "Apple Watch Ultra 2 Titanium 49mm",
    category: "audio",
    brand: "Apple",
    price: 799,
    originalPrice: 849,
    rating: 4.9,
    reviewCount: 380,
    badge: "Rugged Adventure",
    inStock: true,
    stockCount: 14,
    featured: true,
    flashSale: true,
    shortDesc: "S9 SiP, 3000-nit display, Double Tap gesture, 100m water resistance, Dive ready.",
    description: "The ultimate sports and adventure watch. Aerospace-grade 49mm titanium case, precision dual-frequency GPS, up to 72 hours in Low Power Mode, and certified EN13319 dive computer capability.",
    specs: {
      "Case": "49mm Aerospace-Grade Titanium, Sapphire crystal glass",
      "Display": "Always-On Retina display, 3000 nits peak brightness",
      "Processor": "S9 SiP with 4-core Neural Engine & Double Tap gesture",
      "Battery": "Up to 36 hours regular use, up to 72 hours Low Power Mode",
      "Sensors": "Depth gauge, water temperature sensor, ECG, Blood Oxygen, Siren (86dB)"
    },
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Natural Titanium / Ocean Band", "Black Titanium / Alpine Loop"]
  },
  {
    id: "aud-04",
    name: "Bose QuietComfort Ultra Soundbar",
    category: "appliances",
    brand: "Bose",
    price: 799,
    originalPrice: 899,
    rating: 4.8,
    reviewCount: 140,
    badge: "Dolby Atmos",
    inStock: true,
    stockCount: 11,
    featured: false,
    flashSale: false,
    shortDesc: "Immersive 3D audio, Dolby Atmos, TrueSpace spatial processing, Voice4Video.",
    description: "Puts you at the center of your entertainment. Nine speakers including upward firing dipole transducers create envelope of sound that surrounds you from all angles.",
    specs: {
      "Channels": "Dolby Atmos, TrueSpace technology, 9 discrete transducers",
      "Inputs": "HDMI eARC, Optical, Wi-Fi, Bluetooth 5.3, AirPlay 2, Spotify Connect",
      "Voice Control": "Built-in Alexa and Google Assistant with noise-rejecting mics",
      "Audio Tuning": "ADAPTiQ audio room calibration technology",
      "Dimensions": "104.5 cm W x 5.8 cm H x 10.7 cm D"
    },
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Black Glass", "Arctic White Glass"]
  }
];

// Currency exchange rates relative to USD ($)
const CURRENCIES = {
  USD: { symbol: "$", rate: 1.0, code: "USD" },
  EUR: { symbol: "€", rate: 0.92, code: "EUR" },
  GBP: { symbol: "£", rate: 0.79, code: "GBP" },
  INR: { symbol: "₹", rate: 83.5, code: "INR" }
};

// Categories configuration
const CATEGORIES = [
  { id: "all", name: "All Products", icon: "fa-solid fa-shapes" },
  { id: "laptops", name: "Laptops & PCs", icon: "fa-solid fa-laptop" },
  { id: "phones", name: "Smartphones", icon: "fa-solid fa-mobile-screen-button" },
  { id: "tablets", name: "Tablets & 2-in-1s", icon: "fa-solid fa-tablet-screen-button" },
  { id: "appliances", name: "Smart Appliances", icon: "fa-solid fa-house-signal" },
  { id: "audio", name: "Audio & Wearables", icon: "fa-solid fa-headphones-simple" }
];

