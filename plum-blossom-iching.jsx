import React, { useState } from "react";

// ============================================================
// TRANSLATIONS
// ============================================================
const STR = {
  vi: {
    title: "Mai Hoa Dịch Số", subtitle: "Phép bốc Dịch của Thiệu Khang Tiết",
    nav: { home: "Trang chủ", cast: "Bốc quẻ", ref: "64 quẻ", learn: "Học" },
    home: {
      tag: "Cổ học · Tống triều · 1011–1077",
      welcome: "Bốc Dịch theo dòng Mai Hoa",
      lead: "Mai Hoa Dịch Số (梅花易數) là phép bói do Thiệu Ung (Thiệu Khang Tiết) đời Tống sáng lập. Phép này dùng số, thời, âm, vật ứng để dựng quẻ — không cần thẻ, không cần tiền, chỉ cần khoảnh khắc.",
      legendT: "Truyền thuyết hoa mai",
      legend: "Một chiều mùa đông, Thiệu Khang Tiết thấy đôi sẻ tranh nhau cành mai mà rơi xuống đất. Ông liền lấy số giờ, ngày, tháng dựng thành quẻ — đoán hôm sau có thiếu nữ hái hoa té ngã. Hôm sau quả nhiên đúng.",
      principleT: "Nguyên lý",
      principle: "Mọi sự đều quy về Bát quái và Ngũ hành. Lập Bản quẻ → Hỗ quẻ → Biến quẻ; rồi luận Thể-Dụng qua tương sinh tương khắc.",
      btnCast: "Bốc một quẻ", btnLearn: "Tìm hiểu phép", btnRef: "Tra 64 quẻ",
    },
    cast: {
      title: "Chọn phép dựng quẻ",
      time: "Thời gian", timeZh: "時間占", timeDesc: "Tự động theo năm–tháng–ngày–giờ hiện tại",
      number: "Số", numberZh: "數字占", numberDesc: "Nhập hai số bất kỳ",
      sound: "Âm thanh / Chữ", soundZh: "聲音字占", soundDesc: "Đếm chữ trong câu để dựng quẻ",
      spont: "Cảm ứng", spontZh: "外應占", spontDesc: "Bốc ngẫu nhiên không đầu vào",
      question: "Câu hỏi của bạn (không bắt buộc)", questionPh: "Tôi muốn hỏi về…",
      n1: "Số thứ nhất", n2: "Số thứ hai",
      text: "Câu hoặc cụm từ", textPh: "Nhập một câu (Việt, Hán đều được)…",
      castBtn: "Dựng quẻ", castNow: "Bốc luôn", again: "Bốc lại",
      tooShort: "Cần ít nhất 2 chữ.", enterNums: "Nhập hai số dương.",
    },
    result: {
      yourReading: "Quẻ của bạn",
      ben: "Bản quẻ", benZh: "本卦", benDesc: "Tình huống hiện tại",
      hu: "Hỗ quẻ", huZh: "互卦", huDesc: "Bản chất ẩn",
      bien: "Biến quẻ", bienZh: "變卦", bienDesc: "Xu hướng tương lai",
      dong: "Động hào", dongZh: "動爻", line: "Hào",
      upper: "Thượng quái", lower: "Hạ quái",
      judgment: "Quái từ", image: "Tượng",
      tiYong: "Phân tích Thể–Dụng",
      ti: "Thể", tiSub: "Chủ", yong: "Dụng", yongSub: "Khách",
      conclusion: "Luận đoán", yourQ: "Câu hỏi", method: "Phép dựng", inputs: "Đầu vào",
      methodNames: { time: "Thời gian", number: "Số", sound: "Âm thanh", spont: "Cảm ứng" },
      favorable: "Thuận lợi 吉", unfavorable: "Bất lợi 凶", neutral: "Bình ổn 平", less: "Tổn hao 平偏凶",
      lineMeanings: [
        "Hào sơ — khởi đầu, nền tảng còn non.",
        "Hào nhị — bên trong, hài hòa nội bộ.",
        "Hào tam — chuyển tiếp, lắm thử thách.",
        "Hào tứ — tiếp cận, gần đỉnh quyết định.",
        "Hào ngũ — vị trí lãnh đạo, trung chính.",
        "Hào thượng — kết thúc, vượt giới hạn.",
      ],
      yongInLower: "Động hào ở Hạ quái → Hạ là Dụng, Thượng là Thể.",
      yongInUpper: "Động hào ở Thượng quái → Thượng là Dụng, Hạ là Thể.",
      element: "Hành", family: "Gia", direction: "Phương", attribute: "Tính", relation: "Quan hệ ngũ hành",
      saved: "✓ Đã lưu", saving: "Đang lưu…", saveError: "⚠ Lưu thất bại",
      noStorage: "⚠ Bộ nhớ không khả dụng — quẻ này không được lưu",
    },
    rel: {
      bihoa: "Tỷ hòa — hai bên cùng hành. Hài hòa, ổn định, không biến động lớn.",
      ti_sinh_yong: "Thể sinh Dụng — Thể nuôi Dụng, hao tổn năng lượng. Bình hoặc tổn.",
      yong_sinh_ti: "Dụng sinh Thể — Dụng nuôi Thể, được trợ giúp. Thuận lợi.",
      ti_khac_yong: "Thể khắc Dụng — Thể chế ngự Dụng. Thắng thế, cát lợi.",
      yong_khac_ti: "Dụng khắc Thể — Thể bị Dụng áp chế. Bất lợi, cần đề phòng.",
    },
    learn: {
      title: "Học phép Mai Hoa",
      baguaT: "Bát Quái 八卦",
      bagua: "Tám quẻ đơn là nền tảng. Mỗi quẻ gồm ba hào, đại diện một hiện tượng tự nhiên và một dạng năng lượng.",
      nguT: "Ngũ Hành 五行",
      nguG: "Tương sinh: Mộc → Hỏa → Thổ → Kim → Thủy → (về Mộc)",
      nguK: "Tương khắc: Mộc khắc Thổ, Thổ khắc Thủy, Thủy khắc Hỏa, Hỏa khắc Kim, Kim khắc Mộc",
      methodsT: "Các phép dựng quẻ",
      mTime: "Thời gian: (Năm-chi + Tháng + Ngày) ÷ 8 dư = Thượng quái. Cộng thêm Giờ rồi ÷ 8 = Hạ quái. Cùng tổng đó ÷ 6 = Động hào.",
      mNumber: "Số: Số 1 ÷ 8 = Thượng quái. Số 2 ÷ 8 = Hạ quái. (Số 1 + Số 2) ÷ 6 = Động hào.",
      mSound: "Âm thanh / Chữ: Đếm chữ. Nửa đầu ÷ 8 = Thượng quái. Nửa sau ÷ 8 = Hạ quái. Tổng ÷ 6 = Động hào.",
      mSpont: "Cảm ứng: Mọi sự ngẫu nhiên đều có thể quy thành số.",
      tiyongT: "Thể & Dụng 體用",
      tiyong: "Thể (主) là chủ, đại diện người hỏi. Dụng (客) là khách, đại diện hoàn cảnh. Quái không chứa động hào là Thể; quái chứa động hào là Dụng. Quan hệ ngũ hành Thể–Dụng quyết định cát hung.",
      hexT: "Ba quẻ trong một lượt bốc",
      benDef: "Bản quẻ (本卦) — quẻ dựng đầu, biểu thị tình huống hiện tại.",
      huDef: "Hỗ quẻ (互卦) — lấy hào 2-3-4 làm Hạ, hào 3-4-5 làm Thượng. Bản chất bên trong.",
      bienDef: "Biến quẻ (變卦) — đổi động hào (âm↔dương). Xu hướng phát triển.",
    },
    ref: { title: "Sáu mươi tư quẻ", back: "← Danh sách", filterU: "Thượng", filterL: "Hạ", all: "Tất cả",
           relatedT: "Quẻ liên quan", opposite: "Quẻ đối", inverse: "Quẻ đảo" },
    elements: { Metal: "Kim", Wood: "Mộc", Water: "Thủy", Fire: "Hỏa", Earth: "Thổ" },
    branches: ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"],
  },

  en: {
    title: "Plum Blossom Oracle", subtitle: "Divination after Shao Kang-jie",
    nav: { home: "Home", cast: "Cast", ref: "64 Hexagrams", learn: "Learn" },
    home: {
      tag: "Classical learning · Song dynasty · 1011–1077",
      welcome: "Cast the Yi by the Plum Blossom method",
      lead: "Plum Blossom Numerology (梅花易數) is a divination method developed by Shao Yong (Shao Kang-jie) in Song dynasty China. It builds hexagrams from numbers, time, sound, or spontaneous events — no coins or yarrow required, only the moment.",
      legendT: "The legend",
      legend: "One winter dusk, Shao watched two sparrows quarrel over a plum branch and fall to the ground. Taking the hour, day and month as numbers, he cast a hexagram and foresaw a young woman picking flowers and falling the next day. It came to pass.",
      principleT: "Principle",
      principle: "All things resolve into the Eight Trigrams and Five Elements. Build Original → Nuclear → Transformed hexagram, then judge by Ti-Yong through generation and overcoming.",
      btnCast: "Cast a reading", btnLearn: "Learn the method", btnRef: "Browse the 64",
    },
    cast: {
      title: "Choose a casting method",
      time: "Time", timeZh: "時間占", timeDesc: "Cast automatically from current date and hour",
      number: "Number", numberZh: "數字占", numberDesc: "Enter any two numbers",
      sound: "Word / Sound", soundZh: "聲音字占", soundDesc: "Cast from a phrase by character count",
      spont: "Spontaneous", spontZh: "外應占", spontDesc: "Random cast with no input",
      question: "Your question (optional)", questionPh: "I'm asking about…",
      n1: "First number", n2: "Second number",
      text: "Phrase or sentence", textPh: "Enter a phrase in any script…",
      castBtn: "Cast hexagram", castNow: "Cast now", again: "Cast again",
      tooShort: "Need at least 2 characters.", enterNums: "Enter two positive numbers.",
    },
    result: {
      yourReading: "Your reading",
      ben: "Original", benZh: "本卦", benDesc: "The present situation",
      hu: "Nuclear", huZh: "互卦", huDesc: "Hidden inner nature",
      bien: "Transformed", bienZh: "變卦", bienDesc: "Future tendency",
      dong: "Changing line", dongZh: "動爻", line: "Line",
      upper: "Upper trigram", lower: "Lower trigram",
      judgment: "Judgment", image: "Image",
      tiYong: "Ti–Yong analysis",
      ti: "Ti", tiSub: "Host", yong: "Yong", yongSub: "Guest",
      conclusion: "Conclusion", yourQ: "Question", method: "Method", inputs: "Inputs",
      methodNames: { time: "Time", number: "Number", sound: "Word/Sound", spont: "Spontaneous" },
      favorable: "Favorable 吉", unfavorable: "Unfavorable 凶", neutral: "Balanced 平", less: "Draining 平偏凶",
      lineMeanings: [
        "First line — beginnings, an unsteady foundation.",
        "Second line — the inner realm, harmony within.",
        "Third line — transition, full of trial.",
        "Fourth line — approach, near the seat of decision.",
        "Fifth line — leadership, the central place.",
        "Top line — endings, beyond the proper limit.",
      ],
      yongInLower: "Changing line in lower trigram → Lower is Yong, Upper is Ti.",
      yongInUpper: "Changing line in upper trigram → Upper is Yong, Lower is Ti.",
      element: "Element", family: "Family", direction: "Direction", attribute: "Attribute", relation: "Five-element relation",
      saved: "✓ Saved", saving: "Saving…", saveError: "⚠ Save failed",
      noStorage: "⚠ Storage unavailable — this reading was not saved",
    },
    rel: {
      bihoa: "Same element — host and guest balanced. Stable; no major shift.",
      ti_sinh_yong: "Host generates Guest — the host is depleted. Slightly draining.",
      yong_sinh_ti: "Guest generates Host — the host is nourished. Favorable.",
      ti_khac_yong: "Host overcomes Guest — host prevails. Favorable.",
      yong_khac_ti: "Guest overcomes Host — host pressed upon. Unfavorable; take care.",
    },
    learn: {
      title: "Learn the method",
      baguaT: "The Eight Trigrams",
      bagua: "The eight three-line figures are the foundation. Each maps to a natural phenomenon and an energetic quality.",
      nguT: "The Five Elements",
      nguG: "Generation: Wood → Fire → Earth → Metal → Water → (back to Wood)",
      nguK: "Overcoming: Wood>Earth, Earth>Water, Water>Fire, Fire>Metal, Metal>Wood",
      methodsT: "Casting methods",
      mTime: "Time: (Year-branch + Month + Day) mod 8 → upper trigram. Adding Hour, mod 8 → lower trigram. Same total mod 6 → changing line.",
      mNumber: "Number: First number mod 8 → upper. Second mod 8 → lower. Sum mod 6 → changing line.",
      mSound: "Word/Sound: Count characters. First half mod 8 → upper. Second half mod 8 → lower. Total mod 6 → changing line.",
      mSpont: "Spontaneous: Any chance event becomes a number.",
      tiyongT: "Ti & Yong",
      tiyong: "Ti (體, host) represents the inquirer. Yong (用, guest) represents the surrounding situation. The trigram NOT containing the changing line is Ti; the one containing it is Yong. Their five-element relationship determines the outcome.",
      hexT: "Three hexagrams in one cast",
      benDef: "Original (本卦) — the cast itself; the present situation.",
      huDef: "Nuclear (互卦) — lines 2-3-4 form the lower; lines 3-4-5 the upper. The hidden inner essence.",
      bienDef: "Transformed (變卦) — flip the changing line. The unfolding tendency.",
    },
    ref: { title: "The Sixty-Four", back: "← Back to list", filterU: "Upper", filterL: "Lower", all: "All",
           relatedT: "Related hexagrams", opposite: "Opposite", inverse: "Inverse" },
    elements: { Metal: "Metal", Wood: "Wood", Water: "Water", Fire: "Fire", Earth: "Earth" },
    branches: ["Zǐ","Chǒu","Yín","Mǎo","Chén","Sì","Wǔ","Wèi","Shēn","Yǒu","Xū","Hài"],
  },

  zh: {
    title: "梅花易數", subtitle: "邵康節先生易占法",
    nav: { home: "首頁", cast: "起卦", ref: "六十四卦", learn: "學習" },
    home: {
      tag: "古學 · 北宋 · 1011–1077",
      welcome: "依梅花之法以占易",
      lead: "梅花易數乃宋儒邵雍(康節)所傳之占法。以數、以時、以聲、以外應而起卦,不假蓍龜,惟取一念之機。",
      legendT: "梅花故事",
      legend: "邵子嘗於冬日見二雀爭梅墜地,以時、日、月為數,起卦推之,知翌日有少女採花跌傷。其後果應。",
      principleT: "原理",
      principle: "萬象不外乎八卦五行。先得本卦,再求互卦、變卦,終以體用之生剋斷其吉凶。",
      btnCast: "起一卦", btnLearn: "學其法", btnRef: "閱六十四卦",
    },
    cast: {
      title: "請擇起卦法",
      time: "時間占", timeZh: "時間占", timeDesc: "依當下年月日時而起",
      number: "數字占", numberZh: "數字占", numberDesc: "輸入二數",
      sound: "聲音字占", soundZh: "聲音字占", soundDesc: "計字而起卦",
      spont: "外應占", spontZh: "外應占", spontDesc: "隨機起卦",
      question: "所問之事(可省)", questionPh: "欲問者…",
      n1: "第一數", n2: "第二數",
      text: "字句", textPh: "輸入字句…",
      castBtn: "起卦", castNow: "立起", again: "再起",
      tooShort: "至少二字。", enterNums: "請輸入二正數。",
    },
    result: {
      yourReading: "占斷",
      ben: "本卦", benZh: "本卦", benDesc: "當下之象",
      hu: "互卦", huZh: "互卦", huDesc: "內在之機",
      bien: "變卦", bienZh: "變卦", bienDesc: "未來之趨",
      dong: "動爻", dongZh: "動爻", line: "爻",
      upper: "上卦", lower: "下卦",
      judgment: "卦辭", image: "象",
      tiYong: "體用論斷",
      ti: "體", tiSub: "主", yong: "用", yongSub: "客",
      conclusion: "結論", yourQ: "所問", method: "起法", inputs: "所入",
      methodNames: { time: "時間", number: "數字", sound: "聲音", spont: "外應" },
      favorable: "吉", unfavorable: "凶", neutral: "平", less: "微凶",
      lineMeanings: [
        "初爻 — 始基未固。",
        "二爻 — 內位中和。",
        "三爻 — 處變多艱。",
        "四爻 — 近君之位。",
        "五爻 — 中正得位。",
        "上爻 — 物極將反。",
      ],
      yongInLower: "動爻在下 → 下卦為用,上卦為體。",
      yongInUpper: "動爻在上 → 上卦為用,下卦為體。",
      element: "行", family: "屬", direction: "位", attribute: "性", relation: "五行關係",
      saved: "✓ 已存", saving: "存中…", saveError: "⚠ 存儲失敗",
      noStorage: "⚠ 無存儲 — 此卦未保存",
    },
    rel: {
      bihoa: "比和 — 同氣相應,平穩無變。",
      ti_sinh_yong: "體生用 — 體耗於用,洩氣為平偏凶。",
      yong_sinh_ti: "用生體 — 用養於體,得助為吉。",
      ti_khac_yong: "體剋用 — 體制於用,制勝為吉。",
      yong_khac_ti: "用剋體 — 用剋於體,被制為凶。",
    },
    learn: {
      title: "梅花學習",
      baguaT: "八卦",
      bagua: "三爻為基,各象一物一氣。",
      nguT: "五行",
      nguG: "相生:木→火→土→金→水→(復木)",
      nguK: "相剋:木剋土,土剋水,水剋火,火剋金,金剋木",
      methodsT: "起卦諸法",
      mTime: "時間:(年支+月+日)÷8 餘為上卦。再加時÷8 為下卦。同數÷6 為動爻。",
      mNumber: "數字:首數÷8 為上卦。次數÷8 為下卦。和÷6 為動爻。",
      mSound: "聲音:計字。前半÷8 為上卦。後半÷8 為下卦。總÷6 為動爻。",
      mSpont: "外應:凡偶發之事皆可化為數。",
      tiyongT: "體與用",
      tiyong: "體者主也,占者也;用者客也,所遇也。無動爻之卦為體,有動爻之卦為用。觀其五行生剋,以斷吉凶。",
      hexT: "一占三卦",
      benDef: "本卦 — 起卦所得,當下之象。",
      huDef: "互卦 — 取二三四為下,三四五為上。內藏之機。",
      bienDef: "變卦 — 動爻陰陽互換。將來之趨。",
    },
    ref: { title: "六十四卦", back: "← 返回", filterU: "上", filterL: "下", all: "全部",
           relatedT: "相關卦", opposite: "錯卦", inverse: "綜卦" },
    elements: { Metal: "金", Wood: "木", Water: "水", Fire: "火", Earth: "土" },
    branches: ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],
  },
};

// ============================================================
// TRIGRAMS (Pre-Heaven Xiantian numbering 1-8)
// bin = bottom-mid-top, 1=yang, 0=yin
// ============================================================
const TRIGRAMS = [null,
  { n:1, sym:"☰", zh:"乾", py:"Qián", vi:"Càn",  en:"Heaven",   el:"Metal", attrZh:"健", attrVi:"Kiện",  attrEn:"Creative",   famZh:"父",   famVi:"Cha",        famEn:"Father",            dirZh:"西北", dirEn:"NW", bin:"111" },
  { n:2, sym:"☱", zh:"兌", py:"Duì",  vi:"Đoài", en:"Lake",     el:"Metal", attrZh:"悅", attrVi:"Duyệt", attrEn:"Joyful",     famZh:"少女", famVi:"Thiếu nữ",   famEn:"Youngest daughter", dirZh:"西",   dirEn:"W",  bin:"110" },
  { n:3, sym:"☲", zh:"離", py:"Lí",   vi:"Ly",   en:"Fire",     el:"Fire",  attrZh:"麗", attrVi:"Lệ",    attrEn:"Clinging",   famZh:"中女", famVi:"Trung nữ",   famEn:"Middle daughter",   dirZh:"南",   dirEn:"S",  bin:"101" },
  { n:4, sym:"☳", zh:"震", py:"Zhèn", vi:"Chấn", en:"Thunder",  el:"Wood",  attrZh:"動", attrVi:"Động",  attrEn:"Arousing",   famZh:"長男", famVi:"Trưởng nam", famEn:"Eldest son",        dirZh:"東",   dirEn:"E",  bin:"100" },
  { n:5, sym:"☴", zh:"巽", py:"Xùn",  vi:"Tốn",  en:"Wind",     el:"Wood",  attrZh:"入", attrVi:"Nhập",  attrEn:"Penetrating",famZh:"長女", famVi:"Trưởng nữ",  famEn:"Eldest daughter",   dirZh:"東南", dirEn:"SE", bin:"011" },
  { n:6, sym:"☵", zh:"坎", py:"Kǎn",  vi:"Khảm", en:"Water",    el:"Water", attrZh:"陷", attrVi:"Hãm",   attrEn:"Abysmal",    famZh:"中男", famVi:"Trung nam",  famEn:"Middle son",        dirZh:"北",   dirEn:"N",  bin:"010" },
  { n:7, sym:"☶", zh:"艮", py:"Gèn",  vi:"Cấn",  en:"Mountain", el:"Earth", attrZh:"止", attrVi:"Chỉ",   attrEn:"Still",      famZh:"少男", famVi:"Thiếu nam",  famEn:"Youngest son",      dirZh:"東北", dirEn:"NE", bin:"001" },
  { n:8, sym:"☷", zh:"坤", py:"Kūn",  vi:"Khôn", en:"Earth",    el:"Earth", attrZh:"順", attrVi:"Thuận", attrEn:"Receptive",  famZh:"母",   famVi:"Mẹ",         famEn:"Mother",            dirZh:"西南", dirEn:"SW", bin:"000" },
];

// ============================================================
// HEXAGRAM LOOKUP [upper][lower] = King Wen number
// ============================================================
// HL[upper][lower] = King Wen hexagram number
const HL = {
  1: {1:1,  2:10, 3:13, 4:25, 5:44, 6:6,  7:33, 8:12}, // Càn ☰ above
  2: {1:43, 2:58, 3:49, 4:17, 5:28, 6:47, 7:31, 8:45}, // Đoài ☱
  3: {1:14, 2:38, 3:30, 4:21, 5:50, 6:64, 7:56, 8:35}, // Ly ☲
  4: {1:34, 2:54, 3:55, 4:51, 5:32, 6:40, 7:62, 8:16}, // Chấn ☳
  5: {1:9,  2:61, 3:37, 4:42, 5:57, 6:59, 7:53, 8:20}, // Tốn ☴
  6: {1:5,  2:60, 3:63, 4:3,  5:48, 6:29, 7:39, 8:8 }, // Khảm ☵
  7: {1:26, 2:41, 3:22, 4:27, 5:18, 6:4,  7:52, 8:23}, // Cấn ☶
  8: {1:11, 2:19, 3:36, 4:24, 5:46, 6:7,  7:15, 8:2 }, // Khôn ☷
};

// ============================================================
// HEXAGRAMS — 64 in King Wen order
// Compact: [u, l, zh, py, vi, en, jZh, jVi, jEn, iVi, iEn]
// ============================================================
const H = [null,
  [1,1,"乾","Qián","Thuần Càn","The Creative","元亨利貞。","Lớn lành, hanh thông, lợi và chính.","Sublime success; furthering through perseverance.","Trời chuyển động mạnh; quân tử tự cường không nghỉ.","Heaven moves with strength; the noble one cultivates ceaseless self-discipline."],
  [8,8,"坤","Kūn","Thuần Khôn","The Receptive","元亨,利牝馬之貞。","Lớn lành; bền bỉ như ngựa cái mới lợi.","Sublime success through the perseverance of a mare.","Thế đất là Khôn; quân tử dùng đức dày chở vạn vật.","Earth is yielding; the noble one bears all things with deep virtue."],
  [6,4,"屯","Zhūn","Thủy Lôi Truân","Difficulty at the Beginning","元亨利貞,勿用有攸往。","Khó khăn ban đầu; chớ vội tiến.","Sprouting through hardship; do not rush forward.","Mây sấm là Truân; quân tử lo việc tổ chức.","Clouds and thunder; the noble one weaves the threads."],
  [7,6,"蒙","Méng","Sơn Thủy Mông","Youthful Folly","亨。匪我求童蒙,童蒙求我。","Sự ngu muội thiếu thời; trò tìm thầy, không phải thầy tìm trò.","Folly seeks the wise; the wise does not seek folly.","Suối từ núi; quân tử quyết hành để dưỡng đức.","A spring from the mountain; the noble one acts decisively to nurture virtue."],
  [6,1,"需","Xū","Thủy Thiên Nhu","Waiting","有孚,光亨,貞吉。","Có lòng tin, sáng thông, giữ chính cát.","With trust, light prevails; perseverance brings fortune.","Mây lên trời; quân tử ăn uống vui chơi đợi thời.","Clouds rise to the sky; the noble one feasts while waiting."],
  [1,6,"訟","Sòng","Thiên Thủy Tụng","Conflict","有孚窒惕,中吉終凶。","Có lòng tin nhưng bị nghẽn; trung thì cát, cuối thì hung.","Truth obstructed; the middle is fortunate, the end ruinous.","Trời nước trái chiều; quân tử lo việc từ đầu.","Sky and water flow apart; the noble one plans every undertaking from the start."],
  [8,6,"師","Shī","Địa Thủy Sư","The Army","貞,丈人吉,无咎。","Giữ chính, có lão thành chỉ huy thì cát, không lỗi.","Perseverance led by the elder; fortune, no fault.","Trong đất có nước; quân tử dung dân, dưỡng chúng.","Water within earth; the noble one tolerates and gathers the people."],
  [6,8,"比","Bǐ","Thủy Địa Tỷ","Holding Together","吉,原筮元永貞。","Cát; nguyên đầu xem bói, lâu bền và chính.","Fortune; from the first inquiry, lasting truth.","Trên đất có nước; tiên vương lập muôn nước, thân các chư hầu.","Water upon earth; the kings of old founded states and bonded with princes."],
  [5,1,"小畜","Xiǎo Chù","Phong Thiên Tiểu Súc","Small Taming","亨,密雲不雨,自我西郊。","Hanh; mây dày chưa mưa từ vùng Tây.","Success; dense clouds, no rain yet.","Gió đi trên trời; quân tử trau dồi văn đức.","Wind across the sky; the noble one polishes literary virtue."],
  [1,2,"履","Lǚ","Thiên Trạch Lý","Treading","履虎尾,不咥人,亨。","Đi sau đuôi hổ mà không bị cắn; hanh thông.","Treading the tiger's tail unbitten; success.","Trên trời dưới đầm; quân tử phân biện trên dưới.","Heaven above, lake below; the noble one distinguishes high from low."],
  [8,1,"泰","Tài","Địa Thiên Thái","Peace","小往大來,吉亨。","Nhỏ đi, lớn đến; cát hanh.","The small departs, the great arrives; fortunate success.","Trời đất giao; bậc trên thành tựu đạo trời đất.","Heaven and earth meet; the sovereign completes their way."],
  [1,8,"否","Pǐ","Thiên Địa Bĩ","Standstill","之匪人,不利君子貞。","Người không đáng tin; quân tử khó tiến.","Unworthy ones; perseverance does not further the noble.","Trời đất không giao; quân tử kiệm đức tránh nạn.","Heaven and earth do not meet; the noble one withdraws into virtue."],
  [1,3,"同人","Tóng Rén","Thiên Hỏa Đồng Nhân","Fellowship","同人于野,亨。","Đồng tâm hợp lực ngoài đồng rộng; hanh thông.","Fellowship in the open field; success.","Trời với lửa; quân tử phân loại sự vật.","Heaven with fire; the noble one classifies and distinguishes."],
  [3,1,"大有","Dà Yǒu","Hỏa Thiên Đại Hữu","Great Possession","元亨。","Lớn lành, hanh thông.","Sublime success.","Lửa trên trời; quân tử ngăn ác, dương thiện.","Fire over heaven; the noble one curbs evil and exalts good."],
  [8,7,"謙","Qiān","Địa Sơn Khiêm","Modesty","亨,君子有終。","Hanh; quân tử có kết thúc tốt.","Success; the noble one carries through.","Núi giữa đất; quân tử bớt chỗ thừa, thêm chỗ thiếu.","Mountain within earth; the noble one balances surplus and want."],
  [4,8,"豫","Yù","Lôi Địa Dự","Enthusiasm","利建侯行師。","Lợi cho việc dựng nước, cử quân.","Furthering for installing helpers and setting armies in motion.","Sấm ra đất rộn ràng; tiên vương làm nhạc tôn đức.","Thunder bursts forth; the kings of old made music to honor virtue."],
  [2,4,"隨","Suí","Trạch Lôi Tùy","Following","元亨利貞,无咎。","Lớn lành nếu chính trực; không lỗi.","Sublime success through perseverance; no fault.","Sấm trong đầm; quân tử nghỉ ngơi khi trời tối.","Thunder within the lake; the noble one rests at nightfall."],
  [7,5,"蠱","Gǔ","Sơn Phong Cổ","Work on the Decayed","元亨,利涉大川。","Lớn lành; lợi vượt sông lớn.","Sublime success; furthering to cross the great water.","Dưới núi có gió; quân tử khích lệ dân, dưỡng đức.","Wind beneath the mountain; the noble one rouses the people and builds virtue."],
  [8,2,"臨","Lín","Địa Trạch Lâm","Approach","元亨利貞,至于八月有凶。","Lớn lành; đến tháng tám có hung.","Sublime success; misfortune by the eighth month.","Trên đầm là đất; quân tử dạy dỗ không cùng.","Earth above the lake; the noble one teaches without limit."],
  [5,8,"觀","Guān","Phong Địa Quán","Contemplation","盥而不薦,有孚顒若。","Đã rửa tay tế chưa dâng; có lòng tin chiêm bái.","Cleansed but not yet offering; trust shines reverent.","Gió đi trên đất; tiên vương đi xét dân lập giáo.","Wind moves over the earth; the kings inspect and instruct."],
  [3,4,"噬嗑","Shì Kè","Hỏa Lôi Phệ Hạp","Biting Through","亨,利用獄。","Hanh; lợi dùng pháp luật.","Success; the use of law furthers.","Sấm chớp; tiên vương sáng tỏ hình phạt, nghiêm pháp luật.","Thunder and lightning; the rulers make punishments clear."],
  [7,3,"賁","Bì","Sơn Hỏa Bí","Grace","亨,小利有攸往。","Hanh; nhỏ lợi tiến tới.","Success; small ventures further.","Dưới núi có lửa; quân tử sáng tỏ chính sự.","Fire beneath the mountain; the noble one clarifies governance."],
  [7,8,"剝","Bō","Sơn Địa Bác","Splitting Apart","不利有攸往。","Không lợi tiến tới.","Do not advance.","Núi tựa vào đất; bậc trên dày dưới yên nhà.","The mountain rests on earth; superiors strengthen below."],
  [8,4,"復","Fù","Địa Lôi Phục","Return","亨,出入无疾。","Hanh; ra vào không bệnh.","Success; coming and going without affliction.","Sấm trong đất; tiên vương đóng cửa ngày đông chí.","Thunder within the earth; the kings closed gates at the solstice."],
  [1,4,"無妄","Wú Wàng","Thiên Lôi Vô Vọng","Innocence","元亨利貞。","Lớn lành; lợi giữ chính.","Sublime success; furthering through perseverance.","Dưới trời sấm vang; tiên vương theo thời nuôi vạn vật.","Thunder beneath heaven; the kings nurtured all beings with the seasons."],
  [7,1,"大畜","Dà Chù","Sơn Thiên Đại Súc","Great Taming","利貞,不家食吉,利涉大川。","Lợi giữ chính; không ăn tại gia thì cát.","Perseverance furthers; not eating at home is fortunate.","Trời trong núi; quân tử biết rộng lời xưa, hành xưa để dưỡng đức.","Heaven within the mountain; the noble one knows the past to grow virtue."],
  [7,4,"頤","Yí","Sơn Lôi Di","Nourishment","貞吉,觀頤,自求口實。","Giữ chính cát; xem cách nuôi dưỡng; tự cầu lương thực.","Perseverance fortunate; observe nourishment; seek your own sustenance.","Dưới núi có sấm; quân tử cẩn lời, tiết ăn uống.","Thunder beneath the mountain; the noble one watches words and moderates food."],
  [2,5,"大過","Dà Guò","Trạch Phong Đại Quá","Great Excess","棟橈,利有攸往,亨。","Cây đòn dông oằn xuống; lợi tiến tới; hanh.","The ridge-pole bends; advance furthers; success.","Đầm dìm cây; quân tử đứng một mình không sợ.","The lake drowns the tree; the noble one stands alone unafraid."],
  [6,6,"坎","Kǎn","Thuần Khảm","The Abysmal","習坎,有孚,維心亨。","Hiểm chồng hiểm; có lòng tin thì tâm thông.","Repeated abyss; with trust, the heart prevails.","Nước dồn đến; quân tử giữ thường đức, tập việc dạy.","Water arrives upon water; the noble one keeps virtue and practices teaching."],
  [3,3,"離","Lí","Thuần Ly","The Clinging Fire","利貞,亨,畜牝牛吉。","Lợi giữ chính; hanh; nuôi bò cái cát.","Perseverance furthers; success; tending the cow brings fortune.","Sáng kép; đại nhân nối sáng chiếu bốn phương.","Brightness redoubled; the great one shines in all directions."],
  [2,7,"咸","Xián","Trạch Sơn Hàm","Influence","亨,利貞,取女吉。","Hanh; lợi chính; lấy vợ cát.","Success; perseverance furthers; taking a maiden brings fortune.","Trên núi có đầm; quân tử rỗng lòng nhận người.","Lake atop mountain; the noble one receives others with an empty heart."],
  [4,5,"恆","Héng","Lôi Phong Hằng","Duration","亨,无咎,利貞,利有攸往。","Hanh; không lỗi; lợi giữ chính; lợi tiến tới.","Success; no fault; perseverance and advance both further.","Sấm gió; quân tử đứng vững không đổi phương.","Thunder and wind; the noble one stands firm in their direction."],
  [1,7,"遯","Dùn","Thiên Sơn Độn","Retreat","亨,小利貞。","Hanh; nhỏ lợi giữ chính.","Success; small perseverance furthers.","Dưới trời có núi; quân tử lánh tiểu nhân, không ghét mà nghiêm.","Mountain beneath heaven; the noble one withdraws from petty folk."],
  [4,1,"大壯","Dà Zhuàng","Lôi Thiên Đại Tráng","Great Power","利貞。","Lợi giữ chính.","Perseverance furthers.","Sấm trên trời; quân tử không phải lễ thì không bước.","Thunder above heaven; the noble one walks only in accord with rite."],
  [3,8,"晉","Jìn","Hỏa Địa Tấn","Progress","康侯用錫馬蕃庶,晝日三接。","Vua khanh được vua ban ngựa nhiều, một ngày ba lần triều kiến.","The honored prince receives many gifts of horses; thrice received in a day.","Sáng lên khỏi đất; quân tử tự rạng đức sáng.","Light rises from the earth; the noble one brightens their own virtue."],
  [8,3,"明夷","Míng Yí","Địa Hỏa Minh Di","Darkening of the Light","利艱貞。","Lợi giữ chính trong gian khó.","Perseverance through hardship furthers.","Sáng vào trong đất; quân tử lâm chúng, dùng tối mà sáng.","Light enters the earth; the noble one rules using darkness yet illumined."],
  [5,3,"家人","Jiā Rén","Phong Hỏa Gia Nhân","The Family","利女貞。","Lợi cho phụ nữ giữ chính.","The maiden's perseverance furthers.","Gió từ lửa ra; quân tử lời có thực, hành có thường.","Wind issues from fire; the noble one's words have substance, deeds endure."],
  [3,2,"睽","Kuí","Hỏa Trạch Khuê","Opposition","小事吉。","Tiểu sự cát.","In small matters, fortunate.","Trên lửa dưới đầm; quân tử đồng mà dị.","Fire above, lake below; the noble one is alike yet different."],
  [6,7,"蹇","Jiǎn","Thủy Sơn Kiển","Obstruction","利西南,不利東北,利見大人,貞吉。","Lợi tây nam; không lợi đông bắc; lợi gặp đại nhân; chính cát.","Southwest furthers; northeast does not; meet the great one; perseverance brings fortune.","Trên núi có nước; quân tử tự xét, tu đức.","Water atop the mountain; the noble one turns inward to cultivate virtue."],
  [4,6,"解","Xiè","Lôi Thủy Giải","Deliverance","利西南,无所往,其來復吉。","Lợi tây nam; không cần đi đâu; trở lại thì cát.","Southwest furthers; if no further, return brings fortune.","Sấm mưa; quân tử xá lỗi, dung tội.","Thunder and rain; the noble one pardons faults and forgives crimes."],
  [7,2,"損","Sǔn","Sơn Trạch Tổn","Decrease","有孚,元吉,无咎。","Có lòng tin; đại cát; không lỗi.","With sincerity, sublime fortune; no fault.","Dưới núi có đầm; quân tử ngăn giận, dứt dục.","Lake beneath the mountain; the noble one curbs anger and stems desire."],
  [5,4,"益","Yì","Phong Lôi Ích","Increase","利有攸往,利涉大川。","Lợi tiến tới; lợi vượt sông lớn.","Advance furthers; cross the great water.","Gió sấm; quân tử thấy thiện thì theo, có lỗi thì sửa.","Wind and thunder; the noble one moves toward good and corrects faults."],
  [2,1,"夬","Guài","Trạch Thiên Quải","Breakthrough","揚于王庭,孚號有厲。","Phát giác giữa triều; kêu thành tín có nguy.","Proclaimed at the royal court; sincere outcry, with danger.","Đầm trên trời; quân tử ban lộc xuống dưới, ở đức thì tránh kiêu.","Lake above heaven; the noble one shares blessings below."],
  [1,5,"姤","Gòu","Thiên Phong Cấu","Coming to Meet","女壯,勿用取女。","Người nữ mạnh; chớ cưới.","The maid is bold; do not wed her.","Dưới trời có gió; bậc trên ban mệnh khắp bốn phương.","Wind beneath heaven; the sovereign issues commands."],
  [2,8,"萃","Cuì","Trạch Địa Tụy","Gathering Together","亨,王假有廟。","Hanh; vua đến tế tại miếu.","Success; the king visits the temple.","Đầm trên đất; quân tử sửa khí giới, phòng bất trắc.","Lake above earth; the noble one prepares against the unforeseen."],
  [8,5,"升","Shēng","Địa Phong Thăng","Pushing Upward","元亨,用見大人,勿恤,南征吉。","Lớn lành; gặp đại nhân; chớ lo; tiến nam cát.","Sublime success; see the great one; advance south brings fortune.","Trong đất sinh cây; quân tử thuận đức, tích nhỏ thành lớn.","Wood grows from earth; the noble one accumulates the small to attain the great."],
  [2,6,"困","Kùn","Trạch Thủy Khốn","Oppression","亨,貞,大人吉,无咎,有言不信。","Hanh; chính; đại nhân cát; không lỗi; có nói không tin.","Success; perseverance; the great one is fortunate; words may not be trusted.","Đầm không nước; quân tử tận mệnh hoàn chí.","A waterless lake; the noble one risks all to fulfill their will."],
  [6,5,"井","Jǐng","Thủy Phong Tỉnh","The Well","改邑不改井,无喪无得。","Đổi làng không đổi giếng; không mất không được.","Towns may change, the well does not.","Trên cây có nước; quân tử khuyến lao dân, khích lệ giúp nhau.","Water above wood; the noble one urges the people on."],
  [2,3,"革","Gé","Trạch Hỏa Cách","Revolution","巳日乃孚,元亨利貞,悔亡。","Đến ngày Tỵ mới được tin; đại cát chính; hối tan.","On the appointed day, trust is given; sublime success; remorse vanishes.","Trong đầm có lửa; quân tử trị lịch, sáng thời tiết.","Fire within the lake; the noble one regulates the calendar."],
  [3,5,"鼎","Dǐng","Hỏa Phong Đỉnh","The Cauldron","元吉,亨。","Đại cát; hanh.","Sublime fortune; success.","Trên cây có lửa; quân tử chính vị ngưng mệnh.","Fire above wood; the noble one rectifies position and consolidates fate."],
  [4,4,"震","Zhèn","Thuần Chấn","The Arousing Thunder","亨。震來虩虩,笑言啞啞。","Hanh; sấm đến run rẩy, rồi cười nói rộn ràng.","Success; thunder comes — alarm, then laughter.","Sấm dồn; quân tử kính sợ tu tỉnh.","Repeated thunder; the noble one with awe examines themselves."],
  [7,7,"艮","Gèn","Thuần Cấn","Keeping Still","艮其背,不獲其身。","Ngừng nơi lưng; không thấy thân.","Keeping still at the back; the body is not perceived.","Hai núi; quân tử suy nghĩ không vượt vị trí.","Twin mountains; the noble one's thoughts do not stray."],
  [5,7,"漸","Jiàn","Phong Sơn Tiệm","Gradual Development","女歸吉,利貞。","Gả con gái cát; lợi chính.","The maiden's marriage is fortunate; perseverance furthers.","Trên núi có cây; quân tử ở đức hiền, làm phong tục thiện.","Wood upon the mountain; the noble one dwells in virtue and refines custom."],
  [4,2,"歸妹","Guī Mèi","Lôi Trạch Quy Muội","The Marrying Maiden","征凶,无攸利。","Tiến hung; không lợi gì.","Advance brings misfortune; nothing furthers.","Trên đầm có sấm; quân tử biết kết cục, hiểu hư hao.","Thunder over the lake; the noble one foresees endings."],
  [4,3,"豐","Fēng","Lôi Hỏa Phong","Abundance","亨,王假之,勿憂,宜日中。","Hanh; vua đến; chớ lo; thích hợp giữa ngày.","Success; the king arrives; have no fear; the time is high noon.","Sấm chớp đều đến; quân tử xét án, định hình.","Thunder and lightning together; the noble one judges cases."],
  [3,7,"旅","Lǚ","Hỏa Sơn Lữ","The Wanderer","小亨,旅貞吉。","Tiểu hanh; lữ khách giữ chính cát.","Small success; the wanderer's perseverance brings fortune.","Trên núi có lửa; quân tử sáng cẩn dùng hình, không giữ ngục.","Fire upon the mountain; the noble one is clear with penalties."],
  [5,5,"巽","Xùn","Thuần Tốn","The Gentle Wind","小亨,利有攸往,利見大人。","Tiểu hanh; lợi tiến tới; lợi gặp đại nhân.","Small success; advance furthers; meeting the great one furthers.","Gió theo gió; quân tử công bố mệnh lệnh, làm việc.","Wind upon wind; the noble one repeats commands."],
  [2,2,"兌","Duì","Thuần Đoài","The Joyous Lake","亨,利貞。","Hanh; lợi chính.","Success; perseverance furthers.","Hai đầm liền; quân tử cùng bạn học hỏi.","Joined lakes; the noble one and friends study together."],
  [5,6,"渙","Huàn","Phong Thủy Hoán","Dispersion","亨。王假有廟,利涉大川,利貞。","Hanh; vua đến miếu; lợi vượt sông; lợi chính.","Success; the king visits the temple; cross the great water furthers.","Gió đi trên nước; tiên vương cúng tế Thượng đế lập miếu.","Wind moves over water; the kings worshipped and built temples."],
  [6,2,"節","Jié","Thủy Trạch Tiết","Limitation","亨,苦節不可貞。","Hanh; tiết quá khắc khổ không thể bền.","Success; bitter limitation cannot endure.","Trên đầm có nước; quân tử định số độ, bàn đức hạnh.","Water above the lake; the noble one sets standards."],
  [5,2,"中孚","Zhōng Fú","Phong Trạch Trung Phu","Inner Truth","豚魚吉,利涉大川,利貞。","Cá heo cát; lợi vượt sông; lợi chính.","Pigs and fish bring fortune; cross the great water.","Trên đầm có gió; quân tử bàn án, hoãn tử hình.","Wind over the lake; the noble one debates judgments."],
  [4,7,"小過","Xiǎo Guò","Lôi Sơn Tiểu Quá","Small Excess","亨,利貞,可小事,不可大事。","Hanh; lợi chính; tiểu sự khả; đại sự bất khả.","Success; perseverance; small matters yes, great ones no.","Trên núi có sấm; quân tử trong hành xử thì khiêm hơn.","Thunder atop the mountain; the noble one is more reverent."],
  [6,3,"既濟","Jì Jì","Thủy Hỏa Ký Tế","After Completion","亨小,利貞,初吉終亂。","Tiểu hanh; lợi chính; đầu cát cuối loạn.","Small success; first fortune, then disorder.","Nước trên lửa; quân tử nghĩ hoạn nạn để phòng trước.","Water above fire; the noble one anticipates trouble."],
  [3,6,"未濟","Wèi Jì","Hỏa Thủy Vị Tế","Before Completion","亨,小狐汔濟,濡其尾。","Hanh; cáo nhỏ gần qua sông, ướt đuôi.","Success; the little fox nearly across, wets its tail.","Lửa trên nước; quân tử phân biệt vật và ở đúng phương.","Fire above water; the noble one carefully sorts things."],
];

// Build hex array indexed by King Wen number (H is already in King Wen order)
const HEX = [null];
for (let i = 1; i <= 64; i++) {
  const r = H[i];
  HEX[i] = {
    n: i, u: r[0], l: r[1],
    zh: r[2], py: r[3], vi: r[4], en: r[5],
    jZh: r[6], jVi: r[7], jEn: r[8],
    iVi: r[9], iEn: r[10],
  };
}

// ============================================================
// HELPERS
// ============================================================
const TBIN = { "111":1, "110":2, "101":3, "100":4, "011":5, "010":6, "001":7, "000":8 };

function getHex(u, l) { return HEX[HL[u][l]]; }
function hexBinary(u, l) { return TRIGRAMS[l].bin + TRIGRAMS[u].bin; }

function castNumber(n1, n2) {
  const u = (n1 % 8) === 0 ? 8 : n1 % 8;
  const l = (n2 % 8) === 0 ? 8 : n2 % 8;
  const sum = n1 + n2;
  const change = (sum % 6) === 0 ? 6 : sum % 6;
  return { u, l, change, method: "number", inputs: { n1, n2 } };
}

// === Vietnamese Lunar Calendar (Hồ Ngọc Đức algorithm, TZ +7) ===
function _LINT(d) { return Math.floor(d); }
function _jdFromDate(dd, mm, yy) {
  const a = _LINT((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd = dd + _LINT((153 * m + 2) / 5) + 365 * y + _LINT(y / 4) - _LINT(y / 100) + _LINT(y / 400) - 32045;
  if (jd < 2299161) jd = dd + _LINT((153 * m + 2) / 5) + 365 * y + _LINT(y / 4) - 32083;
  return jd;
}
function _getNewMoonDay(k, tz) {
  const T = k / 1236.85;
  const T2 = T * T, T3 = T2 * T;
  const dr = Math.PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
  C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
  const deltat = T < -11
    ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
    : -0.000278 + 0.000265 * T + 0.000262 * T2;
  return _LINT(Jd1 + C1 - deltat + 0.5 + tz / 24);
}
function _getSunLongitude(jdn, tz) {
  const T = (jdn - 2451545.5 - tz / 24) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;
  const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
  let L = (L0 + DL) * dr;
  L = L - Math.PI * 2 * _LINT(L / (Math.PI * 2));
  return _LINT(L / Math.PI * 6);
}
function _getLunarMonth11(yy, tz) {
  const off = _jdFromDate(31, 12, yy) - 2415021;
  const k = _LINT(off / 29.530588853);
  let nm = _getNewMoonDay(k, tz);
  if (_getSunLongitude(nm, tz) >= 9) nm = _getNewMoonDay(k - 1, tz);
  return nm;
}
function _getLeapMonthOffset(a11, tz) {
  const k = _LINT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0, i = 1;
  let arc = _getSunLongitude(_getNewMoonDay(k + i, tz), tz);
  do {
    last = arc; i++;
    arc = _getSunLongitude(_getNewMoonDay(k + i, tz), tz);
  } while (arc !== last && i < 14);
  return i - 1;
}
function solarToLunar(dd, mm, yy, tz = 7) {
  const dayNumber = _jdFromDate(dd, mm, yy);
  const k = _LINT((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = _getNewMoonDay(k + 1, tz);
  if (monthStart > dayNumber) monthStart = _getNewMoonDay(k, tz);
  let a11 = _getLunarMonth11(yy, tz);
  let b11 = a11;
  let lunarYear;
  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = _getLunarMonth11(yy - 1, tz);
  } else {
    lunarYear = yy + 1;
    b11 = _getLunarMonth11(yy + 1, tz);
  }
  const lunarDay = dayNumber - monthStart + 1;
  const diff = _LINT((monthStart - a11) / 29);
  let lunarLeap = 0;
  let lunarMonth = diff + 11;
  if (b11 - a11 > 365) {
    const leapMonthDiff = _getLeapMonthOffset(a11, tz);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) lunarLeap = 1;
    }
  }
  if (lunarMonth > 12) lunarMonth -= 12;
  if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
  return { day: lunarDay, month: lunarMonth, year: lunarYear, leap: lunarLeap };
}
function yearBranchOf(lunarYear) { return (((lunarYear - 4) % 12) + 12) % 12 + 1; }

function castTime(year, month, day, hour, isLunar) {
  if (year === undefined) {
    const now = new Date();
    year = now.getFullYear();
    month = now.getMonth() + 1;
    day = now.getDate();
    hour = now.getHours();
    isLunar = false;
  }
  let solar = null, lunar;
  if (isLunar) {
    lunar = { year, month, day, leap: 0 };
  } else {
    solar = { year, month, day };
    try { lunar = solarToLunar(day, month, year, 7); }
    catch (e) { lunar = { year, month, day, leap: 0 }; }
  }
  const yearBranch = yearBranchOf(lunar.year);
  const hourMap = [1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,1];
  const ch = hourMap[hour] ?? 1;
  const sum1 = yearBranch + lunar.month + lunar.day;
  const sum2 = sum1 + ch;
  const u = (sum1 % 8 === 0) ? 8 : sum1 % 8;
  const l = (sum2 % 8 === 0) ? 8 : sum2 % 8;
  const change = (sum2 % 6 === 0) ? 6 : sum2 % 6;
  return {
    u, l, change, method: "time",
    inputs: {
      isLunar: !!isLunar, solar, lunar,
      hour, chHour: ch, yearBranch,
      year: lunar.year, month: lunar.month, day: lunar.day,
    }
  };
}

function castSound(text) {
  const cleaned = [...text.replace(/\s+/g, "")];
  const len = cleaned.length;
  if (len < 2) return null;
  const half1 = Math.ceil(len / 2);
  const half2 = len - half1;
  const u = (half1 % 8 === 0) ? 8 : half1 % 8;
  const l = (half2 % 8 === 0) ? 8 : half2 % 8;
  const sum = half1 + half2;
  const change = (sum % 6 === 0) ? 6 : sum % 6;
  return { u, l, change, method: "sound", inputs: { text, len, half1, half2 } };
}

function castSpont() {
  return {
    u: Math.floor(Math.random() * 8) + 1,
    l: Math.floor(Math.random() * 8) + 1,
    change: Math.floor(Math.random() * 6) + 1,
    method: "spont", inputs: {},
  };
}

// === Storage helpers (saved readings) ===
// window.storage is Claude's persistent key-value API (account-scoped, NOT browser localStorage).
// localStorage/sessionStorage are unavailable inside Claude artifacts.
function isStorageAvailable() {
  return typeof window !== 'undefined' && !!window.storage;
}

// Returns: numeric id on success, 'no-storage' if API missing, 'error' on save failure.
async function saveReading(reading) {
  if (!isStorageAvailable()) return 'no-storage';
  const id = Date.now();
  const data = { ...reading, id, savedAt: new Date().toISOString() };
  try {
    await window.storage.set(`readings:${id}`, JSON.stringify(data));
    return id;
  } catch (e) { console.error('Save failed:', e); return 'error'; }
}

async function listReadings() {
  if (!isStorageAvailable()) return [];
  try {
    const result = await window.storage.list('readings:');
    if (!result || !result.keys || result.keys.length === 0) return [];
    const arr = await Promise.all(result.keys.map(async k => {
      try {
        const r = await window.storage.get(k);
        return r ? JSON.parse(r.value) : null;
      } catch { return null; }
    }));
    const valid = arr.filter(Boolean);
    // Migrate pre-lunar-aware time-method readings:
    // old format stored solar Y/M/D directly in inputs and used them as if lunar.
    // We retroactively recast as solar input → convert to lunar → derive proper hex.
    const migrated = await Promise.all(valid.map(async r => {
      if (r && r.method === "time" && r.inputs && !r.inputs.solar && !r.inputs.lunar && r.inputs.year != null) {
        try {
          const fresh = castTime(r.inputs.year, r.inputs.month, r.inputs.day, r.inputs.hour, false);
          const updated = { ...fresh, id: r.id, savedAt: r.savedAt, question: r.question };
          try { await window.storage.set(`readings:${r.id}`, JSON.stringify(updated)); } catch {}
          return updated;
        } catch { return r; }
      }
      return r;
    }));
    return migrated.sort((a, b) => b.id - a.id);
  } catch (e) { console.error('List failed:', e); return []; }
}

async function deleteReading(id) {
  if (!isStorageAvailable()) return false;
  try {
    await window.storage.delete(`readings:${id}`);
    return true;
  } catch (e) { console.error('Delete failed:', e); return false; }
}

function getNuclear(u, l) {
  const bin = hexBinary(u, l);
  return { u: TBIN[bin[2] + bin[3] + bin[4]], l: TBIN[bin[1] + bin[2] + bin[3]] };
}

function getTransformed(u, l, change) {
  const bin = hexBinary(u, l).split("");
  bin[change - 1] = bin[change - 1] === "1" ? "0" : "1";
  const nb = bin.join("");
  return { u: TBIN[nb.slice(3, 6)], l: TBIN[nb.slice(0, 3)] };
}

function getOpposite(u, l) {
  const bin = hexBinary(u, l).split("").map(b => b === "1" ? "0" : "1").join("");
  return { u: TBIN[bin.slice(3, 6)], l: TBIN[bin.slice(0, 3)] };
}

function getInverse(u, l) {
  const bin = hexBinary(u, l).split("").reverse().join("");
  return { u: TBIN[bin.slice(3, 6)], l: TBIN[bin.slice(0, 3)] };
}

function elementRelation(e1, e2) {
  if (e1 === e2) return "bihoa";
  const G = { Wood: "Fire", Fire: "Earth", Earth: "Metal", Metal: "Water", Water: "Wood" };
  const O = { Wood: "Earth", Earth: "Water", Water: "Fire", Fire: "Metal", Metal: "Wood" };
  if (G[e1] === e2) return "ti_sinh_yong";
  if (G[e2] === e1) return "yong_sinh_ti";
  if (O[e1] === e2) return "ti_khac_yong";
  if (O[e2] === e1) return "yong_khac_ti";
  return "bihoa";
}

function tiYongAnalysis(u, l, change) {
  const yongIsLower = change <= 3;
  const ti = yongIsLower ? u : l;
  const yong = yongIsLower ? l : u;
  const tiT = TRIGRAMS[ti];
  const yongT = TRIGRAMS[yong];
  const rel = elementRelation(tiT.el, yongT.el);
  let outcome;
  if (rel === "bihoa") outcome = "neutral";
  else if (rel === "yong_sinh_ti" || rel === "ti_khac_yong") outcome = "favorable";
  else if (rel === "yong_khac_ti") outcome = "unfavorable";
  else outcome = "less";
  return { ti, yong, tiT, yongT, rel, outcome, yongIsLower };
}

// Helpers to read trigram/hex names by language
function trigName(t, lang) { return lang === "zh" ? t.zh : lang === "vi" ? t.vi : t.en; }
function trigAttr(t, lang) { return lang === "zh" ? t.attrZh : lang === "vi" ? t.attrVi : t.attrEn; }
function trigFam(t, lang) { return lang === "zh" ? t.famZh : lang === "vi" ? t.famVi : t.famEn; }
function trigDir(t, lang) { return lang === "zh" ? t.dirZh : t.dirEn; }
function hexName(h, lang) { return lang === "zh" ? h.zh : lang === "vi" ? h.vi : h.en; }
function hexJudg(h, lang) { return lang === "zh" ? h.jZh : lang === "vi" ? h.jVi : h.jEn; }
function hexImg(h, lang) { return lang === "vi" ? h.iVi : h.iEn; }

// ============================================================
// VISUAL COMPONENTS
// ============================================================

function HexLines({ u, l, change, size = "md" }) {
  const W = size === "sm" ? 36 : size === "lg" ? 80 : 56;
  const H_ = size === "sm" ? 4 : size === "lg" ? 9 : 6;
  const G = size === "sm" ? 7 : size === "lg" ? 14 : 10;
  const yinGap = Math.floor(W * 0.18);
  const totalH = 6 * H_ + 5 * G;
  const bin = hexBinary(u, l);
  const lines = [];
  for (let i = 0; i < 6; i++) {
    const y = totalH - (i + 1) * H_ - i * G;
    const isYang = bin[i] === "1";
    const isChange = change === i + 1;
    if (isYang) {
      lines.push(<rect key={"y" + i} x={0} y={y} width={W} height={H_} fill="#1c1410" rx={1} />);
    } else {
      lines.push(<rect key={"a" + i} x={0} y={y} width={(W - yinGap) / 2} height={H_} fill="#1c1410" rx={1} />);
      lines.push(<rect key={"b" + i} x={(W + yinGap) / 2} y={y} width={(W - yinGap) / 2} height={H_} fill="#1c1410" rx={1} />);
    }
    if (isChange) {
      lines.push(<circle key={"c" + i} cx={W / 2} cy={y + H_ / 2} r={H_ * 0.85} fill="none" stroke="#9d2933" strokeWidth={1.4} />);
    }
  }
  return <svg width={W} height={totalH} viewBox={`0 0 ${W} ${totalH}`} style={{ display: "block" }}>{lines}</svg>;
}

function TrigramLines({ n, size = "md" }) {
  const W = size === "sm" ? 30 : 48;
  const H_ = size === "sm" ? 4 : 6;
  const G = size === "sm" ? 6 : 9;
  const yinGap = Math.floor(W * 0.2);
  const totalH = 3 * H_ + 2 * G;
  const bin = TRIGRAMS[n].bin;
  const lines = [];
  for (let i = 0; i < 3; i++) {
    const y = totalH - (i + 1) * H_ - i * G;
    if (bin[i] === "1") {
      lines.push(<rect key={i} x={0} y={y} width={W} height={H_} fill="#1c1410" rx={1} />);
    } else {
      lines.push(<rect key={"a" + i} x={0} y={y} width={(W - yinGap) / 2} height={H_} fill="#1c1410" rx={1} />);
      lines.push(<rect key={"b" + i} x={(W + yinGap) / 2} y={y} width={(W - yinGap) / 2} height={H_} fill="#1c1410" rx={1} />);
    }
  }
  return <svg width={W} height={totalH} viewBox={`0 0 ${W} ${totalH}`} style={{ display: "block" }}>{lines}</svg>;
}

function PlumBlossom({ size = 24, color = "#9d2933" }) {
  const r = size / 2;
  const petals = [];
  for (let i = 0; i < 5; i++) {
    const angle = (i * 72 - 90) * Math.PI / 180;
    const cx = r + Math.cos(angle) * (r * 0.45);
    const cy = r + Math.sin(angle) * (r * 0.45);
    petals.push(
      <ellipse key={i} cx={cx} cy={cy} rx={r * 0.32} ry={r * 0.4}
        fill={color} opacity="0.85"
        transform={`rotate(${i * 72 + 90} ${cx} ${cy})`} />
    );
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {petals}
      <circle cx={r} cy={r} r={r * 0.18} fill="#fcd34d" />
    </svg>
  );
}

// ============================================================
// VIEWS
// ============================================================

function HomeView({ t, setView }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <PlumBlossom size={48} />
        </div>
        <div className="text-xs tracking-widest uppercase text-stone-500 mb-2" style={{letterSpacing:"0.3em"}}>{t.home.tag}</div>
        <h1 className="text-3xl md:text-5xl font-serif text-stone-900 mb-3" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>
          {t.home.welcome}
        </h1>
        <div className="text-lg text-rose-900 font-serif tracking-wider" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>
          梅 花 易 數
        </div>
      </div>

      <p className="text-stone-700 leading-relaxed mb-8 text-justify">{t.home.lead}</p>

      <div className="grid md:grid-cols-3 gap-3 mb-12">
        <button onClick={() => setView("cast")} className="px-5 py-4 bg-stone-900 text-stone-50 hover:bg-rose-900 transition-colors text-sm tracking-wide rounded">
          {t.home.btnCast}
        </button>
        <button onClick={() => setView("learn")} className="px-5 py-4 bg-white border border-stone-400 text-stone-800 hover:border-rose-900 hover:text-rose-900 transition-colors text-sm tracking-wide rounded">
          {t.home.btnLearn}
        </button>
        <button onClick={() => setView("ref")} className="px-5 py-4 bg-white border border-stone-400 text-stone-800 hover:border-rose-900 hover:text-rose-900 transition-colors text-sm tracking-wide rounded">
          {t.home.btnRef}
        </button>
      </div>

      <div className="space-y-8">
        <section className="border-l-2 border-rose-900 pl-5">
          <h2 className="text-lg font-serif text-stone-900 mb-2">{t.home.legendT}</h2>
          <p className="text-stone-700 leading-relaxed text-sm">{t.home.legend}</p>
        </section>
        <section className="border-l-2 border-amber-700 pl-5">
          <h2 className="text-lg font-serif text-stone-900 mb-2">{t.home.principleT}</h2>
          <p className="text-stone-700 leading-relaxed text-sm">{t.home.principle}</p>
        </section>
      </div>
    </div>
  );
}

function CastView({ t, lang, reading, setReading }) {
  const [method, setMethod] = useState(null);
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const [text, setText] = useState("");
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [saveStatus, setSaveStatus] = useState(null); // null | 'saving' | 'saved' | 'error' | 'no-storage'
  const _now = new Date();
  const [year, setYear] = useState(_now.getFullYear());
  const [month, setMonth] = useState(_now.getMonth() + 1);
  const [day, setDay] = useState(_now.getDate());
  const [hour, setHour] = useState(_now.getHours());
  const [calendar, setCalendar] = useState("solar");

  const dtLabels = ({
    vi: { year: "Năm", month: "Tháng", day: "Ngày", hour: "Giờ (0–23)", useNow: "↻ Dùng giờ hiện tại", title: "Thời điểm dựng quẻ", solar: "Dương lịch", lunar: "Âm lịch", convNote: "→ Đổi sang Âm lịch:", leap: "nhuận" },
    en: { year: "Year", month: "Month", day: "Day", hour: "Hour (0–23)", useNow: "↻ Use current time", title: "Cast for this moment", solar: "Solar", lunar: "Lunar", convNote: "→ Converted to lunar:", leap: "leap" },
    zh: { year: "年", month: "月", day: "日", hour: "時 (0–23)", useNow: "↻ 用當下時間", title: "起卦時點", solar: "陽曆", lunar: "農曆", convNote: "→ 換為農曆:", leap: "閏" },
  })[lang];

  function resetNow() {
    const n = new Date();
    setYear(n.getFullYear()); setMonth(n.getMonth() + 1);
    setDay(n.getDate()); setHour(n.getHours());
    setCalendar("solar");
  }

  // Live preview when in solar mode
  let lunarPreview = null;
  if (calendar === "solar" && method === "time") {
    try {
      const y = parseInt(year), m = parseInt(month), d = parseInt(day);
      if (Number.isFinite(y) && y > 1800 && y < 2300 && m >= 1 && m <= 12 && d >= 1 && d <= 31) {
        lunarPreview = solarToLunar(d, m, y, 7);
      }
    } catch {}
  }

  function doCast() {
    setError("");
    let r = null;
    if (method === "time") {
      const y = parseInt(year), m = parseInt(month), d = parseInt(day), h = parseInt(hour);
      if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d) || !Number.isFinite(h) ||
          m < 1 || m > 12 || d < 1 || d > 31 || h < 0 || h > 23) {
        setError(t.cast.enterNums); return;
      }
      r = castTime(y, m, d, h, calendar === "lunar");
    } else if (method === "number") {
      const a = parseInt(n1), b = parseInt(n2);
      if (!a || !b || a < 1 || b < 1) { setError(t.cast.enterNums); return; }
      r = castNumber(a, b);
    } else if (method === "sound") {
      r = castSound(text);
      if (!r) { setError(t.cast.tooShort); return; }
    } else if (method === "spont") r = castSpont();
    if (r) {
      r.question = question;
      setReading(r);
      setSaveStatus('saving');
      saveReading(r).then(res => {
        setSaveStatus(typeof res === 'number' ? 'saved' : res);
      });
    }
  }

  function reset() {
    setReading(null); setMethod(null); setN1(""); setN2(""); setText(""); setError("");
    setSaveStatus(null);
    resetNow();
  }

  if (reading) return <ReadingDisplay t={t} lang={lang} reading={reading} onAgain={reset} saveStatus={saveStatus} />;

  const methods = [
    { id: "time", icon: "時", title: t.cast.time, zh: t.cast.timeZh, desc: t.cast.timeDesc },
    { id: "number", icon: "數", title: t.cast.number, zh: t.cast.numberZh, desc: t.cast.numberDesc },
    { id: "sound", icon: "聲", title: t.cast.sound, zh: t.cast.soundZh, desc: t.cast.soundDesc },
    { id: "spont", icon: "應", title: t.cast.spont, zh: t.cast.spontZh, desc: t.cast.spontDesc },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-serif text-stone-900 mb-6">{t.cast.title}</h2>

      {!method && (
        <div className="grid md:grid-cols-2 gap-3">
          {methods.map(m => (
            <button key={m.id} onClick={() => setMethod(m.id)}
              className="text-left p-5 bg-white border border-stone-300 hover:border-rose-900 hover:bg-rose-50/30 transition-colors rounded">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-2xl font-serif text-rose-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{m.icon}</span>
                <span className="text-base font-medium text-stone-900">{m.title}</span>
              </div>
              <div className="text-xs text-stone-500 font-serif mb-1" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{m.zh}</div>
              <div className="text-sm text-stone-600 leading-relaxed">{m.desc}</div>
            </button>
          ))}
        </div>
      )}

      {method && (
        <div className="bg-white border border-stone-300 rounded p-6">
          <div className="mb-5">
            <button onClick={() => setMethod(null)} className="text-xs text-stone-500 hover:text-rose-900 mb-3">←</button>
            <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{t.result.methodNames[method]}</div>
            <div className="text-base text-stone-900">{methods.find(m => m.id === method).desc}</div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-stone-600 mb-1.5">{t.cast.question}</label>
            <input value={question} onChange={e => setQuestion(e.target.value)} placeholder={t.cast.questionPh}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 focus:border-rose-900 outline-none rounded text-sm" />
          </div>

          {method === "time" && (
            <div className="mb-4">
              <div className="flex items-baseline justify-between mb-2">
                <label className="block text-sm text-stone-600">{dtLabels.title}</label>
                <button type="button" onClick={resetNow} className="text-xs text-stone-500 hover:text-rose-900 transition-colors">
                  {dtLabels.useNow}
                </button>
              </div>

              <div className="flex gap-1 mb-2 text-xs">
                <button type="button" onClick={() => setCalendar("solar")}
                  className={`px-3 py-1.5 rounded transition-colors ${calendar === "solar" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}>
                  {dtLabels.solar}
                </button>
                <button type="button" onClick={() => setCalendar("lunar")}
                  className={`px-3 py-1.5 rounded transition-colors ${calendar === "lunar" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}>
                  {dtLabels.lunar}
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-[11px] text-stone-500 mb-0.5">{dtLabels.year}</label>
                  <input type="number" value={year} onChange={e => setYear(e.target.value)}
                    className="w-full px-2 py-1.5 bg-stone-50 border border-stone-300 focus:border-rose-900 outline-none rounded text-sm" />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-500 mb-0.5">{dtLabels.month}</label>
                  <input type="number" min="1" max="12" value={month} onChange={e => setMonth(e.target.value)}
                    className="w-full px-2 py-1.5 bg-stone-50 border border-stone-300 focus:border-rose-900 outline-none rounded text-sm" />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-500 mb-0.5">{dtLabels.day}</label>
                  <input type="number" min="1" max="31" value={day} onChange={e => setDay(e.target.value)}
                    className="w-full px-2 py-1.5 bg-stone-50 border border-stone-300 focus:border-rose-900 outline-none rounded text-sm" />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-500 mb-0.5">{dtLabels.hour}</label>
                  <input type="number" min="0" max="23" value={hour} onChange={e => setHour(e.target.value)}
                    className="w-full px-2 py-1.5 bg-stone-50 border border-stone-300 focus:border-rose-900 outline-none rounded text-sm" />
                </div>
              </div>

              {lunarPreview && (
                <div className="text-xs text-stone-600 mt-2 font-mono">
                  <span className="text-rose-700">{dtLabels.convNote}</span>{" "}
                  {t.branches[yearBranchOf(lunarPreview.year)-1]} ({yearBranchOf(lunarPreview.year)})
                  {" · "}{dtLabels.month} {lunarPreview.month}{lunarPreview.leap ? ` (${dtLabels.leap})` : ""}
                  {" · "}{dtLabels.day} {lunarPreview.day}
                </div>
              )}
            </div>
          )}

          {method === "number" && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-sm text-stone-600 mb-1.5">{t.cast.n1}</label>
                <input type="number" value={n1} onChange={e => setN1(e.target.value)} min="1"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 focus:border-rose-900 outline-none rounded" />
              </div>
              <div>
                <label className="block text-sm text-stone-600 mb-1.5">{t.cast.n2}</label>
                <input type="number" value={n2} onChange={e => setN2(e.target.value)} min="1"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 focus:border-rose-900 outline-none rounded" />
              </div>
            </div>
          )}

          {method === "sound" && (
            <div className="mb-4">
              <label className="block text-sm text-stone-600 mb-1.5">{t.cast.text}</label>
              <input value={text} onChange={e => setText(e.target.value)} placeholder={t.cast.textPh}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 focus:border-rose-900 outline-none rounded" />
            </div>
          )}

          {error && <div className="text-rose-700 text-sm mb-3">{error}</div>}

          <button onClick={doCast}
            className="w-full px-5 py-3 bg-stone-900 text-stone-50 hover:bg-rose-900 transition-colors text-sm tracking-wide rounded">
            {method === "spont" ? t.cast.castNow : t.cast.castBtn}
          </button>
        </div>
      )}
    </div>
  );
}

function CastCalculation({ reading, lang, t }) {
  const { method, inputs, u, l, change } = reading;

  const L = ({
    vi: { title: "Cách dựng quẻ (起卦演算)", inputs: "Đầu vào", upper: "Thượng quái", lower: "Hạ quái", changing: "Động hào", rem: "dư", arrow: "→", year: "Năm-chi", month: "Tháng", day: "Ngày", hour: "Giờ-chi", n1: "Số 1", n2: "Số 2", chars: "Số chữ", half1: "Nửa đầu", half2: "Nửa sau", text: "Câu", solarLabel: "Dương lịch", lunarLabel: "Âm lịch", lunarConverted: "→ Đổi sang Âm lịch", leap: "nhuận", noteTime: "Mai Hoa Dịch dùng Âm lịch. Nếu nhập Dương lịch, hệ thống tự đổi sang Âm rồi mới dựng quẻ.", note: "Quái: chia 8 lấy số dư (nếu dư 0 thì lấy 8). Động hào: chia 6 lấy số dư (nếu dư 0 thì lấy 6).", random: "Hệ thống chọn ngẫu nhiên — không có công thức." },
    en: { title: "Derivation", inputs: "Inputs", upper: "Upper", lower: "Lower", changing: "Changing line", rem: "rem", arrow: "→", year: "Year branch", month: "Month", day: "Day", hour: "Hour branch", n1: "Number 1", n2: "Number 2", chars: "Total chars", half1: "First half", half2: "Second half", text: "Phrase", solarLabel: "Solar", lunarLabel: "Lunar", lunarConverted: "→ Converted to lunar", leap: "leap", noteTime: "Plum Blossom uses the lunar calendar. Solar input is auto-converted to lunar before computing.", note: "Trigrams: divide by 8, use remainder (rem 0 means 8). Changing line: divide by 6, use remainder (rem 0 means 6).", random: "Cast randomly by the system — no formula." },
    zh: { title: "起卦演算", inputs: "輸入", upper: "上卦", lower: "下卦", changing: "動爻", rem: "餘", arrow: "→", year: "年支", month: "月", day: "日", hour: "時支", n1: "數一", n2: "數二", chars: "字數", half1: "前半", half2: "後半", text: "字句", solarLabel: "陽曆", lunarLabel: "農曆", lunarConverted: "→ 換為農曆", leap: "閏", noteTime: "梅花用農曆。輸入陽曆者先換為農曆,再起卦。", note: "卦:除8取餘(餘0則為8)。動爻:除6取餘(餘0則為6)。", random: "由系統隨機起卦,無公式。" },
  })[lang];

  function div(sum, divisor, useWhenZero) {
    const q = Math.floor(sum / divisor);
    const r = sum % divisor;
    return { q, r, result: r === 0 ? useWhenZero : r };
  }

  let inputItems = [];
  let upperEq = null, lowerEq = null, changeEq = null;
  let timeBlock = null;

  if (method === "time") {
    const lunar = inputs.lunar || { year: inputs.year, month: inputs.month, day: inputs.day, leap: 0 };
    const solar = inputs.solar;
    const yb = inputs.yearBranch;
    const m = lunar.month, d = lunar.day, ch = inputs.chHour;
    timeBlock = { lunar, solar, yb, ch, hour: inputs.hour };
    const s1 = yb + m + d;
    const s2 = s1 + ch;
    upperEq = { expr: `${yb} + ${m} + ${d}`, sum: s1, divisor: 8, ...div(s1, 8, 8) };
    lowerEq = { expr: `${yb} + ${m} + ${d} + ${ch}`, sum: s2, divisor: 8, ...div(s2, 8, 8) };
    changeEq = { expr: `${s2}`, sum: s2, divisor: 6, simple: true, ...div(s2, 6, 6) };
  } else if (method === "number") {
    const n1 = inputs.n1, n2 = inputs.n2;
    inputItems = [{ k: L.n1, v: n1 }, { k: L.n2, v: n2 }];
    upperEq = { expr: `${n1}`, sum: n1, divisor: 8, simple: true, ...div(n1, 8, 8) };
    lowerEq = { expr: `${n2}`, sum: n2, divisor: 8, simple: true, ...div(n2, 8, 8) };
    changeEq = { expr: `${n1} + ${n2}`, sum: n1 + n2, divisor: 6, ...div(n1 + n2, 6, 6) };
  } else if (method === "sound") {
    const h1 = inputs.half1, h2 = inputs.half2;
    inputItems = [
      { k: L.text, v: `"${(inputs.text || "").slice(0, 30)}"` },
      { k: L.chars, v: inputs.len },
      { k: L.half1, v: h1 },
      { k: L.half2, v: h2 },
    ];
    upperEq = { expr: `${h1}`, sum: h1, divisor: 8, simple: true, ...div(h1, 8, 8) };
    lowerEq = { expr: `${h2}`, sum: h2, divisor: 8, simple: true, ...div(h2, 8, 8) };
    changeEq = { expr: `${h1} + ${h2}`, sum: h1 + h2, divisor: 6, ...div(h1 + h2, 6, 6) };
  }

  function EqRow({ label, eq, trigram }) {
    if (!eq) return null;
    return (
      <div className="flex items-baseline gap-x-2 gap-y-1 flex-wrap text-sm py-1">
        <span className="text-stone-500 w-24 sm:w-28 flex-shrink-0">{label}</span>
        <span className="font-mono text-stone-700 text-xs sm:text-sm">
          {eq.simple ? eq.expr : `(${eq.expr})`} ÷ {eq.divisor} = {eq.q} {L.rem} <span className="text-stone-900 font-semibold">{eq.r}</span>
        </span>
        <span className="text-stone-400">{L.arrow}</span>
        <span className="font-mono text-rose-900 font-semibold">{eq.result}</span>
        {trigram && (
          <span className="text-stone-700 text-sm">= <span className="font-serif" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{trigram.zh}</span> {trigram.sym}</span>
        )}
      </div>
    );
  }

  if (method === "spont") {
    return (
      <div className="bg-stone-50/60 border border-stone-200 rounded p-4 mb-6">
        <h3 className="text-sm font-medium text-stone-800 mb-2">{L.title}</h3>
        <div className="text-sm text-stone-600 italic mb-2">{L.random}</div>
        <div className="text-xs text-stone-600 font-mono space-y-0.5">
          <div>{L.upper}: {u} = <span className="font-serif" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{TRIGRAMS[u].zh}</span> {TRIGRAMS[u].sym}</div>
          <div>{L.lower}: {l} = <span className="font-serif" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{TRIGRAMS[l].zh}</span> {TRIGRAMS[l].sym}</div>
          <div>{L.changing}: {change}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50/60 border border-stone-200 rounded p-4 mb-6">
      <h3 className="text-sm font-medium text-stone-800 mb-3">{L.title}</h3>

      {timeBlock && (
        <div className="mb-3 pb-3 border-b border-stone-200 space-y-1.5">
          {timeBlock.solar && (
            <div className="text-sm">
              <span className="text-stone-500">{L.solarLabel}: </span>
              <span className="font-mono text-stone-900">
                {timeBlock.solar.year}-{String(timeBlock.solar.month).padStart(2,'0')}-{String(timeBlock.solar.day).padStart(2,'0')}
                {" · "}{String(timeBlock.hour).padStart(2,'0')}:00
              </span>
            </div>
          )}
          <div className="text-sm">
            <span className={timeBlock.solar ? "text-rose-700 font-medium" : "text-stone-500"}>
              {timeBlock.solar ? L.lunarConverted : L.lunarLabel}:{" "}
            </span>
            <span className="font-mono text-stone-900">
              {t.branches[timeBlock.yb-1]} ({timeBlock.yb})
              {" · "}{L.month} {timeBlock.lunar.month}{timeBlock.lunar.leap ? ` (${L.leap})` : ""}
              {" · "}{L.day} {timeBlock.lunar.day}
              {" · "}{t.branches[timeBlock.ch-1]} ({timeBlock.ch})
            </span>
          </div>
          <div className="text-[11px] text-stone-500 italic pt-1">{L.noteTime}</div>
        </div>
      )}

      {!timeBlock && inputItems.length > 0 && (
        <div className="mb-3 pb-3 border-b border-stone-200">
          <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5">{L.inputs}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {inputItems.map((it, i) => (
              <div key={i}>
                <span className="text-stone-500">{it.k}: </span>
                <span className="text-stone-900 font-mono">{it.v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <EqRow label={L.upper} eq={upperEq} trigram={TRIGRAMS[u]} />
        <EqRow label={L.lower} eq={lowerEq} trigram={TRIGRAMS[l]} />
        <EqRow label={L.changing} eq={changeEq} />
      </div>

      <div className="text-[11px] text-stone-500 italic mt-3 pt-3 border-t border-stone-200">{L.note}</div>
    </div>
  );
}

function HexCard({ hex, lang, label, labelZh, desc, change }) {
  return (
    <div className="bg-white border border-stone-300 rounded p-3 sm:p-4 flex flex-col items-center text-center h-full">
      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">{label}</div>
      <div className="text-xs font-serif text-rose-900 mb-3" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{labelZh}</div>
      <div className="my-1"><HexLines u={hex.u} l={hex.l} change={change} size="md" /></div>
      <div className="mt-3 text-xl sm:text-2xl font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{hex.zh}</div>
      <div className="text-xs sm:text-sm text-stone-700 mt-0.5 leading-tight">{hexName(hex, lang)}</div>
      <div className="text-[10px] text-stone-400 mt-1">#{hex.n}</div>
      <div className="text-[10px] text-stone-500 italic mt-2 leading-snug">{desc}</div>
    </div>
  );
}

function ReadingDisplay({ t, lang, reading, onAgain, saveStatus }) {
  const { u, l, change } = reading;
  const ben = getHex(u, l);
  const nuc = getNuclear(u, l);
  const huHex = getHex(nuc.u, nuc.l);
  const trans = getTransformed(u, l, change);
  const bienHex = getHex(trans.u, trans.l);
  const ty = tiYongAnalysis(u, l, change);

  const outcomeText = ty.outcome === "favorable" ? t.result.favorable
                    : ty.outcome === "unfavorable" ? t.result.unfavorable
                    : ty.outcome === "less" ? t.result.less
                    : t.result.neutral;
  const outcomeColor = ty.outcome === "favorable" ? "bg-emerald-50 border-emerald-700 text-emerald-900"
                     : ty.outcome === "unfavorable" ? "bg-rose-50 border-rose-700 text-rose-900"
                     : ty.outcome === "less" ? "bg-amber-50 border-amber-700 text-amber-900"
                     : "bg-stone-100 border-stone-500 text-stone-800";

  const inputsLine = reading.method === "time"
    ? `${t.branches[reading.inputs.yearBranch - 1]}年 · ${reading.inputs.month}月 · ${reading.inputs.day}日 · ${t.branches[reading.inputs.chHour - 1]}時`
    : reading.method === "number"
    ? `${reading.inputs.n1} , ${reading.inputs.n2}`
    : reading.method === "sound"
    ? `"${reading.inputs.text}" (${reading.inputs.len})`
    : "—";

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{t.result.yourReading}</div>
          <div className="flex items-center gap-2 text-sm text-stone-600">
            <span>{t.result.method}:</span>
            <span className="text-stone-900">{t.result.methodNames[reading.method]}</span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-700">{inputsLine}</span>
          </div>
        </div>
        <button onClick={onAgain} className="text-xs px-3 py-1.5 border border-stone-400 hover:border-rose-900 hover:text-rose-900 rounded transition-colors">
          {t.cast.again}
        </button>
      </div>

      {saveStatus && (
        <div className={`mb-4 text-xs px-3 py-1.5 rounded inline-block ${
          saveStatus === 'saved'      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
          : saveStatus === 'saving'   ? 'bg-stone-50 text-stone-600 border border-stone-200'
          : saveStatus === 'error'    ? 'bg-rose-50 text-rose-800 border border-rose-200'
          : saveStatus === 'no-storage' ? 'bg-amber-50 text-amber-800 border border-amber-200'
          : ''
        }`}>
          {saveStatus === 'saved'      ? t.result.saved
          : saveStatus === 'saving'    ? t.result.saving
          : saveStatus === 'error'     ? t.result.saveError
          : saveStatus === 'no-storage'? t.result.noStorage
          : ''}
        </div>
      )}

      {reading.question && (
        <div className="mb-6 p-3 bg-amber-50 border-l-2 border-amber-600 rounded-r">
          <div className="text-[10px] uppercase tracking-widest text-amber-700 mb-1">{t.result.yourQ}</div>
          <div className="text-stone-800 italic">"{reading.question}"</div>
        </div>
      )}

      <CastCalculation reading={reading} lang={lang} t={t} />

      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
        <HexCard hex={ben} lang={lang} label={t.result.ben} labelZh={t.result.benZh} desc={t.result.benDesc} change={change} />
        <HexCard hex={huHex} lang={lang} label={t.result.hu} labelZh={t.result.huZh} desc={t.result.huDesc} />
        <HexCard hex={bienHex} lang={lang} label={t.result.bien} labelZh={t.result.bienZh} desc={t.result.bienDesc} />
      </div>

      {/* Bản quẻ details */}
      <div className="bg-white border border-stone-300 rounded p-5 mb-4">
        <div className="flex items-start gap-5">
          <div className="flex-shrink-0">
            <HexLines u={u} l={l} change={change} size="lg" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.result.ben} · 第 {ben.n} 卦</div>
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-3xl font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{ben.zh}</span>
              <span className="text-stone-600 italic">{ben.py}</span>
            </div>
            <div className="text-stone-800 mb-3">{hexName(ben, lang)}</div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <TrigramSummary tn={u} label={t.result.upper} t={t} lang={lang} />
              <TrigramSummary tn={l} label={t.result.lower} t={t} lang={lang} />
            </div>

            <div className="border-t border-stone-200 pt-3 space-y-2">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">{t.result.judgment} · 卦辭</div>
                <div className="text-rose-900 font-serif mb-1" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{ben.jZh}</div>
                <div className="text-sm text-stone-800">{hexJudg(ben, lang)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">{t.result.image} · 象</div>
                <div className="text-sm text-stone-700 italic">{hexImg(ben, lang)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Changing line */}
      <div className="bg-rose-50/50 border border-rose-200 rounded p-5 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-widest text-rose-700">{t.result.dong} · {t.result.dongZh}</span>
        </div>
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-2xl font-serif text-rose-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>第 {change} 爻</span>
          <span className="text-sm text-stone-600">{t.result.line} {change}</span>
        </div>
        <div className="text-sm text-stone-700">{t.result.lineMeanings[change - 1]}</div>
      </div>

      {/* Ti-Yong Analysis */}
      <div className={`border-l-4 ${outcomeColor.split(' ').filter(c => c.startsWith('border-')).join(' ')} bg-white border border-stone-300 rounded p-5`}>
        <h3 className="text-base font-serif text-stone-900 mb-4">{t.result.tiYong} · 體用論斷</h3>

        <div className="text-xs text-stone-600 mb-4 italic">
          {ty.yongIsLower ? t.result.yongInLower : t.result.yongInUpper}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-stone-50 border border-stone-300 rounded p-3">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.result.ti} · 體 · {t.result.tiSub}</div>
            <div className="flex items-center gap-2 mb-2">
              <TrigramLines n={ty.ti} size="sm" />
              <div>
                <div className="font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{ty.tiT.zh} {ty.tiT.sym}</div>
                <div className="text-xs text-stone-600">{trigName(ty.tiT, lang)}</div>
              </div>
            </div>
            <div className="text-xs text-stone-600">
              <span className="text-rose-900">{t.elements[ty.tiT.el]}</span>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-300 rounded p-3">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.result.yong} · 用 · {t.result.yongSub}</div>
            <div className="flex items-center gap-2 mb-2">
              <TrigramLines n={ty.yong} size="sm" />
              <div>
                <div className="font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{ty.yongT.zh} {ty.yongT.sym}</div>
                <div className="text-xs text-stone-600">{trigName(ty.yongT, lang)}</div>
              </div>
            </div>
            <div className="text-xs text-stone-600">
              <span className="text-rose-900">{t.elements[ty.yongT.el]}</span>
            </div>
          </div>
        </div>

        <div className={`p-4 border ${outcomeColor} rounded`}>
          <div className="text-[10px] uppercase tracking-widest mb-1 opacity-70">{t.result.relation}</div>
          <div className="font-medium mb-2">{outcomeText}</div>
          <div className="text-sm leading-relaxed">{t.rel[ty.rel]}</div>
        </div>
      </div>
    </div>
  );
}

function TrigramSummary({ tn, label, t, lang }) {
  const tg = TRIGRAMS[tn];
  return (
    <div className="bg-stone-50 border border-stone-200 rounded p-3">
      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{label}</div>
      <div className="flex items-center gap-2 mb-2">
        <TrigramLines n={tn} size="sm" />
        <div>
          <div className="font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{tg.zh} {tg.sym}</div>
          <div className="text-xs text-stone-600">{trigName(tg, lang)}</div>
        </div>
      </div>
      <div className="text-[11px] text-stone-600 space-y-0.5">
        <div>{t.result.element}: <span className="text-rose-900">{t.elements[tg.el]}</span></div>
        <div>{t.result.attribute}: {trigAttr(tg, lang)}</div>
        <div>{t.result.family}: {trigFam(tg, lang)}</div>
      </div>
    </div>
  );
}

function LearnView({ t, lang }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-serif text-stone-900 mb-8">{t.learn.title}</h2>

      {/* Bagua */}
      <section className="mb-10">
        <h3 className="text-lg font-serif text-stone-900 mb-2">{t.learn.baguaT}</h3>
        <p className="text-sm text-stone-700 mb-4">{t.learn.bagua}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1,2,3,4,5,6,7,8].map(i => {
            const tg = TRIGRAMS[i];
            return (
              <div key={i} className="bg-white border border-stone-300 rounded p-3">
                <div className="flex items-center gap-2 mb-2">
                  <TrigramLines n={i} size="sm" />
                  <div>
                    <div className="font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{tg.zh} <span className="text-stone-500 text-sm">{i}</span></div>
                    <div className="text-xs text-stone-600">{trigName(tg, lang)}</div>
                  </div>
                </div>
                <div className="text-[11px] text-stone-600 space-y-0.5 border-t border-stone-200 pt-2">
                  <div>{t.result.element}: <span className="text-rose-900">{t.elements[tg.el]}</span></div>
                  <div>{t.result.attribute}: {trigAttr(tg, lang)}</div>
                  <div>{t.result.family}: {trigFam(tg, lang)}</div>
                  <div>{t.result.direction}: {trigDir(tg, lang)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Five Elements */}
      <section className="mb-10">
        <h3 className="text-lg font-serif text-stone-900 mb-3">{t.learn.nguT}</h3>
        <div className="space-y-2">
          <div className="p-3 bg-emerald-50 border-l-2 border-emerald-700 rounded-r text-sm text-stone-700">{t.learn.nguG}</div>
          <div className="p-3 bg-rose-50 border-l-2 border-rose-700 rounded-r text-sm text-stone-700">{t.learn.nguK}</div>
        </div>
      </section>

      {/* Methods */}
      <section className="mb-10">
        <h3 className="text-lg font-serif text-stone-900 mb-3">{t.learn.methodsT}</h3>
        <div className="space-y-3 text-sm text-stone-700">
          <div className="bg-white border border-stone-200 rounded p-4">
            <div className="font-medium text-stone-900 mb-1">{t.cast.time} · {t.cast.timeZh}</div>
            <div>{t.learn.mTime}</div>
          </div>
          <div className="bg-white border border-stone-200 rounded p-4">
            <div className="font-medium text-stone-900 mb-1">{t.cast.number} · {t.cast.numberZh}</div>
            <div>{t.learn.mNumber}</div>
          </div>
          <div className="bg-white border border-stone-200 rounded p-4">
            <div className="font-medium text-stone-900 mb-1">{t.cast.sound} · {t.cast.soundZh}</div>
            <div>{t.learn.mSound}</div>
          </div>
          <div className="bg-white border border-stone-200 rounded p-4">
            <div className="font-medium text-stone-900 mb-1">{t.cast.spont} · {t.cast.spontZh}</div>
            <div>{t.learn.mSpont}</div>
          </div>
        </div>
      </section>

      {/* Three hexagrams */}
      <section className="mb-10">
        <h3 className="text-lg font-serif text-stone-900 mb-3">{t.learn.hexT}</h3>
        <div className="space-y-2 text-sm text-stone-700">
          <div className="border-l-2 border-stone-700 pl-3">{t.learn.benDef}</div>
          <div className="border-l-2 border-amber-700 pl-3">{t.learn.huDef}</div>
          <div className="border-l-2 border-rose-700 pl-3">{t.learn.bienDef}</div>
        </div>
      </section>

      {/* Ti-Yong */}
      <section>
        <h3 className="text-lg font-serif text-stone-900 mb-3">{t.learn.tiyongT}</h3>
        <p className="text-sm text-stone-700 leading-relaxed">{t.learn.tiyong}</p>
      </section>
    </div>
  );
}

function RefView({ t, lang }) {
  const [selected, setSelected] = useState(null);
  const [filterU, setFilterU] = useState(0);
  const [filterL, setFilterL] = useState(0);

  if (selected) {
    const h = HEX[selected];
    const opp = getOpposite(h.u, h.l);
    const inv = getInverse(h.u, h.l);
    const oppHex = getHex(opp.u, opp.l);
    const invHex = getHex(inv.u, inv.l);
    return (
      <div className="max-w-2xl mx-auto px-6 py-8">
        <button onClick={() => setSelected(null)} className="text-sm text-stone-600 hover:text-rose-900 mb-5">{t.ref.back}</button>

        <div className="bg-white border border-stone-300 rounded p-6 mb-4">
          <div className="flex items-start gap-5 mb-4">
            <HexLines u={h.u} l={h.l} size="lg" />
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">第 {h.n} 卦</div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{h.zh}</span>
                <span className="text-stone-600 italic">{h.py}</span>
              </div>
              <div className="text-stone-800 mb-2">{hexName(h, lang)}</div>
              <div className="text-xs text-stone-500">{TRIGRAMS[h.u].sym} {TRIGRAMS[h.u].zh} / {TRIGRAMS[h.l].sym} {TRIGRAMS[h.l].zh}</div>
            </div>
          </div>

          <div className="border-t border-stone-200 pt-4 space-y-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">{t.result.judgment} · 卦辭</div>
              <div className="text-rose-900 font-serif mb-1" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{h.jZh}</div>
              <div className="text-sm text-stone-800">{hexJudg(h, lang)}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">{t.result.image} · 象</div>
              <div className="text-sm text-stone-700 italic">{hexImg(h, lang)}</div>
            </div>
          </div>
        </div>

        <h4 className="text-sm font-serif text-stone-700 mb-2">{t.ref.relatedT}</h4>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setSelected(oppHex.n)} className="bg-white border border-stone-300 hover:border-rose-900 rounded p-3 text-left transition-colors">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.ref.opposite} · 錯</div>
            <div className="flex items-center gap-3">
              <HexLines u={oppHex.u} l={oppHex.l} size="sm" />
              <div>
                <div className="font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{oppHex.zh}</div>
                <div className="text-xs text-stone-600">{hexName(oppHex, lang)}</div>
              </div>
            </div>
          </button>
          <button onClick={() => setSelected(invHex.n)} className="bg-white border border-stone-300 hover:border-rose-900 rounded p-3 text-left transition-colors">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.ref.inverse} · 綜</div>
            <div className="flex items-center gap-3">
              <HexLines u={invHex.u} l={invHex.l} size="sm" />
              <div>
                <div className="font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{invHex.zh}</div>
                <div className="text-xs text-stone-600">{hexName(invHex, lang)}</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  const filtered = [];
  for (let i = 1; i <= 64; i++) {
    const h = HEX[i];
    if (!h) continue;
    if (filterU && h.u !== filterU) continue;
    if (filterL && h.l !== filterL) continue;
    filtered.push(h);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-serif text-stone-900 mb-6">{t.ref.title}</h2>

      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <div>
          <label className="text-xs text-stone-500 mr-2">{t.ref.filterU}:</label>
          <select value={filterU} onChange={e => setFilterU(parseInt(e.target.value))}
            className="text-sm border border-stone-300 rounded px-2 py-1 bg-white">
            <option value={0}>{t.ref.all}</option>
            {[1,2,3,4,5,6,7,8].map(i => <option key={i} value={i}>{TRIGRAMS[i].sym} {TRIGRAMS[i].zh} {trigName(TRIGRAMS[i], lang)}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-stone-500 mr-2">{t.ref.filterL}:</label>
          <select value={filterL} onChange={e => setFilterL(parseInt(e.target.value))}
            className="text-sm border border-stone-300 rounded px-2 py-1 bg-white">
            <option value={0}>{t.ref.all}</option>
            {[1,2,3,4,5,6,7,8].map(i => <option key={i} value={i}>{TRIGRAMS[i].sym} {TRIGRAMS[i].zh} {trigName(TRIGRAMS[i], lang)}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {filtered.map(h => (
          <button key={h.n} onClick={() => setSelected(h.n)}
            className="bg-white border border-stone-300 hover:border-rose-900 hover:bg-rose-50/30 rounded p-3 text-left transition-colors">
            <div className="flex items-center gap-2 mb-1.5">
              <HexLines u={h.u} l={h.l} size="sm" />
              <div className="text-xs text-stone-500">#{h.n}</div>
            </div>
            <div className="font-serif text-base text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{h.zh}</div>
            <div className="text-xs text-stone-600 truncate">{hexName(h, lang)}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function HistoryView({ t, lang }) {
  const [readings, setReadings] = useState(null);
  const [selected, setSelected] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const labels = ({
    vi: { title: "Quẻ đã lưu", empty: "Chưa có quẻ nào được lưu. Hãy dựng một quẻ ở mục Bốc quẻ.", confirmDel: "Xóa?", clearAll: "Xóa hết", confirmAll: "Xóa tất cả?", loading: "Đang tải...", back: "Danh sách", anonQ: "(không có câu hỏi)", noStorageT: "Bộ nhớ không khả dụng", noStorageB: "Trong môi trường này, ứng dụng không thể truy cập bộ nhớ lưu trữ. Quẻ sẽ không được giữ lại sau khi đóng. Khi bộ nhớ hoạt động trở lại, các quẻ đã lưu sẽ tự hiện ở đây." },
    en: { title: "Saved readings", empty: "No saved readings yet. Cast one in the Cast tab.", confirmDel: "Delete?", clearAll: "Clear all", confirmAll: "Delete all?", loading: "Loading...", back: "List", anonQ: "(no question)", noStorageT: "Storage unavailable", noStorageB: "This environment isn't exposing the persistent storage API, so readings can't be kept across sessions right now. When storage comes back, your saved readings will appear here automatically." },
    zh: { title: "已存卦", empty: "暫無已存。請於起卦處起一卦。", confirmDel: "刪?", clearAll: "全部清空", confirmAll: "全部刪除?", loading: "載入中…", back: "列表", anonQ: "(無問)", noStorageT: "存儲不可用", noStorageB: "此環境未提供持久存儲,卦象暫不能跨會話保留。存儲恢復後,已存之卦會自動顯示。" },
  })[lang];

  React.useEffect(() => {
    listReadings().then(setReadings);
  }, []);

  async function handleDelete(id, e) {
    e.stopPropagation();
    if (deleteConfirm === id) {
      const ok = await deleteReading(id);
      if (ok) {
        setReadings(rs => rs.filter(r => r.id !== id));
        setDeleteConfirm(null);
      }
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(c => c === id ? null : c), 3000);
    }
  }

  async function handleClearAll() {
    if (deleteConfirm === 'all') {
      const ids = readings.map(r => r.id);
      for (const id of ids) await deleteReading(id);
      setReadings([]);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm('all');
      setTimeout(() => setDeleteConfirm(c => c === 'all' ? null : c), 3000);
    }
  }

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      const locale = lang === 'zh' ? 'zh-CN' : lang === 'vi' ? 'vi-VN' : 'en-US';
      return d.toLocaleString(locale, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch { return iso; }
  }

  if (selected) {
    return (
      <div>
        <div className="max-w-3xl mx-auto px-6 pt-6">
          <button onClick={() => setSelected(null)} className="text-sm text-stone-600 hover:text-rose-900 transition-colors">
            ← {labels.back}
          </button>
        </div>
        <ReadingDisplay t={t} lang={lang} reading={selected} onAgain={() => setSelected(null)} />
      </div>
    );
  }

  if (readings === null) {
    return <div className="max-w-3xl mx-auto px-6 py-8 text-stone-500 text-sm">{labels.loading}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex items-baseline justify-between mb-6 gap-4">
        <h2 className="text-2xl font-serif text-stone-900">{labels.title}</h2>
        {readings.length > 0 && (
          <button onClick={handleClearAll}
            className={`text-xs px-3 py-1 border rounded transition-colors flex-shrink-0 ${deleteConfirm === 'all' ? 'border-rose-700 text-rose-700 bg-rose-50' : 'border-stone-400 text-stone-600 hover:border-rose-900 hover:text-rose-900'}`}>
            {deleteConfirm === 'all' ? labels.confirmAll : labels.clearAll}
          </button>
        )}
      </div>

      {!isStorageAvailable() ? (
        <div className="text-sm py-6 px-5 border border-amber-300 bg-amber-50 rounded">
          <div className="font-medium text-amber-900 mb-1">⚠ {labels.noStorageT}</div>
          <div className="text-amber-800 leading-relaxed">{labels.noStorageB}</div>
        </div>
      ) : readings.length === 0 ? (
        <div className="text-stone-500 text-sm py-12 text-center border border-stone-200 border-dashed rounded">
          {labels.empty}
        </div>
      ) : (
        <div className="space-y-2">
          {readings.map(r => {
            const ben = getHex(r.u, r.l);
            if (!ben) return null;
            return (
              <div key={r.id} onClick={() => setSelected(r)}
                className="cursor-pointer w-full bg-white border border-stone-300 hover:border-rose-900 hover:bg-rose-50/30 transition-colors rounded p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0"><HexLines u={r.u} l={r.l} change={r.change} size="sm" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                      <span className="text-lg font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{ben.zh}</span>
                      <span className="text-sm text-stone-700 truncate">{hexName(ben, lang)}</span>
                      <span className="text-xs text-stone-400">#{ben.n}</span>
                    </div>
                    {r.question ? (
                      <div className="text-xs text-stone-700 italic truncate mb-1">"{r.question}"</div>
                    ) : (
                      <div className="text-xs text-stone-400 italic mb-1">{labels.anonQ}</div>
                    )}
                    <div className="text-[11px] text-stone-500 flex items-center gap-2 flex-wrap">
                      <span>{formatDate(r.savedAt)}</span>
                      <span className="text-stone-300">·</span>
                      <span>{t.result.methodNames[r.method]}</span>
                      <span className="text-stone-300">·</span>
                      <span>{t.result.line} {r.change}</span>
                    </div>
                  </div>
                  <button onClick={e => handleDelete(r.id, e)}
                    className={`text-xs px-2 py-1 rounded transition-colors flex-shrink-0 ${deleteConfirm === r.id ? 'bg-rose-700 text-white' : 'text-stone-400 hover:text-rose-700'}`}>
                    {deleteConfirm === r.id ? labels.confirmDel : '✕'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [view, setView] = useState("home");
  const [lang, setLang] = useState("vi");
  const [reading, setReading] = useState(null);
  const t = STR[lang];

  const langOptions = [
    { code: "vi", label: "VI" },
    { code: "en", label: "EN" },
    { code: "zh", label: "中" },
  ];

  return (
    <div className="min-h-screen" style={{
      background: "linear-gradient(180deg, #f7f1e3 0%, #f0e7d3 100%)",
      color: "#1c1410",
    }}>
      {/* Header */}
      <header className="border-b border-stone-300/60 backdrop-blur-sm sticky top-0 z-10" style={{background:"rgba(247,241,227,0.85)"}}>
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <button onClick={() => { setView("home"); setReading(null); }} className="flex items-center gap-3 group">
            <PlumBlossom size={28} />
            <div className="text-left">
              <div className="text-base font-serif text-stone-900 leading-tight" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>
                {t.title}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500">{t.subtitle}</div>
            </div>
          </button>
          <div className="flex gap-1 text-xs">
            {langOptions.map(o => (
              <button key={o.code} onClick={() => setLang(o.code)}
                className={`px-2.5 py-1 rounded transition-colors ${lang === o.code ? "bg-stone-900 text-stone-50" : "text-stone-600 hover:text-stone-900"}`}>
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div className="max-w-5xl mx-auto px-6 flex gap-1 border-t border-stone-200 overflow-x-auto">
          {[
            { id: "home",    label: t.nav.home },
            { id: "cast",    label: t.nav.cast },
            { id: "ref",     label: t.nav.ref },
            { id: "learn",   label: t.nav.learn },
            { id: "history", label: ({ vi: "Lịch sử", en: "History", zh: "歷史" })[lang] },
          ].map(item => (
            <button key={item.id} onClick={() => { setView(item.id); if (item.id !== "cast") setReading(null); }}
              className={`px-4 py-2 text-sm transition-colors border-b-2 whitespace-nowrap ${view === item.id ? "border-rose-900 text-rose-900 font-medium" : "border-transparent text-stone-600 hover:text-stone-900"}`}>
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <main>
        {view === "home" && <HomeView t={t} setView={setView} />}
        {view === "cast" && <CastView t={t} lang={lang} reading={reading} setReading={setReading} />}
        {view === "ref" && <RefView t={t} lang={lang} />}
        {view === "learn" && <LearnView t={t} lang={lang} />}
        {view === "history" && <HistoryView t={t} lang={lang} />}
      </main>

      <footer className="border-t border-stone-300/60 mt-12 py-6 text-center text-xs text-stone-500">
        梅花易數 · Mai Hoa Dịch Số · Plum Blossom Oracle
      </footer>
    </div>
  );
}
