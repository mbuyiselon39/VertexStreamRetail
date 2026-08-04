export interface Product {
  id: string;
  name: string;
  pack: string;
  price: number;
}

export interface Category {
  id: string;
  title: string;
  emoji: string;
  accent: string; // tailwind gradient classes for the card accent
  items: Product[];
}

let counter = 0;
const p = (name: string, pack: string, price: number): Product => ({
  id: `p${counter++}`,
  name,
  pack,
  price,
});

export const CATEGORIES: Category[] = [
  {
    id: "sauces",
    title: "Sauces & Condiments",
    emoji: "🌶️",
    accent: "from-rose-500 to-orange-500",
    items: [
      p("TOP Chakalaka Sauce", "5kg", 84.99),
      p("TOP Chilli Sauce", "5L", 59.99),
      p("Country's Best Peri-Peri Sauce", "5L", 90.0),
      p("Country's Best Chip Dip Sauce", "5L", 90.0),
      p("Country's Best Fruit Chutney", "5L", 79.99),
      p("Country's Best Mustard Sauce", "5L", 64.99),
      p("Country's Best BBQ Sauce", "5L", 79.99),
      p("Mama's Mzansi Sweet Chilli Sauce", "5L", 94.99),
      p("Mama's Mzansi Mustard Sauce", "5L", 67.99),
      p("Mama's Mzansi Tomato Sauce", "5L", 64.99),
      p("Mama's Mzansi BBQ Sauce", "5L", 74.99),
      p("Mama's Mzansi Chilli Sauce", "5L", 64.99),
      p("Mama's Mzansi Peri-Mayo Sauce", "5L", 154.99),
      p("Crosse & Blackwell Mayonnaise", "3kg", 174.99),
      p("4 Sho Achaar Mango Garlic", "2kg", 64.99),
      p("Inkosi Achaar Bucket Chilli/Garlic", "2kg", 65.99),
    ],
  },
  {
    id: "rice",
    title: "Rice",
    emoji: "🍚",
    accent: "from-amber-400 to-yellow-500",
    items: [
      p("D'Lite Rice", "10kg", 131.99),
      p("Sunshine Parboiled Rice", "10kg", 129.99),
      p("Allsome Rice", "10kg", 134.99),
      p("Spekko Long Grain Rice", "10kg", 169.99),
      p("Spekko Parboiled Rice", "10kg", 157.99),
    ],
  },
  {
    id: "flour",
    title: "Flour",
    emoji: "🌾",
    accent: "from-orange-400 to-amber-500",
    items: [
      p("Golden Cloud White Bread Flour", "12.5kg", 144.99),
      p("Bakers Dream Cake Flour", "12.5kg", 144.99),
      p("Sasko Cake Wheat Flour", "10kg", 126.49),
      p("Ace Cake Flour", "10kg", 119.99),
      p("Ace Cake Flour", "12.5kg", 144.99),
      p("Bakers Choice Cake Flour", "12.5kg", 134.99),
      p("Supreme Cake Flour", "10kg", 124.99),
      p("Supreme Brown Bread Flour", "12.5kg", 146.99),
      p("Snowflake Cake Flour", "10kg", 142.99),
      p("Golden Cloud Cake Flour", "12.5kg", 124.99),
      p("Golden Cloud Cake Flour Premium", "12.5kg", 144.99),
    ],
  },
  {
    id: "maize",
    title: "Maize Meal",
    emoji: "🌽",
    accent: "from-yellow-400 to-lime-500",
    items: [
      p("White Star Super Maize Meal", "12.5kg", 139.99),
      p("White Star Super Maize Meal", "5kg", 64.99),
      p("Ace Maize Meal", "10kg", 95.99),
      p("Ace Maize Meal", "12.5kg", 119.99),
      p("Iwisa Maize Meal", "5kg", 64.99),
      p("Iwisa Maize Meal", "10kg", 104.99),
      p("Iwisa Maize Meal", "12.5kg", 129.99),
      p("Afristar Super Maize Meal", "10kg", 74.99),
      p("Ubuntu Maize Meal", "25kg", 184.99),
      p("White Star Maize Meal", "25kg", 282.69),
      p("Ace Super Maize Meal", "50kg", 472.99),
      p("Papa Maize Meal", "50kg", 362.99),
      p("Pride Maize Meal", "10kg", 94.99),
      p("Itau Maize Meal", "50kg", 373.99),
    ],
  },
  {
    id: "sugar",
    title: "Sugar",
    emoji: "🍬",
    accent: "from-pink-400 to-rose-500",
    items: [
      p("Selati Brown Sugar", "10kg", 221.99),
      p("Selati White Sugar", "25kg", 604.99),
      p("Atlanta Brown Sugar", "25kg", 516.99),
      p("Atlanta White Sugar", "12.5kg", 285.99),
      p("Atlanta White Sugar", "2.5kg", 64.99),
      p("Atlanta White Sugar", "10kg", 229.99),
      p("Sunshine White Sugar", "5kg", 128.99),
      p("Sunshine White Sugar", "10kg", 229.99),
      p("Sunshine Brown Sugar", "5kg", 125.99),
      p("Sunshine Brown Sugar", "10kg", 204.99),
    ],
  },
  {
    id: "oil",
    title: "Cooking Oil",
    emoji: "🌻",
    accent: "from-amber-500 to-orange-600",
    items: [
      p("Sunfoil Sunflower Oil", "4L", 149.99),
      p("Sunfoil Sunflower Oil", "5L", 184.99),
      p("Sunfoil Sunflower Oil", "20L", 759.99),
      p("Sunfoil Palm Oil", "20L", 650.0),
      p("D'Lite Palm Oil", "20L", 650.0),
      p("D'Lite Cooking Oil", "20L", 715.0),
      p("Nola Sunflower Oil", "20L", 659.99),
      p("Nola Pure Sunflower Oil", "4L", 139.99),
      p("Golden Fry Sunflower Oil", "5L", 174.99),
      p("Golden Fry Sunflower Oil", "20L", 725.0),
      p("Excella Sunflower Oil", "2L", 79.99),
      p("Excella Sunflower Oil", "5L", 184.99),
      p("Excella Sunflower Oil", "20L", 779.99),
      p("Super Fry Cooking Oil", "5L", 164.99),
    ],
  },
  {
    id: "cleaning",
    title: "Cleaning & Household",
    emoji: "🧼",
    accent: "from-cyan-400 to-teal-500",
    items: [
      p("Perfecto Thick Bleach Multi-Purpose", "750ml", 31.99),
      p("MAQ Thick Bleach", "750ml", 34.99),
      p("Albex Thick Bleach Extra Thick", "750ml", 34.99),
      p("Domestos Thick Bleach Regular", "750ml", 35.99),
      p("Miracle Mom Thick Bleach Multi-Purpose", "1.5L", 39.99),
      p("Albex Spray Bleach Multi-Purpose", "750ml", 49.99),
      p("Perfecto Bleach Regular", "5L", 54.99),
      p("Star Lite All Purpose Cleaner", "4L", 59.99),
      p("Jordan's Cleaner Ammonia", "5L", 74.99),
      p("Perfecto Dishwashing Liquid", "5L", 99.99),
      p("Perfecto Cleaning Combo Bucket", "6pc", 149.99),
      p("Sunlight Dishwashing Liquid", "5L", 214.99),
      p("MAQ Dishwashing Liquid", "5L", 219.99),
    ],
  },
  {
    id: "paper",
    title: "Household Paper",
    emoji: "🧻",
    accent: "from-slate-400 to-slate-600",
    items: [
      p("Denovo Toilet Paper 2ply", "18's", 99.99),
      p("Denovo Toilet Paper 2ply", "48's", 279.99),
      p("Daisy Soft Toilet Paper 2ply", "48's", 259.99),
      p("DINU Napkins Jumbo", "200pk", 41.99),
    ],
  },
  {
    id: "storage",
    title: "Storage & Homeware",
    emoji: "🧺",
    accent: "from-indigo-400 to-violet-500",
    items: [
      p("Plastic Dessert Spoons", "Qty 20", 54.99),
      p("Verspak 30 Foam Tray", "Pack", 52.99),
      p("Addis Roughtote Black", "68L", 189.99),
      p("Addis Roughtote Black", "150L", 399.99),
    ],
  },
  {
    id: "beverages",
    title: "Beverages",
    emoji: "🥤",
    accent: "from-emerald-400 to-teal-600",
    items: [
      p("Dragon Energy Drink", "6 x 500ml", 54.99),
      p("Mofaya Energy Drink All Variants", "6 x 500ml", 54.99),
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
