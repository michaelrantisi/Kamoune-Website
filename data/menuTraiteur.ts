// data/menuTraiteur.ts

export type CateringMenu = {
  id: string;
  name_fr: string;
  name_en: string;
  description_fr: string;
  description_en: string;
  price_per_person: number | null;
  items_fr: string[];
  items_en: string[];
  image?: string;
};

const menuTraiteur: CateringMenu[] = [
  {
    id: "plaisir-palestinien",
    name_fr: "Menu Plaisir Palestinien",
    name_en: "Palestinian Delight Menu",
    description_fr: "Un assortiment de mezzés traditionnels à partager.",
    description_en: "An assortment of traditional mezzés to share.",
    price_per_person: 15,
    items_fr: [
      "Houmous",
      "Caviar d’aubergine",
      "Yalanji",
      "Falafels de Jérusalem",
      "Taboulé",
      "Fatayer",
      "Halawet el Jibn aux pistaches",
    ],
    items_en: [
      "Hummus",
      "Eggplant caviar",
      "Yalanji (vine leaves with rice)",
      "Jerusalem falafels",
      "Tabbouleh",
      "Cheese fatayer",
      "Halawet el Jibn with pistachios",
    ],
    // C:\Users\USER\Desktop\Kamoune\public\palestinian-delight-menu.jpeg
    image: "/palestinian-delight-menu.jpeg",
  },

  {
    id: "gourmand",
    name_fr: "Menu Gourmand",
    name_en: "Gourmet Menu",
    description_fr: "Un assortiment généreux de mezzés traditionnels.",
    description_en: "A generous assortment of traditional mezzés.",
    price_per_person: 20,
    items_fr: [
      "Houmous betterave ou avocat",
      "Kebbeh",
      "Mama Ghanouj",
      "Salade fattoush",
      "Labneh zaitoun",
      "Moussakhan",
      "Baklava aux noix",
    ],
    items_en: [
      "Beetroot or avocado hummus",
      "Kibbeh",
      "Mama Ghanouj",
      "Fattoush salad",
      "Labneh with olives",
      "Musakhan",
      "Walnut baklava",
    ],
    // C:\Users\USER\Desktop\Kamoune\public\gourmet-menu.jpg
    image: "/gourmet-menu.jpg",
  },

  {
    id: "teta",
    name_fr: "Menu Téta",
    name_en: "Téta Menu",
    description_fr: "Un menu chaleureux autour de la maqlouba traditionnelle.",
    description_en: "A warm menu built around a traditional maqlouba.",
    price_per_person: 25,
    items_fr: [
      "Houmous ou Caviar d’aubergine",
      "Salade fattoush",
      "Maqlouba de Téta (plat traditionnel)",
      "Halawet el Jibn aux pistaches",
    ],
    items_en: [
      "Hummus or eggplant caviar",
      "Fattoush salad",
      "Téta’s Maqlouba (traditional main dish)",
      "Halawet el Jibn with pistachios",
    ],
    // C:\Users\USER\Desktop\Kamoune\public\teta-menu.png
    image: "/teta-menu.png",
  },

  {
    id: "kamoune",
    name_fr: "Menu Kamoune",
    name_en: "Kamoune Menu",
    description_fr: "Un menu signature autour d’un plat traditionnel au choix.",
    description_en: "A signature menu built around one traditional main of your choice.",
    price_per_person: 20,
    items_fr: [
      "Houmous ou Caviar d’aubergine",
      "Salade fattoush",
      "Un plat traditionnel de notre sélection (hors Maqlouba de Téta)",
      "Halawet el Jibn aux pistaches",
    ],
    items_en: [
      "Hummus or eggplant caviar",
      "Fattoush salad",
      "One traditional main from our selection (except Téta’s Maqlouba)",
      "Halawet el Jibn with pistachios",
    ],
    // C:\Users\USER\Desktop\Kamoune\public\kamoune-menu.png
    image: "/kamoune-menu.png",
  },

  {
    id: "sur-mesure",
    name_fr: "Menu personnalisé",
    name_en: "Tailor-made menu",
    description_fr:
      "Menu sur mesure adapté à vos goûts et à votre événement.",
    description_en:
      "Custom-made menu tailored to your tastes and your event.",
    price_per_person: null,
    items_fr: [
      "Échange avec vous pour définir les plats",
      "Adaptation aux régimes spécifiques (végétarien, sans gluten, etc.)",
      "Proposition de menu complète sur devis",
    ],
    items_en: [
      "We discuss with you to define the dishes",
      "Can adapt to specific diets (vegetarian, gluten-free, etc.)",
      "Full menu proposal with a custom quote",
    ],
    // C:\Users\USER\Desktop\Kamoune\public\tailor-made-menu.png
    image: "/tailor-made-menu.png",
  },
];

// Global note to show once on the catering page
export const cateringNote = {
  fr: "Minimum 10 convives, commande au moins 48h à l’avance.",
  en: "Minimum 10 guests, order at least 48 hours in advance.",
};

export default menuTraiteur;
