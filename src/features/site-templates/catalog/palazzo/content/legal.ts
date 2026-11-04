import { copy } from "../config";
export const legalPages = {
  privacy: {
    title: copy("隐私政策", "Privacy"),
    sections: [
      {
        title: copy("收集的信息", "What we collect"),
        body: copy(
          "实际餐厅在预订时收集姓名、邮箱、电话、人数及过敏或纪念日备注，仅用于安排到访。本模板演示表单只在当前浏览器内校验，尚未发送或保存个人信息。",
          "A live restaurant booking collects your name, email, phone number, party size and allergy or occasion notes to look after your visit. This template validates demo forms in the browser only. No personal details are sent or saved.",
        ),
      },
      {
        title: copy("信息可见范围", "Who sees it"),
        body: copy(
          "正式接入后，仅预约服务方与前厅团队可访问预约资料，不出售个人信息或用于广告。演示模板尚未接入预约服务。",
          "After a live integration, your booking provider and front-of-house team can see reservation details. They are never sold or used for advertising. This demo has no booking integration.",
        ),
      },
      {
        title: copy("保留时间", "How long we keep it"),
        body: copy(
          "原站的预约资料保留期限为 24 个月。上线前应结合真实业务更新保存期限、联系地址及删除流程。本地演示不持久化表单资料。",
          "The reference restaurant retains booking details for 24 months. Configure the real retention period, contact details and deletion process before launch. Demo forms do not persist their data.",
        ),
      },
      {
        title: copy("订阅来信", "Newsletter"),
        body: copy(
          "正式订阅每月最多发送一封新菜单及活动来信，并提供退订方式。此模板尚未接入订阅发送服务。",
          "A live newsletter sends at most one letter a month about menus and events, with an unsubscribe link. This template has no newsletter delivery service.",
        ),
      },
    ],
  },
  "terms-of-booking": {
    title: copy("预订条款", "Terms of booking"),
    sections: [
      {
        title: copy("保留席位", "Holding a table"),
        body: copy(
          "每日中午开放未来 60 天的预约。四人及以上的正式预订需通过预约平台以银行卡担保。本模板仅演示选项联动，不收集银行卡。",
          "Tables open 60 days ahead, at noon. A live booking provider holds a card for parties of four or more. This demo shows reservation choices and does not collect payment details.",
        ),
      },
      {
        title: copy("变更与取消", "Changes and cancellations"),
        body: copy(
          "可在到访前 48 小时免费变更或取消。此后每位收取 €50。实际适用条款请在真实预订前与餐厅确认。",
          "Change or cancel free of charge up to 48 hours before. After that, the restaurant charges €50 per guest. Confirm the applicable terms with the restaurant before making a live booking.",
        ),
      },
      {
        title: copy("迟到", "Arriving late"),
        body: copy(
          "餐桌保留 20 分钟。品鉴菜单为统一开席，迟到可能缩短用餐体验。",
          "The table is held for 20 minutes. The tasting menu is served at one seating, so a late start may shorten it.",
        ),
      },
    ],
  },
  allergens: {
    title: copy("过敏原说明", "Allergens"),
    sections: [
      {
        title: copy("请在预约时告知", "Tell us when you book"),
        body: copy(
          "每道菜均可提供素食版本，大多数菜品可去除麸质或乳制品。请在预订时告知过敏情况，避免到场后才临时提出。",
          "Every course can be made vegetarian, and most without gluten or dairy. Please tell the restaurant about allergies when you book, not on the night.",
        ),
      },
      {
        title: copy("十四类主要过敏原", "The fourteen allergens"),
        body: copy(
          "厨房会处理全部十四类主要过敏原。每道菜均有说明，可在用餐时索取。演示菜单仅供展示，实际过敏原情况需由餐厅确认。",
          "The kitchen handles all fourteen major allergens and keeps a sheet for every course, available at the table. This demonstration menu is illustrative. Confirm actual allergen information with the restaurant.",
        ),
      },
    ],
  },
  cookies: {
    title: copy("Cookie 说明", "Cookies"),
    sections: [
      {
        title: copy("使用情况", "What we use"),
        body: copy(
          "本地演示不会写入预约 Cookie，也未接入广告或分析跟踪。正式接入预约平台或匿名分析后，请更新此声明与所需的同意机制。",
          "This local demo does not store booking cookies or use advertising or analytics tracking. Update this statement and any required consent controls when integrating a booking platform or anonymous analytics.",
        ),
      },
      {
        title: copy("关闭 Cookie", "Turning them off"),
        body: copy(
          "你可在浏览器设置中阻止 Cookie。模板页面及本地预约演示仍可使用。",
          "You can block cookies in your browser settings. The template and local booking demo still work without them.",
        ),
      },
    ],
  },
};
