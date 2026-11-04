import { copy } from "../config";
export const timeline = [
  {
    year: "2014",
    title: copy("布列塔尼街的六张餐桌", "Six tables on Rue de Bretagne"),
    image: "agnolotti.jpg",
  },
  {
    year: "2017",
    title: copy("第一颗星 与第二场晚宴", "A first star, and a second sitting"),
    image: "langoustine.jpg",
  },
  {
    year: "2021",
    title: copy("楼下的酒窖包间开放", "The Cellar Room opens downstairs"),
    image: "cellar.jpg",
  },
  {
    year: "2026",
    title: copy(
      "一份菜单 八道菜 四季流转",
      "One menu, eight courses, all year",
    ),
    image: "duck.jpg",
  },
];
export const growers = [
  {
    name: "Ferme des Quatre Vents",
    type: copy("时令蔬菜 · 诺曼底", "Vegetables · Normandy"),
    image: "vegetables.jpg",
  },
  {
    name: "Maison Laurent",
    type: copy("黑松露 · 佩里戈尔", "Black truffles · Périgord"),
    image: "truffle.jpg",
  },
  {
    name: "Le Guilvinec boats",
    type: copy("海螯虾 · 布列塔尼", "Langoustine · Brittany"),
    image: "langoustine.jpg",
  },
  {
    name: "Élevage Duret",
    type: copy("鸭肉 · 旺代", "Ducks · Vendée"),
    image: "duck.jpg",
  },
];
export const privateMenus = [
  {
    name: copy("品鉴菜单", "The tasting menu"),
    price: 145,
    description: copy(
      "八道菜 整桌宾客一同品尝",
      "Eight courses, served to the whole table at once.",
    ),
    image: "agnolotti.jpg",
  },
  {
    name: copy("共享盛宴", "The feast"),
    price: 110,
    description: copy(
      "家庭式大盘料理 沿桌传递分享",
      "Large plates passed down the table, family style.",
    ),
    image: "cod.jpg",
  },
  {
    name: copy("酒窖午宴", "Lunch in the cellar"),
    price: 85,
    description: copy(
      "四道菜 周五及周六 12:30 起",
      "Four courses, Friday and Saturday from 12:30.",
    ),
    image: "chocolate.jpg",
  },
];
export const giftFAQ = [
  {
    question: copy("可以用于私人宴请吗", "Can it be used for private dining?"),
    answer: copy(
      "可以，礼品卡可用于餐厅及酒窖包间。请在询问日期时告知我们。",
      "Yes. Gift cards can be used in the restaurant or the Cellar Room. Mention the card when enquiring about a date.",
    ),
  },
  {
    question: copy("如果菜单变化了怎么办", "What if the menu changes?"),
    answer: copy(
      "菜单随季节变化。卡内保留的是金额，可用于到访时的菜单及配饮。",
      "The menu follows the season. The card keeps its monetary value towards the menu and pairing on your visit.",
    ),
  },
  {
    question: copy(
      "之后可以修改日期或姓名吗",
      "Can I change the date or name later?",
    ),
    answer: copy(
      "请带上礼品卡编号联系我们，我们会协助修改收赠人信息或预约。",
      "Write to us with the card number and we will help update the recipient or reservation.",
    ),
  },
  {
    question: copy("可以退款吗", "Is there a refund?"),
    answer: copy(
      "礼品卡有效期为十二个月。有关退款与特殊情况，请联系餐厅确认。此页面为演示，尚未购买或付款。",
      "Gift cards are valid for twelve months. Contact the restaurant about refunds or special circumstances. This demo does not place an order or take payment.",
    ),
  },
];
export const bookingNotes = [
  {
    title: copy("变更与取消", "Changes and cancellations"),
    body: copy(
      "提前 48 小时可免费变更或取消。此后每位收取 €50。",
      "Free up to 48 hours before. After that, €50 per guest.",
    ),
  },
  {
    title: copy("过敏与饮食偏好", "Allergies and diets"),
    body: copy(
      "请在预订时告知我们。每道菜均有素食版本。",
      "Tell us when you book. Every course has a vegetarian version.",
    ),
  },
  {
    title: copy("着装", "What to wear"),
    body: copy(
      "没有着装要求。穿得自在些，餐厅温暖舒适。",
      "No dress code. Come as you are, the room is warm.",
    ),
  },
  {
    title: copy("儿童", "Children"),
    body: copy(
      "欢迎十岁及以上儿童，精简菜单为半价。",
      "Welcome from age ten, with a shorter menu at half price.",
    ),
  },
];
