import { copy } from "../config";
export const courses = [
  {
    id: "I",
    image: "tomato.jpg",
    name: copy("传家番茄 布拉塔罗勒", "Heirloom tomato, burrata, basil"),
    description: copy(
      "熟透的时令番茄 手撕布拉塔与初榨罗勒油",
      "Tomatoes at their ripest, torn burrata, first-press basil oil.",
    ),
    wine: "Sancerre rosé 2023",
    allergens: ["dairy"],
  },
  {
    id: "II",
    image: "langoustine.jpg",
    name: copy("海螯虾 血橙手指柠檬", "Langoustine, blood orange, finger lime"),
    description: copy(
      "香草油浸生海螯虾 搭配血橙与手指柠檬珠",
      "Raw langoustine in herb oil, blood orange, finger lime pearls.",
    ),
    wine: "Albariño 2022",
    allergens: ["shellfish"],
  },
  {
    id: "III",
    image: "beetroot.jpg",
    name: copy("甜菜根 烟熏奶油黑麦", "Beetroot, smoked cream, rye"),
    description: copy(
      "手切甜菜塔塔 烟熏酸奶油与酥脆黑麦",
      "Hand-cut beetroot tartare, smoked crème fraîche, crisp rye.",
    ),
    wine: "Savagnin 2020",
    allergens: ["gluten", "dairy"],
  },
  {
    id: "IV",
    image: "scallop.jpg",
    name: copy("扇贝 焦化黄油榛子", "Scallop, brown butter, hazelnut"),
    description: copy(
      "手潜采捕扇贝 泡沫黄油与烘烤榛子",
      "Hand-dived scallops, foaming butter, toasted hazelnut.",
    ),
    wine: "Chablis Premier Cru 2022",
    allergens: ["dairy", "nuts", "shellfish"],
  },
  {
    id: "V",
    image: "agnolotti.jpg",
    name: copy(
      "手工饺意面 鼠尾草陈年帕尔马干酪",
      "Agnolotti, sage, aged parmesan",
    ),
    description: copy(
      "每日下午手捏意面 鼠尾草焦化黄油与 36 个月陈年干酪",
      "Pasta pinched by hand each afternoon, sage brown butter, 36-month parmesan.",
    ),
    wine: "Barbera d’Alba 2021",
    allergens: ["gluten", "dairy", "egg"],
  },
  {
    id: "VI",
    image: "cod.jpg",
    name: copy("黑鳕鱼 味噌高汤", "Black cod, miso, dashi"),
    description: copy(
      "白味噌腌制三日的鳕鱼 昆布高汤与炭烤韭葱",
      "Cod cured for three days in white miso, kombu dashi, charred leek.",
    ),
    wine: "Junmai daiginjo sake",
    allergens: ["fish"],
  },
  {
    id: "VII",
    image: "duck.jpg",
    name: copy("鸭胸 樱桃炭烤菊苣", "Duck, cherry, charred endive"),
    description: copy(
      "干式熟成鸭胸 酸樱桃肉汁与炭烤菊苣",
      "Dry-aged duck breast, morello cherry jus, endive from the grill.",
    ),
    wine: "Pinot noir 2019",
    allergens: [],
  },
  {
    id: "VIII",
    image: "chocolate.jpg",
    name: copy("巧克力 血橙可可碎", "Chocolate, blood orange, cocoa nib"),
    description: copy(
      "黑巧克力奶油 血橙与可可碎薄脆",
      "Dark chocolate crémeux, blood orange, cocoa nib tuile.",
    ),
    wine: "Banyuls Grand Cru",
    allergens: ["dairy", "egg"],
  },
];
export const allergens = [
  { id: "gluten", label: copy("麸质", "Gluten") },
  { id: "dairy", label: copy("乳制品", "Dairy") },
  { id: "nuts", label: copy("坚果", "Nuts") },
  { id: "shellfish", label: copy("甲壳类", "Shellfish") },
  { id: "fish", label: copy("鱼类", "Fish") },
  { id: "egg", label: copy("鸡蛋", "Egg") },
];
export const wines = [
  [copy("香槟", "Champagne"), "Bérêche & Fils, Brut Réserve", 19],
  [copy("白葡萄酒", "White"), "Chablis Premier Cru, Montmains 2022", 16],
  [copy("橙酒", "Orange"), "Savagnin ouillé, Jura 2020", 15],
  [copy("红葡萄酒", "Red"), "Pinot noir, Côte de Nuits 2019", 18],
  [copy("红葡萄酒", "Red"), "Barbera d’Alba, Piedmont 2021", 14],
  [copy("甜酒", "Sweet"), "Banyuls Grand Cru, Roussillon", 12],
] as const;
