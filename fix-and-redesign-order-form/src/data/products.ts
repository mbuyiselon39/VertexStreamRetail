export interface Product {
  id: string;
  name: string;
  pack: string;
  price: number;
  image?: string;
}

export interface Category {
  id: string;
  title: string;
  emoji: string;
  accent: string; // tailwind gradient classes for the card accent
  items: Product[];
}

let counter = 0;
const p = (name: string, pack: string, price: number, image?: string): Product => ({
  id: `p${counter++}`,
  name,
  pack,
  price,
  ...(image ? { image: `/images/products/${image}` } : {}),
});

export const CATEGORIES: Category[] = [
  {
    id: "sauces",
    title: "Sauces & Condiments",
    emoji: "🌶️",
    accent: "from-rose-500 to-orange-500",
    items: [
      p("TOP Chakalaka Sauce", "5kg", 84.99, "top-chakalaka-sauce-5l.jpg"),
      p("TOP Chilli Sauce", "5L", 59.99, "top-chilli-sauce-5l.jpg"),
      p("Country's Best Peri-Peri Sauce", "5L", 90.0, "countrys-best-peri-peri-sauce-5l.webp"),
      p("Country's Best Chip Dip Sauce", "5L", 90.0, "countrys-best-chip-dip-sauce-5l.jpg"),
      p("Country's Best Fruit Chutney", "5L", 79.99, "countrys-best-fruit-chutney-5l.jpg"),
      p("Country's Best Mustard Sauce", "5L", 64.99, "countrys-best-mustard-sauce-5l.jpg"),
      p("Country's Best BBQ Sauce", "5L", 79.99, "countrys-best-bbq-sauce-5l.webp"),
      p("Mama's Mzansi Sweet Chilli Sauce", "5L", 94.99, "mamas-mzansi-sweet-chilli-sauce-5l.jpeg"),
      p("Mama's Mzansi Mustard Sauce", "5L", 67.99, "mamas-mzansi-mustard-sauce-5l.jpg"),
      p("Mama's Mzansi Tomato Sauce", "5L", 64.99, "mamas-mzansi-tomato-sauce-5l.jpg"),
      p("Mama's Mzansi BBQ Sauce", "5L", 74.99, "mamas-mzansi-bbq-sauce-5l.jpg"),
      p("Mama's Mzansi Chilli Sauce", "5L", 64.99, "mamas-mzansi-chilli-sauce-5l.jpg"),
      p("Mama's Mzansi Peri-Mayo Sauce", "5L", 154.99, "mamas-mzansi-peri-mayo-sauce-5l.jpeg"),
      p("Crosse & Blackwell Mayonnaise", "3kg", 174.99, "crosse-blackwell-mayonnaise-3kg.jpg"),
      p("4 Sho Achaar Mango Garlic", "2kg", 64.99, "4sho-achaar-mango-garlic-2kg.jpg"),
      p("Inkosi Achaar Bucket Chilli/Garlic", "2kg", 65.99, "inkosi-achaar-bucket-chilli-garlic-2kg.jpg"),
    ],
  },
  {
    id: "rice",
    title: "Rice",
    emoji: "🍚",
    accent: "from-amber-400 to-yellow-500",
    items: [
      p("D'Lite Rice", "10kg", 131.99, "dlite-rice-10kg.webp"),
      p("Sunshine Parboiled Rice", "10kg", 129.99, "sunshine-parboiled-rice-10kg.jpg"),
      p("Allsome Rice", "10kg", 134.99, "allsome-rice-10kg.jpg"),
      p("Spekko Long Grain Rice", "10kg", 169.99, "spekko-long-grain-rice-10kg.webp"),
      p("Spekko Parboiled Rice", "10kg", 157.99, "spekko-parboiled-rice-10kg.jpg"),
    ],
  },
  {
    id: "flour",
    title: "Flour",
    emoji: "🌾",
    accent: "from-orange-400 to-amber-500",
    items: [
      p("Golden Cloud White Bread Flour", "12.5kg", 144.99, "golden-cloud-white-bread-flour-12-5kg.webp"),
      p("Bakers Dream Cake Flour", "12.5kg", 144.99, "bakers-dream-cake-flour-12-5kg.jpg"),
      p("Sasko Cake Wheat Flour", "10kg", 126.49, "sasko-cake-wheat-flour-10kg.webp"),
      p("Ace Cake Flour", "10kg", 119.99, "ace-cake-flour.jpg"),
      p("Ace Cake Flour", "12.5kg", 144.99, "ace-cake-flour.jpg"),
      p("Bakers Choice Cake Flour", "12.5kg", 134.99),
      p("Supreme Cake Flour", "10kg", 124.99, "supreme-cake-flour-10kg.jpg"),
      p("Supreme Brown Bread Flour", "12.5kg", 146.99, "supreme-brown-bread-flour-12-5kg.png"),
      p("Snowflake Cake Flour", "10kg", 142.99, "snowflake-cake-flour-10kg.webp"),
      p("Golden Cloud Cake Flour", "12.5kg", 124.99, "golden-cloud-cake-flour-12-5kg.jpg"),
      p("Golden Cloud Cake Flour Premium", "12.5kg", 144.99, "golden-cloud-cake-flour-premium-12-5kg.jpg"),
    ],
  },
  {
    id: "maize",
    title: "Maize Meal",
    emoji: "🌽",
    accent: "from-yellow-400 to-lime-500",
    items: [
      p("White Star Super Maize Meal", "12.5kg", 139.99, "white-star-super-maize-meal-12-5kg.webp"),
      p("White Star Super Maize Meal", "5kg", 64.99, "white-star-super-maize-meal-5kg.jpg"),
      p("Ace Maize Meal", "10kg", 95.99, "ace-maize-meal-10kg.webp"),
      p("Ace Maize Meal", "12.5kg", 119.99, "ace-maize-meal-12-5kg.webp"),
      p("Iwisa Maize Meal", "5kg", 64.99, "iwisa-maize-meal-5kg.jpg"),
      p("Iwisa Maize Meal", "10kg", 104.99, "iwisa-maize-meal-10kg.jpg"),
      p("Iwisa Maize Meal", "12.5kg", 129.99, "iwisa-maize-meal-12-5kg.webp"),
      p("Afristar Super Maize Meal", "10kg", 74.99, "afristar-super-maize-meal-10kg.webp"),
      p("Ubuntu Maize Meal", "25kg", 184.99, "ubuntu-maize-meal-25kg.jpg"),
      p("White Star Maize Meal", "25kg", 282.69, "white-star-maize-meal-25kg.webp"),
      p("Ace Super Maize Meal", "50kg", 472.99, "ace-super-maize-meal-50kg.webp"),
      p("Papa Maize Meal", "50kg", 362.99, "papa-maize-meal-50kg.png"),
      p("Pride Maize Meal", "10kg", 94.99, "pride-maize-meal-10kg.jpg"),
      p("Itau Maize Meal", "50kg", 373.99, "itau-maize-meal-50kg.jpg"),
    ],
  },
  {
    id: "sugar",
    title: "Sugar",
    emoji: "🍬",
    accent: "from-pink-400 to-rose-500",
    items: [
      p("Selati Brown Sugar", "10kg", 221.99, "selati-brown-sugar-10kg.png"),
      p("Selati White Sugar", "25kg", 604.99, "selati-white-sugar-25kg.png"),
      p("Atlanta Brown Sugar", "25kg", 516.99),
      p("Atlanta White Sugar", "12.5kg", 285.99, "atlanta-white-sugar-12-5kg.png"),
      p("Atlanta White Sugar", "2.5kg", 64.99, "atlanta-white-sugar-2-5kg.jpg"),
      p("Atlanta White Sugar", "10kg", 229.99, "atlanta-white-sugar-10kg.jpg"),
      p("Sunshine White Sugar", "5kg", 128.99, "sunshine-white-sugar-5kg.jpg"),
      p("Sunshine White Sugar", "10kg", 229.99, "sunshine-white-sugar-10kg.jpg"),
      p("Sunshine Brown Sugar", "5kg", 125.99, "sunshine-brown-sugar-5kg.jpg"),
      p("Sunshine Brown Sugar", "10kg", 204.99, "sunshine-brown-sugar-10kg.jpg"),
    ],
  },
  {
    id: "oil",
    title: "Cooking Oil",
    emoji: "🌻",
    accent: "from-amber-500 to-orange-600",
    items: [
      p("Sunfoil Sunflower Oil", "4L", 149.99, "sunfoil-sunflower-oil-4l.png"),
      p("Sunfoil Sunflower Oil", "5L", 184.99, "sunfoil-sunflower-oil-5l.png"),
      p("Sunfoil Sunflower Oil", "20L", 759.99, "sunfoil-sunflower-oil-20l.jpg"),
      p("Sunfoil Palm Oil", "20L", 650.0, "sunfoil-palm-oil-20l.webp"),
      p("D'Lite Palm Oil", "20L", 650.0, "dlite-palm-oil-20l.webp"),
      p("D'Lite Cooking Oil", "20L", 715.0, "dlite-cooking-oil-20l.png"),
      p("Nola Sunflower Oil", "20L", 659.99, "nola-sunflower-oil-20l.webp"),
      p("Nola Pure Sunflower Oil", "4L", 139.99, "nola-pure-sunflower-oil-4l.jpg"),
      p("Golden Fry Sunflower Oil", "5L", 174.99, "golden-fry-sunflower-oil-5l.jpg"),
      p("Golden Fry Sunflower Oil", "20L", 725.0, "golden-fry-sunflower-oil-20l.jpg"),
      p("Excella Sunflower Oil", "2L", 79.99, "excella-sunflower-oil-2l.webp"),
      p("Excella Sunflower Oil", "5L", 184.99, "excella-sunflower-oil-5l.jpg"),
      p("Excella Sunflower Oil", "20L", 779.99, "excella-sunflower-oil-20l.jpg"),
      p("Super Fry Cooking Oil", "5L", 164.99, "super-fry-cooking-oil-5l.jpg"),
    ],
  },
  {
    id: "cleaning",
    title: "Cleaning & Household",
    emoji: "🧼",
    accent: "from-cyan-400 to-teal-500",
    items: [
      p("Perfecto Thick Bleach Multi-Purpose", "750ml", 31.99, "perfecto-thick-bleach-750ml.jpg"),
      p("MAQ Thick Bleach", "750ml", 34.99, "maq-thick-bleach-750ml.jpg"),
      p("Albex Thick Bleach Extra Thick", "750ml", 34.99, "albex-thick-bleach-750ml.webp"),
      p("Domestos Thick Bleach Regular", "750ml", 35.99, "domestos-thick-bleach-750ml.png"),
      p("Miracle Mom Thick Bleach Multi-Purpose", "1.5L", 39.99, "miracle-mom-thick-bleach-1-5l.jpg"),
      p("Albex Spray Bleach Multi-Purpose", "750ml", 49.99, "albex-spray-bleach-750ml.webp"),
      p("Perfecto Bleach Regular", "5L", 54.99, "perfecto-bleach-regular-5l.jpg"),
      p("Star Lite All Purpose Cleaner", "4L", 59.99, "star-lite-all-purpose-cleaner-4l.png"),
      p("Jordan's Cleaner Ammonia", "5L", 74.99, "jordans-cleaner-ammonia-5l.png"),
      p("Perfecto Dishwashing Liquid", "5L", 99.99, "perfecto-dishwashing-liquid-5l.jpg"),
      p("Perfecto Cleaning Combo Bucket", "6pc", 149.99, "perfecto-cleaning-combo-bucket-6pc.jpg"),
      p("Sunlight Dishwashing Liquid", "5L", 214.99, "sunlight-dishwashing-liquid-5l.jpg"),
      p("MAQ Dishwashing Liquid", "5L", 219.99, "maq-dishwashing-liquid-5l.png"),
    ],
  },
  {
    id: "paper",
    title: "Household Paper",
    emoji: "🧻",
    accent: "from-slate-400 to-slate-600",
    items: [
      p("Denovo Toilet Paper 2ply", "18's", 99.99, "denovo-toilet-paper-18s.jpg"),
      p("Denovo Toilet Paper 2ply", "48's", 279.99, "denovo-toilet-paper-48s.jpg"),
      p("Daisy Soft Toilet Paper 2ply", "48's", 259.99, "daisy-soft-toilet-paper-48s.jpg"),
      p("DINU Napkins Jumbo", "200pk", 41.99, "dinu-napkins-jumbo-200pk.webp"),
    ],
  },
  {
    id: "storage",
    title: "Storage & Homeware",
    emoji: "🧺",
    accent: "from-indigo-400 to-violet-500",
    items: [
      p("Plastic Dessert Spoons", "Qty 20", 54.99, "plastic-dessert-spoons.jpg"),
      p("Verspak 30 Foam Tray", "Pack", 52.99, "versapak-30-foam-tray.png"),
      p("Addis Roughtote Black", "68L", 189.99, "addis-roughtote-black-68l.jpg"),
      p("Addis Roughtote Black", "150L", 399.99, "addis-roughtote-black-150l.jpg"),
    ],
  },
  {
    id: "beverages",
    title: "Beverages",
    emoji: "🥤",
    accent: "from-emerald-400 to-teal-600",
    items: [
      p("Dragon Energy Drink", "6 x 500ml", 54.99, "dragon-energy-drink-6x500ml.jpg"),
      p("Mofaya Energy Drink All Variants", "6 x 500ml", 54.99, "mofaya-energy-drink.png"),
    ],
  },
];

export const ALL_PRODUCTS: (Product & { category: string })[] =
  CATEGORIES.flatMap((c) => c.items.map((i) => ({ ...i, category: c.title })));

export const DELIVERY_OPTIONS = [
  { label: "0 - 25 km", fee: 0, note: "FREE 🎉" },
  { label: "25.5 - 30 km", fee: 15, note: "R15" },
  { label: "30.5 - 40 km", fee: 20, note: "R20" },
  { label: "40.5 - 60 km", fee: 50, note: "R50" },
  { label: "Collect in store", fee: 0, note: "Free" },
];

export const WHATSAPP_NUMBER = "27710638878";
export const PHONE_NUMBER = "+27678403363";

export const formatR = (n: number) =>
  "R" +
  n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
