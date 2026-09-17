/**
 * =========================================================================
 * คู่มือการแก้ไขข้อมูลสำหรับผู้ดูแลเว็บไซต์ (Manual for content.js)
 * =========================================================================
 * ยินดีต้อนรับสู่ไฟล์รวบรวมข้อมูลสำหรับแก้ไขหน้าเว็บไซต์!
 * คุณสามารถแก้ไขข้อมูลทุกอย่างบนหน้าเว็บได้ที่นี่ โดยไม่จำเป็นต้องแก้ไขโค้ดส่วนอื่น
 * 
 * วิธีการแก้ไขข้อมูลทั่วไป:
 * 1. ข้อมูลส่วนใหญ่จะแยกออกเป็น ภาษาไทย (th) และ ภาษาอังกฤษ (en)
 *    เช่น title: { th: "ข้อความไทย", en: "English Text" }
 *    ให้แก้ไขข้อความด้านหลังเครื่องหมายคำพูดคู่ "..." หรือคำพูดเดี่ยว '...'
 * 
 * 2. การเพิ่มผลงาน (Portfolio Project):
 *    - ค้นหาหัวข้อ "===== 4. ผลงานการติดตั้ง (Portfolio Projects) ====="
 *    - คัดลอกบล็อกออบเจกต์ { ... } ตั้งแต่เครื่องหมายปีกกาเปิด { ถึงปีกกาปิด } พร้อมเครื่องหมายจุลภาค (,)
 *    - วางต่อท้ายในอาร์เรย์เดิม และแก้ไขข้อมูลตามต้องการ
 * 
 * 3. การเพิ่มบทความสาระความรู้ (Knowledge Articles):
 *    - ค้นหาหัวข้อ "===== 7. บทความสาระความรู้ (Knowledge Articles) ====="
 *    - คัดลอกบล็อกออบเจกต์หนึ่งชุด วางต่อในตำแหน่งที่ต้องการ จากนั้นแก้ไขฟิลด์ข้อมูล
 *      เช่น id, title, date, category, image, excerpt, body
 * 
 * 4. การแก้ไขรายละเอียดบริการ (Services Details):
 *    - ค้นหาหัวข้อ "===== 3. ข้อมูลบริการ (Services List & Details) ====="
 *    - คุณสามารถแก้ไขข้อความหัวข้อ บทนำ รายละเอียดข้อความ จุดเด่น หรือกลุ่มลูกค้าเป้าหมายได้ทันที
 * 
 * 5. การแก้ไขข้อมูลติดต่อและโซเชียลมีเดีย:
 *    - ค้นหาหัวข้อ "===== 1. ข้อมูลบริษัทและข้อมูลการติดต่อ (Company Info) ====="
 *    - คุณสามารถแก้ไขชื่อ เบอร์โทร อีเมล ที่อยู่ หรือไลน์ไอดีได้เลยที่นี่
 * 
 * หมายเหตุ: 
 * - กรุณาตรวจสอบให้แน่ใจว่าเครื่องหมายคำพูด (") และเครื่องหมายจุลภาค (,) เปิดและปิดอย่างถูกต้องในทุกๆ แถว
 * - ลิงก์รูปภาพทั้งหมดควรใส่เป็นที่อยู่รูปภาพในโฟลเดอร์ เช่น "/portfolio-01.jpg"
 * =========================================================================
 */

// ===== 0. ที่อยู่เว็บ (สำคัญมาก) =====
// ใช้สร้าง canonical / og:url / sitemap.xml
// ⚠️ ตอนย้ายไปโดเมนหลักแล้ว ให้แก้บรรทัดนี้บรรทัดเดียว ที่เหลือเปลี่ยนตามเอง
export const SITE_URL = "https://www.thermothailand.com";

// ===== 1. ข้อมูลบริษัทและข้อมูลการติดต่อ (Company Info) =====
// แก้ไขที่อยู่ เบอร์โทร อีเมล ลิงก์ และช่องทางติดต่อต่างๆ ของบริษัทได้ที่นี่
export const companyInfo = {
  name: {
    th: "บริษัท เทอร์โม จำกัด",
    en: "THERMO Co., Ltd."
  },
  address: {
    th: "280 ซอยอ่อนนุช 17 แยก 16 แขวงสวนหลวง เขตสวนหลวง กรุงเทพมหานคร 10250",
    en: "280 Soi On Nut 17 Yaek 16, Suan Luang, Suan Luang, Bangkok 10250, Thailand"
  },
  phone: "02 717 8065-7",
  email: "info@thermothailand.com",
  web: "www.thermothailand.com",
  line: "@thermothailand",
  facebookUrl: "#",
  youtubeUrl: "#",
  linkedinUrl: "#",
  twitterUrl: "#"
};

// ===== ปุ่ม LINE — เปลี่ยนเป็น true พร้อมใส่ URL จริงเมื่อมี LINE OA แล้ว =====
export const lineConfig = {
  enabled: false,                                   // false = ซ่อนปุ่ม LINE ทุกจุด
  url: "https://line.me/R/ti/p/@thermothailand"      // ใส่ LINE OA URL จริงตรงนี้เมื่อพร้อม
};

// ===== 2. ข้อความส่วนต้อนรับ (Hero Text & Features) =====
// แก้ไขคำโปรยสโลแกน และจุดเด่นหลัก 3 อย่างในหน้าแรก (ใต้ปุ่มขอใบเสนอราคา)
export const heroText = {
  title: {
    th: "ผู้เชี่ยวชาญระบบทำความเย็นอุตสาหกรรม",
    en: "Industrial Cooling Systems Specialist"
  },
  subtitle: {
    th: "INDUSTRIAL COOLING SYSTEMS SPECIALIST",
    en: "INDUSTRIAL COOLING SYSTEMS SPECIALIST"
  },
  tagline: {
    th: "ห้องเย็น ห้องแช่แข็ง ชิลเลอร์ และห้องควบคุมสภาวะแวดล้อม — ออกแบบเฉพาะงานของคุณ ไม่ใช่ของสำเร็จรูปจากแคตตาล็อก",
    en: "Cold rooms, freezers, chillers and environment-controlled rooms — engineered for your operation, never off a catalogue page."
  },
  features: {
    th: [
      "ห้องเย็น ชิลเลอร์ ประตู มอนิเตอร์ริ่ง — จบในทีมเดียว",
      "คำนวณจากสินค้าและการใช้งานจริง",
      "ดูแลต่อเนื่องหลังติดตั้ง"
    ],
    en: [
      "Cold rooms, chillers, doors, monitoring — one team",
      "Sized from your product and your operation",
      "Ongoing service after installation"
    ]
  }
};

// ===== 3. ข้อมูลบริการ (Services List & Details) =====
// ข้อมูลการบริการทั้งหมดรวมถึงรายละเอียดทางเทคนิค จุดเด่น และรายละเอียดรูปภาพ
// สามารถแก้ไขข้อความเหล่านี้เมื่อต้องการอัปเดตข้อมูลบริการแต่ละประเภท
export const services = [
  {
    id: "coldroom",
    title: {
      th: "ห้องเย็น (Cold Room)",
      en: "Cold Room"
    },
    subTitle: {
      th: "COLD ROOM & BLAST FREEZER",
      en: "COLD ROOM & BLAST FREEZER"
    },
    description: {
      th: "ห้องเย็น ห้องแช่แข็ง และ Blast Freezer ที่คำนวณจากสินค้าและการใช้งานจริงของคุณ ไม่ใช่จากขนาดห้องอย่างเดียว",
      en: "Cold rooms, freezers and blast freezers sized from your actual product and operation — not just the room dimensions."
    },
    intro: {
      th: "งานที่เราทำมามากที่สุด และเป็นงานที่ตัดสินกันตั้งแต่ก่อนเริ่มออกแบบ",
      en: "The work we've done most — and the work that gets decided before design even starts."
    },
    paragraphs: {
      th: [
        "ห้องเย็นที่ \"ถูก\" แต่เครื่องเล็กไป จะวิ่งไม่หยุด กินไฟกว่า และพังเร็วกว่า ส่วนห้องที่เผื่อไว้เยอะเกินก็จ่ายค่าเครื่องเกินจำเป็นตั้งแต่วันแรก จุดที่คุ้มที่สุดอยู่ตรงกลาง และมันคำนวณได้ ถ้ารู้ว่าคุณเก็บอะไร ปริมาณเท่าไหร่ และใช้งานยังไง",
        "เราจึงเริ่มจากคำถามก่อนเสมอ — เก็บรักษาเฉยๆ หรือต้องลดอุณหภูมิสินค้าที่เพิ่งเข้ามา มีฟอร์กลิฟต์วิ่งเข้าไปในห้องไหม มีการแปรรูปข้างในไหม ของเข้าออกวันละเท่าไหร่ คำตอบพวกนี้เปลี่ยนขนาดเครื่องได้เป็นเท่าตัว",
        "ห้องเย็นแบ่งตามช่วงอุณหภูมิใช้งาน — Chill Room อยู่ที่ -5 ถึง +8°C ซึ่งใช้แพร่หลายที่สุดในเกือบทุกอุตสาหกรรม ตั้งแต่วัตถุดิบอาหารและเครื่องดื่ม ยาและสมุนไพร ไปจนถึงไมโครโปรเซสเซอร์ ส่วนห้องแช่แข็ง (Freezer) อยู่ที่ -15 ถึง -25°C ลงไป สำหรับเก็บรักษาคุณภาพระยะยาว",
        "Blast Freezer และ Blast Chiller ต่างออกไป เพราะมันไม่ใช่ \"ห้องเก็บ\" แต่เป็น \"กระบวนการ\" — ลดอุณหภูมิสินค้าลงอย่างรวดเร็วถึงอุณหภูมิเป้าหมายภายในเวลาที่กำหนด เพื่อรักษาคุณภาพให้ใกล้เคียงของสดที่สุด ด้วยเหตุนี้เครื่องทำความเย็นจึงต้องใหญ่กว่าห้องเย็นทั่วไปพอสมควร การเอาห้องแช่แข็งธรรมดามาใช้แทนจึงมักไม่ได้ผลลัพธ์ตามที่ต้องการ",
        "ผนังห้องเย็นใช้แผ่นฉนวนแบบ Sandwich panel คือขึ้นรูปฉนวนไว้ตรงกลาง ประกบวัสดุปิดผิวทั้งสองด้าน ชนิดของฉนวนมีคุณสมบัติต่างกันทั้งความหนาแน่น ความคงทน การนำความร้อน การดูดซับเสียง และการทนไฟ — เลือกให้ตรงกับอุณหภูมิและเงื่อนไขหน้างาน ไม่ใช่เลือกที่หนาที่สุดแล้วจบ",
        "งานที่ผ่านมือเรามีตั้งแต่ห้องเย็นคลังสินค้าระหว่างประเทศที่ท่าอากาศยานสุวรรณภูมิ ห้องเย็นหลังร้าน KFC กว่า 200 สาขาทั่วประเทศ ห้องเย็นเก็บทุเรียนสดเพื่อแปรรูปที่จันทบุรี ไปจนถึง Blast Freezer ในสถาบันวิจัยวิทยาศาสตร์และเทคโนโลยีแห่งประเทศไทย — คนละโจทย์กันทั้งหมด และนั่นคือประเด็น",
        "ห้องเย็นไม่ใช่ของที่ซื้อแล้วจบ มันคือเครื่องจักรที่ต้องวิ่ง 24 ชั่วโมง การดูแลอย่างสม่ำเสมอและถูกวิธียืดอายุระบบ ประหยัดค่าไฟ และยืดอายุอะไหล่ไปพร้อมกัน — เราจึงไม่ได้จบงานตอนส่งมอบ"
      ],
      en: [
        "A \"cheap\" room with an undersized plant never stops running: it burns more power and fails sooner. An over-specified room means paying for capacity you never use from day one. The sweet spot sits between them, and it can be calculated — once we know what you store, how much, and how you work.",
        "So we start with questions. Storage only, or pull-down of freshly arrived product? Do forklifts enter the room? Does processing happen inside? How much moves in and out per day? These answers can double or halve the plant size.",
        "Cold rooms divide by operating range. Chill rooms sit at -5 to +8°C — the most widely used band across nearly every industry, from food and beverage raw materials to pharmaceuticals and herbs to microprocessors. Freezers run at -15 to -25°C and below for long-term preservation.",
        "Blast freezers and blast chillers are a different animal: not storage, but a process. They pull product temperature down rapidly to a target within a defined window, holding quality as close to fresh as possible. That demands a considerably larger plant than an ordinary cold room — which is why substituting a standard freezer rarely delivers the intended result.",
        "Cold room walls use sandwich panels: insulation formed in the core, faced on both sides. Insulation types differ in density, durability, thermal conductivity, acoustic absorption and fire resistance — the right choice follows your temperature and site conditions, not simply whichever is thickest.",
        "Our work spans international cargo cold rooms at Suvarnabhumi Airport, back-of-house rooms in over 200 KFC branches nationwide, fresh durian rooms in Chanthaburi, and a blast freezer at the Thailand Institute of Scientific and Technological Research — entirely different briefs, which is precisely the point.",
        "A cold room isn't a purchase, it's machinery that runs around the clock. Correct, regular maintenance extends system life, lowers your power bill, and prolongs component life at the same time — which is why our job doesn't end at handover."
      ]
    },
    features: {
      th: [
        "คำนวณขนาดจากสินค้าและการใช้งานจริง ไม่ใช่จากขนาดห้องอย่างเดียว",
        "Chill Room, ห้องแช่แข็ง และ Blast Chiller / Blast Freezer",
        "ผนัง Sandwich panel เลือกชนิดฉนวนตามอุณหภูมิและเงื่อนไขหน้างาน",
        "ออกแบบตำแหน่งติดตั้งเครื่องให้ระบายความร้อนได้และเข้าซ่อมง่าย",
        "ตรวจสอบแหล่งไฟฟ้าตั้งแต่ขั้นออกแบบ ไม่ใช่ตอนจะเปิดเครื่อง",
        "ดูแลต่อเนื่องหลังส่งมอบ เพราะห้องเย็นต้องวิ่งทุกวัน"
      ],
      en: [
        "Sized from your product and operation, not just the room dimensions",
        "Chill rooms, freezers, and blast chillers / blast freezers",
        "Sandwich panel walls, insulation selected for your temperature and site",
        "Plant location planned for heat rejection and service access",
        "Electrical supply verified at design stage, not on start-up day",
        "Ongoing service after handover, because these rooms run every day"
      ]
    },
    industries: {
      th: [
        "อาหารแปรรูปและอาหารแช่แข็ง",
        "เกษตรและผลไม้สดเพื่อแปรรูป",
        "ยา เวชภัณฑ์ และสมุนไพร",
        "คลังสินค้าและโลจิสติกส์ห้องเย็น",
        "ร้านอาหาร โรงแรม และค้าปลีก"
      ],
      en: [
        "Food processing and frozen foods",
        "Agriculture and fresh fruit for processing",
        "Pharmaceuticals, medical supplies and herbs",
        "Cold storage warehousing and logistics",
        "Restaurants, hotels and retail"
      ]
    },
    specs: {
      th: [
        { label: "ช่วงอุณหภูมิใช้งาน", value: "Chill -5 ถึง +8°C / Freezer -15 ถึง -25°C / Blast ตามโจทย์" },
        { label: "ผนังห้องเย็น", value: "Sandwich panel — เลือกชนิดฉนวนตามงาน" },
        { label: "รูปแบบงาน", value: "ออกแบบและคำนวณเฉพาะรายโครงการ" },
        { label: "ขอบเขตบริการ", value: "ให้คำปรึกษา ออกแบบ ติดตั้ง และดูแลหลังการขาย" },
        { label: "ผลงานอ้างอิง", value: "คลังสินค้าสุวรรณภูมิ · KFC กว่า 200 สาขา · ทุเรียนจันทบุรี · Blast Freezer วว." }
      ],
      en: [
        { label: "Operating Range", value: "Chill -5 to +8°C / Freezer -15 to -25°C / Blast to brief" },
        { label: "Wall Construction", value: "Sandwich panel — insulation selected per application" },
        { label: "Engagement Model", value: "Designed and calculated per project" },
        { label: "Scope", value: "Consultation, design, installation and after-sales support" },
        { label: "Reference Projects", value: "Suvarnabhumi cargo · 200+ KFC branches · Chanthaburi durian · TISTR blast freezer" }
      ]
    },
    imgName: "service-coldroom.jpg",
    iconName: "Snowflake"
  },
  {
    id: "chiller",
    title: {
      th: "ระบบชิลเลอร์ (Chiller System)",
      en: "Chiller System"
    },
    subTitle: {
      th: "CENTRAL CHILLER SOLUTION",
      en: "CENTRAL CHILLER SOLUTION"
    },
    description: {
      th: "ทำน้ำเย็นออกมาเป็นตัวกลาง แล้วส่งไปใช้ที่ไหนก็ได้ — สำหรับงานที่โจทย์คือ \"ทำให้กระบวนการนี้เย็นลง\" ไม่ใช่ \"ทำให้ห้องนี้เย็น\"",
      en: "Chilled water as a medium, delivered wherever it's needed — for briefs about cooling a process, not cooling a room."
    },
    intro: {
      th: "ไม่ได้ทำความเย็นให้พื้นที่ แต่ผลิตน้ำเย็นให้คุณเอาไปใช้ต่อ",
      en: "It doesn't cool a space. It makes chilled water for you to use."
    },
    paragraphs: {
      th: [
        "ความต่างที่สำคัญที่สุดระหว่างชิลเลอร์กับระบบห้องเย็นคือ ชิลเลอร์ไม่ได้ทำความเย็นให้พื้นที่โดยตรง แต่ผลิตน้ำเย็นออกมาเป็นตัวกลางในการแลกเปลี่ยนความร้อน แล้วส่งน้ำเย็นนั้นไปใช้ที่ไหนก็ได้",
        "ผลที่ตามมาคือความยืดหยุ่น เพราะไม่มีข้อจำกัดด้านระยะทางในการเดินท่อแบบระบบน้ำยา ชิลเลอร์จึงประยุกต์ใช้ได้หลากหลาย รวมถึงในห้องเย็นบางประเภท ห้องปฏิบัติการ และภายในอาคารขนาดใหญ่",
        "งานที่เราใช้ชิลเลอร์เป็นคำตอบบ่อยที่สุดคือ หล่อเย็นเครื่องจักร งาน Molding และ CNC, งานชุบโลหะ, งานผลิตอาหารทั้งการแช่ หมัก และดอง, และงานล้างผลิตภัณฑ์",
        "แต่ที่คนมักนึกไม่ถึงคืองานนอกโรงงาน — ระบบ Nutrient Chiller ควบคุมอุณหภูมิน้ำเลี้ยงให้ฟาร์มไฮโดรโปนิก ซึ่งอุณหภูมิน้ำคือตัวแปรที่ชี้ผลผลิตโดยตรง และระบบ Chiller line สำหรับสายการผลิตไวน์ของ Gran Monte ที่นครราชสีมา สองงานนี้ไม่มีคำว่า \"ห้องเย็น\" อยู่ในโจทย์เลย",
        "จุดที่ต้องเข้าใจก่อนตัดสินใจ: ส่วนประกอบของระบบชิลเลอร์ไม่เหมือนระบบทำความเย็นสำหรับห้องเย็นเสียทีเดียว เพราะมีงานส่วนของระบบลำเลียงน้ำเย็นเพิ่มเข้ามาด้วย ทั้งระบบท่อ ปั๊ม ระบบกรองและปรับสภาพน้ำ และวาล์วต่างๆ — แปลว่าการเทียบราคาชิลเลอร์กับห้องเย็นแบบตัวต่อตัวไม่สมเหตุสมผล เพราะงานฝั่งน้ำเป็นส่วนหนึ่งของโครงการที่ต้องนับด้วย",
        "ชิลเลอร์แบ่งเป็นระบายความร้อนด้วยอากาศ (Air-cooled) และด้วยน้ำ (Water-cooled) ซึ่งเราทำทั้งสองแบบ การเลือกขึ้นกับพื้นที่ ปริมาณโหลด และเงื่อนไขหน้างาน — ส่งรายละเอียดกระบวนการมาให้ทีมเราดู แล้วเราจะบอกว่าแบบไหนเหมาะกับคุณ"
      ],
      en: [
        "The key difference between a chiller and a cold room system is that a chiller doesn't cool a space directly. It produces chilled water as a heat-exchange medium, and that water can be sent wherever it's needed.",
        "The consequence is flexibility. Without the pipe-run distance limits of direct refrigerant systems, chillers adapt to a wide range of applications — including certain cold rooms, laboratory spaces, and large buildings.",
        "The jobs where we reach for a chiller most often: machine cooling for molding and CNC work, metal plating, food production including soaking, fermenting and pickling, and product washing.",
        "The unexpected ones sit outside the factory — nutrient chiller systems controlling water temperature for hydroponic farms, where water temperature drives yield directly, and the chiller line for Gran Monte's wine production in Nakhon Ratchasima. Neither brief contained the words \"cold room\".",
        "One thing to understand before deciding: a chiller system isn't built like a cold room's plant, because it adds the whole chilled-water distribution side — piping, pumps, filtration and water treatment, and valves. Which means comparing a chiller quote against a cold room quote line-for-line doesn't make sense; the water-side work is part of the project.",
        "Chillers come air-cooled or water-cooled, and we build both. The choice depends on available space, load, and site conditions — send our team your process details and we'll tell you which fits."
      ]
    },
    features: {
      th: [
        "ผลิตน้ำเย็นเป็นตัวกลาง ส่งไปใช้ได้โดยไม่ติดข้อจำกัดระยะท่อ",
        "ระบายความร้อนด้วยอากาศ (Air-cooled) หรือด้วยน้ำ (Water-cooled)",
        "ออกแบบจากโหลดจริงของกระบวนการผลิต",
        "รวมงานฝั่งน้ำครบ — ท่อ ปั๊ม ระบบกรอง/ปรับสภาพน้ำ และวาล์ว",
        "ประยุกต์ใช้ได้ทั้งในโรงงาน ห้องปฏิบัติการ อาคารขนาดใหญ่ และฟาร์ม",
        "ดูแลต่อเนื่องหลังติดตั้ง"
      ],
      en: [
        "Chilled water as a medium, delivered without pipe-run distance limits",
        "Air-cooled or water-cooled heat rejection",
        "Designed from your process's real load",
        "Complete water-side scope — piping, pumps, filtration/treatment, valves",
        "Suits factories, laboratories, large buildings and farms",
        "Ongoing service after installation"
      ]
    },
    industries: {
      th: [
        "หล่อเย็นเครื่องจักร งาน Molding และ CNC",
        "งานชุบโลหะ",
        "ผลิตอาหาร — แช่ หมัก ดอง และล้างผลิตภัณฑ์",
        "ฟาร์มไฮโดรโปนิกและระบบน้ำเลี้ยง",
        "สายการผลิตเครื่องดื่มและไวน์"
      ],
      en: [
        "Machine cooling, molding and CNC",
        "Metal plating",
        "Food production — soaking, fermenting, pickling and washing",
        "Hydroponic farms and nutrient water systems",
        "Beverage and wine production lines"
      ]
    },
    specs: {
      th: [
        { label: "การระบายความร้อน", value: "Air-cooled และ Water-cooled" },
        { label: "ลักษณะงานที่รองรับ", value: "หล่อเย็นเครื่องจักร / Molding / CNC / ชุบโลหะ / ผลิตอาหาร / ล้างผลิตภัณฑ์" },
        { label: "งานฝั่งน้ำที่รวมอยู่", value: "ระบบท่อ · ปั๊ม · ระบบกรอง/ปรับสภาพน้ำ · วาล์ว" },
        { label: "รูปแบบงาน", value: "ออกแบบจากโหลดจริงของกระบวนการ" },
        { label: "ผลงานอ้างอิง", value: "Chiller line ผลิตไวน์ Gran Monte · Nutrient Chiller ฟาร์มไฮโดรโปนิก" }
      ],
      en: [
        { label: "Heat Rejection", value: "Air-cooled and water-cooled" },
        { label: "Applications", value: "Machine cooling / Molding / CNC / Plating / Food production / Washing" },
        { label: "Water-side Scope", value: "Piping · Pumps · Filtration and treatment · Valves" },
        { label: "Engagement Model", value: "Designed from the process's actual load" },
        { label: "Reference Projects", value: "Gran Monte wine chiller line · Hydroponic nutrient chillers" }
      ]
    },
    imgName: "service-chiller.jpg",
    iconName: "Cpu"
  },
  {
    id: "special",
    title: {
      th: "ห้องควบคุมสภาวะแวดล้อม & งานเฉพาะทาง",
      en: "Environment Control & Specialist Rooms"
    },
    subTitle: {
      th: "TEMPERATURE · HUMIDITY · LIGHT",
      en: "TEMPERATURE · HUMIDITY · LIGHT"
    },
    description: {
      th: "ห้องที่คุมมากกว่าอุณหภูมิ — ทั้งความชื้น แสงสว่าง และสภาวะเฉพาะ สำหรับฟาร์มเพาะเลี้ยง สายการผลิต และห้องทดสอบ",
      en: "Rooms that control more than temperature — humidity, light and special conditions, for cultivation farms, production lines and test chambers."
    },
    intro: {
      th: "งานที่อุณหภูมิอย่างเดียวไม่พอ ออกแบบเฉพาะรายโครงการตามโจทย์จริง",
      en: "For jobs where temperature alone isn't the answer — engineered per project, to the actual brief."
    },
    paragraphs: {
      th: [
        "ห้องเย็นทั่วไปมีตัวแปรเดียวคืออุณหภูมิ แต่งานอีกกลุ่มหนึ่งไม่ได้จบแค่นั้น ฟาร์มเพาะเลี้ยงเนื้อเยื่อต้องคุมทั้งอุณหภูมิ ความชื้น และแสงสว่างไปพร้อมกัน เพราะทั้งสามอย่างคือปัจจัยที่กำหนดการเจริญเติบโตโดยตรง เปลี่ยนตัวใดตัวหนึ่ง ผลผลิตเปลี่ยนทันที",
        "เราออกแบบและติดตั้งห้องควบคุมอุณหภูมิและความชื้นให้ศูนย์พันธุ์พืชเพาะเลี้ยงมาแล้วหลายแห่ง ทั้งที่ชลบุรี บุรีรัมย์ และพิษณุโลก รวมถึงระบบ Nutrient Chiller ที่ควบคุมอุณหภูมิน้ำเลี้ยงในฟาร์มไฮโดรโปนิก — งานกลุ่มนี้ไม่มีคำว่า \"ห้องเย็น\" อยู่ในโจทย์เลย แต่หัวใจคือการควบคุมสภาวะแวดล้อมให้นิ่งและแม่นยำ",
        "อีกกลุ่มคือห้องที่มีเงื่อนไขพิเศษ เช่น ห้องควบคุมอุณหภูมิและความชื้นสำหรับพื้นที่ผลิตไส้แบตเตอรี่ของ GS Yuasa ห้องเก็บ Raw Material แบบ Explosion Proof ห้องทดสอบมลพิษเครื่องยนต์ของสถาบันยานยนต์ ห้อง Aquarium สัตว์ทะเล ไปจนถึง Wine Cellar ที่ต้องคุมทั้งอุณหภูมิ ความชื้น และแสง ต่อเนื่องเป็นสิบปี",
        "งานกลุ่มนี้ไม่มีแคตตาล็อกให้เลือก ทุกโครงการเริ่มจากการคุยว่าคุณต้องการผลลัพธ์อะไร แล้วเราจึงออกแบบระบบขึ้นมาตอบโจทย์นั้นโดยเฉพาะ — ถ้าโจทย์ของคุณแปลกจนไม่แน่ใจว่าใครทำได้ นั่นแหละคืองานของเรา"
      ],
      en: [
        "A conventional cold room has one variable: temperature. Another class of work doesn't stop there. Plant tissue culture facilities must hold temperature, humidity and light together, because all three drive growth directly — move any one of them and the yield moves with it.",
        "We've designed and installed temperature- and humidity-controlled rooms for plant cultivation centres in Chonburi, Buriram and Phitsanulok, as well as nutrient chiller systems regulating water temperature on hydroponic farms. None of these briefs contained the words \"cold room\" — but every one came down to holding an environment steady and precise.",
        "The other group is rooms with special conditions: temperature and humidity control for GS Yuasa's battery-core production area, explosion-proof raw material stores, the Thailand Automotive Institute's engine emissions test chambers, marine aquarium rooms, and wine cellars that must hold temperature, humidity and light steady for a decade.",
        "There's no catalogue for this work. Every project starts with a conversation about the outcome you need, and the system is engineered around it. If your brief is unusual enough that you're not sure who can do it — that's exactly our kind of job."
      ]
    },
    features: {
      th: [
        "ควบคุมอุณหภูมิ ความชื้น และแสงสว่างพร้อมกัน",
        "ห้องเพาะเลี้ยงเนื้อเยื่อและห้องควบคุมสภาวะสำหรับฟาร์ม",
        "ระบบ Nutrient Chiller ควบคุมอุณหภูมิน้ำเลี้ยง",
        "ห้องควบคุมสภาวะสำหรับสายการผลิตที่ความชื้นมีผลต่อคุณภาพ",
        "ห้อง Explosion Proof สำหรับเก็บวัตถุดิบที่ต้องการความปลอดภัยสูง",
        "ห้องทดสอบจำลองสภาวะ และงานออกแบบเฉพาะรายโครงการ"
      ],
      en: [
        "Simultaneous control of temperature, humidity and light",
        "Tissue culture rooms and controlled environments for farms",
        "Nutrient chiller systems for cultivation water temperature",
        "Controlled rooms for production lines where humidity drives quality",
        "Explosion-proof rooms for raw materials requiring high safety",
        "Environmental test chambers and fully bespoke project engineering"
      ]
    },
    industries: {
      th: [
        "ฟาร์มเพาะเลี้ยงเนื้อเยื่อ และเกษตรแม่นยำ",
        "ฟาร์มไฮโดรโปนิกและระบบน้ำเลี้ยง",
        "สายการผลิตแบตเตอรี่ ยานยนต์ และอิเล็กทรอนิกส์",
        "ศูนย์วิจัยและห้องทดสอบ",
        "โรงแรม รีสอร์ต และงาน Wine Cellar"
      ],
      en: [
        "Tissue culture farms and precision agriculture",
        "Hydroponic farms and nutrient water systems",
        "Battery, automotive and electronics production lines",
        "Research centres and test chambers",
        "Hotels, resorts and wine cellar projects"
      ]
    },
    specs: {
      th: [
        { label: "ตัวแปรที่ควบคุม", value: "อุณหภูมิ / ความชื้น / แสงสว่าง / สภาวะเฉพาะ" },
        { label: "รูปแบบงาน", value: "ออกแบบเฉพาะรายโครงการ (ไม่มีรุ่นสำเร็จรูป)" },
        { label: "ขอบเขตบริการ", value: "ให้คำปรึกษา ออกแบบ ติดตั้ง และดูแลหลังการขาย" },
        { label: "ผลงานอ้างอิง", value: "ศูนย์พันธุ์พืชเพาะเลี้ยง 3 แห่ง · GS Yuasa · สถาบันยานยนต์ · Soneva Kiri" }
      ],
      en: [
        { label: "Controlled Variables", value: "Temperature / Humidity / Light / Special conditions" },
        { label: "Engagement Model", value: "Bespoke per project — no off-the-shelf models" },
        { label: "Scope", value: "Consultation, design, installation and after-sales support" },
        { label: "Reference Projects", value: "3 plant cultivation centres · GS Yuasa · Automotive Institute · Soneva Kiri" }
      ]
    },
    imgName: "service-envcontrol.jpg",
    iconName: "DoorClosed"
  },
  {
    id: "hispeeddoor",
    title: {
      th: "ประตูความเร็วสูง (Hi-Speed Door)",
      en: "Hi-Speed Door"
    },
    subTitle: {
      th: "HIGH-SPEED ROLL-UP DOOR",
      en: "HIGH-SPEED ROLL-UP DOOR"
    },
    description: {
      th: "ทุกวินาทีที่ประตูเปิดค้าง คือความเย็นที่คุณจ่ายค่าไฟไปแล้วรั่วออกไปเฉยๆ",
      en: "Every second a door stays open is cooling you already paid for, leaking away."
    },
    intro: {
      th: "จุดที่คนมองข้ามที่สุดในห้องเย็น — และเป็นจุดที่ค่าไฟรั่วมากที่สุด",
      en: "The most overlooked part of a cold room — and where the power bill leaks fastest."
    },
    paragraphs: {
      th: [
        "ลูกค้าลงทุนกับฉนวนหนาๆ กับเครื่องทำความเย็นประสิทธิภาพสูง แล้วเปิดประตูค้างไว้ครั้งละครึ่งนาทีทุกครั้งที่ฟอร์กลิฟต์วิ่งเข้าออก — วันละหลายสิบรอบ ความเย็นที่รั่วออกไปตรงนั้นไม่ได้หายไปเฉยๆ มันกลายเป็นภาระที่เครื่องต้องวิ่งไล่ตามทั้งวัน",
        "ประตูความเร็วสูงแก้ปัญหาตรงจุดนั้น ด้วยการเปิดและปิดเร็วกว่าประตูทั่วไปมาก ช่องเปิดจึงมีอยู่สั้นที่สุดเท่าที่งานจะยอมให้ ผลคือความเย็นรั่วน้อยลง เครื่องทำงานเบาลง และค่าไฟลดลงตามไปด้วย",
        "แต่ประโยชน์ไม่ได้มีแค่เรื่องความเย็น ในโรงงานอาหารและยา ช่องเปิดที่สั้นลงหมายถึงฝุ่น แมลง และสิ่งปนเปื้อนเข้าได้น้อยลง และในคลังที่ขนถ่ายหนัก ประตูที่ไม่ต้องรอคือรอบการทำงานที่เร็วขึ้นจริง",
        "เราติดตั้ง Hi-speed Door ให้คลังขนถ่ายสินค้าระหว่างประเทศที่ท่าอากาศยานสุวรรณภูมิ ทั้งบริเวณคลังสินค้าและภายในระบบ TV บริเวณ Perishable Cold Room — งานที่ประตูต้องทำงานตลอดวันโดยไม่มีวันหยุด",
        "การเลือกประตูให้ตรงงานต้องดูหลายอย่างพร้อมกัน ทั้งขนาดช่องเปิด ความถี่การใช้งาน อุณหภูมิสองฝั่งของประตู และความปลอดภัยของคนกับรถที่วิ่งผ่าน — คุยกับเราก่อนได้ เราดูหน้างานแล้วบอกได้ว่าคุ้มไหม"
      ],
      en: [
        "Clients invest in thick insulation and efficient refrigeration, then hold the door open for thirty seconds every time a forklift passes — dozens of times a day. That escaping cold doesn't simply vanish; it becomes a load the plant chases all day long.",
        "High-speed doors attack exactly that. They open and close far faster than conventional doors, so the opening exists for the shortest time the work allows. Less cold escapes, the plant works less hard, and the power bill follows.",
        "The benefit isn't only thermal. In food and pharmaceutical plants, a shorter opening means less dust, fewer insects, and less contamination. In high-throughput warehouses, a door nobody waits for is a genuinely faster cycle.",
        "We installed hi-speed doors at the international cargo transfer area at Suvarnabhumi Airport, both at the cargo dock and within the TV system serving the perishable cold room — where doors work all day without a break.",
        "Choosing the right door means weighing several things at once: opening size, cycle frequency, the temperatures on both sides, and the safety of the people and vehicles passing through. Talk to us first — we'll look at your site and tell you whether it pays."
      ]
    },
    features: {
      th: [
        "เปิด-ปิดเร็ว ช่องเปิดสั้นที่สุดเท่าที่งานยอมให้",
        "ลดการสูญเสียความเย็นระหว่างขนถ่ายสินค้า",
        "ลดฝุ่น แมลง และสิ่งปนเปื้อนเข้าสู่พื้นที่ผลิต",
        "เพิ่มรอบการขนถ่ายในคลังที่ทำงานหนัก",
        "ระบบนิรภัยสำหรับคนและรถที่วิ่งผ่าน",
        "เลือกสเปคจากขนาดช่องเปิด ความถี่ และอุณหภูมิสองฝั่ง"
      ],
      en: [
        "Fast cycling — the opening exists for the shortest time the work allows",
        "Reduces cooling loss during loading and unloading",
        "Keeps dust, insects and contaminants out of production areas",
        "Increases throughput in busy loading bays",
        "Safety systems for people and vehicles passing through",
        "Specified from opening size, cycle frequency, and both-side temperatures"
      ]
    },
    industries: {
      th: [
        "คลังสินค้าและโลจิสติกส์",
        "คลังสินค้าแช่เย็นและแช่แข็ง",
        "โรงงานอาหารและยา",
        "โรงงานอิเล็กทรอนิกส์และพื้นที่ควบคุม"
      ],
      en: [
        "Warehousing and logistics",
        "Chilled and frozen storage facilities",
        "Food and pharmaceutical plants",
        "Electronics plants and controlled areas"
      ]
    },
    specs: {
      th: [
        { label: "ลักษณะการใช้งาน", value: "คลังสินค้า · ห้องเย็น · จุดขนถ่ายสินค้า" },
        { label: "ประโยชน์หลัก", value: "ลดการสูญเสียความเย็น · กันฝุ่นและแมลง · เพิ่มรอบขนถ่าย" },
        { label: "การเลือกสเปค", value: "ตามขนาดช่องเปิด ความถี่ใช้งาน และอุณหภูมิสองฝั่ง" },
        { label: "ขอบเขตบริการ", value: "ให้คำปรึกษา ออกแบบ ติดตั้ง และดูแลหลังการขาย" },
        { label: "ผลงานอ้างอิง", value: "Hi-speed Door คลังสินค้าระหว่างประเทศ ท่าอากาศยานสุวรรณภูมิ" }
      ],
      en: [
        { label: "Typical Use", value: "Warehouses · Cold rooms · Loading docks" },
        { label: "Main Benefits", value: "Less cooling loss · Dust and insect control · Faster throughput" },
        { label: "Specification Basis", value: "Opening size, cycle frequency, and temperatures on both sides" },
        { label: "Scope", value: "Consultation, design, installation and after-sales support" },
        { label: "Reference Projects", value: "Hi-speed doors, international cargo terminal, Suvarnabhumi Airport" }
      ]
    },
    imgName: "service-hispeeddoor.jpg",
    iconName: "FlameKindling"
  },
  {
    id: "monitoring",
    title: {
      th: "ระบบมอนิเตอร์ริ่ง (Monitoring System)",
      en: "Monitoring System"
    },
    subTitle: {
      th: "REAL-TIME TEMPERATURE MONITORING",
      en: "REAL-TIME TEMPERATURE MONITORING"
    },
    description: {
      th: "ห้องเย็นไม่ได้พังตอนที่คุณอยู่ — มันพังตอนตีสาม วันเสาร์ ตอนไม่มีใครอยู่ในโรงงาน",
      en: "Cold rooms don't fail while you're watching. They fail at 3am on a Saturday, when nobody's there."
    },
    intro: {
      th: "รู้ก่อนที่สินค้าจะเสีย ไม่ใช่รู้ตอนเปิดประตูมาเจอ",
      en: "Know before the product is lost — not when you open the door and find out."
    },
    paragraphs: {
      th: [
        "ความเสียหายจากห้องเย็นแทบไม่เคยเกิดตอนที่มีคนเฝ้า มันเกิดตอนกลางคืน วันหยุด หรือช่วงที่ไม่มีใครเดินผ่าน กว่าจะรู้ว่าอุณหภูมิขึ้น สินค้าข้างในก็ผ่านจุดที่กู้คืนไม่ได้ไปแล้ว",
        "ระบบ Monitoring แก้ปัญหานี้ด้วยการเฝ้าแทนคุณตลอดเวลา และแจ้งเตือนทันทีที่ค่าเริ่มออกนอกกรอบ — ไม่ใช่ตอนที่มันเสียแล้ว แต่ตอนที่ยังแก้ทัน ซึ่งมักเป็นเรื่องเล็กๆ อย่างประตูปิดไม่สนิท หรือคอยล์เริ่มตัน",
        "ค่าที่ต้องเฝ้าไม่ได้มีแค่อุณหภูมิ งานหลายประเภทต้องดูความชื้นควบคู่ไปด้วย และห้องเย็นขนาดใหญ่มักต้องวัดหลายจุดพร้อมกัน เพราะอุณหภูมิใกล้ประตูกับมุมในสุดไม่เท่ากัน",
        "เราออกแบบและติดตั้งระบบ Monitoring และ Control สำหรับห้องเย็นในคลังสินค้าระหว่างประเทศที่ท่าอากาศยานสุวรรณภูมิ รวมถึงระบบ Monitoring ภายใน Perishable Cold Room — งานที่สินค้าข้างในเสียหายไม่ได้แม้แต่ล็อตเดียว",
        "รูปแบบระบบขึ้นกับหน้างานจริง ทั้งจำนวนจุดวัด ระยะทาง สภาพแวดล้อม และวิธีที่คุณอยากรับการแจ้งเตือน — คุยกับเราว่าคุณกลัวอะไรมากที่สุด แล้วเราออกแบบให้ตรงจุดนั้น"
      ],
      en: [
        "Cold room losses almost never happen while someone is watching. They happen overnight, on holidays, or when nobody walks past. By the time anyone notices the temperature has climbed, the product inside has already passed the point of recovery.",
        "A monitoring system watches on your behalf and alerts the moment readings drift out of band — not once the loss has happened, but while it's still fixable, which is usually something small: a door not sealing, or a coil starting to ice up.",
        "Temperature isn't the only thing worth watching. Many applications need humidity tracked alongside it, and larger rooms usually need several measurement points, because the temperature by the door and in the far corner are not the same.",
        "We designed and installed the monitoring and control systems for the cold rooms in the international cargo terminal at Suvarnabhumi Airport, plus monitoring inside the perishable cold room — where not a single consignment can be allowed to spoil.",
        "The right setup depends on your site: how many measurement points, the distances involved, the environment, and how you want to be alerted. Tell us what you're most afraid of losing, and we'll design around that."
      ]
    },
    features: {
      th: [
        "เฝ้าอุณหภูมิและความชื้นต่อเนื่อง ตลอดเวลาที่ไม่มีคนอยู่",
        "แจ้งเตือนตั้งแต่ค่าเริ่มออกนอกกรอบ ไม่ใช่ตอนเสียแล้ว",
        "วัดได้หลายจุดในห้องเดียว เพราะแต่ละมุมอุณหภูมิไม่เท่ากัน",
        "เก็บข้อมูลย้อนหลังไว้ตรวจสอบและใช้อ้างอิงด้านคุณภาพ",
        "ออกแบบตามจำนวนจุดวัดและเงื่อนไขหน้างานจริง",
        "เชื่อมต่อกับระบบควบคุมห้องเย็นที่มีอยู่ได้"
      ],
      en: [
        "Continuous temperature and humidity watch, especially when nobody's there",
        "Alerts as readings start to drift — not after the loss",
        "Multiple measurement points per room, because corners differ",
        "Historical logging for verification and quality records",
        "Designed around your measurement points and site conditions",
        "Integrates with existing cold room control systems"
      ]
    },
    industries: {
      th: [
        "คลังสินค้าห้องเย็นและโลจิสติกส์",
        "ยา เวชภัณฑ์ และโรงพยาบาล",
        "โรงงานแปรรูปอาหาร เครื่องดื่ม และนม",
        "ห้องวิจัยและห้องปฏิบัติการ"
      ],
      en: [
        "Cold storage warehousing and logistics",
        "Pharmaceuticals, medical supplies and hospitals",
        "Food, beverage and dairy processing plants",
        "Research and laboratory facilities"
      ]
    },
    specs: {
      th: [
        { label: "สิ่งที่เฝ้าวัด", value: "อุณหภูมิ และความชื้น (ตามโจทย์งาน)" },
        { label: "จุดวัด", value: "รองรับหลายจุดต่อห้อง ตามขนาดและรูปแบบการใช้งาน" },
        { label: "รูปแบบงาน", value: "ออกแบบตามจำนวนจุดวัดและเงื่อนไขหน้างาน" },
        { label: "ขอบเขตบริการ", value: "ออกแบบ ติดตั้ง เชื่อมระบบ และดูแลต่อเนื่อง" },
        { label: "ผลงานอ้างอิง", value: "ระบบ Monitoring และ Control ห้องเย็นคลังสินค้าระหว่างประเทศ สุวรรณภูมิ" }
      ],
      en: [
        { label: "Monitored Values", value: "Temperature and humidity (as the application requires)" },
        { label: "Measurement Points", value: "Multiple points per room, scaled to size and usage" },
        { label: "Engagement Model", value: "Designed around your points and site conditions" },
        { label: "Scope", value: "Design, installation, integration and ongoing support" },
        { label: "Reference Projects", value: "Monitoring and control, international cargo cold rooms, Suvarnabhumi" }
      ]
    },
    imgName: "service-monitoring.jpg",
    iconName: "Activity"
  }
];

// ===== 4. ผลงานการติดตั้ง (Portfolio Projects) =====
// แก้ไขและเพิ่มโครงการผลงานสำเร็จของทางบริษัทที่นี่ โดยแสดงในหน้ารวมผลงานและบางส่วนในหน้าแรก
// วิธีเพิ่มงาน: คัดลอกบล็อก { ... } ด้านล่างนี้ แล้วเพิ่มลงไปในอาร์เรย์เดิม
export const projects = [
  {
    id: "thai-airways-svb",
    featured: true,
    title: {
      th: "ห้องเย็นคลังสินค้าระหว่างประเทศ ท่าอากาศยานสุวรรณภูมิ",
      en: "International Cargo Cold Rooms, Suvarnabhumi Airport"
    },
    client: {
      th: "บมจ. การบินไทย",
      en: "Thai Airways International PCL"
    },
    scope: {
      th: "ห้องเย็นในอาคารคลังสินค้าระหว่างประเทศ · ห้องเย็นภายในระบบ TV · ระบบ Monitoring และ Control · Hi-speed Door บริเวณคลังขนถ่าย · ย้ายห้องเย็นจากดอนเมืองมาสุวรรณภูมิ",
      en: "Cold rooms in the international cargo terminal, cold rooms within the TV system, monitoring and control systems, hi-speed doors at the transfer dock, and relocation of cold rooms from Don Mueang."
    },
    category: {
      th: "คลังสินค้าและโลจิสติกส์",
      en: "Warehouse & Logistics"
    },
    location: {
      th: "ท่าอากาศยานสุวรรณภูมิ",
      en: "Suvarnabhumi Airport"
    },
    imgName: "project-thaiairways-svb.jpg"
  },
  {
    id: "thai-airways-etv",
    title: {
      th: "ห้องเย็นคลังสินค้าและระบบ ETV ท่าอากาศยานสุวรรณภูมิ",
      en: "Cargo Cold Rooms and ETV System, Suvarnabhumi Airport"
    },
    client: {
      th: "บมจ. การบินไทย",
      en: "Thai Airways International PCL"
    },
    scope: {
      th: "ห้องเย็นภายในอาคารคลังสินค้าภายในประเทศและระหว่างประเทศ · ห้องเย็นภายในระบบ ETV",
      en: "Cold rooms in both the domestic and international cargo buildings, plus cold rooms within the ETV system."
    },
    category: {
      th: "คลังสินค้าและโลจิสติกส์",
      en: "Warehouse & Logistics"
    },
    location: {
      th: "ท่าอากาศยานสุวรรณภูมิ",
      en: "Suvarnabhumi Airport"
    },
    imgName: "project-thaiairways-etv.jpg"
  },
  {
    id: "emc-svb",
    title: {
      th: "Perishable Cold Room คลังสินค้าระหว่างประเทศ",
      en: "Perishable Cold Room, International Cargo Terminal"
    },
    client: {
      th: "บมจ. EMC (ประเทศไทย)",
      en: "EMC (Thailand) PCL"
    },
    scope: {
      th: "ห้อง Perishable Cold Room สำหรับคลังสินค้าระหว่างประเทศ · ระบบ Monitoring ภายในห้อง · Hi-speed Door ภายในระบบ TV",
      en: "Perishable cold room for the international cargo terminal, in-room monitoring system, and hi-speed doors within the TV system."
    },
    category: {
      th: "คลังสินค้าและโลจิสติกส์",
      en: "Warehouse & Logistics"
    },
    location: {
      th: "ท่าอากาศยานสุวรรณภูมิ",
      en: "Suvarnabhumi Airport"
    },
    imgName: "project-emc-svb.jpg"
  },
  {
    id: "inter-express",
    title: {
      th: "ห้องเย็นและห้องแช่แข็งภายในคลังสินค้า",
      en: "Cold Room and Freezer Inside a Logistics Warehouse"
    },
    client: {
      th: "Inter Express Logistics",
      en: "Inter Express Logistics"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องเย็นและห้องแช่แข็งภายในคลังสินค้า",
      en: "Design and installation of cold and freezer rooms within the logistics warehouse."
    },
    category: {
      th: "คลังสินค้าและโลจิสติกส์",
      en: "Warehouse & Logistics"
    },
    location: {
      th: "สมุทรปราการ",
      en: "Samut Prakan"
    },
    imgName: "project-inter-express.jpg"
  },
  {
    id: "ek-slaughter",
    featured: true,
    title: {
      th: "ห้องเย็น ห้องแช่แข็ง และห้องปฏิบัติการ ผลิตเนื้อหมูสด",
      en: "Cold Room, Freezer and Laboratory for Fresh Pork Production"
    },
    client: {
      th: "EK Slaughter House (Pork Fresh)",
      en: "EK Slaughter House (Pork Fresh)"
    },
    scope: {
      th: "ห้องเย็น ห้องแช่แข็ง และห้องปฏิบัติการ สำหรับผลิตเนื้อหมูสดและแช่แข็ง",
      en: "Cold rooms, freezers and a laboratory room for fresh and frozen pork production."
    },
    category: {
      th: "อาหารและเครื่องดื่ม",
      en: "Food & Beverage"
    },
    location: {
      th: "สมุทรสาคร",
      en: "Samut Sakhon"
    },
    imgName: "project-ek-slaughter.jpg"
  },
  {
    id: "heritage-snacks",
    title: {
      th: "ห้องเย็นควบคุมความชื้น และห้องฆ่าเชื้อนมอัลมอนด์",
      en: "Humidity-Controlled Cold Room and Almond Milk Sterilisation Room"
    },
    client: {
      th: "Heritage Snacks & Foods",
      en: "Heritage Snacks & Foods"
    },
    scope: {
      th: "ห้องเย็นควบคุมความชื้นสำหรับเก็บวัตถุดิบ · ห้องฆ่าเชื้อนมอัลมอนด์",
      en: "Humidity-controlled cold room for raw material storage, plus an almond milk sterilisation room."
    },
    category: {
      th: "อาหารและเครื่องดื่ม",
      en: "Food & Beverage"
    },
    location: {
      th: "สมุทรสาคร",
      en: "Samut Sakhon"
    },
    imgName: "project-heritage-snacks.jpg"
  },
  {
    id: "repertoire-culinaire",
    title: {
      th: "ห้องเย็น ห้องแช่แข็ง และห้องควบคุมความชื้น คลังวัตถุดิบอาหาร",
      en: "Cold, Freezer and Humidity-Controlled Rooms for a Gourmet Food Warehouse"
    },
    client: {
      th: "Repertoire Culinaire",
      en: "Repertoire Culinaire"
    },
    scope: {
      th: "ห้องเย็นและห้องแช่แข็งสำหรับคลังวัตถุดิบอาหาร · ห้องควบคุมความชื้นสำหรับเก็บวัตถุดิบ",
      en: "Cold and freezer rooms for the food ingredient warehouse, plus a humidity-controlled room for raw material storage."
    },
    category: {
      th: "อาหารและเครื่องดื่ม",
      en: "Food & Beverage"
    },
    location: {
      th: "กรุงเทพฯ",
      en: "Bangkok"
    },
    imgName: "project-repertoire-culinaire.jpg"
  },
  {
    id: "loafty",
    title: {
      th: "ห้องเย็น ห้องแช่แข็ง ห้อง Retarder และห้อง Proofing",
      en: "Cold Room, Freezer, Retarder and Proofing Rooms"
    },
    client: {
      th: "Loafty & Co.",
      en: "Loafty & Co."
    },
    scope: {
      th: "ห้องเย็นและห้องแช่แข็งสำหรับเก็บผลิตภัณฑ์ · ห้อง Retarder และห้อง Proofing สำหรับกระบวนการผลิตเบเกอรี่",
      en: "Cold and freezer rooms for product storage, plus retarder and proofing rooms for the bakery process."
    },
    category: {
      th: "อาหารและเครื่องดื่ม",
      en: "Food & Beverage"
    },
    location: {
      th: "กรุงเทพฯ",
      en: "Bangkok"
    },
    imgName: "project-loafty.jpg"
  },
  {
    id: "theo-dore",
    title: {
      th: "ห้องเย็นและห้องแช่แข็งซีฟู้ด",
      en: "Seafood Cold Room and Freezer"
    },
    client: {
      th: "Theo Dore",
      en: "Theo Dore"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องเย็นและห้องแช่แข็งซีฟู้ด",
      en: "Design and installation of a seafood cold room and freezer."
    },
    category: {
      th: "อาหารและเครื่องดื่ม",
      en: "Food & Beverage"
    },
    location: {
      th: "กรุงเทพฯ",
      en: "Bangkok"
    },
    imgName: "project-theodore.jpg"
  },
  {
    id: "diamond-preserve",
    title: {
      th: "ห้องเย็นเก็บผลผลิตและ Chiller สายการผลิต",
      en: "Produce Cold Room and Production Line Chiller"
    },
    client: {
      th: "บริษัท ไดมอนด์ พรีเสิร์ฟ ฟู้ด จำกัด",
      en: "Diamond Preserve Food Co., Ltd."
    },
    scope: {
      th: "ติดตั้งห้องเย็นสำหรับเก็บรักษาผลผลิต · ติดตั้ง Chiller เพื่อใช้ในส่วนผลิตของโรงงาน",
      en: "Cold room installation for produce storage, plus a chiller serving the plant's production section."
    },
    category: {
      th: "อาหารและเครื่องดื่ม",
      en: "Food & Beverage"
    },
    location: {
      th: "ราชบุรี",
      en: "Ratchaburi"
    },
    imgName: "project-diamond-preserve.jpg"
  },
  {
    id: "pokaphan-505",
    title: {
      th: "ห้องเย็นและห้องแช่แข็งเก็บเนื้อ",
      en: "Meat Cold Room and Freezer"
    },
    client: {
      th: "505 โภคภัณฑ์",
      en: "505 Pokaphan"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องเย็นและห้องแช่แข็งสำหรับเก็บเนื้อ",
      en: "Design and installation of cold and freezer rooms for meat storage."
    },
    category: {
      th: "อาหารและเครื่องดื่ม",
      en: "Food & Beverage"
    },
    location: {
      th: "นครราชสีมา",
      en: "Nakhon Ratchasima"
    },
    imgName: "project-505.jpg"
  },
  {
    id: "niyom-fruit",
    title: {
      th: "ห้องเย็นและห้องแช่แข็งเก็บเนื้อผลไม้สด",
      en: "Cold Room and Freezer for Fresh Fruit Pulp"
    },
    client: {
      th: "นิยมฟรุ๊ต",
      en: "Niyom Fruit"
    },
    scope: {
      th: "ห้องเย็นและห้องแช่แข็งสำหรับเก็บเนื้อผลไม้สด",
      en: "Cold and freezer rooms for storing fresh fruit pulp."
    },
    category: {
      th: "อาหารและเครื่องดื่ม",
      en: "Food & Beverage"
    },
    location: {
      th: "ปทุมธานี",
      en: "Pathum Thani"
    },
    imgName: "project-niyom-fruit.jpg"
  },
  {
    id: "p-mart",
    title: {
      th: "ห้องเย็นและ Freezer Showcase ซูเปอร์สโตร์ 14 จังหวัด",
      en: "Cold Rooms and Freezer Showcases Across 14 Provinces"
    },
    client: {
      th: "P-mart Super Store",
      en: "P-mart Super Store"
    },
    scope: {
      th: "ติดตั้งห้องเย็นเก็บวัตถุดิบและผลิตภัณฑ์อาหารแช่แข็ง · ชุดเครื่องทำความเย็นสำหรับห้อง Showcase และ Freezer Showcase",
      en: "Cold rooms for raw materials and frozen food products, plus refrigeration units for showcase rooms and freezer showcases."
    },
    category: {
      th: "อาหารและเครื่องดื่ม",
      en: "Food & Beverage"
    },
    location: {
      th: "อุบลราชธานี หนองคาย สุรินทร์ สกลนคร เชียงราย โคราช ร้อยเอ็ด เชียงใหม่ เลย มหาสารคาม กาฬสินธุ์ พะเยา ฯลฯ",
      en: "Ubon Ratchathani, Nong Khai, Surin, Sakon Nakhon, Chiang Rai, Nakhon Ratchasima, Roi Et, Chiang Mai, Loei, Maha Sarakham, Kalasin, Phayao and more"
    },
    imgName: "project-pmart.jpg"
  },
  {
    id: "scg-tissue-culture",
    title: {
      th: "ปรับปรุงห้องเพาะเลี้ยงเนื้อเยื่อ ควบคุมอุณหภูมิและความชื้น",
      en: "Tissue Culture Room Upgrade with Temperature and Humidity Control"
    },
    client: {
      th: "SCG",
      en: "SCG"
    },
    scope: {
      th: "ปรับปรุงห้องเพาะเลี้ยงเนื้อเยื่อให้ควบคุมอุณหภูมิและความชื้นได้ · ห้องควบคุมอุณหภูมิและความชื้นสำหรับงานเพาะเนื้อเยื่อ",
      en: "Upgrading tissue culture rooms for temperature and humidity control, plus dedicated temperature- and humidity-controlled rooms for tissue culture work."
    },
    category: {
      th: "เกษตรและฟาร์ม",
      en: "Agriculture & Farming"
    },
    location: {
      th: "ราชบุรี",
      en: "Ratchaburi"
    },
    imgName: "project-scg.jpg"
  },
  {
    id: "cpac-plant-farm",
    title: {
      th: "ฟาร์มเพาะเลี้ยงพันธุ์พืช ควบคุมอุณหภูมิ ความชื้น ก๊าซ และแสงสว่าง",
      en: "Plant Cultivation Farm with Temperature, Humidity, Gas and Light Control"
    },
    client: {
      th: "CPAC",
      en: "CPAC"
    },
    scope: {
      th: "ออกแบบและติดตั้งระบบควบคุมสภาวะแวดล้อมสำหรับฟาร์มเพาะเลี้ยงพันธุ์พืช ครอบคลุมอุณหภูมิ ความชื้น ก๊าซ และแสงสว่าง",
      en: "Design and installation of environmental control for a plant cultivation farm — temperature, humidity, gas and lighting."
    },
    category: {
      th: "เกษตรและฟาร์ม",
      en: "Agriculture & Farming"
    },
    location: {
      th: "กรุงเทพฯ",
      en: "Bangkok"
    },
    imgName: "project-cpac.jpg"
  },
  {
    id: "union-infratech",
    title: {
      th: "ห้องควบคุมอุณหภูมิและความชื้น ศูนย์พันธุ์พืชเพาะเลี้ยง",
      en: "Temperature and Humidity Controlled Rooms, Plant Cultivation Centre"
    },
    client: {
      th: "ศูนย์พันธุ์พืชเพาะเลี้ยง (Union Infra Tech)",
      en: "Plant Cultivation Centre (Union Infra Tech)"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องเย็นควบคุมอุณหภูมิและความชื้นสำหรับศูนย์พันธุ์พืชเพาะเลี้ยง รวม 3 แห่ง",
      en: "Design and installation of temperature- and humidity-controlled rooms for plant cultivation centres at three sites."
    },
    category: {
      th: "เกษตรและฟาร์ม",
      en: "Agriculture & Farming"
    },
    location: {
      th: "ชลบุรี · บุรีรัมย์ · พิษณุโลก",
      en: "Chonburi · Buriram · Phitsanulok"
    },
    imgName: "project-union-infratech.jpg"
  },
  {
    id: "durian-chanthaburi",
    title: {
      th: "ห้องเย็นเก็บทุเรียนสดเพื่อแปรรูป — 3 โครงการ",
      en: "Fresh Durian Cold Rooms for Processing — 3 Projects"
    },
    client: {
      th: "ผู้ประกอบการแปรรูปทุเรียน จันทบุรี",
      en: "Durian processors, Chanthaburi"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องเย็นสำหรับเก็บทุเรียนสดเพื่อแปรรูป รวม 3 โครงการในพื้นที่จันทบุรี",
      en: "Design and installation of cold rooms for storing fresh durian ahead of processing — three separate projects in the Chanthaburi area."
    },
    category: {
      th: "เกษตรและฟาร์ม",
      en: "Agriculture & Farming"
    },
    location: {
      th: "จันทบุรี",
      en: "Chanthaburi"
    },
    imgName: "project-durian-chanthaburi.jpg"
  },
  {
    id: "nutrient-chiller-farms",
    title: {
      th: "ระบบ Nutrient Chiller ควบคุมอุณหภูมิน้ำเลี้ยงในฟาร์ม",
      en: "Nutrient Chiller Systems for Farm Water Temperature Control"
    },
    client: {
      th: "ACK Hydrofarm · GP Technology",
      en: "ACK Hydrofarm · GP Technology"
    },
    scope: {
      th: "ออกแบบและติดตั้งระบบ Nutrient Chiller สำหรับควบคุมอุณหภูมิน้ำเลี้ยงในฟาร์ม",
      en: "Design and installation of nutrient chiller systems regulating cultivation water temperature."
    },
    category: {
      th: "เกษตรและฟาร์ม",
      en: "Agriculture & Farming"
    },
    location: {
      th: "กรุงเทพฯ · ฉะเชิงเทรา",
      en: "Bangkok · Chachoengsao"
    },
    imgName: "project-nutrient-chiller.jpg"
  },
  {
    id: "ku-dairy",
    title: {
      th: "ห้องเย็นภายในโรงนม",
      en: "Cold Rooms for a Dairy Plant"
    },
    client: {
      th: "มหาวิทยาลัยเกษตรศาสตร์",
      en: "Kasetsart University"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องเย็นภายในโรงนม",
      en: "Design and installation of cold rooms inside the dairy plant."
    },
    category: {
      th: "เกษตรและฟาร์ม",
      en: "Agriculture & Farming"
    },
    location: {
      th: "กรุงเทพฯ",
      en: "Bangkok"
    },
    imgName: "project-ku-dairy.jpg"
  },
  {
    id: "soneva-kiri",
    featured: true,
    title: {
      th: "Wine Cellar และห้องเย็นรีสอร์ต Soneva Kiri",
      en: "Wine Cellar and Resort Cold Rooms, Soneva Kiri"
    },
    client: {
      th: "Soneva Kiri",
      en: "Soneva Kiri"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องเย็นและ Wine Cellar · ห้องเย็นเก็บขยะสด",
      en: "Design and installation of cold rooms and a wine cellar, plus a chilled wet-waste room."
    },
    category: {
      th: "โรงแรม รีสอร์ต และงานครัว",
      en: "Hospitality & Commercial Kitchens"
    },
    location: {
      th: "ตราด",
      en: "Trat"
    },
    imgName: "project-soneva-kiri.jpg"
  },
  {
    id: "six-senses-laamu",
    title: {
      th: "Wine Cellar และห้องเย็นรีสอร์ต Six Senses Laamu",
      en: "Wine Cellar and Resort Cold Rooms, Six Senses Laamu"
    },
    client: {
      th: "Six Senses Laamu",
      en: "Six Senses Laamu"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องเย็นและ Wine Cellar",
      en: "Design and installation of cold rooms and a wine cellar."
    },
    category: {
      th: "โรงแรม รีสอร์ต และงานครัว",
      en: "Hospitality & Commercial Kitchens"
    },
    location: {
      th: "สาธารณรัฐมัลดีฟส์",
      en: "Republic of Maldives"
    },
    imgName: "project-six-senses-laamu.jpg"
  },
  {
    id: "oriental-hotel",
    title: {
      th: "ห้องเย็นภายในครัวโรงแรม โอเรียนเต็ล",
      en: "Kitchen Cold Rooms, The Oriental"
    },
    client: {
      th: "โรงแรมโอเรียนเต็ล",
      en: "The Oriental Hotel"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องเย็นภายในครัวโรงแรม",
      en: "Design and installation of cold rooms within the hotel kitchen."
    },
    category: {
      th: "โรงแรม รีสอร์ต และงานครัว",
      en: "Hospitality & Commercial Kitchens"
    },
    location: {
      th: "กรุงเทพฯ",
      en: "Bangkok"
    },
    imgName: "project-oriental.jpg"
  },
  {
    id: "hilton-hotel",
    title: {
      th: "ห้องเย็นภายในครัวโรงแรม ฮิลตัน",
      en: "Kitchen Cold Rooms, Hilton"
    },
    client: {
      th: "โรงแรมฮิลตัน",
      en: "Hilton Hotel"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องเย็นภายในครัวโรงแรม",
      en: "Design and installation of cold rooms within the hotel kitchen."
    },
    category: {
      th: "โรงแรม รีสอร์ต และงานครัว",
      en: "Hospitality & Commercial Kitchens"
    },
    location: {
      th: "กรุงเทพฯ",
      en: "Bangkok"
    },
    imgName: "project-hilton.jpg"
  },
  {
    id: "thai-lion-air",
    title: {
      th: "ห้องเย็นและห้องแช่แข็งในครัวกลาง",
      en: "Cold Room and Freezer for a Central Kitchen"
    },
    client: {
      th: "Thai Lion Air",
      en: "Thai Lion Air"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องเย็นและห้องแช่แข็งภายในครัวกลาง",
      en: "Design and installation of cold and freezer rooms within the central kitchen."
    },
    category: {
      th: "โรงแรม รีสอร์ต และงานครัว",
      en: "Hospitality & Commercial Kitchens"
    },
    location: {
      th: "กรุงเทพฯ",
      en: "Bangkok"
    },
    imgName: "project-thai-lion-air.jpg"
  },
  {
    id: "dhammakaya",
    title: {
      th: "ห้องเย็นและห้องแช่แข็ง อาคารโภชนาการและหอฉัน",
      en: "Cold Rooms and Freezers for Dining and Refectory Buildings"
    },
    client: {
      th: "วัดพระธรรมกาย",
      en: "Wat Phra Dhammakaya"
    },
    scope: {
      th: "ห้องเย็นและห้องแช่แข็งภายในอาคารโภชนาการ · ห้องเย็นและห้องแช่แข็งภายในหอฉัน",
      en: "Cold and freezer rooms in the dining building, plus cold and freezer rooms in the refectory."
    },
    category: {
      th: "โรงแรม รีสอร์ต และงานครัว",
      en: "Hospitality & Commercial Kitchens"
    },
    location: {
      th: "ปทุมธานี",
      en: "Pathum Thani"
    },
    imgName: "project-dhammakaya.jpg"
  },
  {
    id: "hana-semi",
    featured: true,
    title: {
      th: "ห้องเย็นเก็บ Raw Material โรงงานเซมิคอนดักเตอร์",
      en: "Raw Material Cold Room, Semiconductor Plant"
    },
    client: {
      th: "Hana Semiconductor",
      en: "Hana Semiconductor"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องเย็นสำหรับเก็บ Raw Material",
      en: "Design and installation of a cold room for raw material storage."
    },
    category: {
      th: "อุตสาหกรรมการผลิต",
      en: "Manufacturing"
    },
    location: {
      th: "อยุธยา",
      en: "Ayutthaya"
    },
    imgName: "project-hana-semi.jpg"
  },
  {
    id: "gs-yuasa",
    title: {
      th: "ห้องควบคุมอุณหภูมิและความชื้น พื้นที่ผลิตไส้แบตเตอรี่",
      en: "Temperature and Humidity Controlled Room, Battery Core Production Area"
    },
    client: {
      th: "GS Yuasa",
      en: "GS Yuasa"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องควบคุมอุณหภูมิและความชื้นสำหรับพื้นที่การผลิตไส้แบตเตอรี่",
      en: "Design and installation of a temperature- and humidity-controlled room serving the battery core production area."
    },
    category: {
      th: "อุตสาหกรรมการผลิต",
      en: "Manufacturing"
    },
    location: {
      th: "ฉะเชิงเทรา",
      en: "Chachoengsao"
    },
    imgName: "project-gs-yuasa.jpg"
  },
  {
    id: "gran-monte",
    title: {
      th: "ระบบ Chiller Line สำหรับสายการผลิตไวน์",
      en: "Chiller Line System for Wine Production"
    },
    client: {
      th: "Gran Monte",
      en: "Gran Monte"
    },
    scope: {
      th: "ออกแบบและติดตั้งระบบ Chiller line สำหรับการผลิตไวน์",
      en: "Design and installation of a chiller line system for wine production."
    },
    category: {
      th: "อุตสาหกรรมการผลิต",
      en: "Manufacturing"
    },
    location: {
      th: "นครราชสีมา",
      en: "Nakhon Ratchasima"
    },
    imgName: "project-gran-monte.jpg"
  },
  {
    id: "hmt-polystyrene",
    title: {
      th: "ห้องควบคุมอุณหภูมิแบบ Explosion Proof เก็บ Raw Material",
      en: "Explosion Proof Temperature Controlled Room for Raw Materials"
    },
    client: {
      th: "เอช เอ็ม ที โพลีสไตรีน",
      en: "HMT Polystyrene"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องควบคุมอุณหภูมิแบบ Explosion Proof สำหรับเก็บ Raw Material",
      en: "Design and installation of an explosion-proof temperature-controlled room for raw material storage."
    },
    category: {
      th: "อุตสาหกรรมการผลิต",
      en: "Manufacturing"
    },
    location: {
      th: "กรุงเทพฯ",
      en: "Bangkok"
    },
    imgName: "project-hmt-polystyrene.jpg"
  },
  {
    id: "scotch-industry",
    title: {
      th: "ห้องควบคุมอุณหภูมิและความชื้น เก็บรังนก",
      en: "Temperature and Humidity Controlled Room for Bird's Nest Storage"
    },
    client: {
      th: "Scotch Industry",
      en: "Scotch Industry"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องควบคุมอุณหภูมิและความชื้นสำหรับห้องเก็บรังนก",
      en: "Design and installation of a temperature- and humidity-controlled room for bird's nest storage."
    },
    category: {
      th: "อุตสาหกรรมการผลิต",
      en: "Manufacturing"
    },
    location: {
      th: "นนทบุรี",
      en: "Nonthaburi"
    },
    imgName: "project-scotch.jpg"
  },
  {
    id: "gpo",
    title: {
      th: "ห้องเก็บสารสกัดจากพืช องค์การเภสัชกรรม",
      en: "Plant Extract Storage Room, Government Pharmaceutical Organization"
    },
    client: {
      th: "องค์การเภสัชกรรม",
      en: "Government Pharmaceutical Organization (GPO)"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องเก็บสารสกัดจากพืช",
      en: "Design and installation of a storage room for plant extracts."
    },
    category: {
      th: "วิจัยและการแพทย์",
      en: "Research & Institutional"
    },
    location: {
      th: "ปทุมธานี",
      en: "Pathum Thani"
    },
    imgName: "project-gpo.jpg"
  },
  {
    id: "chula-hospital",
    title: {
      th: "ห้องเย็นและห้องแช่แข็ง ครัวโภชนาการโรงพยาบาล",
      en: "Cold Room and Freezer for a Hospital Nutrition Kitchen"
    },
    client: {
      th: "โรงพยาบาลจุฬาลงกรณ์",
      en: "King Chulalongkorn Memorial Hospital"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องเย็นและห้องแช่แข็งสำหรับครัวโภชนาการ",
      en: "Design and installation of cold and freezer rooms for the nutrition kitchen."
    },
    category: {
      th: "วิจัยและการแพทย์",
      en: "Research & Institutional"
    },
    location: {
      th: "กรุงเทพฯ",
      en: "Bangkok"
    },
    imgName: "project-chula-hospital.jpg"
  },
  {
    id: "tistr",
    title: {
      th: "ห้องเย็นและ Blast Freezer ภายในสถาบันวิจัย",
      en: "Cold Room and Blast Freezer at a National Research Institute"
    },
    client: {
      th: "สถาบันวิจัยวิทยาศาสตร์และเทคโนโลยีแห่งประเทศไทย (วว.)",
      en: "Thailand Institute of Scientific and Technological Research (TISTR)"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องเย็นและ Blast Freezer ภายในสถาบันวิจัย",
      en: "Design and installation of a cold room and blast freezer within the research institute."
    },
    category: {
      th: "วิจัยและการแพทย์",
      en: "Research & Institutional"
    },
    location: {
      th: "กรุงเทพฯ",
      en: "Bangkok"
    },
    imgName: "project-tistr.jpg"
  },
  {
    id: "chula-food-innovation",
    title: {
      th: "ห้องเย็นและห้องทดลอง ศูนย์นวัตกรรมอาหาร จุฬาฯ",
      en: "Cold Room and Laboratory, Chulalongkorn Food Innovation Centre"
    },
    client: {
      th: "คณะวิทยาศาสตร์ เทคโนโลยีอาหาร จุฬาลงกรณ์มหาวิทยาลัย (ศูนย์นวัตกรรมอาหาร ผลิตภัณฑ์สุขภาพ และเกษตรครบวงจร)",
      en: "Faculty of Science, Food Technology, Chulalongkorn University (Food, Health Product and Integrated Agriculture Innovation Centre)"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องเย็นสำหรับเก็บผลิตภัณฑ์ และห้องทดลอง",
      en: "Design and installation of a product cold room and a laboratory room."
    },
    category: {
      th: "วิจัยและการแพทย์",
      en: "Research & Institutional"
    },
    location: {
      th: "สระบุรี (แก่งคอย)",
      en: "Saraburi (Kaeng Khoi)"
    },
    imgName: "project-chula.jpg"
  },
  {
    id: "automotive-institute",
    title: {
      th: "ห้องทดสอบมลพิษเครื่องยนต์เบนซิน",
      en: "Petrol Engine Emissions Test Chamber"
    },
    client: {
      th: "สถาบันยานยนต์ (Petro Instrument)",
      en: "Thailand Automotive Institute (Petro Instrument)"
    },
    scope: {
      th: "ห้องทดสอบมลพิษ เครื่องยนต์เบนซินขนาดกลางและขนาดเล็ก",
      en: "Emissions test chambers for medium and small petrol engines."
    },
    category: {
      th: "วิจัยและการแพทย์",
      en: "Research & Institutional"
    },
    location: {
      th: "สมุทรปราการ",
      en: "Samut Prakan"
    },
    imgName: "project-automotive-institute.jpg"
  },
  {
    id: "irradiation-center",
    title: {
      th: "ห้องเก็บผลิตภัณฑ์ ศูนย์ฉายรังสี",
      en: "Product Storage Room, Irradiation Centre"
    },
    client: {
      th: "ศูนย์ฉายรังสี",
      en: "Irradiation Centre"
    },
    scope: {
      th: "ออกแบบและติดตั้งห้องเก็บผลิตภัณฑ์สำหรับศูนย์ฉายรังสี",
      en: "Design and installation of a product storage room for the irradiation centre."
    },
    category: {
      th: "วิจัยและการแพทย์",
      en: "Research & Institutional"
    },
    location: {
      th: "ปทุมธานี",
      en: "Pathum Thani"
    },
    imgName: "project-irradiation.jpg"
  },
];

// ===== 5. ทำไมต้องเลือกเรา (Why Choose Us Items) =====
// หัวข้อจุดเด่นที่แสดงในหน้าแรกเพื่อเพิ่มความมั่นใจให้กับลูกค้า
export const whyChooseUs = [
  {
    id: "why-1",
    iconName: "Award",
    title: {
      th: "ถามก่อน แล้วค่อยเสนอราคา",
      en: "We ask first, then quote"
    },
    desc: {
      th: "เก็บอะไร ปริมาณเท่าไหร่ ใช้งานยังไง ไฟพอไหม — เราถามให้ครบก่อน เพราะคำตอบพวกนี้เปลี่ยนทั้งแบบและราคา",
      en: "What you store, how much, how you work, whether your power is adequate — we ask before quoting, because the answers change both the design and the price"
    }
  },
  {
    id: "why-2",
    iconName: "Users",
    title: {
      th: "ทีมเดียวตั้งแต่คุยโจทย์ถึงวันที่เครื่องต้องวิ่งทุกวัน",
      en: "One team from the brief to the years it has to keep running"
    },
    desc: {
      th: "ห้องเย็นคือเครื่องจักรที่วิ่ง 24 ชั่วโมง เราจึงไม่ได้จบงานตอนส่งมอบ — ดูแลสม่ำเสมอและถูกวิธี ยืดอายุระบบและลดค่าไฟไปพร้อมกัน",
      en: "A cold room runs around the clock, so our job doesn't end at handover — correct, regular care extends its life and lowers your bill"
    }
  },
  {
    id: "why-3",
    iconName: "Globe",
    title: {
      th: "โจทย์แปลก คืองานที่เราถนัด",
      en: "Unusual briefs are our speciality"
    },
    desc: {
      th: "ห้องเพาะเลี้ยงเนื้อเยื่อ ห้องทดสอบมลพิษเครื่องยนต์ Wine Cellar — งานที่ไม่มีในแคตตาล็อกใคร",
      en: "Tissue culture rooms, engine emissions chambers, wine cellars — work that isn't in anyone's catalogue"
    }
  },
  {
    id: "why-4",
    iconName: "Leaf",
    title: {
      th: "ขนาดที่พอดี คือการประหยัดพลังงานที่แท้จริง",
      en: "The right size is the real energy saving"
    },
    desc: {
      th: "เครื่องเล็กไปจะวิ่งไม่หยุด ใหญ่ไปก็จ่ายเกินตั้งแต่วันแรก จุดคุ้มที่สุดอยู่ตรงกลาง และมันคำนวณได้",
      en: "Undersized plant never stops running; oversized means overpaying from day one. The sweet spot is between — and it can be calculated"
    }
  },
  {
    id: "why-5",
    iconName: "Clock",
    title: {
      th: "บอกเรื่องกฎตั้งแต่ก่อนคุณลงมือ",
      en: "We flag the regulations before you break ground"
    },
    desc: {
      th: "ระบบทำความเย็นรวมกันเกิน 50 แรงม้า เข้าข่ายโรงงานจำพวก 3 ต้องมี ร.ง.4 ก่อนเริ่มก่อสร้าง — เรื่องแบบนี้ต้องรู้ก่อน ไม่ใช่รู้ตอนสร้างเสร็จ",
      en: "A refrigeration system over 50 combined horsepower becomes a Category 3 factory needing a licence before construction — you need to know that early, not afterwards"
    }
  }
];

// ===== 6. ข้อมูลเกี่ยวกับเรา & สถิติความสำเร็จ (About Us & Stats) =====
// แก้ไขประวัติบริษัท และแถบสถิติความสำเร็จต่างๆ
export const aboutText = {
  title: {
    th: "เกี่ยวกับเรา",
    en: "About Us"
  },
  subtitle: {
    th: "ABOUT US",
    en: "ABOUT US"
  },
  description: {
    th: "THERMO ก่อตั้งเมื่อปี 1987 โดยทีมวิศวกรที่คลุกคลีอยู่กับงานทำความเย็นมาก่อนหน้านั้นแล้ว รวมประสบการณ์ในสายงานนี้กว่า 40 ปี — เราจึงเริ่มต้นจากหน้างานจริง ไม่ได้เริ่มจากแคตตาล็อก\n\nตั้งแต่นั้นมา เราออกแบบและติดตั้งงานมาแล้วกว่า 2,000 โครงการ ตั้งแต่ห้องเย็นคลังสินค้าระหว่างประเทศที่ท่าอากาศยานสุวรรณภูมิ ห้องเย็นหลังร้าน KFC กว่า 200 สาขาทั่วประเทศ ห้องเก็บ Raw Material ในโรงงานเซมิคอนดักเตอร์ ห้องเย็นเก็บทุเรียนสดที่จันทบุรี ไปจนถึง Wine Cellar ที่รีสอร์ตในมัลดีฟส์\n\nงานพวกนี้ไม่มีอะไรเหมือนกันเลย นอกจากข้อเดียว — ทุกงานเริ่มจากการฟังว่าคุณต้องการผลลัพธ์อะไร แล้วออกแบบระบบขึ้นมาตอบโจทย์นั้น เราไม่มีห้องเย็นสำเร็จรูปให้เลือกจากหน้าแคตตาล็อก และเราเชื่อว่านั่นคือเหตุผลที่ลูกค้ายังอยู่กับเรามาเกือบสี่ทศวรรษ",
    en: "THERMO was founded in 1987 by engineers who were already deep in refrigeration work — over 40 years of combined experience in the field. We started from the plant floor, not from a catalogue.\n\nSince then we've designed and installed more than 2,000 projects: international cargo cold rooms at Suvarnabhumi Airport, back-of-house rooms in over 200 KFC branches nationwide, raw material stores in semiconductor plants, fresh durian cold rooms in Chanthaburi, and wine cellars at resorts in the Maldives.\n\nThose jobs have nothing in common except one thing — each began by listening to the outcome you need, then engineering a system around it. We don't sell cold rooms off a catalogue page. We think that's why our clients have stayed with us for nearly four decades."
  }
};

export const stats = [
  {
    id: "stat-1",
    iconName: "Briefcase",
    num: {
      th: "1987",
      en: "1987"
    },
    label: {
      th: "ก่อตั้งบริษัท",
      en: "Established"
    }
  },
  {
    id: "stat-2",
    iconName: "Users",
    num: {
      th: "40+",
      en: "40+"
    },
    label: {
      th: "ปีประสบการณ์ทีมวิศวกร",
      en: "Years of Engineering Experience"
    }
  },
  {
    id: "stat-3",
    iconName: "CheckSquare",
    num: {
      th: "2,000+",
      en: "2,000+"
    },
    label: {
      th: "โครงการสำเร็จ",
      en: "Completed Projects"
    }
  },
  {
    id: "stat-4",
    iconName: "Map",
    num: {
      th: "ทั่วประเทศ",
      en: "Nationwide"
    },
    label: {
      th: "ให้บริการครอบคลุม",
      en: "Service Coverage"
    }
  }
];

// ===== 7. บทความสาระความรู้ (Knowledge Articles) =====
// รายการบทความในคลังความรู้ คัดลอกรูปแบบเมื่อต้องการเพิ่มบทความใหม่
// ตัวอย่างรูปแบบการคัดลอกเพิ่มบทความ:
// {
//   id: "my-new-article-id",
//   title: { th: "ชื่อบทความไทย", en: "English Article Title" },
//   date: { th: "13 ก.ค. 2569", en: "Jul 13, 2026" },
//   category: { th: "หมวดหมู่ภาษาไทย", en: "English Category" },
//   image: "article-01.jpg",
//   excerpt: { th: "คำโปรยสั้นๆ หน้าแสดงรายการ...", en: "Short intro description..." },
//   body: {
//     th: [
//       "ย่อหน้าที่ 1 ภาษาไทย...",
//       "1. หัวข้อที่ 1 และข้อความย่อยไทย: ข้อความอธิบาย...",
//       "ย่อหน้าที่ 2 ภาษาไทย..."
//     ],
//     en: [
//       "Paragraph 1 English...",
//       "1. Bullet heading and text English: Description...",
//       "Paragraph 2 English..."
//     ]
//   }
// }
export const articles = [
  {
    id: "coldroom-checklist",
    title: {
      th: "ก่อนสร้างห้องเย็น: 5 การตัดสินใจที่ชี้ว่าคุ้มหรือไม่คุ้ม (ฉบับวิศวกร)",
      en: "5 Things to Know Before Building a Cold Room — What Actually Makes It Worth It"
    },
    date: {
      th: "10 ก.ค. 2569",
      en: "July 10, 2026"
    },
    category: {
      th: "ก่อนเริ่มโครงการ",
      en: "Before You Start"
    },
    image: "article-01.jpg",
    bodyMarkdown: {
      th: `คนส่วนใหญ่เปิดบทสนทนาห้องเย็นด้วยคำถามเดียว: "ห้องเย็นกี่บาท?"

เราเข้าใจ มันเป็นคำถามที่ตอบง่ายที่สุด แต่ก็เป็นคำถามที่ผิดที่สุดที่จะถามเป็นข้อแรก เพราะราคาห้องเย็นไม่ใช่ "จุดเริ่มต้น" ที่เลือกได้ — มันคือ **ผลลัพธ์** ที่ออกมาจากการตัดสินใจ 5 อย่างก่อนหน้านั้น ตัดสินใจ 5 ข้อนี้ให้ถูก ราคาจะจัดตัวเองให้เหมาะสม ตัดสินใจผิด ต่อให้กดราคาลงมาได้ คุณก็ไปจ่ายคืนทีหลังในรูปค่าไฟ ค่าซ่อม และของเสียในห้อง

ตั้งแต่ปี 1987 THERMO ออกแบบและติดตั้งห้องเย็นมาแล้วกว่า 2,000 โครงการ — ตั้งแต่คลังสินค้าระหว่างประเทศที่สุวรรณภูมิ ห้องเย็นหลังร้าน KFC กว่า 200 สาขาทั่วประเทศ ไปจนถึงห้องเก็บทุเรียนสดที่จันทบุรีและห้องควบคุมความชื้นของสายการผลิตแบตเตอรี่ สิ่งที่เราเห็นซ้ำ ๆ คือ **โครงการที่จบสวยกับโครงการที่ต้องกลับมาแก้ทีหลัง มันแยกทางกันตั้งแต่บทสนทนาแรก ไม่ใช่ที่ราคา**

บทความนี้ไม่ได้มาบอกว่า "เตรียมอะไรบ้าง" แบบที่หาอ่านได้ทั่วไป แต่จะพาดูว่าแต่ละการตัดสินใจมันไปคุมต้นทุนตรงไหน และถ้าพลาดจะเกิดอะไรขึ้นจริง ๆ

## ห้าการตัดสินใจที่กำหนดว่าคุ้มหรือไม่คุ้ม

### 1. สินค้าและลักษณะการใช้งาน

**คืออะไร:** ห้องของคุณมีหน้าที่ "เก็บรักษา" อุณหภูมิสินค้าที่เย็นอยู่แล้ว หรือต้อง "ดึงอุณหภูมิลง" ให้สินค้าที่เพิ่งเข้ามาอุ่น ๆ และในห้องมีอะไรเกิดขึ้นบ้าง — ฟอร์กลิฟต์วิ่งเข้าไหม มีการแปรรูป/แพ็กในห้องไหม คนเข้าออกบ่อยแค่ไหน

**ทำไมมันถึงคุมต้นทุน:** สองงานนี้ใช้เครื่องคนละขนาดกันมาก การเก็บรักษาเฉย ๆ ภาระความเย็นค่อนข้างนิ่ง แต่การดึงอุณหภูมิสินค้าใหม่ (pull-down) คือการเติมความร้อนก้อนใหญ่เข้าห้องตลอดเวลา เครื่องต้องใหญ่กว่าหลายเท่าเพื่อไม่ให้อุณหภูมิเด้ง ทุกฟอร์กลิฟต์ ทุกคน ทุกครั้งที่เปิดประตู คือความร้อนที่เครื่องต้องรีดออก

**หลักที่ใช้จริง:** แยกให้ชัดตั้งแต่วันแรกว่าเป็นห้องเก็บ (storage) หรือห้องกระบวนการ (process) เพราะมันกำหนดตรรกะการออกแบบทั้งชุด ไม่ใช่แค่ปรับตัวเลขนิด ๆ

**ถ้าพลาด:** ออกแบบเป็นห้องเก็บ แต่เอาไปใช้ดึงอุณหภูมิสินค้าใหม่ตลอด → เครื่องเล็กไป วิ่งไม่หยุด อุณหภูมิไม่ถึงเป้า สินค้าเสีย และเครื่องพังเร็วเพราะทำงาน 100% ตลอดเวลา

**หน้างานจริง:** ทุเรียนสดที่จันทบุรี (รับของใหม่เข้าเป็นล็อตและต้องคุมอุณหภูมิให้นิ่ง) กับห้องเก็บ Raw Material ในโรงงานอิเล็กทรอนิกส์ ใช้ตรรกะการออกแบบคนละชุดกันเลย ทั้งที่ภายนอกดูเป็น "ห้องเย็น" เหมือนกัน

### 2. ปริมาณ การหมุนเวียน และการจัดเก็บสินค้า

**คืออะไร:** ไม่ใช่แค่ "ห้องกี่ตารางเมตร" แต่คือ **ของเข้า-ออกวันละเท่าไหร่ เข้ามาในสภาพไหน และจัดเก็บ-เคลื่อนย้ายอย่างไรในห้อง**

**ทำไมมันถึงคุมต้นทุน:** ห้องขนาดเท่ากันเป๊ะ แต่ห้องที่ของหมุนเวียนเร็ว (เปิดประตูบ่อย ของใหม่เข้าตลอด) ต้องการเครื่องใหญ่กว่าห้องที่ของนิ่งมาก โดยเฉพาะห้องเย็นในสายการผลิตซึ่งของใหม่ไหลเข้าไม่หยุด ภาระความเย็นสูงกว่าห้องเก็บสต็อกที่ปิดประตูทั้งวันมาก และในคลังสินค้าขนาดใหญ่ วิธี "จัดเก็บ" มีผลไม่แพ้ "ปริมาณ" — การออกแบบและเลือกชนิดแร็ค พื้นที่ให้อุปกรณ์ขนย้ายสินค้าทำงาน และขนาด/ชนิดของประตู ล้วนกำหนดว่าใช้พื้นที่เย็นได้คุ้มแค่ไหน และเสียความเย็นทิ้งไปเท่าไหร่ทุกครั้งที่เปิดประตู

**หลักที่ใช้จริง:** คิดจาก "อัตราการเข้า-ออกต่อวัน" และอุณหภูมิสินค้าตอนเข้า ไม่ใช่แค่ปริมาตรห้อง — และถ้าเป็นคลังสินค้า ต้องออกแบบระบบแร็ค (ชนิดและผังการวาง เช่น Selective / Drive-in ตามความถี่การหยิบของ) ช่องทางเดินของรถยก และตำแหน่ง/ขนาด/ชนิดประตู ไปพร้อมกันตั้งแต่ต้น เพราะทุกอย่างพันกัน: แร็คกำหนดผังห้อง ผังห้องกำหนดเส้นทางรถยก เส้นทางรถยกกำหนดตำแหน่งประตู และชนิดประตูกำหนดว่าเสียความเย็นมากหรือน้อย

**ถ้าพลาด:** คิดแค่ขนาดห้อง ไม่คิดการหมุนเวียนและการจัดเก็บ → เครื่องรับภาระจริงไม่ไหวในชั่วโมงเร่ง อุณหภูมิแกว่ง หรือได้ห้องที่พอวางแร็คแล้วรถยกเลี้ยวไม่ได้ ต้องมารื้อผังทีหลังทั้งที่ห้องเย็นสร้างเสร็จไปแล้ว

**หน้างานจริง:** ในคลังสินค้าห้องเย็น สิ่งที่ต้องคิดพร้อมกันตั้งแต่แบบคือ ชนิดแร็คกับความถี่การหยิบสินค้า ระยะช่องทางให้รถยกทำงานได้ปลอดภัย และประตูที่เปิด-ปิดถี่ ๆ ควรเป็นประตูความเร็วสูงเพื่อลดการสูญเสียความเย็น (THERMO มีบริการประตูความเร็วสูงสำหรับจุดนี้โดยเฉพาะ) — จุดเหล่านี้ถ้าวางผิดตั้งแต่แรก แก้ทีหลังแพงและกระทบทั้งระบบ

### 3. พื้นที่ — คิดทั้ง "ภายในห้อง" และ "ภายนอกห้อง"

**คืออะไร:** พื้นที่ห้องเย็นมี 2 ส่วนที่ต้องออกแบบแยกกัน ลูกค้ามักนึกถึงแค่ส่วนแรก แล้วลืมส่วนที่สอง

**ทำไมมันถึงคุมต้นทุน:** สองส่วนนี้คุมคนละต้นทุน — พื้นภายในห้องคุม "ต้นทุนซ่อมระยะยาว" (พังทีต้องหยุดใช้ห้องทั้งที่ของเต็ม) ส่วนพื้นที่ระบายความร้อนภายนอกคุม "ค่าไฟรายเดือนและอายุเครื่อง" ทั้งคู่คือเงินที่จ่ายตลอดอายุห้อง ไม่ใช่แค่วันติดตั้ง

**ส่วนที่ 1 — ภายในห้อง (ตัวห้องและพื้น):** พื้นต้องเรียบ ไม่ทรุด ไม่ขังน้ำ และรับน้ำหนักสินค้า + รถยกไหว โดยพื้นฉนวนและวัสดุปิดผิว (finishing) ออกแบบต่างกันตามงาน — คลังอุณหภูมิต่ำที่มี traffic สูง ต้องวางฉนวนก่อนแล้วเททับด้วยคอนกรีตที่มีค่ากำลัง (strength) เฉพาะสำหรับห้องเย็น หนาพอรับน้ำหนักสินค้า + รถยก ส่วนห้องเล็กที่มีแค่คนเดินขนของน้ำหนักเบา ใช้พื้นฉนวนสำเร็จรูปปิดทับด้วยวัสดุกันลื่นก็พอ เลือกเกินจำเป็นก็เปลืองงบ เลือกไม่พอพื้นก็พังเร็ว **ถ้าพลาด:** พื้นรับ traffic ไม่ไหว คอนกรีตแตกร้าว ทรุด สุดท้ายต้องปิดห้องมาซ่อมพื้นทั้งที่ของยังเต็ม

**ส่วนที่ 2 — ภายนอกห้อง (พื้นที่วางชุดเครื่องและการระบายความร้อน):** ชุดเครื่องทำความเย็น (condensing unit) ต้องมีฐานมั่นคง ระบายความร้อนได้ดี เข้าถึงง่ายเวลาซ่อม และไม่อยู่ไกลจากห้องเกินไป (ยิ่งไกล ท่อยิ่งยาว ประสิทธิภาพยิ่งตก ต้นทุนติดตั้งยิ่งขึ้น) ถ้าเลี่ยงพื้นที่กลางแจ้งไม่ได้ ต้องมีหลังคากันแดดกระทบเครื่องและฉนวนโดยตรง **ถ้าพลาด:** วางเครื่องในที่ระบายความร้อนไม่ออก เครื่องทำงานหนักเกินจำเป็น กินไฟเพิ่ม อายุสั้นลง

### 4. ขนาดแหล่งจ่ายไฟ

**คืออะไร:** ระบบทำความเย็นแนะนำให้ใช้ไฟ **380 โวลต์ 3 เฟส** ไม่ใช่ 220 โวลต์ 1 เฟสแบบบ้าน

**ทำไมมันถึงคุมต้นทุน:** เครื่องทำความเย็นกินกระแสสูงกว่าเครื่องใช้ไฟฟ้าทั่วไปมาก ไฟ 3 เฟสจ่ายโหลดได้นิ่งและคุ้มกว่า ถ้าระบบไฟไม่พอ มันไม่ได้แค่ "เปิดไม่ติด" แต่จะลากให้เกิดไฟตก-ไฟกระชากที่กระทบเครื่องจักรตัวอื่นทั้งโรงงาน

**หลักที่ใช้จริง:** ต้องเคลียร์เรื่องโหลดไฟ **ก่อนออกแบบ** ไม่ใช่มารู้ตอนจะกดปุ่มเปิดเครื่อง และถ้าไฟที่มีไม่พอ ต้องวางแผนขยายเขตไฟ/หม้อแปลงไว้ในงบตั้งแต่ต้น

**ถ้าพลาด:** เจอตอนจะเปิดเครื่องว่าไฟไม่พอ → ต้องรื้อแผน เดินไฟใหม่ หรือรอขยายเขตไฟ งานดีเลย์เป็นเดือนและบานปลาย

**หน้างานจริง:** อ่านเจาะลึกเรื่องนี้ได้ในบทความ [ทำไมห้องเย็นต้องใช้ไฟ 380V 3 เฟส](/knowledge/power-3phase)

### 5. ทีมงานและการดูแลหลังการขาย

**คืออะไร:** ห้องเย็นไม่ใช่ของที่ "ซื้อแล้วจบ" มันคือเครื่องจักรที่ต้องวิ่ง 24 ชั่วโมงทุกวันไม่มีหยุด

**ทำไมมันถึงคุมต้นทุน:** นี่คือส่วนที่คนมองข้ามที่สุด และเป็นส่วนที่กินเงินมากที่สุดตลอดอายุห้อง (ดูหัวข้อ "ต้นทุนจริงตลอด 10 ปี" ด้านล่าง) การดูแลที่สม่ำเสมอและถูกวิธียืดอายุระบบ ประหยัดค่าไฟ และยืดอายุอะไหล่ไปพร้อมกัน

**หลักที่ใช้จริง:** ก่อนเซ็นสัญญา ถามให้ชัด 3 คำถาม — *ใครมาดูแล? มาเร็วแค่ไหนเวลาเครื่องมีปัญหา? อะไหล่หาได้จริงไหมในอีก 5-10 ปีข้างหน้า?* คำว่า "มี PM ให้" ของแต่ละเจ้าไม่เท่ากัน

**ถ้าพลาด:** ได้ห้องราคาถูกจากเจ้าที่หายไปหลังติดตั้งเสร็จ → เครื่องมีปัญหากลางดึกแล้วไม่มีคนรับสาย ของเต็มห้องกำลังเสีย

**หน้างานจริง:** อ่านต่อว่าการ PM ที่ "ได้จริง" ต่างจากที่ "เคลมว่ามี" อย่างไรในบทความ [PM ระบบทำความเย็น ควรตรวจอะไรบ้าง](/knowledge/preventive-maintenance)

## ตารางอ้างอิงสเปก

### ความหนาฉนวนตามอุณหภูมิใช้งาน — เทียบ PS กับ PU/PIR

ฉนวนคือหัวใจของห้องเย็น และ **ชนิดของฉนวนสำคัญพอ ๆ กับความหนา** ตารางนี้คือค่าที่ THERMO ใช้เลือกจริง

**PS — Polystyrene**

| ความหนาแผ่นฉนวน | อุณหภูมิที่ควบคุมได้ |
|---|---|
| 2″ (50 มม.) | +25 °C |
| 3″ (75 มม.) | +15 °C |
| 4″ (100 มม.) | +10 °C |
| 5″ (125 มม.) | 0 °C |
| 6″ (150 มม.) | −10 °C |
| 7″ (175 มม.) | −20 °C |
| 8″ (200 มม.) | −25 °C |
| 9″ (225 มม.) | −30 °C |
| 10″ (250 มม.) | −40 °C |
| 12″ (300 มม.) | −50 °C |

**PU — Polyurethane** (PIR ใช้ค่าเดียวกัน เพราะสารตั้งต้นเป็น PU เหมือนกัน)

| ความหนาแผ่นฉนวน | อุณหภูมิที่ควบคุมได้ |
|---|---|
| 2″ (50 มม.) | +5 °C |
| 3″ (75 มม.) | −10 °C |
| 4″ (100 มม.) | −25 °C |
| 5″ (120 มม.) | −35 °C |
| 6″ (150 มม.) | −45 °C |

**อ่านตารางให้เป็น — จุดที่คู่แข่งไม่บอก:** เทียบที่อุณหภูมิเดียวกัน PU กินความหนาแค่ประมาณ **ครึ่งเดียว** ของ PS ที่ −10 °C: PS ต้องหนา 150 มม. แต่ PU แค่ 75 มม. ที่ −25 °C: PS ต้องหนา 200 มม. แต่ PU แค่ 100 มม. แปลว่าแผ่น PS ที่ดู "หนากว่า" ไม่ได้แปลว่าเก็บความเย็นดีกว่าเสมอไป การเลือกชนิดฉนวนให้เหมาะกับอุณหภูมิและพื้นที่ผนังที่มี คือการตัดสินใจเชิงวิศวกรรม ไม่ใช่แค่ "เอาที่หนา ๆ ไว้ก่อน"

### ตารางการใช้งานตามประเภทห้อง

(ความหนาเป็นค่าโดยประมาณ ปรับตามงานจริง)

| ประเภทห้อง | ช่วงอุณหภูมิ | ตัวอย่างการใช้งาน | PS | PU / PIR |
|---|---|---|---|---|
| ห้องปฏิบัติการ / ห้องทดสอบ | +12 ~ +15 °C | ห้องแล็บเคมี ห้องทดสอบ | ~75 มม. | ~50 มม. |
| Cold chain / จุดขนถ่าย (docking) | 0 ~ +5 °C | คลังกระจายสินค้า จุดรับ-ส่ง | 100 มม. | 75–100 มม. |
| ห้องเย็นเก็บรักษา (Chill) | −10 ~ +10 °C | ผัก ผลไม้ ผลิตภัณฑ์ | 75–125 มม. | 75 มม. |
| ห้องแช่แข็ง (Freezer) | −30 ~ −18 °C | เนื้อสัตว์ อาหารแช่แข็ง | 200 มม. | 100–125 มม. |
| Blast Freezer | −35 ~ −45 °C | ลดอุณหภูมิสินค้าอย่างรวดเร็ว | 250 มม. | 120–150 มม. |

## ระบบฮีตเตอร์ในห้องแช่แข็ง — จุดที่คู่แข่งไม่ค่อยพูดถึง

ในห้องที่อุณหภูมิต่ำกว่าจุดเยือกแข็ง ความชื้นจากอากาศภายนอกจะกลายเป็นน้ำแข็งเกาะทุกจุดที่ความเย็นไปเจอความชื้น ถ้าไม่ออกแบบระบบฮีตเตอร์ไว้ตั้งแต่ต้น น้ำแข็งจะค่อย ๆ สะสมจนพื้นดันตัว ประตูปิดไม่สนิท หรือน้ำแข็งล็อกบานประตูจนเปิดไม่ออก — ปัญหาที่ไม่โผล่ในวันส่งงาน แต่มาโผล่หลังใช้ไปไม่กี่เดือน

ฮีตเตอร์จึงไม่ใช่อุปกรณ์เสริมที่ "ใส่ ๆ ไป" แต่เป็นการตัดสินใจเชิงวิศวกรรมว่าจะติดตรงไหน กำลังเท่าไหร่ และควบคุมอย่างไร THERMO ออกแบบไว้ 4 จุดหลัก:

- **Floor heater (ฮีตเตอร์ใต้พื้น)** — กันดินและพื้นใต้ห้องแช่แข็งกลายเป็นน้ำแข็งจนดันตัว (frost heave) ทำให้พื้นยกตัวหรือแตกร้าว สำคัญมากในห้องอุณหภูมิต่ำที่ใช้งานต่อเนื่อง
- **ฮีตเตอร์ใต้ธรณีประตู** — กันน้ำแข็งเกาะที่ธรณีจนประตูปิดไม่สนิท (ยิ่งปิดไม่สนิท ความชื้นยิ่งเข้า น้ำแข็งยิ่งเกาะ วนเป็นปัญหาไม่จบ)
- **ฮีตเตอร์รอบวงกบประตู** — กันน้ำแข็งเกาะขอบวงกบจนบานประตูล็อกติดกับกรอบ
- **ฮีตเตอร์รอบตัวบานประตู** — กันน้ำแข็งเกาะขอบบานและซีลยาง ให้เปิด-ปิดได้ลื่นและซีลไม่ฉีกขาด

หัวใจของการออกแบบคือการเลือกกำลังและตำแหน่งให้พอดีกับอุณหภูมิห้องและความถี่ในการเปิดประตู — มากไปเปลืองไฟ น้อยไปกันน้ำแข็งไม่อยู่ รายละเอียดพวกนี้มองไม่เห็นในใบเสนอราคา แต่คือตัวแยกห้องแช่แข็งที่ใช้งานได้ยาว ๆ ออกจากห้องที่เจอปัญหาน้ำแข็งเกาะภายในไม่กี่เดือน

## ต้นทุนจริงตลอด 10 ปี

ราคาที่คุณจ่ายวันติดตั้ง คือส่วนที่ **เล็กที่สุด** ของต้นทุนห้องเย็นตลอดอายุการใช้งาน ก้อนใหญ่จริง ๆ คือค่าไฟและค่าดูแลที่ทยอยจ่ายไปอีก 10 ปี และมันเชื่อมกันเป็นลูกโซ่ที่น่ากลัวกว่าที่คิด เมื่อ **ขาดการดูแล** ปฏิกิริยาลูกโซ่จะเริ่มทันที:

> ประสิทธิภาพลดลง → คุณภาพสินค้าไม่คงที่ → ค่าไฟเพิ่มขึ้น → อายุการใช้งานลดลง → ค่าบำรุงรักษาเพิ่มขึ้น → ต้นทุนต่อหน่วยสินค้าเพิ่มขึ้น → ความได้เปรียบในการแข่งขันลดลง

สังเกตว่าปลายทางของลูกโซ่ไม่ได้จบที่ "ค่าซ่อม" แต่ไปจบที่ **ความสามารถในการแข่งขันของธุรกิจคุณ** — เพราะคู่แข่งที่ดูแลห้องเย็นดีกว่า มีต้นทุนต่อหน่วยต่ำกว่า และคุมคุณภาพสินค้าได้นิ่งกว่า

นี่คือเหตุผลที่การเลือกฉนวนให้ถูก ออกแบบเครื่องให้พอดี และวางแผนดูแลรักษาตั้งแต่วันแรก ไม่ใช่ "ค่าใช้จ่าย" แต่คือ **การลงทุนที่คืนทุนทุกเดือนในบิลค่าไฟ**

## ตัวเลขที่ควรถือไปคุยกับทุกเจ้า

งบประมาณเป็นแค่ตัวเลขเดียว สิ่งที่กำหนดว่าห้องเย็นจะ "ตรงงาน" หรือไม่ คือ **ประสบการณ์และความเข้าใจของผู้ออกแบบ** ในการเลือกขนาดเครื่อง ขนาดห้อง และอุปกรณ์ให้เหมาะกับการใช้งานแต่ละแบบ — ห้องปฏิบัติการทางเคมี ห้องทดสอบ ห้องผลิตเชิงอุตสาหกรรม ห้องเก็บวัตถุดิบ ห้องเก็บรักษาผลิตภัณฑ์ หรือ Cold chain docking ล้วนมีตรรกะการออกแบบต่างกัน ผู้ออกแบบที่ดีจะถามคำถามให้ครบก่อนเสนอราคา ไม่ใช่ถามแค่ "เอากี่ตารางเมตร"

เตรียมคำตอบเหล่านี้ไว้ แล้วคุณจะเทียบทุกเจ้าได้บนมาตรฐานเดียวกัน:

1. สินค้าที่เก็บ + อุณหภูมิเป้าหมาย
2. เป็นห้อง "เก็บรักษา" หรือ "ดึงอุณหภูมิลง"
3. ปริมาณของเข้า-ออกต่อวัน + อุณหภูมิสินค้าตอนเข้า
4. มีฟอร์กลิฟต์/คน/การแปรรูปในห้องไหม
5. ขนาดพื้นที่ตัวห้อง + พื้นที่วางชุดเครื่อง
6. สภาพพื้น (รับน้ำหนักไหว / ในร่มหรือกลางแจ้ง)
7. ระบบไฟที่มี (380V 3 เฟสหรือยัง / โหลดเหลือเท่าไหร่)
8. ต้องผ่านมาตรฐานอะไรไหม (อย. / GMP / ร.ง.4)
9. แผนการดูแลหลังการขายที่ต้องการ

ถ้ายังตอบไม่ครบทุกข้อ นั่นคือสัญญาณว่าควรคุยกับวิศวกรก่อนตัดสินใจ — ทีม THERMO ช่วยคิดตั้งแต่ก่อนคุณเซ็นได้

## คำถามที่พบบ่อย

**ห้องเย็นใช้ไฟแบบไหน 220V ได้ไหม?**
ระบบทำความเย็นแนะนำไฟ 380V 3 เฟส เพราะกินกระแสสูง ไฟบ้าน 220V 1 เฟสมักไม่พอและเสี่ยงไฟตก-ไฟกระชากกระทบเครื่องจักรอื่น ควรเคลียร์เรื่องไฟก่อนออกแบบ

**ฉนวนห้องเย็นควรหนาเท่าไหร่?**
ขึ้นกับอุณหภูมิและชนิดฉนวน เช่น ห้องแช่แข็ง −25 °C ใช้ PU ราว 100 มม. แต่ถ้าเป็น PS ต้องหนาถึง 200 มม. (ดูตารางเทียบด้านบน)

**ฉนวน PU กับ PS ต่างกันยังไง?**
ที่อุณหภูมิเดียวกัน PU (และ PIR) ใช้ความหนาประมาณครึ่งเดียวของ PS จึงประหยัดพื้นที่ผนังและเก็บความเย็นได้ดีกว่าต่อความหนา

**ห้องเย็นแบบไหนต้องขอ ร.ง.4?**
ขึ้นกับกำลังเครื่องจักรรวมและลักษณะการเข้าข่ายเป็นโรงงานตามกฎหมาย ห้องเย็นเชิงอุตสาหกรรมหลายกรณีเข้าข่ายต้องขออนุญาต อ่านรายละเอียดได้ในบทความ [ห้องเย็นแบบไหนต้องขอ ร.ง.4](/knowledge/rg4-license)

**สร้างห้องเย็นใช้เวลานานไหม?**
ขึ้นกับขนาดและความซับซ้อนของงาน ตั้งแต่ประมาณ 30 วันสำหรับงานเล็ก ไปจนถึงราว 180 วันสำหรับงานใหญ่ที่ซับซ้อน จุดที่เราภูมิใจคือตลอดที่ผ่านมา THERMO ยังไม่เคยส่งมอบงานล่าช้าเลยสักโครงการ แม้แต่งานเร่งด่วน

**ต้องดูแลรักษาบ่อยแค่ไหน?**
ห้องเย็นทำงาน 24 ชั่วโมง ควรมี PM สม่ำเสมอเพื่อคุมค่าไฟและยืดอายุระบบ อ่านต่อในบทความ [PM ระบบทำความเย็น ควรตรวจอะไรบ้าง](/knowledge/preventive-maintenance)

## บทความที่เกี่ยวข้อง

- [ห้องเย็นแบบไหนต้องขอ ร.ง.4](/knowledge/rg4-license)
- [ทำไมห้องเย็นต้องใช้ไฟ 380V 3 เฟส](/knowledge/power-3phase)
- [ห้องเย็นมีกี่ประเภท และคุณต้องการแบบไหน](/knowledge/coldroom-types)
- [ออกแบบห้องเย็นให้ผ่าน อย. และ GMP](/knowledge/gmp-fda-coldroom)
- [PM ระบบทำความเย็น ควรตรวจอะไรบ้าง](/knowledge/preventive-maintenance)`,
      en: `Most people open a cold room conversation with a single question: "How much does a cold room cost?"

We get it — it's the easiest question to ask. But it's the wrong one to ask first, because the price of a cold room isn't a starting point you choose. It's the **result** of five decisions made before it. Get these five right and the price settles into place. Get them wrong, and even if you push the quote down, you pay it back later in electricity, repairs, and spoiled product.

Since 1987, THERMO has designed and installed more than 2,000 cold room projects — from international cargo cold storage at Suvarnabhumi, to the back-of-house rooms in over 200 KFC branches nationwide, to fresh-durian storage in Chanthaburi and humidity-controlled rooms on a battery production line. What we see again and again is this: **the projects that end well and the ones that get reworked later split apart in the very first conversation — not on price.**

This article isn't the usual "what to prepare" checklist. It shows where each decision actually drives your cost, and what really happens when you get it wrong.

## Five Decisions That Determine Whether It's Worth It

### 1. Product and How the Room Is Used

**What it is:** Does your room simply "hold" product that's already cold, or does it need to "pull down" the temperature of warm product just coming in? And what happens inside — do forklifts drive in, is there processing or packing, how often do people come and go?

**Why it drives cost:** These two jobs need very different equipment sizes. Pure storage is a relatively steady load, but pulling down fresh product means constantly adding a large heat load — the equipment has to be several times larger to keep the temperature from bouncing. Every forklift, every person, every door opening is heat the system has to remove.

**The working rule:** Decide from day one whether it's a storage room or a process room, because that sets the entire design logic — not just a small tweak to the numbers.

**If you get it wrong:** Designed as storage but used to pull down fresh product all day → undersized equipment that never stops running, never reaches target temperature, spoils product, and fails early from working at 100% all the time.

**From the field:** Fresh durian in Chanthaburi (incoming batches that must be held rock-steady) and raw-material storage in an electronics plant use completely different design logic — even though both look like "a cold room" from the outside.

### 2. Volume, Turnover, and How Goods Are Stored

**What it is:** Not just "how many square metres," but **how much goes in and out per day, in what condition, and how it's stored and moved inside the room.**

**Why it drives cost:** Two identically sized rooms differ hugely if one has fast turnover (frequent door openings, constant new product). Rooms in a production line — where new product flows in nonstop — carry a far higher cooling load than a stock room whose door stays shut all day. And in large warehouses, *how* you store matters as much as *how much* — rack design and type, space for material-handling equipment, and door size and type all decide how efficiently you use the cold space and how much cold you throw away every time a door opens.

**The working rule:** Size from the daily in/out rate and the temperature of product on arrival, not just room volume. For warehouses, design the racking (type and layout — e.g. Selective / Drive-in based on pick frequency), forklift aisles, and door position/size/type together from the start, because they're all linked: racking sets the room layout, layout sets the forklift routes, routes set the door positions, and door type sets how much cold is lost.

**If you get it wrong:** Plan only for room size and ignore turnover and storage → equipment can't handle the real peak-hour load and temperature swings, or you end up with a room where forklifts can't turn once the racks are in, forcing a layout redo after the room is already built.

**From the field:** In a cold storage warehouse, the things to design together from the start are rack type versus pick frequency, safe working aisles for forklifts, and — for doors that open and close constantly — high-speed doors to cut cold loss (THERMO offers high-speed doors specifically for this). Get these placed wrong at the start and fixing them later is expensive and ripples through the whole system.

### 3. Space — Think Both "Inside" and "Outside" the Room

**What it is:** A cold room's space comes in two parts that must be designed separately. Customers usually think of the first and forget the second.

**Why it drives cost:** The two parts drive different costs — the floor inside drives "long-term repair cost" (if it fails you have to take the room out of service while it's full), while the outdoor space for heat rejection drives "monthly electricity cost and equipment life." Both are money you pay across the room's whole life, not just on installation day.

**Part 1 — Inside the room (the room and its floor):** The floor must be level, non-settling, free of standing water, and able to bear the product plus forklift load. The insulated floor and its finishing are designed differently by application — a very low-temperature, high-traffic warehouse needs insulation laid first, then topped with concrete of a strength rating specific to cold rooms, thick enough to carry product and forklifts; a small room with only light foot traffic may need just a prefab insulated floor with an anti-slip finish. Over-spec it and you waste budget; under-spec it and the floor fails early. **If you get it wrong:** the floor can't take the traffic, the concrete cracks and settles, and you eventually close the room to repair the floor with product still inside.

**Part 2 — Outside the room (space for the unit and heat rejection):** The condensing unit needs a solid base, good heat rejection, easy service access, and it shouldn't sit too far from the room (the farther away, the longer the pipe runs, the lower the efficiency, the higher the install cost). Where an outdoor location is unavoidable, you need a roof so the sun doesn't hit the unit and insulation directly. **If you get it wrong:** put the unit where heat can't escape and it works harder than needed, uses more power, and dies sooner.

### 4. Power Supply Size

**What it is:** Refrigeration systems should run on **380V three-phase**, not household 220V single-phase.

**Why it drives cost:** Refrigeration draws far more current than ordinary appliances. Three-phase supplies the load steadily and more economically. If the supply is inadequate, it doesn't just "fail to start" — it drags voltage down and causes sags and surges that hit other machines across the whole plant.

**The working rule:** Clear the electrical load **before** design, not when you're about to switch on. If the available supply isn't enough, budget for expanding the supply/transformer from the start.

**If you get it wrong:** Discover at start-up that power is insufficient → replan, rewire, or wait for a supply upgrade — delaying the job by months and blowing the budget.

**From the field:** Read the deep dive in [Why Cold Rooms Need 380V Three-Phase Power](/knowledge/power-3phase).

### 5. The Team and After-Sales Care

**What it is:** A cold room isn't "buy it and you're done." It's a machine that has to run 24 hours a day, every day, without stopping.

**Why it drives cost:** This is the most overlooked part — and the one that costs the most over the room's life (see "The Real 10-Year Cost" below). Regular, correct maintenance extends the system's life, saves electricity, and extends parts life all at once.

**The working rule:** Before you sign, ask three clear questions — *Who maintains it? How fast do they respond when something fails? Will parts still be available 5-10 years from now?* "We include PM" means different things to different vendors.

**If you get it wrong:** A cheap room from a vendor who vanishes after installation → the equipment fails at 2 a.m. and no one answers, with a full room of product on the line.

**From the field:** Read how PM that's "actually delivered" differs from PM that's merely "claimed" in [What a Refrigeration PM Should Actually Check](/knowledge/preventive-maintenance).

## Specification Reference Tables

### Insulation Thickness by Operating Temperature — PS vs PU/PIR

Insulation is the heart of a cold room, and **the type matters as much as the thickness.** These are the values THERMO actually uses.

**PS — Polystyrene**

| Panel thickness | Temperature it can hold |
|---|---|
| 2″ (50 mm) | +25 °C |
| 3″ (75 mm) | +15 °C |
| 4″ (100 mm) | +10 °C |
| 5″ (125 mm) | 0 °C |
| 6″ (150 mm) | −10 °C |
| 7″ (175 mm) | −20 °C |
| 8″ (200 mm) | −25 °C |
| 9″ (225 mm) | −30 °C |
| 10″ (250 mm) | −40 °C |
| 12″ (300 mm) | −50 °C |

**PU — Polyurethane** (PIR uses the same values, since its base material is the same as PU)

| Panel thickness | Temperature it can hold |
|---|---|
| 2″ (50 mm) | +5 °C |
| 3″ (75 mm) | −10 °C |
| 4″ (100 mm) | −25 °C |
| 5″ (120 mm) | −35 °C |
| 6″ (150 mm) | −45 °C |

**How to read this — the part competitors skip:** At the same temperature, PU needs only about **half** the thickness of PS. At −10 °C, PS needs 150 mm but PU only 75 mm. At −25 °C, PS needs 200 mm but PU only 100 mm. So a PS panel that looks "thicker" doesn't automatically insulate better. Choosing the insulation type to suit the temperature and the wall space you have is an engineering decision — not just "go with whatever's thickest."

### Room Type Reference

(Thicknesses are approximate; adjust to the actual job.)

| Room type | Temperature range | Example use | PS | PU / PIR |
|---|---|---|---|---|
| Laboratory / test room | +12 ~ +15 °C | Chemical labs, test rooms | ~75 mm | ~50 mm |
| Cold chain / docking | 0 ~ +5 °C | Distribution centres, loading points | 100 mm | 75–100 mm |
| Chill room | −10 ~ +10 °C | Vegetables, fruit, products | 75–125 mm | 75 mm |
| Freezer | −30 ~ −18 °C | Meat, frozen food | 200 mm | 100–125 mm |
| Blast freezer | −35 ~ −45 °C | Rapid product chilling | 250 mm | 120–150 mm |

## Heaters in a Freezer — Something Competitors Rarely Mention

Below freezing, moisture from the outside air turns to ice at every point where the cold meets that moisture. If a heater system isn't designed in from the start, ice slowly builds until the floor heaves, the door stops sealing, or ice locks the door shut — problems that don't show up on handover day but appear a few months into use.

So heaters aren't an optional add-on you "just throw in" — where to place them, at what wattage, and how to control them is an engineering decision. THERMO designs for four key points:

- **Floor heater** — prevents the ground and slab under the freezer from freezing and heaving (frost heave), which lifts or cracks the floor. Critical in low-temperature rooms in continuous use.
- **Door-sill heater** — prevents ice at the sill that stops the door sealing (and once it doesn't seal, more moisture gets in and more ice forms — a loop that never ends).
- **Door-frame heater** — prevents ice on the frame edges that locks the door to its frame.
- **Door-panel heater** — prevents ice on the panel edges and the rubber gasket, keeping the door opening smoothly and the gasket from tearing.

The core of the design is matching wattage and position to the room temperature and how often the door opens — too much wastes power, too little won't hold back the ice. These details are invisible on a quote, but they're what separates a freezer that lasts from one with ice problems within months.

## The Real 10-Year Cost

The price you pay on installation day is the **smallest** part of a cold room's lifetime cost. The big money is the electricity and upkeep you pay out over the next ten years — and it links into a chain scarier than it first looks. When maintenance is neglected, the chain reaction starts immediately:

> Efficiency drops → product quality becomes inconsistent → electricity cost rises → equipment life shortens → maintenance cost rises → cost per unit of product rises → competitiveness falls

Notice the chain doesn't end at "repair cost" — it ends at **your business's ability to compete**, because a competitor who maintains their cold room better has a lower cost per unit and steadier product quality.

That's why choosing the right insulation, sizing the equipment correctly, and planning maintenance from day one aren't "expenses" — they're **an investment that pays back every month on the electricity bill.**

## The Numbers to Bring to Every Vendor

Budget is just one number. What determines whether a cold room actually "fits the job" is the **experience and understanding of the designer** in matching equipment size, room size, and components to each type of use — chemical labs, test rooms, industrial production rooms, raw-material storage, product storage, or cold chain docking all follow different design logic. A good designer asks the full set of questions before quoting, not just "how many square metres?"

Prepare answers to these, and you can compare every vendor on the same standard:

1. Product stored + target temperature
2. "Storage" room or "pull-down" room
3. Daily in/out volume + product temperature on arrival
4. Forklifts / people / processing inside the room?
5. Room footprint + condensing unit space
6. Floor condition (load-bearing? indoor or outdoor?)
7. Available power (380V three-phase already? spare load?)
8. Any standards to meet (FDA / GMP / factory licence)
9. The after-sales care you want

If you can't answer all of them yet, that's the signal to talk to an engineer before deciding — THERMO's team helps you think it through before you sign.

## Frequently Asked Questions

**What power does a cold room need — is 220V enough?**
Refrigeration systems should run on 380V three-phase because they draw high current. Household 220V single-phase is usually insufficient and risks sags and surges that affect other machines. Clear the power question before design.

**How thick should cold room insulation be?**
It depends on temperature and insulation type. For example, a −25 °C freezer uses about 100 mm of PU — but 200 mm if it's PS (see the comparison table above).

**How do PU and PS differ?**
At the same temperature, PU (and PIR) need about half the thickness of PS, saving wall space and insulating better per unit of thickness.

**Which cold rooms need a factory licence (Ror.Ngor.4)?**
It depends on total equipment power and whether the operation qualifies as a factory under the law; many industrial cold rooms do require a licence. Read the details in [Which Cold Rooms Need a Ror.Ngor.4 Licence](/knowledge/rg4-license).

**How long does it take to build a cold room?**
It depends on the size and complexity of the job — from around 30 days for small jobs to about 180 days for large, complex ones. What we're proud of: across everything we've done, THERMO has never delivered a project late — not even the rush jobs.

**How often does it need maintenance?**
A cold room runs 24 hours a day, so it needs regular PM to control electricity cost and extend system life. Read more in [What a Refrigeration PM Should Actually Check](/knowledge/preventive-maintenance).

## Related Articles

- [Which Cold Rooms Need a Ror.Ngor.4 Licence](/knowledge/rg4-license)
- [Why Cold Rooms Need 380V Three-Phase Power](/knowledge/power-3phase)
- [How Many Types of Cold Room Are There, and Which One Do You Need](/knowledge/coldroom-types)
- [Designing a Cold Room to Pass FDA and GMP](/knowledge/gmp-fda-coldroom)
- [What a Refrigeration PM Should Actually Check](/knowledge/preventive-maintenance)`
    },
    excerpt: {
      th: "ลูกค้าส่วนใหญ่เริ่มต้นด้วยคำถามว่า \"ห้องเย็นกี่บาท\" แต่คำถามที่ควรถามก่อนคือ 5 ข้อนี้ — เตรียมคำตอบไว้ แล้วคุณจะได้ห้องเย็นที่ตรงงานจริง ไม่ใช่ห้องที่ถูกที่สุด",
      en: "Most customers open with \"how much for a cold room?\" But these five questions come first. Answer them, and you get a cold room that fits the job — not just the cheapest quote."
    },
    body: {
      th: [
        "ตั้งแต่ปี 1987 THERMO ออกแบบและติดตั้งห้องเย็นมาแล้วกว่า 2,000 โครงการ ตั้งแต่คลังสินค้าระหว่างประเทศของการบินไทยที่สุวรรณภูมิ ไปจนถึงห้องเย็นหลังร้าน KFC กว่า 200 สาขาทั่วประเทศ เราพบว่าโครงการที่จบสวยกับโครงการที่ต้องมาแก้ทีหลัง ต่างกันตั้งแต่บทสนทนาแรก ไม่ใช่ที่ราคา",
        "ห้องเย็นที่ \"ถูก\" แต่เครื่องเล็กไป จะวิ่งไม่หยุด กินไฟกว่า และพังเร็วกว่า ส่วนห้องที่ \"เผื่อไว้เยอะ\" ก็จ่ายค่าเครื่องเกินจำเป็นตั้งแต่วันแรก จุดที่คุ้มที่สุดอยู่ตรงกลาง และมันคำนวณได้ — ถ้ามีข้อมูล 5 อย่างนี้",
        "1. ลักษณะการใช้งานและประเภทสินค้า: สินค้าแต่ละแบบต้องการไม่เหมือนกัน เก็บรักษาเฉยๆ กับลดอุณหภูมิสินค้าที่เพิ่งเข้ามา ใช้เครื่องคนละขนาดกันมาก และต้องบอกด้วยว่ามีฟอร์กลิฟต์วิ่งเข้าไปในห้องไหม มีการแปรรูปในห้องไหม แพ็กเกจสินค้าเป็นแบบไหน — ทุเรียนสดที่จันทบุรีกับ Raw Material ในโรงงานอิเล็กทรอนิกส์ ใช้ตรรกะการออกแบบคนละชุด",
        "2. ปริมาณสินค้าที่ต้องเก็บ: ไม่ใช่แค่ \"ห้องกี่ตารางเมตร\" แต่คือของเข้าออกวันละเท่าไหร่ ปริมาณและชนิดของสินค้ามีผลกับขนาดเครื่องทำความเย็นอย่างมาก โดยเฉพาะห้องเย็นที่อยู่ในกระบวนการผลิต ซึ่งของเข้าใหม่ตลอดเวลา",
        "3. พื้นที่ที่จะสร้าง — มี 2 ส่วน อย่าลืมส่วนที่สอง: ส่วนแรกคือพื้นที่ตัวห้อง ต้องเรียบ ไม่ทรุด ไม่ขังน้ำ รับน้ำหนักสินค้าไหว ถ้าเลี่ยงกลางแจ้งไม่ได้ต้องมีหลังคากันความร้อนกระทบฉนวนโดยตรง ส่วนที่สองที่ลูกค้ามักลืมคือพื้นที่ติดตั้งเครื่องทำความเย็น ต้องฐานมั่นคง ระบายความร้อนได้ เข้าถึงง่ายเวลาเข้าซ่อม และไม่ควรอยู่ไกลจากตัวห้องเกินไป",
        "4. ขนาดแหล่งไฟฟ้า: ระบบทำความเย็นแนะนำให้ใช้ไฟ 380 โวลท์ 3 เฟส ไม่ใช่ 220 โวลท์ 1 เฟสแบบบ้าน เพราะเครื่องทำความเย็นกินกระแสสูงกว่ามาก ถ้าไฟไม่พอ นอกจากจะรับภาระไม่ไหว ยังทำให้เกิดไฟตกไฟกระชากกระทบเครื่องใช้ไฟฟ้าตัวอื่นในโรงงานด้วย ข้อนี้ต้องเคลียร์ตั้งแต่ก่อนออกแบบ ไม่ใช่มารู้ตอนจะเปิดเครื่อง",
        "5. ทีมงานและบริการหลังการขาย: ห้องเย็นไม่ใช่ของที่ซื้อแล้วจบ มันคือเครื่องจักรที่ต้องวิ่ง 24 ชั่วโมง การดูแลอย่างสม่ำเสมอและถูกวิธียืดอายุระบบ ประหยัดค่าไฟ และยืดอายุอะไหล่ในระบบไปพร้อมกัน ก่อนเซ็น ควรถามให้ชัดว่าใครมาดูแล เร็วแค่ไหน และอะไหล่หาได้จริงไหม",
        "ถ้าเตรียมคำตอบ 5 ข้อนี้ไว้ก่อนคุยกับผู้ออกแบบ คุณจะได้ห้องเย็นที่เหมาะกับงานของคุณจริงๆ และคุ้มที่สุดในระยะยาว — ไม่ใช่แค่ถูกที่สุดในใบเสนอราคา หากยังไม่แน่ใจข้อไหน โทรคุยกับทีมวิศวกรของ THERMO ได้เลย เราช่วยคิดตั้งแต่ก่อนคุณตัดสินใจ"
      ],
      en: [
        "Since 1987, across more than 2,000 projects — from Thai Airways' international cargo cold rooms at Suvarnabhumi to the back-of-house rooms in over 200 KFC branches nationwide — THERMO has learned that the projects which end well are separated from the ones that get reworked in the very first conversation. Not by price.",
        "A \"cheap\" room with an undersized unit never stops running: it burns more electricity and fails sooner. An over-specified room means you pay for capacity you never use from day one. The sweet spot sits between them, and it can be calculated — if you have these five pieces of information.",
        "1. How it will be used and what goes inside: Storage-only and pull-down of freshly arrived product require very different capacity. Tell your designer whether forklifts will enter the room, whether processing happens inside, and how the product is packaged. Fresh durian in Chanthaburi and raw material in an electronics plant follow completely different design logic.",
        "2. Volume of product: Not just \"how many square metres\" but how much moves in and out per day. Product type and throughput drive compressor sizing heavily — especially for rooms inside a production process, where new load arrives continuously.",
        "3. The site — there are two areas, and people forget the second: First, the room itself needs a level, non-settling, well-drained slab that carries the product load. If outdoors is unavoidable, you need a roof so heat doesn't hit the insulation directly. Second — the one clients forget — is where the refrigeration unit goes: solid footing, room to reject heat, easy service access, and not too far from the room it serves.",
        "4. Electrical supply: Refrigeration systems should run on 380V three-phase, not the 220V single-phase used in homes. Cooling equipment draws far more current, and an inadequate supply doesn't just fail to carry the load — it causes voltage sags and surges that hit other equipment in your plant. Settle this before design, not on commissioning day.",
        "5. The team and after-sales service: A cold room isn't a purchase, it's machinery that runs around the clock. Correct, regular maintenance extends system life, lowers your power bill, and prolongs component life at the same time. Before signing, ask exactly who services it, how fast they arrive, and whether spare parts are genuinely available.",
        "Bring answers to these five questions to your designer and you'll get a cold room that fits your operation and pays back over its life — not merely the lowest number on a quotation. Unsure about any of them? Talk to THERMO's engineers. We help you think it through before you commit."
      ]
    },
    datePublishedISO: "2026-07-10",
    dateModifiedISO: "2026-08-05"
  },
  {
    id: "coldroom-types",
    title: {
      th: "ห้องเย็นมีกี่ประเภท และคุณต้องการแบบไหนกันแน่",
      en: "Types of Cold Rooms — And Which One You Actually Need"
    },
    date: {
      th: "3 ก.ค. 2569",
      en: "July 3, 2026"
    },
    category: {
      th: "พื้นฐานที่ควรรู้",
      en: "Fundamentals"
    },
    image: "article-02.jpg",
    excerpt: {
      th: "Freezer, Chill Room, Air Blast, Mobile Cold Room, ห้องปฏิบัติการ — ชื่อคล้ายกันแต่คนละงาน เลือกผิดประเภทตั้งแต่ต้น แก้ทีหลังแพงกว่าทำใหม่",
      en: "Freezer, chill room, air blast, mobile cold room, laboratory room — similar names, different jobs. Choosing the wrong type at the start costs more to fix than to rebuild."
    },
    body: {
      th: [
        "คำว่า \"ห้องเย็น\" ครอบคลุมงานที่ต่างกันมากจนบางครั้งลูกค้าสองรายพูดคำเดียวกัน แต่หมายถึงคนละอย่างสิ้นเชิง การรู้ว่าคุณต้องการประเภทไหนก่อนขอราคา ช่วยประหยัดทั้งเงินและเวลาได้มาก",
        "ห้องแช่แข็ง (Freezer): ช่วงอุณหภูมิต่ำ ส่วนมากตั้งแต่ -15 ถึง -25°C ลงไป ใช้เก็บรักษาคุณภาพสินค้าระยะยาว เป็นประเภทที่คนนึกถึงเป็นอันดับแรกเวลาพูดถึงห้องเย็น",
        "Chill Room: ช่วง -5 ถึง +8°C เป็นช่วงที่ใช้แพร่หลายที่สุดในเกือบทุกอุตสาหกรรม ทั้งวัตถุดิบอาหารและเครื่องดื่ม ยาและสมุนไพร ไปจนถึงไมโครโปรเซสเซอร์ ถ้าไม่แน่ใจว่าต้องการอะไร โอกาสสูงที่คำตอบคือห้องนี้",
        "Air Blast (Blast Chiller / Blast Freezer): จุดสำคัญคือมันไม่ใช่ \"ห้องเก็บ\" แต่เป็น \"กระบวนการ\" — ลดอุณหภูมิสินค้าลงอย่างรวดเร็วถึงอุณหภูมิเป้าหมายภายในเวลาที่กำหนด เพื่อรักษาคุณภาพให้ใกล้เคียงของสดที่สุด ด้วยเหตุนี้เครื่องทำความเย็นจึงใหญ่กว่าห้องเย็นสองประเภทแรกพอสมควร ใครที่คิดว่า \"ก็เอาห้องแช่แข็งธรรมดามาแช่ให้เร็วขึ้นสิ\" มักจะได้ผลลัพธ์ที่ไม่ตรงตามต้องการ",
        "Mobile Cold Room: ห้องเย็นสำเร็จรูปขนาดเล็ก ประกอบบน chassis พร้อมเครื่องทำความเย็นยึดติดมาด้วย ยกเคลื่อนย้ายได้ เหมาะกับสินค้าปริมาณไม่มาก เพราะข้อจำกัดเรื่องขนาด",
        "ห้องปฏิบัติการ: อุณหภูมิสูงกว่ากลุ่มอื่น อยู่ในช่วง +8 ถึง +15°C เพื่อจำกัดการเจริญเติบโตของเชื้อ หรือชะลอการเสื่อมคุณภาพก่อนนำสินค้าไปแช่แข็งหรือเข้าห้องเย็นต่อ — THERMO เคยออกแบบห้องกลุ่มนี้ให้ทั้งศูนย์นวัตกรรมอาหารของจุฬาลงกรณ์มหาวิทยาลัย และสถาบันวิจัยวิทยาศาสตร์และเทคโนโลยีแห่งประเทศไทย",
        "นอกจากอุณหภูมิแล้ว ยังมีคำถามที่ต้องตอบคู่กันเสมอ: จำเป็นต้องควบคุมความชื้นด้วยหรือไม่ และเพื่ออะไร งานอย่างห้องเก็บสินค้าเกษตร ห้องเก็บ Dairy Product หรือพื้นที่ผลิตไส้แบตเตอรี่ของ GS Yuasa ควบคุมแค่อุณหภูมิไม่พอ ความชื้นคือตัวแปรที่ชี้ผลลัพธ์",
        "ยังไม่แน่ใจว่าจะเข้าข่ายไหน? บอกเราแค่ว่าเก็บอะไร ปริมาณเท่าไหร่ และต้องการผลลัพธ์แบบไหน ทีม THERMO ช่วยจับคู่ให้ได้ — เราออกแบบมาแล้วเกือบทุกประเภทที่กล่าวมา"
      ],
      en: [
        "The phrase \"cold room\" covers such different jobs that two clients can say the same words and mean completely different things. Knowing which type you need before requesting a quote saves real money and time.",
        "Freezer: Low temperature, typically -15 to -25°C and below, used for long-term preservation of product quality. This is what most people picture first when they hear \"cold room\".",
        "Chill Room: -5 to +8°C — the most widely used range across nearly every industry: food and beverage raw materials, pharmaceuticals and herbs, even microprocessors. If you're unsure what you need, chances are good this is the answer.",
        "Air Blast (Blast Chiller / Blast Freezer): The key point is that this isn't a storage room — it's a process. It pulls product temperature down rapidly to a target within a defined window, preserving quality as close to fresh as possible. Because of that, the refrigeration plant is considerably larger than the two types above. Anyone thinking \"we'll just freeze it faster in a normal freezer\" rarely gets the result they wanted.",
        "Mobile Cold Room: A compact prefabricated room built on a chassis with the refrigeration unit mounted to it, so the whole thing can be lifted and moved. Suited to modest volumes, given the size constraint.",
        "Laboratory Room: Warmer than the others, +8 to +15°C, used to limit microbial growth or slow quality loss before product moves on to freezing or cold storage. THERMO has designed rooms in this class for Chulalongkorn University's food innovation centre and for the Thailand Institute of Scientific and Technological Research.",
        "Beyond temperature, one question always travels with it: does humidity need controlling, and why? For agricultural storage, dairy product rooms, or GS Yuasa's battery-core production area, controlling temperature alone isn't enough — humidity is the variable that decides the outcome.",
        "Still not sure which category you fall into? Just tell us what you're storing, how much, and what outcome you need. THERMO's team can match it — we've designed nearly every type listed above."
      ]
    },
    datePublishedISO: "2026-07-03",
    dateModifiedISO: "2026-07-03"
  },
  {
    id: "rg4-license",
    title: {
      th: "ห้องเย็นแบบไหนต้องขอ ร.ง.4 — เช็คก่อนสร้าง ไม่งั้นสร้างไม่ได้",
      en: "Which Cold Rooms Need a Ror.Ngor.4 Licence — Check Before You Build"
    },
    date: {
      th: "26 มิ.ย. 2569",
      en: "June 26, 2026"
    },
    category: {
      th: "กฎหมายและมาตรฐาน",
      en: "Regulatory"
    },
    image: "article-03.jpg",
    excerpt: {
      th: "เกิน 50 แรงม้าเมื่อไหร่ ห้องเย็นของคุณกลายเป็นโรงงานจำพวกที่ 3 ทันที และต้องได้ใบอนุญาตก่อนเริ่มก่อสร้าง — ไม่ใช่หลังสร้างเสร็จ",
      en: "Cross 50 horsepower and your cold room legally becomes a Category 3 factory, requiring a licence before construction starts — not after it finishes."
    },
    body: {
      th: [
        "นี่คือเรื่องที่ผู้ประกอบการจำนวนมากมารู้ตอนสายเกินไป และเป็นเหตุผลหนึ่งที่ THERMO ถามเรื่องขนาดเครื่องตั้งแต่บทสนทนาแรก ไม่ใช่เพราะอยากขายเครื่องใหญ่ แต่เพราะมันมีผลทางกฎหมายโดยตรง",
        "ตาม พ.ร.บ. โรงงานฯ คำว่า \"โรงงาน\" หมายถึงอาคารหรือสถานที่ที่มีเครื่องจักรตั้งแต่ 50 แรงม้าขึ้นไป หรือมีคนงานตั้งแต่ 50 คนขึ้นไป โดยใช้เกณฑ์ใดเกณฑ์หนึ่ง — ไม่ต้องเข้าทั้งสองข้อ",
        "สำหรับห้องเย็น (Cold Storage) การนับแรงม้าไม่ได้นับแค่คอมเพรสเซอร์ แต่นับกำลังของเครื่องจักรในระบบทำความเย็นทั้งหมดรวมกัน ทั้งคอมเพรสเซอร์ พัดลมคอนเดนเซอร์ และพัดลมอีวาปอเรเตอร์ ตรงนี้คือจุดที่คนคำนวณพลาดบ่อยที่สุด เพราะมองแค่ตัวเลขบนคอมเพรสเซอร์แล้วคิดว่ายังไม่ถึงเกณฑ์",
        "ถ้ารวมแล้วเกิน 50 แรงม้า ห้องเย็นของคุณเข้าข่าย \"โรงงานจำพวกที่ 3\" ซึ่งต้องได้รับใบอนุญาตประกอบกิจการโรงงาน (ร.ง. 4) ก่อน จึงจะเริ่มก่อสร้างและดำเนินการได้",
        "ลำดับของคำว่า \"ก่อน\" สำคัญมาก มันไม่ใช่เอกสารที่ไปตามเก็บทีหลังได้ ถ้าสร้างไปแล้วค่อยรู้ ทางเลือกที่เหลือมักไม่สวยเลยสักทาง",
        "ประเด็นนี้ไม่ได้แปลว่าห้องเย็นใหญ่เป็นเรื่องยุ่งยากที่ควรเลี่ยง หลายโครงการที่ THERMO ทำ ทั้งคลังสินค้าระหว่างประเทศ ห้องเย็นโรงงานแปรรูป และศูนย์ฉายรังสี ล้วนอยู่ในเกณฑ์นี้และผ่านมาได้ตามปกติ แค่ต้องรู้ตั้งแต่ต้นและวางแผนไว้ในไทม์ไลน์",
        "ที่ต้องระวังจริงๆ คือกรณีที่ตั้งใจทำห้องขนาดกลาง แล้วกำลังรวมของระบบดันไปแตะเกณฑ์พอดีโดยไม่ทันตั้งตัว การออกแบบที่รู้เกณฑ์นี้อยู่แล้วจะช่วยให้คุณเห็นภาพตั้งแต่ก่อนตัดสินใจ ว่าจะเดินทางไหนคุ้มกว่ากัน",
        "หมายเหตุ: บทความนี้เป็นข้อมูลเบื้องต้นเพื่อให้เห็นภาพ ไม่ใช่คำแนะนำทางกฎหมาย รายละเอียดและการตีความควรตรวจสอบกับกรมโรงงานอุตสาหกรรมหรือที่ปรึกษาของท่านอีกครั้ง หากต้องการให้ทีมวิศวกร THERMO ช่วยประเมินกำลังรวมของระบบในเบื้องต้น ติดต่อเราได้เลย"
      ],
      en: [
        "This is the one many operators discover too late, and it's why THERMO asks about equipment sizing in the very first conversation — not to sell you a bigger plant, but because it carries direct legal consequences.",
        "Under Thailand's Factory Act, a \"factory\" means any building or premises with machinery of 50 horsepower or more, or with 50 or more workers. Either criterion alone is enough — you don't need both.",
        "For cold storage, the horsepower count isn't just the compressor. It's the combined rating of all machinery in the refrigeration system: compressors, condenser fans, and evaporator fans together. This is where the calculation most often goes wrong, because people look only at the compressor nameplate and assume they're under the line.",
        "If the combined total exceeds 50 horsepower, your cold room falls under \"Category 3 factory\" and requires a factory operating licence (Ror.Ngor.4) before construction and operation may begin.",
        "That word \"before\" matters. This isn't paperwork you can pick up afterwards. Discovering it post-construction leaves no attractive options.",
        "None of this means large cold rooms are a headache to be avoided. Many THERMO projects — international cargo warehouses, processing plant rooms, an irradiation centre — sit in this bracket and cleared it routinely. You simply need to know early and build it into the timeline.",
        "The genuine risk is the mid-sized room where the system's combined rating quietly lands on the threshold and nobody notices. Design work that already accounts for this rule lets you see the trade-off before you commit.",
        "Note: This article is general orientation, not legal advice. Verify details and interpretation with the Department of Industrial Works or your own advisers. If you'd like THERMO's engineers to help with a preliminary estimate of your system's combined rating, get in touch."
      ]
    },
    datePublishedISO: "2026-06-26",
    dateModifiedISO: "2026-06-26"
  },
  {
    id: "power-3phase",
    title: {
      th: "ทำไมห้องเย็นต้องใช้ไฟ 380V 3 เฟส — และจะเกิดอะไรถ้าฝืนใช้ 220V",
      en: "Why Cold Rooms Need 380V Three-Phase — And What Happens If You Force 220V"
    },
    date: {
      th: "19 มิ.ย. 2569",
      en: "June 19, 2026"
    },
    category: {
      th: "งานระบบ",
      en: "Systems"
    },
    image: "article-04.jpg",
    excerpt: {
      th: "ไฟตก ไฟกระชาก เครื่องอื่นในโรงงานรวน — อาการเหล่านี้มักไม่ได้มาจากห้องเย็นเสีย แต่มาจากแหล่งไฟที่ไม่ได้เตรียมไว้ตั้งแต่ต้น",
      en: "Voltage sags, surges, other equipment acting up — these usually aren't a broken cold room. They're an electrical supply that was never planned for one."
    },
    body: {
      th: [
        "ในบรรดา 5 ข้อที่ควรเคลียร์ก่อนสร้างห้องเย็น ข้อที่ถูกมองข้ามบ่อยที่สุดคือเรื่องไฟฟ้า เพราะมันไม่ใช่ส่วนที่มองเห็น ลูกค้าเห็นแผ่นฉนวน เห็นประตู เห็นเครื่อง แต่ไม่เห็นระบบไฟจนกระทั่งมันมีปัญหา",
        "คำแนะนำมาตรฐานสำหรับห้องเย็นและระบบทำความเย็นคือ ไฟฟ้าแรงดัน 380 โวลท์ 3 เฟส เหตุผลไม่ใช่เรื่องความชอบทางเทคนิค แต่เป็นเรื่องภาระกระแส",
        "เครื่องทำความเย็นใช้ไฟมากกว่าเครื่องใช้ไฟฟ้าในครัวเรือนที่ใช้แรงดัน 220 โวลท์ 1 เฟส อย่างเทียบกันไม่ได้ ระบบ 1 เฟสจึงไม่สามารถรับภาระกระแสของระบบทำความเย็นขนาดใหญ่ได้เพียงพอ และยังเสี่ยงต่อผลกระทบจากกระแสไฟที่ไม่สม่ำเสมอในระบบ",
        "ไฟ 3 เฟสให้สามอย่างพร้อมกัน หนึ่ง จ่ายกระแสเข้าระบบได้เสถียรกว่า สอง เฉลี่ยภาระความร้อนที่เกิดขึ้นภายในสายไฟและอุปกรณ์ ทำให้ทั้งระบบทำงานเย็นกว่าและอยู่ทน สาม ส่งผลดีกับค่าไฟ",
        "ในทางกลับกัน ถ้าแหล่งไฟไม่พอ อาการที่เจอระหว่างเดินเครื่องคือไฟกระชากและไฟตก ซึ่งไม่ได้กระทบแค่ห้องเย็น แต่กระทบเครื่องใช้ไฟฟ้าตัวอื่นในพื้นที่เดียวกันด้วย และนี่คือสาเหตุที่ทีมช่างมักถูกเรียกไปดูห้องเย็น ทั้งที่ต้นเหตุจริงอยู่ที่ตู้ไฟ",
        "ส่วนเรื่องค่าไฟ ต้องพูดให้ตรง: ค่าไฟขึ้นกับขนาดห้องเย็นและขนาดเครื่องทำความเย็น ชนิดของเครื่องทำความเย็น ลักษณะการติดตั้งและอุปกรณ์ประกอบ เช่น รูปแบบการระบายความร้อน air curtain ม่านพลาสติก หรือ anteroom รวมถึงลักษณะการใช้งานจริงหน้างาน ใครที่ตอบค่าไฟเป็นตัวเลขเป๊ะๆ ให้คุณได้ตั้งแต่ยังไม่รู้ข้อมูลพวกนี้ ควรตั้งคำถามกลับ",
        "ข้อสรุปสั้นๆ: เคลียร์เรื่องแหล่งไฟให้จบตั้งแต่ก่อนออกแบบ ไม่ใช่ตอนจะเปิดเครื่อง THERMO ตรวจสอบและวางแผนส่วนนี้ให้ตั้งแต่ขั้นตอนออกแบบทุกโครงการ เพราะเราไม่อยากกลับไปแก้ และคุณก็ไม่อยากจ่ายสองรอบ"
      ],
      en: [
        "Of the five things to settle before building a cold room, electrical supply is the one most often skipped — because it isn't visible. Clients see the panels, the door, the unit. They don't see the power system until it causes trouble.",
        "The standard recommendation for cold rooms and refrigeration systems is 380V three-phase. That's not a technical preference. It's about current load.",
        "Refrigeration equipment draws incomparably more power than the household appliances that run on 220V single-phase. A single-phase supply simply cannot carry the current demand of a large refrigeration system, and it exposes you to the effects of unstable current in the system.",
        "Three-phase gives you three things at once. It delivers current into the system more stably. It distributes the heat load generated inside cabling and components, so the whole installation runs cooler and lasts longer. And it works out better on your electricity bill.",
        "Conversely, when the supply is inadequate, what you get during operation is surges and voltage sags — affecting not only the cold room but other equipment sharing the area. This is why service teams get called out to \"the cold room\" when the real culprit is at the distribution board.",
        "On running costs, let's be straight: your bill depends on the room size and plant size, the type of refrigeration equipment, the installation and its accessories — heat rejection arrangement, air curtain, strip curtains, anteroom — and how the room is actually used on site. Anyone who quotes you an exact electricity figure before knowing any of that deserves a follow-up question.",
        "Short version: settle the supply before design, not on start-up day. THERMO checks and plans this at the design stage on every project — because we don't want to come back and redo it, and you don't want to pay twice."
      ]
    },
    datePublishedISO: "2026-06-19",
    dateModifiedISO: "2026-06-19"
  },
  {
    id: "chiller-explained",
    title: {
      th: "Chiller คืออะไร และใช้ได้กับงานอะไรบ้างที่คุณอาจนึกไม่ถึง",
      en: "What a Chiller Is — And the Jobs You Might Not Expect It to Do"
    },
    date: {
      th: "12 มิ.ย. 2569",
      en: "June 12, 2026"
    },
    category: {
      th: "เทคโนโลยี",
      en: "Technology"
    },
    image: "article-05.jpg",
    excerpt: {
      th: "จากหล่อเย็นเครื่อง CNC ถึงน้ำเลี้ยงในฟาร์มไฮโดรโปนิก ถึงสายการผลิตไวน์ — Chiller ทำได้มากกว่าที่ชื่อมันบอก เพราะมันไม่ได้ทำความเย็นให้ห้อง แต่ทำน้ำเย็นให้คุณเอาไปใช้ต่อ",
      en: "From cooling CNC machines to nutrient water on a hydroponic farm to a wine production line — a chiller does more than its name suggests, because it doesn't cool a room. It makes chilled water for you to use."
    },
    body: {
      th: [
        "ความต่างที่สำคัญที่สุดระหว่างชิลเลอร์กับระบบห้องเย็นคือ ชิลเลอร์ไม่ได้ทำความเย็นให้พื้นที่โดยตรง แต่ผลิตน้ำเย็นออกมาเป็นตัวกลางในการแลกเปลี่ยนความร้อน แล้วคุณส่งน้ำเย็นนั้นไปใช้ที่ไหนก็ได้",
        "ผลที่ตามมาคือความยืดหยุ่น เพราะไม่มีข้อจำกัดด้านระยะทางในการเดินท่อแบบระบบน้ำยา ชิลเลอร์จึงประยุกต์ใช้ได้หลากหลาย รวมถึงในห้องเย็นบางประเภท ห้องปฏิบัติการ และภายในอาคารขนาดใหญ่",
        "งานที่ THERMO ใช้ชิลเลอร์เป็นคำตอบบ่อยที่สุด ได้แก่ หล่อเย็นเครื่องจักร งาน Molding และ CNC, งานชุบโลหะ, งานผลิตอาหารทั้งการแช่ หมัก และดอง, และงานล้างผลิตภัณฑ์",
        "แต่ที่คนมักนึกไม่ถึงคืองานนอกโรงงาน ตัวอย่างที่เราทำจริง: ระบบ Nutrient Chiller ควบคุมอุณหภูมิน้ำเลี้ยงให้ฟาร์มไฮโดรโปนิก ซึ่งอุณหภูมิน้ำคือตัวแปรที่ชี้ผลผลิตโดยตรง และระบบ Chiller line สำหรับสายการผลิตไวน์ของ Gran Monte ที่นครราชสีมา งานสองประเภทนี้ไม่มีคำว่า \"ห้องเย็น\" อยู่ในโจทย์เลย แต่หัวใจคือการควบคุมอุณหภูมิของของเหลว",
        "จุดที่ต้องเข้าใจก่อนตัดสินใจ: ส่วนประกอบของระบบชิลเลอร์ไม่เหมือนระบบทำความเย็นสำหรับห้องเย็นเสียทีเดียว เพราะมีงานส่วนของระบบลำเลียงน้ำเย็นเพิ่มเข้ามาด้วย ทั้งระบบท่อ ปั๊ม ระบบกรองและปรับสภาพน้ำ และวาล์วต่างๆ",
        "แปลว่าการเปรียบเทียบราคาชิลเลอร์กับห้องเย็นแบบตัวต่อตัวไม่สมเหตุสมผล มันเป็นคนละระบบที่ตอบโจทย์คนละแบบ และงานฝั่งน้ำที่ตามมาก็เป็นส่วนหนึ่งของโครงการที่ต้องนับด้วย",
        "ชิลเลอร์แบ่งเป็นระบายความร้อนด้วยอากาศ (Air-cooled) และด้วยน้ำ (Water-cooled) ซึ่ง THERMO ทำทั้งสองแบบ การเลือกขึ้นกับพื้นที่ ปริมาณโหลด และเงื่อนไขหน้างาน",
        "ถ้าโจทย์ของคุณคือ \"ต้องทำให้ของเหลวหรือกระบวนการนี้เย็นลง\" มากกว่า \"ต้องทำให้ห้องนี้เย็น\" — นั่นคือสัญญาณว่าควรคุยเรื่องชิลเลอร์ ส่งรายละเอียดกระบวนการมาให้ทีมเราดูได้เลย"
      ],
      en: [
        "The most important difference between a chiller and a cold room system is that a chiller doesn't cool a space directly. It produces chilled water as a heat-exchange medium, and you can send that water wherever it's needed.",
        "The consequence is flexibility. Without the pipe-run distance limits of direct refrigerant systems, chillers adapt to a wide range of applications — including certain cold rooms, laboratory spaces, and large buildings.",
        "The jobs where THERMO reaches for a chiller most often: machine cooling for molding and CNC work, metal plating, food production including soaking, fermenting and pickling, and product washing.",
        "The unexpected ones are outside the factory. Real examples from our work: nutrient chiller systems controlling water temperature for hydroponic farms, where water temperature drives yield directly; and a chiller line for Gran Monte's wine production in Nakhon Ratchasima. Neither brief contained the words \"cold room\" — but both came down to controlling liquid temperature.",
        "One thing to understand before deciding: a chiller system isn't quite built like a cold room's refrigeration plant, because it adds the whole chilled-water distribution side — piping, pumps, filtration and water treatment, and valves.",
        "Which means comparing a chiller quote against a cold room quote line-for-line doesn't make sense. They're different systems answering different questions, and the water-side work is part of the project that has to be counted.",
        "Chillers come in air-cooled and water-cooled configurations, and THERMO builds both. The choice depends on available space, load, and site conditions.",
        "If your brief is \"this liquid or this process needs to be cooler\" rather than \"this room needs to be colder\" — that's the signal to talk about a chiller. Send our team your process details."
      ]
    },
    datePublishedISO: "2026-06-12",
    dateModifiedISO: "2026-06-12"
  },
  {
    id: "wine-cellar",
    title: {
      th: "Wine Cellar ไม่ใช่ห้องเย็นที่เย็นน้อยลง — และนี่คือเหตุผล",
      en: "A Wine Cellar Is Not a Cold Room Turned Down — Here's Why"
    },
    date: {
      th: "5 มิ.ย. 2569",
      en: "June 5, 2026"
    },
    category: {
      th: "งานเฉพาะทาง",
      en: "Specialist Work"
    },
    image: "article-06.jpg",
    excerpt: {
      th: "อุณหภูมิ ความชื้น และแสง สามตัวแปรที่ต้องคุมพร้อมกันเป็นสิบปี โดยที่ห้องยังต้องสวยพอจะโชว์คอลเลคชั่นได้ — งานที่ THERMO ทำให้ทั้ง Soneva Kiri และ Six Senses Laamu",
      en: "Temperature, humidity and light — three variables held steady for a decade, in a room that still has to look good enough to display a collection. The work THERMO delivered for Soneva Kiri and Six Senses Laamu."
    },
    body: {
      th: [
        "โดยนิยามแล้ว Wine Cellar นับเป็นห้องเย็นประเภทหนึ่ง อยู่ในช่วงอุณหภูมิสูง ราว +5 ถึง +19°C แต่ถ้ามองแค่ตัวเลขนี้แล้วคิดว่ามันคือห้องเย็นที่ตั้งอุณหภูมิสูงขึ้น คุณจะพลาดทั้งโจทย์",
        "ความต่างอยู่ที่คำว่า \"แน่นอน\" และ \"นาน\" ไวน์ต้องเก็บที่อุณหภูมิที่ค่อนข้างคงที่ ความชื้นที่เหมาะสม และต่อเนื่องเป็นระยะเวลานานหลายปี ห้องเย็นทั่วไปยอมให้อุณหภูมิแกว่งได้ในกรอบหนึ่งโดยไม่กระทบสินค้า แต่กับไวน์ ความแกว่งคือความเสียหายที่สะสมและมองไม่เห็นจนกว่าจะเปิดขวด",
        "และไม่ใช่แค่อุณหภูมิ ปัจจัยที่ต้องคุมพร้อมกันยังมีแสงสว่างและความชื้น เหตุผลตรงไปตรงมา: ขวดไวน์ราคาสูง จำเป็นต้องรักษาคุณภาพของจุกคอร์กไว้ และรักษาสภาพฉลากไม่ให้เปื่อยหรือหลุดร่อน ความชื้นต่ำเกินไปคอร์กแห้ง สูงเกินไปฉลากเสีย ทั้งสองทางคือมูลค่าที่หายไปจากขวด",
        "โจทย์ข้อที่ยากที่สุดมักไม่ใช่เรื่องวิศวกรรม แต่คือห้องนี้ต้องสวย เทรนด์ปัจจุบันคือคอไวน์และนักสะสมหันมาใช้บริการติดตั้ง wine cellar กันแพร่หลายขึ้น เพราะตู้ไวน์สำเร็จรูปมีข้อจำกัดสองอย่าง ใส่จำนวนได้ไม่พอ และไม่สามารถแสดงคอลเลคชั่นหรือไฮไลท์เด่นได้เหมือนตู้โชว์",
        "งานประเภทนี้จึงต้องสร้าง Display พร้อมกับรักษาคุณภาพของไวน์ราคาสูงไว้ได้ในเวลาเดียวกัน — สองอย่างที่ปกติดึงกันคนละทาง",
        "THERMO ออกแบบและติดตั้งงานกลุ่มนี้มาแล้วทั้งที่ Soneva Kiri จังหวัดตราด และ Six Senses Laamu ที่สาธารณรัฐมัลดีฟส์ รวมถึงระบบ Chiller line สำหรับสายการผลิตไวน์ให้ Gran Monte — ก็คือเราเห็นไวน์ตั้งแต่ตอนยังอยู่ในถัง จนถึงตอนอยู่บนชั้นโชว์",
        "ถ้าคุณกำลังคิดถึง wine cellar ไม่ว่าจะที่บ้าน ร้านอาหาร หรือรีสอร์ต สิ่งที่ควรถามผู้รับงานคือ เขาคุมความชื้นยังไง และคุมแสงยังไง ไม่ใช่แค่ทำให้เย็นได้กี่องศา คุยกับ THERMO ได้เลยครับ"
      ],
      en: [
        "By definition a wine cellar counts as a type of cold room, sitting in the warm range of roughly +5 to +19°C. But read only that number and conclude it's a cold room turned up, and you've missed the entire brief.",
        "The difference lives in two words: steady and long. Wine needs a genuinely stable temperature, appropriate humidity, held continuously for many years. A general cold room tolerates swing within a band without harming the product. With wine, swing is damage — cumulative, invisible until the bottle is opened.",
        "And it isn't only temperature. Light and humidity must be controlled alongside it, for a plain reason: expensive bottles need their corks kept in condition and their labels kept from softening or peeling away. Too dry and the cork suffers; too damp and the label does. Either way, value leaves the bottle.",
        "The hardest part of the brief usually isn't engineering — it's that the room has to be beautiful. The current trend is that wine lovers and collectors increasingly commission built cellars, because prefabricated wine cabinets have two limits: they don't hold enough, and they can't display a collection or its highlights the way a proper showcase can.",
        "So this work has to build a display and preserve high-value wine at the same time — two goals that normally pull against each other.",
        "THERMO has designed and installed in this class at Soneva Kiri in Trat and Six Senses Laamu in the Maldives, plus the chiller line for Gran Monte's wine production — meaning we've seen wine from the tank all the way to the display shelf.",
        "If you're considering a cellar for a home, a restaurant or a resort, the question to ask your contractor isn't how cold it gets. It's how they control humidity and how they control light. Talk to THERMO."
      ]
    },
    datePublishedISO: "2026-06-05",
    dateModifiedISO: "2026-06-05"
  },
  {
    id: "gmp-fda-coldroom",
    title: {
      th: "ออกแบบห้องเย็นยังไงให้โรงงานขอ อย. และ GMP ผ่าน",
      en: "Designing Cold Rooms So Your Plant Can Pass FDA and GMP Audits"
    },
    date: {
      th: "17 ก.ค. 2569",
      en: "July 17, 2026"
    },
    category: {
      th: "กฎหมายและมาตรฐาน",
      en: "Regulatory"
    },
    image: "article-07.jpg",
    excerpt: {
      th: "ห้องเย็นที่เย็นพอ กับห้องเย็นที่ผ่าน GMP เป็นคนละเรื่องกัน — ความต่างอยู่ที่ตำแหน่งห้อง ทิศทางการเดินของสินค้าและคน และรายละเอียดที่ต้องคิดตั้งแต่ก่อนวางผัง ไม่ใช่ตอนผู้ตรวจมา",
      en: "A cold room that gets cold enough and a cold room that passes GMP are different things. The difference is where the rooms sit, how product and people move, and details you settle before the layout — not when the auditor arrives."
    },
    body: {
      th: [
        "ลูกค้าโรงงานอาหารจำนวนมากติดต่อเรามาตอนที่แบบโรงงานเสร็จแล้ว บางรายสร้างไปแล้วครึ่งหนึ่ง แล้วเพิ่งมารู้ว่าตำแหน่งห้องเย็นที่วางไว้ทำให้ของดิบกับของสุกต้องเดินสวนกัน ซึ่งเป็นสิ่งที่ระบบ GMP ไม่ยอมรับ การแก้ตอนนั้นแพงกว่าการคิดตั้งแต่แรกหลายเท่า",
        "ต้องเข้าใจก่อนว่า GMP ไม่ได้ระบุว่า \"ห้องเย็นต้องเป็นยี่ห้ออะไร หนากี่มิลลิเมตร\" แต่กำหนดหลักการเรื่องสุขลักษณะและการป้องกันการปนเปื้อน แล้วให้โรงงานพิสูจน์ว่าออกแบบและควบคุมได้จริง ห้องเย็นจึงไม่ได้ผ่านหรือไม่ผ่านด้วยตัวมันเอง — มันผ่านหรือไม่ผ่านด้วยวิธีที่มันถูกวางไว้ในกระบวนการ",
        "เรื่องที่หนักที่สุดคือทิศทางการไหล ผังที่ดีต้องให้วัตถุดิบเดินทางไปข้างหน้าทางเดียวจนถึงสินค้าสำเร็จรูป ไม่ย้อนกลับมาเจอกัน ห้องเย็นเก็บวัตถุดิบ ห้องเย็นระหว่างกระบวนการ และห้องเย็นเก็บสินค้าสำเร็จรูป จึงไม่ควรเป็นห้องเดียวกันและไม่ควรอยู่ปนกัน ตำแหน่งประตูก็สำคัญไม่แพ้กัน เพราะประตูคือจุดที่คนกับของเดินผ่าน ถ้าวางผิดจุด ผังที่ดูดีบนกระดาษก็ใช้ไม่ได้จริง",
        "เรื่องที่สองคือพื้นผิวและการทำความสะอาด ผนังและเพดานห้องเย็นควรเรียบ ไม่มีซอกที่ล้างไม่ถึง รอยต่อต้องปิดสนิทไม่ให้ความชื้นหรือสิ่งสกปรกแทรก มุมระหว่างผนังกับพื้นควรออกแบบให้ทำความสะอาดได้ง่าย และพื้นต้องระบายน้ำได้ ไม่ขังน้ำ — รายละเอียดพวกนี้ตัดสินกันตั้งแต่ตอนเลือกชนิดแผ่นฉนวนและวิธีติดตั้ง ไม่ใช่ตอนทำความสะอาดครั้งแรก",
        "เรื่องที่สามคือการควบคุมและบันทึกอุณหภูมิ ระบบมาตรฐานไม่ได้ถามแค่ว่าห้องเย็นพอไหม แต่ถามว่าคุณ \"พิสูจน์\" ได้ไหมว่ามันเย็นตลอดเวลาที่ผ่านมา นั่นแปลว่าต้องมีจุดวัดที่เหมาะสม มีการบันทึกที่ย้อนดูได้ และมีวิธีรับมือเมื่ออุณหภูมิหลุดจากกรอบ ระบบ Monitoring จึงไม่ใช่ของฟุ่มเฟือยสำหรับโรงงานที่จะขอมาตรฐาน แต่เป็นเครื่องมือที่ทำให้ตอบผู้ตรวจได้",
        "เรื่องที่สี่คือรายละเอียดที่คนมองข้าม เช่น การจัดเรียงสินค้าต้องเว้นระยะจากผนังและพื้นเพื่อให้ลมเย็นไหลผ่านและทำความสะอาดได้ ห้องเย็นที่วางของชิดผนังจนแน่นคือห้องที่ทั้งเย็นไม่ทั่วและตรวจไม่ผ่าน หรือการมีห้องพักสินค้า (anteroom) คั่นก่อนเข้าห้องเย็น ซึ่งช่วยทั้งเรื่องความเย็นรั่วและเรื่องการแยกโซน",
        "สิ่งที่ THERMO ทำได้คือส่วนของระบบทำความเย็น — ออกแบบตำแหน่งและขนาดห้องเย็นให้เข้ากับผังการผลิตของคุณ เลือกวัสดุที่ทำความสะอาดได้ วางระบบควบคุมและบันทึกอุณหภูมิ และคุยกับผู้ออกแบบโรงงานหรือที่ปรึกษามาตรฐานของคุณตั้งแต่ต้น เราเคยทำงานร่วมกับโรงงานอาหารและห้องปฏิบัติการมาแล้วหลายแห่ง ตั้งแต่โรงงานแปรรูปเนื้อสัตว์ ไปจนถึงศูนย์นวัตกรรมอาหารของจุฬาลงกรณ์มหาวิทยาลัย",
        "ข้อควรทราบ: การขอ อย. และ GMP ครอบคลุมมากกว่าเรื่องห้องเย็น ทั้งเรื่องบุคลากร สุขลักษณะส่วนบุคคล การควบคุมสัตว์พาหะ ระบบน้ำ เอกสารและการตรวจสอบย้อนกลับ บทความนี้พูดเฉพาะส่วนที่เกี่ยวกับระบบทำความเย็นเท่านั้น และเป็นข้อมูลเบื้องต้นเพื่อให้เห็นภาพ ไม่ใช่คำแนะนำเชิงกฎหมายหรือการรับรองว่าจะผ่านการตรวจ รายละเอียดและข้อกำหนดปัจจุบันควรตรวจสอบกับสำนักงานคณะกรรมการอาหารและยา หรือที่ปรึกษาด้านมาตรฐานของท่าน",
        "ถ้ากำลังวางแผนสร้างโรงงานใหม่ จังหวะที่คุ้มที่สุดในการคุยกับเราคือตอนที่ผังยังแก้ได้ ไม่ใช่ตอนที่โครงสร้างขึ้นแล้ว"
      ],
      en: [
        "Many food plant clients reach us after the factory drawings are finished — some when construction is already half done — only to discover the cold room positions force raw and cooked product to cross paths, which a GMP system will not accept. Fixing it then costs many times more than thinking it through at the start.",
        "First, understand that GMP does not specify a brand of cold room or a panel thickness. It sets principles for hygiene and contamination control, and asks the plant to demonstrate that its design and controls actually deliver them. A cold room therefore doesn't pass or fail on its own — it passes or fails through how it sits within the process.",
        "The heaviest issue is flow direction. A sound layout moves raw material forward in one direction to finished goods, never doubling back on itself. Raw material storage, in-process chilling, and finished goods storage should not be the same room, nor share space. Door positions matter just as much, because doors are where people and product cross; put them in the wrong place and a layout that looks fine on paper doesn't work in practice.",
        "Second is surfaces and cleanability. Cold room walls and ceilings should be smooth, without recesses that cleaning can't reach. Joints must be sealed against moisture and soil. Wall-to-floor junctions should be designed to be cleaned easily, and floors must drain rather than pond. These details are decided when you choose the panel type and installation method — not on the first wash-down.",
        "Third is temperature control and records. Standards don't only ask whether the room is cold enough; they ask whether you can prove it has been cold all along. That means suitable measurement points, records you can review, and a defined response when readings leave the band. For a plant pursuing certification, a monitoring system isn't a luxury — it's what lets you answer the auditor.",
        "Fourth are the overlooked details: product must be stacked clear of walls and floor so cold air can circulate and cleaning can reach. A room packed tight to the walls is both unevenly cold and unlikely to pass. An anteroom before the cold room helps too, both for cooling loss and for zone separation.",
        "What THERMO handles is the refrigeration side — positioning and sizing rooms to suit your production layout, selecting cleanable materials, setting up temperature control and logging, and talking to your factory designer or standards consultant from the beginning. We've worked with food plants and laboratory facilities before, from meat processing operations to Chulalongkorn University's food innovation centre.",
        "Please note: FDA registration and GMP cover far more than cold rooms — personnel, personal hygiene, pest control, water systems, documentation and traceability. This article addresses only the refrigeration-related portion, and is general orientation rather than legal advice or any assurance of passing an audit. Verify current requirements with Thailand's FDA or your own standards consultant.",
        "If you're planning a new plant, the most valuable time to talk to us is while the layout can still change — not after the structure is up."
      ]
    },
    datePublishedISO: "2026-07-17",
    dateModifiedISO: "2026-07-17"
  },
  {
    id: "preventive-maintenance",
    title: {
      th: "PM ระบบทำความเย็น — ช่างที่มาดูแล ควรตรวจอะไรบ้าง",
      en: "Preventive Maintenance — What a Service Visit Should Actually Cover"
    },
    date: {
      th: "24 ก.ค. 2569",
      en: "July 24, 2026"
    },
    category: {
      th: "การดูแลรักษา",
      en: "Maintenance"
    },
    image: "article-08.jpg",
    excerpt: {
      th: "\"เข้ามาดูแลให้\" ของแต่ละเจ้าไม่เหมือนกัน บางเจ้าคือล้างคอยล์แล้วกลับ บางเจ้าคือตรวจ 40 กว่ารายการพร้อมบันทึกค่า — นี่คือขอบเขตที่ THERMO ใช้จริง เอาไปใช้เป็นเช็คลิสต์เทียบได้เลย",
      en: "\"We'll take care of it\" means different things to different contractors. For some it's washing the coil and leaving. Here is the scope THERMO actually works to — use it as a checklist to compare against."
    },
    body: {
      th: [
        "ห้องเย็นคือเครื่องจักรที่วิ่ง 24 ชั่วโมงโดยไม่มีวันหยุด และปัญหาส่วนใหญ่ไม่ได้เกิดขึ้นทันที มันค่อยๆ สะสม — คอยล์เริ่มตัน ขอบยางเริ่มเสื่อม น้ำมันเริ่มพร่อง แล้ววันหนึ่งก็หยุดพร้อมกับสินค้าเต็มห้อง การบำรุงรักษาเชิงป้องกัน (Preventive Maintenance) คือการเข้าไปเจอปัญหาพวกนี้ตอนที่ยังเป็นเรื่องเล็ก",
        "ปัญหาคือคำว่า \"เข้ามา PM ให้\" ของแต่ละเจ้าไม่เท่ากัน และลูกค้ามักไม่มีเกณฑ์เทียบ เราจึงเปิดขอบเขตงาน PM ที่ทีมเราใช้จริงหน้างานให้ดู เพื่อให้คุณเอาไปเทียบได้ ไม่ว่าจะใช้บริการเราหรือไม่ก็ตาม",
        "ชุดคอยล์ร้อน (Condensing Unit) — จุดที่ตรวจมากที่สุด เริ่มจากสภาพโครงสร้างว่าไม่เกิดสนิมและยึดแน่น คอยล์ร้อนทั้งฟินและท่อต้องไม่มีฝุ่นและไม่ผุกร่อน ชุดพัดลมทั้งมอเตอร์ ใบพัด และตะแกรง ต้องเสียงดังปกติ จากนั้นไล่ตรวจคอมเพรสเซอร์ ถังดักน้ำมัน วาล์วกันกลับ ตัวกรองความชื้น กระจกดูน้ำยาว่าต้องไม่ขุ่นมัว วาล์วน้ำยา เกจวัดแรงดันทั้งด้านต่ำ-สูงและด้านน้ำมัน เครื่องป้องกันความดัน ฮีตเตอร์อุ่นน้ำมัน ท่อสารทำความเย็นว่าไม่รั่ว ฉนวนหุ้มท่อว่าไม่ฉีกขาด และซัพพอร์ตท่อว่ายังแข็งแรง",
        "ที่สำคัญไม่แพ้การดูด้วยตาคือการวัดและบันทึกค่า — ระดับน้ำมันคอมเพรสเซอร์ ปริมาณสารทำความเย็น แรงดันน้ำยาด้านต่ำ ด้านสูง และแรงดันน้ำมัน โดยวัดขณะเดินเครื่องและเทียบกับเงื่อนไขการออกแบบ ตัวเลขเหล่านี้คือสิ่งที่บอกว่าระบบยังทำงานตามที่ออกแบบไว้หรือเริ่มเพี้ยน และการทดสอบการทำงานของเครื่องป้องกันความดันและฮีตเตอร์ ก็ต้องทำขณะเดินเครื่องเช่นกัน",
        "ชุดคอยล์เย็น (Unit Cooler) — ตรวจโครงสร้างว่าไม่สั่น ถาดน้ำทิ้งและท่อน้ำทิ้งไม่หลุดไม่หลวมและไม่รั่ว แผงคอยล์เย็นต้องสะอาด ไม่ผุกร่อน และไม่มีน้ำแข็งเกาะ ชุดพัดลมเสียงต้องปกติ ฮีตเตอร์ละลายน้ำแข็งสายไฟต้องไม่หลวม รวมถึงกวดขันจุดต่อน็อตสกรูให้แน่น",
        "ตู้ควบคุมไฟฟ้า — ตรวจทั้งภายนอกและภายในว่าสะอาดไม่มีฝุ่น หน้าตู้ทั้งหลอดไฟและสวิทช์ต้องครบและใช้งานได้ อุปกรณ์ภายในอย่างแมคเนติกและโอเวอร์โหลดต้องไม่มีรอยไหม้ และกวดขันจุดต่อน็อตสกรู — รอยไหม้เล็กๆ ในตู้ไฟคือสัญญาณที่ไม่ควรปล่อยผ่านเด็ดขาด",
        "อุปกรณ์ควบคุมและการวัดกระแส — ตรวจการทำงานของเทอร์โมสตัท ค่าพารามิเตอร์ การตั้งค่าละลายน้ำแข็งและจำนวนครั้งต่อวัน เซนเซอร์วัดอุณหภูมิทั้งในห้องและในคอยล์ รวมถึงเอ็กซ์แพนชั่นวาล์วและออริฟิดส์ จากนั้นวัดกระแสไฟทุกจุด ตั้งแต่กระแสรวม คอมเพรสเซอร์ พัดลมคอนเดนเซอร์ พัดลมคอยล์เย็น ฮีตเตอร์ละลายน้ำแข็ง ฮีตเตอร์ประตูและวงกบ วาล์วปรับแรงดันอากาศ ไปจนถึงแสงสว่างภายในห้องเย็น เทียบกับพิกัดของอุปกรณ์",
        "และปิดท้ายด้วยงานบริการจริง — ล้างทำความสะอาดคอยล์ร้อน ล้างคอยล์เย็นและท่อน้ำทิ้งเพื่อป้องกันการอุดตัน ตรวจระบบไฟฟ้าและกวดขันจุดต่อสายไฟ แล้วบันทึกรายงานการบริการไว้เป็นหลักฐาน",
        "จุดที่อยากให้สังเกตคือคำว่า \"บันทึก\" ที่โผล่ซ้ำหลายครั้ง การ PM ที่ดีไม่ได้จบที่ทำความสะอาด แต่ต้องมีตัวเลขย้อนหลังให้เทียบได้ เพราะแรงดันที่ค่อยๆ เปลี่ยนไปทีละนิดในสามครั้งที่ผ่านมา คือสิ่งที่บอกล่วงหน้าว่ากำลังจะมีปัญหา ซึ่งการดูด้วยตาเปล่าครั้งเดียวไม่มีทางเห็น และสำหรับโรงงานที่ต้องยื่นมาตรฐาน บันทึกเหล่านี้ยังใช้เป็นหลักฐานตอนตรวจได้ด้วย",
        "ถ้าตอนนี้คุณใช้บริการเจ้าอื่นอยู่ ลองเอารายการข้างบนไปถามดูว่าครอบคลุมแค่ไหน และขอดูใบบันทึกค่าย้อนหลัง ถ้าตอบได้ครบก็ถือว่าใช้ได้ ถ้าไม่ — ยินดีให้คำปรึกษาครับ"
      ],
      en: [
        "A cold room is machinery that runs around the clock without a day off, and most faults don't arrive suddenly. They accumulate — the coil slowly blocks, the door gasket degrades, oil level drops — and one day it stops with the room full of product. Preventive maintenance is how you meet those problems while they're still small.",
        "The trouble is that \"we'll come and do PM\" means different things to different contractors, and clients rarely have a benchmark. So here is the PM scope our team actually works to on site — use it as a comparison, whether you use us or not.",
        "Condensing unit — the most heavily inspected section. Start with the structure: no corrosion, everything fastened tight. The condenser coil, both fins and tubes, must be free of dust and corrosion. The fan assembly — motor, blade and guard — must sound normal. Then work through the compressor, oil separator, check valve, filter drier, sight glass (which must not be cloudy), refrigerant valves, low/high and oil pressure gauges, pressure protection devices, crankcase heater, refrigerant piping for leaks, pipe insulation for tears, and pipe supports for rigidity.",
        "Just as important as visual inspection is measuring and recording — compressor oil level, refrigerant charge, low-side pressure, high-side pressure and oil pressure, all taken while running and compared against the design conditions. These figures are what tell you whether the system still performs as designed or is drifting. Testing the pressure protection devices and the crankcase heater also has to happen with the unit running.",
        "Unit cooler — check the structure for vibration; the drain tray and drain pipe for looseness and leaks; the evaporator coil for cleanliness, corrosion and ice build-up; the fan assembly for normal sound; the defrost heater wiring for looseness; and tighten all bolts and screws.",
        "Electrical control panel — inspect inside and out for dust, confirm the panel face lamps and switches are complete and working, check internal components such as contactors and overloads for scorch marks, and tighten terminal screws. A small burn mark inside a panel is never something to wave through.",
        "Controls and current readings — verify thermostat operation and parameters, defrost settings and cycles per day, and the room and coil temperature sensors, plus the expansion valve and orifice. Then measure current at every point: total draw, compressor, condenser fan, evaporator fan, defrost and drain heaters, door and frame heaters, pressure relief valve, and cold room lighting — all against equipment ratings.",
        "And finally the service work itself — wash the condenser coil, clean the evaporator coil and drain line against blockage, check the electrical system and tighten wiring connections, then record the service report.",
        "Notice how often the word \"record\" appears. Good PM doesn't end at cleaning; it produces figures you can compare over time. A pressure that has shifted slightly across the last three visits is an early warning that a single visual inspection could never catch — and for plants pursuing certification, those records also serve as audit evidence.",
        "If you currently use another contractor, take the list above and ask how much of it they cover, and ask to see the recorded readings from past visits. If they can answer in full, that's a good sign. If not — we're happy to advise."
      ]
    },
    datePublishedISO: "2026-07-24",
    dateModifiedISO: "2026-07-24"
  },
  {
    id: "central-kitchen-cold-chain",
    title: {
      th: "ห้องเย็นสำหรับครัวกลางและ Catering: ออกแบบ Cold Chain ให้ล้อไปกับ Flow การทำงาน (ฉบับวิศวกร)",
      en: "Cold Rooms for Central Kitchens & Catering: Designing the Cold Chain Around Your Workflow (Engineer's Guide)"
    },
    date: {
      th: "22 ส.ค. 2569",
      en: "August 22, 2026"
    },
    category: {
      th: "ครัวกลาง & Catering",
      en: "Central Kitchen & Catering"
    },
    image: "article-central-kitchen.jpg",
    bodyMarkdown: {
      th: `ในธุรกิจอาหาร เรามักมองว่า "ความเย็น" คือที่เก็บของ — ที่ไว้ยืดอายุวัตถุดิบก่อนนำไปใช้ แต่ในครัวกลาง (Central Kitchen / Central Production Unit) และงาน Catering ระดับมืออาชีพ ความเย็นทำหน้าที่มากกว่านั้นมาก มันคือ **เครื่องมือในการผลิตอาหาร** ที่ทำงานตลอดสาย ตั้งแต่วัตถุดิบเข้าประตูหลังครัว ไปจนถึงจานที่วางตรงหน้าลูกค้า

ร้านที่ผลิตล่วงหน้าเป็นร้อยเป็นพันจานแต่รสชาติยัง "เหมือนเพิ่งทำสด" ไม่ได้อาศัยแค่ฝีมือเชฟ แต่อาศัย **Cold Chain (ห่วงโซ่ความเย็น)** ที่ออกแบบมาถูกจุด บทความนี้จะพาผู้ประกอบการอาหารมองความเย็นใหม่ ตั้งแต่ว่าทำไมมันถึงสำคัญ มีกี่ประเภท ต้องเข้ามาตรฐานอะไร และจะออกแบบให้ล้อไปกับขั้นตอนการทำงานจริงได้อย่างไร

## ความเย็นไม่ใช่แค่ "ที่เก็บของ" แต่คือขั้นตอนหนึ่งของการทำอาหาร

หัวใจที่หลายคนมองข้ามคือ ความเย็นเข้าไปอยู่ใน **"ระหว่างขั้นตอน"** การทำอาหาร ไม่ใช่แค่ก่อนและหลัง:

- **Blast Chill / Blast Freeze ระหว่างการผลิต (Cook–Chill / Cook–Freeze):** หลังปรุงสุก การลดอุณหภูมิแกนกลางอาหารอย่างรวดเร็วจะ "หยุดการสุก" ทันที ล็อกความชื้น สี และเนื้อสัมผัสไว้ ทำให้อาหารที่ผลิตล่วงหน้าเมื่อนำมาอุ่นเสิร์ฟยังใกล้เคียงของทำสด
- **Retard / Proof ในเบเกอรี่:** การชะลอและควบคุมการหมักของยีสต์ด้วยอุณหภูมิ ทำให้ครัวขึ้นแป้งค้างคืนแล้วอบเช้าได้พอดีเวลา กลิ่นและโครงสร้างขนมปังดีขึ้นโดยไม่ต้องเพิ่มกะกลางดึก
- **ลดอุณหภูมิเพื่อ "เซตตัว" ของผลิตภัณฑ์:** มูส เยลลี่ ช็อกโกแลต พานาคอตต้า เทมเปอร์ริ่ง หรือของหวานที่ต้องอยู่ตัว ล้วนใช้ความเย็นที่ควบคุมได้เป็นตัวกำหนดคุณภาพ

พูดง่าย ๆ คือ ความเย็นช่วยให้ครัว **แยกเวลา "ผลิต" ออกจากเวลา "เสิร์ฟ"** ได้ ผลิตเป็นล็อตใหญ่ในช่วงว่าง คุมคุณภาพให้คงที่ทุกสาขา ลดของเสีย (food waste) และรับงานปริมาณมากได้โดยไม่เสียความสดใหม่

## Cold Chain คืออะไร และทำไมครัวกลางถึงพลาดไม่ได้

Cold Chain คือการควบคุมอุณหภูมิของอาหารให้อยู่ในช่วงที่ปลอดภัยและรักษาคุณภาพ **อย่างต่อเนื่องไม่ขาดตอน** ตั้งแต่รับวัตถุดิบ จัดเก็บ แปรรูป ปรุง ลดอุณหภูมิ พักเย็น ไปจนถึงขนส่งและเสิร์ฟ ถ้าลูกโซ่นี้ขาดแม้ช่วงสั้น ๆ คุณภาพและความปลอดภัยจะเสียทันที

เหตุผลอยู่ที่ **โซนอุณหภูมิอันตราย (Temperature Danger Zone)** โดยประมาณคือช่วง **5–60°C** (บางมาตรฐานอ้างอิง 5–63°C หรือ 8–68°C) ในช่วงนี้แบคทีเรียก่อโรคเติบโตเร็วที่สุด และสามารถเพิ่มจำนวนเป็นเท่าตัวได้ในเวลาเพียงราว 20 นาที ยิ่งอาหารอยู่ในโซนนี้นานเท่าไหร่ ความเสี่ยงยิ่งสูงขึ้นเท่านั้น เป้าหมายของ Cold Chain จึงเป็นการพาอาหาร "ผ่านโซนอันตรายให้เร็วที่สุด" และ "กักไว้นอกโซนอันตรายให้นานที่สุด"

อีกแนวคิดที่ใช้กันในอุตสาหกรรมคือ **TTT (Time–Temperature Tolerance)** — คุณภาพของอาหารแช่เย็น/แช่แข็งขึ้นกับทั้ง "อุณหภูมิ" และ "ระยะเวลา" ที่สัมผัสอุณหภูมินั้นสะสมกัน ทุกจุดส่งต่อ (เช่น จากไลน์ผลิตเข้าห้องเย็น จากห้องเย็นขึ้นรถ) คือจุดที่ Cold Chain มักขาด จึงต้องออกแบบให้จุดส่งต่อสั้นและควบคุมได้

### ช่วงอุณหภูมิอ้างอิงที่ควรรู้:

| การใช้งาน | ช่วงอุณหภูมิอ้างอิง | หมายเหตุ |
|---|---|---|
| ห้องเย็นเก็บผัก / ผลไม้ (Chiller) | +2 ถึง +8°C | รักษาความสดโดยไม่ให้เกิดความเสียหายจากการแช่แข็ง |
| ห้องเย็นเก็บเนื้อ / ของสด (Chiller) | 0 ถึง +4°C | อุณหภูมิห้องเย็นมาตรฐานสำหรับของสด |
| ห้องแช่แข็งเก็บรักษา (Freezer) | −18 ถึง −25°C | เก็บรักษาระยะยาว คุณภาพคงที่ที่ −18°C หรือต่ำกว่า |
| โซนอุณหภูมิอันตราย | ประมาณ 5 ถึง 60°C | ช่วงที่แบคทีเรียเติบโตเร็วที่สุด — ต้องผ่านให้เร็ว |

## รู้จัก "ความเย็น 4 หน้าที่" ในครัวกลาง

ข้อผิดพลาดที่พบบ่อยคือการเลือกห้องเย็นจาก "อุณหภูมิ" อย่างเดียว ทั้งที่จริงควรเลือกจาก "หน้าที่" ก่อน เพราะแต่ละหน้าที่ต้องการการออกแบบระบบทำความเย็น กำลังคอยล์ และการวางตำแหน่งที่ต่างกัน

### 1) ห้องเย็นเก็บรักษา — Chiller & Freezer (Walk-in)

หน้าที่พื้นฐานที่สุด คือการ "หยุดเวลา" ให้วัตถุดิบและสินค้ากึ่งสำเร็จรูป โดยทั่วไปแบ่งเป็นห้องแช่เย็น (Chiller, 0 ถึง +8°C) และห้องแช่แข็ง (Freezer, −18 ถึง −25°C) จุดที่ต้องออกแบบให้ดีคือการแยกห้องตามประเภทวัตถุดิบ (เนื้อ/ผัก/ของปรุงสำเร็จ) เพื่อลดการปนเปื้อนข้าม และการเผื่อการไหลเวียนอากาศรอบสินค้าเพื่อให้เย็นทั่วถึง

### 2) ความเย็นแบบเร่งด่วน — Blast Chiller & Blast Freezer

นี่คือหัวใจของครัวกลางที่ทำ Cook–Chill / Cook–Freeze ตู้หรือห้องเย็นทั่วไป **ไม่ได้ออกแบบมาให้รับอาหารร้อน** เพราะจะลดอุณหภูมิช้า อาหารค้างอยู่ในโซนอันตรายนาน และยังทำให้ของในห้องเย็นตัวอื่นอุ่นตามไปด้วย

- **Blast Chiller:** ลดอุณหภูมิแกนกลางอาหารจาก +70°C ลงถึง +3°C ภายใน 90 นาที ตามแนวทางด้านสุขอนามัยอาหาร (อิงหลัก HACCP/Codex และแนวทางของ UK Department of Health) เพื่อพาอาหารผ่านโซนอันตรายให้เร็วที่สุด
- **Blast Freezer:** ลดอุณหภูมิจาก +70°C ลงถึง −18°C ภายในราว 240 นาที (4 ชั่วโมง) โดยอุณหภูมิลมภายในห้องมักออกแบบไว้ที่ −35 ถึง −45°C เพื่อการแช่แข็งเร็ว (ดูเพิ่มเติมในบทความ [Blast Freezer](/knowledge/coldroom-types) ของเรา)

ข้อดีที่มากกว่าความปลอดภัยคือ **คุณภาพ** — เมื่อลดอุณหภูมิเร็ว ผลึกน้ำแข็งที่เกิดในเนื้ออาหารจะเป็นผลึกเล็ก (micro-crystals) ไม่ทำลายโครงสร้างเซลล์ ต่างจากการแช่แข็งช้าในตู้ธรรมดาที่เกิดผลึกใหญ่คมเหมือนมีดเล็ก ๆ ทิ่มเนื้ออาหาร ทำให้เมื่อละลายแล้วเนื้อเละ ซอสแยกตัว และเสียน้ำ (มาตรฐานสหรัฐฯ FDA ใช้แนวการลดอุณหภูมิแบบ 2 ช่วง คือจากราว 57°C → 21°C ภายใน 2 ชม. แล้วลงถึง 5°C ภายในรวม 6 ชม. เป็นอีกกรอบอ้างอิงหนึ่ง)

### 3) ห้อง/ตู้ควบคุมการหมัก — Retarder–Prover (สำหรับเบเกอรี่)

สำหรับครัวที่มีเบเกอรี่ ความเย็นคือเครื่องมือคุมการหมักของยีสต์โดยตรง

- **โหมด Retard (ชะลอการหมัก):** ที่ประมาณ +2 ถึง +5°C ยีสต์แทบหยุดทำงาน ทำให้พักแป้งค้างคืนได้ พร้อมพัฒนากลิ่นและรสจากการหมักช้า
- **โหมด Proof (พักแป้งให้ขึ้น):** อุ่นขึ้นมาที่ประมาณ +30 ถึง +40°C พร้อมความชื้นสัมพัทธ์สูง (ราว 75–85%) เพื่อให้ยีสต์ทำงานเต็มที่ (ช่วงที่ยีสต์ทำงานดีที่สุดคือราว 35–40°C)

ตู้ Retarder–Prover จะสลับสองโหมดอัตโนมัติตามเวลาที่ตั้งไว้ ทำให้แป้งพร้อมอบพอดีตอนเช้าโดยไม่ต้องเพิ่มกะกลางดึก ลดแรงงานและได้คุณภาพสม่ำเสมอ

### 4) พื้นที่เตรียม–แพ็คควบคุมอุณหภูมิ — Cold Prep / High-care Room

ขั้นตอนหั่น แบ่ง จัดเซ็ต และแพ็คอาหารพร้อมทาน (Ready-to-eat) เป็นจุดเสี่ยงปนเปื้อนสูงเพราะอาหารจะไม่ถูกปรุงซ้ำอีก ครัวกลางระดับมาตรฐานจึงมักทำ **ห้องเตรียม/แพ็คที่ควบคุมอุณหภูมิห้อง** (เช่น อากาศห้อง +10 ถึง +15°C) เป็นโซน High-care แยกจากพื้นที่เตรียมของดิบ เพื่อให้อาหารอยู่นอกโซนอันตรายตลอดกระบวนการแพ็ค

### สรุปประเภทความเย็นในครัวกลาง:

| ประเภท | อุณหภูมิ/เกณฑ์ | หน้าที่หลัก |
|---|---|---|
| Chiller (Walk-in) | 0 ถึง +8°C | เก็บรักษาของสด วัตถุดิบ ของกึ่งสำเร็จรูป |
| Freezer (Walk-in) | −18 ถึง −25°C | เก็บรักษาระยะยาว |
| Blast Chiller | +70 → +3°C ใน 90 นาที | ลดอุณหภูมิเร็วหลังปรุง (Cook–Chill) |
| Blast Freezer | +70 → −18°C ใน ราว 240 นาที (ลมห้อง −35 ถึง −45°C) | แช่แข็งเร็ว (Cook–Freeze) คงเนื้อสัมผัส |
| Retarder–Prover | Retard +2 ถึง +5°C / Proof +30 ถึง +40°C | คุมการหมักของยีสต์ในเบเกอรี่ |
| Cold Prep / High-care | อากาศห้อง +10 ถึง +15°C | เตรียม–แพ็คอาหารพร้อมทานนอกโซนอันตราย |

## ออกแบบห้องเย็นให้ล้อไปกับ Flow การทำงาน

ห้องเย็นที่ดีที่สุดคือห้องที่ "อยู่ถูกที่" ในเส้นทางการทำงาน หลักการที่ยอมรับกันทั่วโลกคือ **การไหลทางเดียว (One-way / Unidirectional Flow)** เพื่อไม่ให้เส้นทางของ "ของดิบ" ตัดกับ "ของสุก/พร้อมทาน" ซึ่งเป็นข้อกำหนดสำคัญของ HACCP

ลำดับการไหลมาตรฐานของครัวกลางคือ:

> รับของ → จัดเก็บ (ห้องเย็น/ห้องแช่แข็ง/ของแห้ง) → เตรียมของดิบ → ปรุง → ลดอุณหภูมิเร็ว (Blast) → พักเย็น/แพ็ค (High-care) → จัดส่ง

จุดที่ตำแหน่งความเย็นสำคัญต่อ flow:

- **ห้องเก็บของเย็น** ควรอยู่ใกล้จุดรับของและใกล้พื้นที่เตรียม เพื่อลดเวลาและระยะทางที่อาหารสัมผัสอุณหภูมิห้อง
- **แยกห้องเย็นของดิบกับของสุก/พร้อมทานให้ชัดเจน** ไม่ให้เส้นทางตัดกัน ลดการปนเปื้อนข้าม
- **Blast Chiller/Freezer ควรอยู่ต่อจากไลน์ปรุงทันที** เพราะทุกนาทีที่อาหารร้อนรออยู่คือเวลาในโซนอันตราย
- **โซนแพ็ค High-care** ควรมีการควบคุมแรงดันอากาศเป็นบวก (Positive Pressure) เพื่อกันอากาศจากโซนสกปรกไหลเข้า
- **ประตูและทางสัญจร:** ประตูห้องเย็นที่เปิด-ปิดบ่อยทำให้เย็นรั่วและเกิดน้ำแข็งเกาะ การใช้ประตูความเร็วสูง (Hi-Speed Door) ช่วยลดการสูญเสียความเย็นและคุมความชื้นบริเวณรอยต่อได้ดี
- **ระบบมอนิเตอร์ริ่งอุณหภูมิ** ที่บันทึกและแจ้งเตือนต่อเนื่องคือหลักฐานว่า Cold Chain ไม่ขาดตอน และจำเป็นต่อการตรวจรับรองมาตรฐาน — ดูบริการ [ระบบมอนิเตอร์ริ่งห้องเย็น](/services/monitoring) ของเรา

## มาตรฐานที่เกี่ยวข้องกับครัวกลาง

การออกแบบระบบความเย็นในครัวกลางไม่ได้เป็นเรื่องของอุณหภูมิอย่างเดียว แต่ต้องรองรับระบบคุณภาพที่ผู้ซื้อรายใหญ่และหน่วยงานกำกับต้องการ:

- **GHPs / HACCP** — หลักสุขลักษณะทั่วไป (General Principles of Food Hygiene, Codex CXC 1-1969) และการวิเคราะห์อันตรายจุดควบคุมวิกฤต ซึ่งเน้นการควบคุมอุณหภูมิเป็นจุดควบคุมวิกฤต (CCP) สำคัญ
- **GMP** — หลักเกณฑ์วิธีการที่ดีในการผลิตอาหาร ครอบคลุมโครงสร้างอาคาร วัสดุ และการแยกโซน
- **ISO 22000** — ระบบบริหารความปลอดภัยอาหารที่รวม HACCP + GMP เข้ากับการบริหารคุณภาพ เหมาะกับครัวกลางตั้งแต่ขนาดเล็กถึงระดับอุตสาหกรรม
- **หน่วยงานไทย:** อย. (สำนักงานคณะกรรมการอาหารและยา) และ มกอช. (สำนักงานมาตรฐานสินค้าเกษตรและอาหารแห่งชาติ)

ในเชิงงานก่อสร้าง แผ่นฉนวนสำเร็จรูป (Sandwich Panel) แบบ PU/PIR ที่ผิวเรียบ ทำความสะอาดง่าย และมีค่านำความร้อนต่ำ คือมาตรฐานที่ใช้กันในห้องเย็น/ไลน์ผลิตอาหารที่ต้องรองรับ GMP/HACCP หากต้องการเจาะลึกการเลือกฉนวนและการควบคุมต้นทุน อ่านต่อได้ที่บทความ [ก่อนสร้างห้องเย็น: 5 การตัดสินใจที่ชี้ว่าคุ้มหรือไม่คุ้ม (ฉบับวิศวกร)](/knowledge/coldroom-checklist)

## เช็กลิสต์ก่อนวางระบบความเย็นในครัวกลาง

1. **ระบุ เมนูและกำลังการผลิต ก่อน** แล้วค่อยกำหนดว่าต้องมีความเย็นหน้าที่ใดบ้าง (เก็บ / Blast / Retard-Proof / High-care)
2. **วางผัง One-way flow ก่อนเลือกอุปกรณ์** อย่าซื้อเครื่องก่อนสรุปผัง
3. **แยกเส้นทาง ดิบ–สุก** และแยกห้องเย็นตามประเภทวัตถุดิบ
4. **เผื่อ Blast Chiller/Freezer ต่อจากไลน์ปรุง** ถ้าทำ Cook–Chill/Cook–Freeze
5. **วาง ระบบมอนิเตอร์ริ่ง + บันทึกอุณหภูมิ** ตั้งแต่ต้น เพื่อรองรับการตรวจมาตรฐาน
6. **เลือก ฉนวนและประตู** ให้เหมาะกับความถี่การใช้งานและระดับอุณหภูมิ

## คำถามที่พบบ่อย (FAQ)

**Blast Chiller ต่างจากห้องเย็นธรรมดาอย่างไร?**
ห้องเย็นธรรมดาออกแบบมาเพื่อ "รักษา" อุณหภูมิของที่เย็นอยู่แล้ว ส่วน Blast Chiller ออกแบบมาเพื่อ "ลด" อุณหภูมิอาหารร้อนอย่างรวดเร็ว (จาก +70°C ลงถึง +3°C ใน 90 นาที) การเอาอาหารร้อนใส่ห้องเย็นเก็บรักษาโดยตรงจะลดอุณหภูมิช้า อาหารค้างในโซนอันตรายนาน และทำให้ของอื่นในห้องอุ่นตาม

**ครัวกลางต้องมีห้องเย็นกี่แบบ?**
ขึ้นกับเมนูและกำลังผลิต แต่โครงพื้นฐานมักมี 3 กลุ่ม คือ (1) ห้องเก็บรักษา Chiller+Freezer (2) ความเย็นเร่งด่วน Blast Chiller/Freezer และ (3) โซนเตรียม/แพ็คควบคุมอุณหภูมิ ครัวที่มีเบเกอรี่จะเพิ่มตู้/ห้อง Retarder–Prover

**ทำไมห้ามเอาอาหารร้อนเข้าห้องเย็นเก็บรักษาโดยตรง?**
เพราะห้องเย็นเก็บรักษาลดอุณหภูมิได้ช้า ทำให้อาหารอยู่ในโซนอันตราย (5–60°C) นานเกินไป เสี่ยงเชื้อโรค และไอความร้อน/ความชื้นยังทำให้เกิดหยดน้ำ น้ำแข็งเกาะคอยล์ และของอื่นเสื่อมคุณภาพ ควรใช้ Blast Chiller ลดอุณหภูมิก่อนเสมอ

**ร้านเล็กจำเป็นต้องมี Retarder–Prover ไหม?**
ไม่จำเป็นเสมอไป แต่ถ้าทำเบเกอรี่ที่ต้องการคุมเวลาการอบและคุณภาพให้สม่ำเสมอ Retarder–Prover ช่วยลดกะกลางดึกและลดของเสียได้มาก คุ้มค่าเมื่อปริมาณการผลิตเริ่มสูงขึ้น

> ต้องการวางระบบความเย็นสำหรับครัวกลางหรืองาน Catering? ทีมวิศวกร THERMO ออกแบบให้ตรงกับ flow การทำงานและมาตรฐานที่คุณต้องเข้า — ปรึกษาเราฟรี

*แหล่งอ้างอิงทางเทคนิค: หลัก HACCP/Codex (GHPs, CXC 1-1969), UK Department of Health (blast chill/freeze guidelines), U.S. FDA Food Code (cooling), FAO/แนวทาง cold chain (TTT), งานวิชาการเรื่อง Processing, Storage and Quality of Cook-Chill or Cook-Freeze Foods*`,
      en: `In the food business, we tend to think of "cold" as storage — a place to extend the life of ingredients before we use them. But in a professional Central Kitchen (Central Production Unit) or catering operation, cold does far more than that. It is a **production tool** that works across the entire line, from the moment ingredients arrive at the back door to the plate in front of the guest.

Kitchens that produce hundreds or thousands of portions in advance yet still taste "freshly made" don't rely on the chef's skill alone — they rely on a **Cold Chain** designed around the right control points. This article reframes how food operators should see cold: why it matters, the types you need, the standards to meet, and how to design it around your real workflow.

## Cold Is Not Just Storage — It's a Cooking Step

The point many operators miss is that cold sits **between cooking steps**, not only before and after:

- **Blast chilling / freezing during production (Cook–Chill / Cook–Freeze):** rapidly dropping the food's core temperature after cooking instantly halts the cooking process and locks in moisture, color and texture — so pre-made food still tastes close to fresh when reheated.
- **Retard / Proof in the bakery:** controlling yeast fermentation with temperature lets a kitchen hold dough overnight and bake in the morning on schedule, improving aroma and structure without a night shift.
- **Cooling to "set" products:** mousses, jellies, chocolate tempering, panna cotta and other desserts all depend on controlled cold to achieve quality.

In short, cold lets a kitchen **separate "production time" from "service time"** — batch-produce during quiet hours, keep quality consistent across every branch, cut food waste, and take on high volume without losing freshness.

## What Is the Cold Chain, and Why Central Kitchens Can't Miss It

The cold chain is the **continuous, unbroken control of food temperature** — through receiving, storage, prep, cooking, chilling, cold holding, transport and service. Break the chain even briefly and both quality and safety are compromised.

The reason is the **Temperature Danger Zone**, roughly **5–60°C** (some standards cite 5–63°C or 8–68°C). In this range pathogenic bacteria grow fastest and can double in number in as little as 20 minutes. The goal of the cold chain is to move food through the danger zone as fast as possible and keep it out of the zone as long as possible.

A related industry concept is **TTT (Time–Temperature Tolerance)** — the quality of chilled/frozen food depends on both the temperature and the cumulative time spent at it. Every transfer point (line to cold room, cold room to truck) is where the chain typically breaks, so those points must be short and controlled.

### Reference temperatures to know:

| Use | Reference range | Note |
|---|---|---|
| Vegetable / fruit chiller | +2 to +8°C | Keeps produce fresh without freeze damage |
| Meat / fresh-food chiller | 0 to +4°C | Standard chill temperature for fresh food |
| Storage freezer | −18 to −25°C | Long-term storage; quality holds at −18°C or below |
| Temperature danger zone | about 5 to 60°C | Bacteria grow fastest — pass through quickly |

## The "Four Jobs of Cold" in a Central Kitchen

A common mistake is choosing cold rooms by temperature alone, when you should choose by **function** first — each job needs different system design, coil capacity and placement.

### 1) Storage — Chiller & Freezer (Walk-in)

The most basic job: "stopping the clock" for ingredients and semi-finished goods. Typically split into chillers (0 to +8°C) and freezers (−18 to −25°C). Good design separates rooms by product type (meat / produce / cooked) to reduce cross-contamination and allows airflow around goods for even cooling.

### 2) Rapid Cold — Blast Chiller & Blast Freezer

This is the heart of any Cook–Chill / Cook–Freeze central kitchen. Ordinary cold rooms are **not designed to receive hot food** — they cool too slowly, leaving food in the danger zone and warming everything else inside.

- **Blast Chiller:** drops the food's core temperature from +70°C to +3°C within 90 minutes, following food-hygiene guidance (HACCP/Codex principles and UK Department of Health guidelines), moving food through the danger zone fast.
- **Blast Freezer:** drops from +70°C to −18°C within about 240 minutes (4 hours), with in-room air often designed at −35 to −45°C for rapid freezing (see our [Blast Freezer](/knowledge/coldroom-types) article).

Beyond safety, the real benefit is **quality**: fast cooling forms tiny micro-crystals that leave the cell structure intact — unlike slow freezing in a standard unit, where large jagged ice crystals tear the food, leaving it mushy, split and watery after thawing. (The U.S. FDA Food Code uses a two-stage cooling frame — roughly 57°C → 21°C within 2 hours, then to 5°C within 6 hours total — as another reference.)

### 3) Fermentation Control — Retarder–Prover (for Bakery)

For kitchens with a bakery, cold directly controls yeast fermentation.

- **Retard mode:** at about +2 to +5°C, yeast nearly stops, allowing overnight holding while slow fermentation develops flavor.
- **Proof mode:** warmed to about +30 to +40°C with high relative humidity (around 75–85%) so yeast works fully (best yeast activity is around 35–40°C).

A retarder–prover switches modes automatically on a timer, so dough is ready to bake in the morning without a night shift — less labor, more consistency.

### 4) Temperature-Controlled Prep / Pack — Cold Prep / High-care Room

Cutting, portioning, assembling and packing ready-to-eat food is a high cross-contamination risk because the food won't be cooked again. Standard central kitchens therefore run a **temperature-controlled prep/pack room** (e.g. room air +10 to +15°C) as a High-care zone, separated from raw prep, to keep food out of the danger zone throughout packing.

### Summary of cold types in a central kitchen:

| Type | Temperature / criterion | Main job |
|---|---|---|
| Chiller (Walk-in) | 0 to +8°C | Store fresh ingredients and semi-finished goods |
| Freezer (Walk-in) | −18 to −25°C | Long-term storage |
| Blast Chiller | +70 → +3°C in 90 min | Rapid cooling after cooking (Cook–Chill) |
| Blast Freezer | +70 → −18°C in about 240 min (room air −35 to −45°C) | Rapid freezing (Cook–Freeze), preserves texture |
| Retarder–Prover | Retard +2 to +5°C / Proof +30 to +40°C | Control bakery yeast fermentation |
| Cold Prep / High-care | Room air +10 to +15°C | Prep/pack ready-to-eat food out of the danger zone |

## Designing Cold Rooms Around Your Workflow

The best cold room is the one that sits in the right place along the workflow. The globally accepted principle is **one-way (unidirectional) flow**, so the path of raw food never crosses that of cooked / ready-to-eat food — a key HACCP requirement.

The standard flow of a central kitchen is:

> Receiving → Storage (chiller / freezer / dry) → Raw prep → Cooking → Rapid chill (Blast) → Cold hold / pack (High-care) → Dispatch

Where cold placement matters to the flow:

- **Cold storage** should sit near receiving and near prep to minimize the time and distance food spends at room temperature.
- **Separate raw and cooked/ready-to-eat cold rooms clearly** so paths never cross, reducing cross-contamination.
- **Blast chillers/freezers should sit right after the cook line** — every minute hot food waits is time in the danger zone.
- **High-care pack zones** should run positive air pressure to keep air from dirty zones out.
- **Doors and traffic:** frequently opened cold room doors lose cold and build up ice. A Hi-Speed Door reduces cold loss and controls humidity at the threshold.
- **Temperature monitoring** that logs and alerts continuously is the evidence your cold chain never broke — and is essential for certification. See our [cold room monitoring systems](/services/monitoring).

## Relevant Standards for Central Kitchens

Cold system design isn't only about temperature — it must support the quality systems large buyers and regulators require:

- **GHPs / HACCP** — General Principles of Food Hygiene (Codex CXC 1-1969) and Hazard Analysis Critical Control Point, which treat temperature control as a key Critical Control Point (CCP).
- **GMP** — Good Manufacturing Practice, covering building structure, materials and zoning.
- **ISO 22000** — a food safety management system combining HACCP + GMP with quality management, suited to central kitchens from small to industrial scale.
- **Thai authorities:** Thai FDA (อย.) and ACFS (มกอช.).

On the construction side, PU/PIR sandwich panels — smooth, easy to clean, low thermal conductivity — are the standard for GMP/HACCP-compliant cold rooms and food production lines. For a deeper look at insulation choice and cost control, read [Before You Build a Cold Room: 5 Decisions That Decide Whether It Pays Off (Engineer's Edition)](/knowledge/coldroom-checklist).

## Checklist Before Specifying Your Cold System

1. **Define your menu and production volume first**, then decide which cold functions you need (storage / Blast / Retard-Proof / High-care).
2. **Lay out one-way flow before choosing equipment** — don't buy machines before finalizing the layout.
3. **Separate raw–cooked paths** and split cold rooms by product type.
4. **Plan Blast Chiller/Freezer right after the cook line** if you run Cook–Chill/Cook–Freeze.
5. **Install monitoring + temperature logging** from the start to support certification.
6. **Choose insulation and doors** to match usage frequency and temperature level.

## FAQ

**How is a blast chiller different from a normal cold room?**
A normal cold room is designed to maintain the temperature of already-cold items; a blast chiller is designed to rapidly drop the temperature of hot food (from +70°C to +3°C in 90 minutes). Putting hot food straight into a storage cold room cools it slowly, leaving it in the danger zone too long and warming everything else inside.

**How many types of cold rooms does a central kitchen need?**
It depends on menu and volume, but the basic frame usually has three groups: (1) storage chiller + freezer, (2) rapid cold — blast chiller/freezer, and (3) a temperature-controlled prep/pack zone. Kitchens with a bakery add a retarder–prover.

**Why not put hot food directly into a storage cold room?**
Because storage cold rooms cool slowly, leaving food in the danger zone (5–60°C) too long and creating a food-safety risk — while the heat and moisture cause condensation, coil icing, and quality loss for other items. Always use a blast chiller first.

**Do small shops need a retarder–prover?**
Not always — but if you run a bakery that needs controlled bake timing and consistent quality, a retarder–prover greatly reduces night shifts and waste. It pays off as production volume grows.

> Planning a cold system for a central kitchen or catering operation? THERMO's engineers design around your workflow and the standards you must meet — talk to us for free.

*Technical references: HACCP/Codex principles (GHPs, CXC 1-1969), UK Department of Health (blast chill/freeze guidelines), U.S. FDA Food Code (cooling), FAO cold chain guidance (TTT), academic work on Processing, Storage and Quality of Cook-Chill or Cook-Freeze Foods.*`
    },
    excerpt: {
      th: "ในครัวกลางและงาน catering ความเย็นไม่ใช่แค่ \"ที่เก็บของ\" แต่เป็นเครื่องมือผลิตอาหาร — ตั้งแต่ Blast Chill, Retard/Proof เบเกอรี่ ไปจนถึงการเซตตัวของหวาน คู่มือฉบับวิศวกรว่าด้วย Cold Chain ประเภทห้องเย็น มาตรฐาน และการออกแบบให้ตรงกับ flow การทำงานจริง",
      en: "In central kitchens and catering, cold is not just storage — it's a production tool, from blast chilling and bakery retard/proof to setting desserts. An engineer's guide to the cold chain, cold room types, standards, and designing around real workflow."
    },
    body: {
      th: [
        "ในธุรกิจอาหาร เรามักมองว่า ความเย็น คือที่เก็บของเพื่อยืดอายุวัตถุดิบ แต่ในครัวกลาง (Central Kitchen) และงาน Catering ระดับมืออาชีพ ความเย็นคือเครื่องมือในการผลิตอาหารตลอดสาย ตั้งแต่วัตถุดิบเข้าประตูหลังครัว ไปจนถึงจานที่เสิร์ฟตรงหน้าลูกค้า",
        "ความเย็นไม่ได้อยู่แค่ก่อนและหลังการปรุง แต่อยู่ระหว่างขั้นตอน เช่น Blast Chill/Freeze ในระบบ Cook–Chill/Cook–Freeze ที่ล็อกความสดและเนื้อสัมผัสทันที, Retard/Proof ในเบเกอรี่ที่คุมการหมักของยีสต์โดยไม่ต้องเพิ่มกะดึก, และการลดอุณหภูมิเพื่อเซตตัวของหวาน การแยกเวลาผลิตออกจากเวลาเสิร์ฟช่วยลด Food Waste และคุมคุณภาพได้คงที่ทุกสาขา",
        "Cold Chain คือการคุมอุณหภูมิอย่างต่อเนื่องเพื่อพาอาหารผ่านโซนอุณหภูมิอันตราย (5–60°C) ให้เร็วที่สุด เพื่อยับยั้งการเจริญเติบโตของแบคทีเรีย โดยในครัวกลางแบ่งหน้าที่ความเย็นเป็น 4 แบบหลัก ได้แก่ (1) ห้องเก็บรักษา Chiller/Freezer, (2) ความเย็นเร่งด่วน Blast Chiller/Freezer, (3) ตู้คุมการหมัก Retarder–Prover และ (4) โซนเตรียม-แพ็ค High-care ควบคุมอุณหภูมิห้อง",
        "การวางผังห้องเย็นต้องล้อไปกับ One-way Flow เพื่อไม่ให้เส้นทางของดิบตัดกับของสุกตามมาตรฐาน HACCP/GMP วาง Blast Chiller ต่อจากไลน์ปรุงทันที และติดตั้งระบบมอนิเตอร์ริ่งบันทึกอุณหภูมิต่อเนื่อง เพื่อเป็นหลักฐานความปลอดภัยอาหาร",
        "ทีมวิศวกร THERMO พร้อมให้คำปรึกษาและออกแบบระบบความเย็นสำหรับครัวกลางและ Catering ให้ตรงกับ Flow งานจริงและผ่านมาตรฐานสากล"
      ],
      en: [
        "In the food business, cold is often viewed merely as storage to extend shelf life. However, in modern Central Kitchens and professional Catering operations, cold serves as an essential production tool across the entire line — from receiving at the back door to the guest's plate.",
        "Cold operates between cooking stages: Blast Chilling and Freezing in Cook–Chill/Cook–Freeze systems instantly lock in moisture and texture, Retarder–Provers in bakeries manage fermentation without night shifts, and controlled cooling sets delicate desserts. Separating production time from service time cuts food waste while maintaining consistent quality.",
        "Maintaining an unbroken Cold Chain moves food through the Temperature Danger Zone (5–60°C) rapidly to suppress bacterial growth. In a central kitchen, cold serves four key roles: (1) Walk-in storage Chillers & Freezers, (2) Rapid Blast Chillers & Freezers, (3) Retarder–Provers for fermentation, and (4) Temperature-controlled High-care prep & packing zones.",
        "Designing cold room placement must adhere to unidirectional (One-way) flow under HACCP and GMP standards to prevent cross-contamination. Blast units should immediately follow the cook line, and 24/7 temperature monitoring provides essential compliance records.",
        "THERMO's engineering team provides comprehensive consultation and turnkey design for central kitchens and catering facilities tailored to real operational workflows and global safety standards."
      ]
    },
    datePublishedISO: "2026-08-22",
    dateModifiedISO: "2026-08-22"
  }
];

// ===== หน้าร่วมงานกับเรา (Careers) =====
// ✏️ แก้ตำแหน่งงานที่เปิดรับได้ที่ openings ด้านล่าง
//    - ถ้ายังไม่มีตำแหน่งเปิดรับ ให้ปล่อย openings: [] ว่างไว้
//      หน้าเว็บจะขึ้นข้อความ "ส่งประวัติมาเก็บไว้ได้" แทนโดยอัตโนมัติ
//    - เพิ่มตำแหน่งใหม่ = ก๊อปบล็อก { ... } มาวางต่อ
// ===== ความสัมพันธ์ระหว่างบทความกับบริการ (ลิงก์ภายใน) =====
// ใช้แสดง "บทความที่เกี่ยวข้อง" และ "บริการที่เกี่ยวข้อง"
// ✏️ เพิ่มบทความใหม่แล้ว ให้มาเพิ่มบรรทัดที่นี่ด้วย ไม่งั้นจะไม่มีลิงก์เชื่อมไปไหน
//    ถ้าลืมใส่ ระบบจะเลือกบทความในหมวดเดียวกันให้อัตโนมัติ (ไม่พัง)
export const articleRelations = {
  "coldroom-checklist":     { services: ["coldroom"],              articles: ["coldroom-types", "rg4-license", "power-3phase"] },
  "coldroom-types":         { services: ["coldroom"],              articles: ["coldroom-checklist", "wine-cellar", "chiller-explained"] },
  "rg4-license":            { services: ["coldroom"],              articles: ["coldroom-checklist", "power-3phase", "gmp-fda-coldroom"] },
  "power-3phase":           { services: ["coldroom", "chiller"],   articles: ["coldroom-checklist", "rg4-license", "preventive-maintenance"] },
  "chiller-explained":      { services: ["chiller"],               articles: ["coldroom-types", "wine-cellar", "power-3phase"] },
  "wine-cellar":            { services: ["special"],               articles: ["coldroom-types", "chiller-explained", "coldroom-checklist"] },
  "gmp-fda-coldroom":       { services: ["coldroom", "monitoring"],articles: ["rg4-license", "preventive-maintenance", "coldroom-checklist"] },
  "preventive-maintenance": { services: ["monitoring", "coldroom"],articles: ["gmp-fda-coldroom", "power-3phase", "coldroom-checklist"] },
  "central-kitchen-cold-chain": { services: ["coldroom", "monitoring"], articles: ["coldroom-checklist", "coldroom-types", "gmp-fda-coldroom"] }
};

// บริการไหน ควรโชว์บทความอะไรท้ายหน้า
export const serviceRelatedArticles = {
  "coldroom":    ["coldroom-checklist", "coldroom-types", "rg4-license"],
  "chiller":     ["chiller-explained", "power-3phase"],
  "special":     ["wine-cellar", "gmp-fda-coldroom"],
  "hispeeddoor": ["coldroom-checklist", "power-3phase"],
  "monitoring":  ["preventive-maintenance", "gmp-fda-coldroom"]
};

export const careersContent = {
  title: { th: "ร่วมงานกับเรา", en: "Careers" },
  subtitle: { th: "CAREERS", en: "CAREERS" },
  tagline: {
    th: "ร่วมเป็นส่วนหนึ่งของทีมมืออาชีพ",
    en: "Join a team of professionals"
  },
  intro: {
    th: "THERMO ก่อตั้งเมื่อปี 1987 โดยทีมวิศวกรที่คลุกคลีกับงานทำความเย็นมาก่อนหน้านั้น งานของเราออกแบบใหม่ทุกโครงการ ไม่มีสองงานที่เหมือนกัน คนที่อยู่กับเราได้นานคือคนที่สนุกกับการแก้โจทย์ที่ไม่มีคำตอบสำเร็จรูป",
    en: "THERMO was founded in 1987 by engineers already deep in refrigeration work. Every project here is engineered from scratch — no two jobs are alike. The people who stay are the ones who enjoy problems without off-the-shelf answers."
  },
  // รูปโปสเตอร์ประกาศรับสมัคร — เปลี่ยนรูปได้โดยอัปไฟล์ชื่อเดิมทับ
  posterImg: "careers-poster.jpg",

  whyJoin: {
    th: [
      "งานจริงตั้งแต่คลังสินค้าสนามบิน โรงงานอาหาร ไปจนถึงรีสอร์ตต่างประเทศ",
      "ได้ทำตั้งแต่ออกแบบ ติดตั้ง จนถึงดูแลหลังส่งมอบ ไม่ได้ทำแค่ช่วงเดียว",
      "ทีมวิศวกรและกรรมการมีประสบการณ์ในสายงานนี้รวมกว่า 40 ปี",
      "บริษัทเดินมาตั้งแต่ปี 1987 มั่นคง ไม่ใช่งานโครงการชั่วคราว"
    ],
    en: [
      "Real projects — from airport cargo terminals to food plants to overseas resorts",
      "Work across the whole cycle: design, installation, and after-sales service",
      "Engineers and directors with over 40 years of combined experience in the field",
      "A company running since 1987 — stable, not project-to-project"
    ]
  },

  // ✏️ ตำแหน่งที่เปิดรับ — แก้ตรงนี้
  //    ถ้าปิดรับแล้ว ให้ลบบล็อกออก หรือทำเป็น openings: []
  //    หน้าเว็บจะขึ้นข้อความ "ยินดีรับประวัติไว้พิจารณา" แทนเอง
  openings: [
    {
      id: "refrigeration-technician",
      title: { th: "ช่างเครื่องทำความเย็น / ห้องเย็น", en: "Refrigeration & Cold Room Technician" },
      type: { th: "งานประจำ", en: "Full-time" },
      location: { th: "ประจำกรุงเทพฯ · เดินทางต่างจังหวัด", en: "Bangkok-based · Upcountry travel" },
      requirements: {
        th: [
          "สามารถทำงานภาคสนามและยกอุปกรณ์หนักได้",
          "วุฒิระดับ ปวช. ขึ้นไป",
          "มีประสบการณ์ในสายงานระบบทำความเย็นหรือเครื่องเย็น",
          "ขับรถได้และมีใบขับขี่",
          "พร้อมเริ่มงานได้ ไม่ติดภาระผูกพันที่ต้องหยุดงานระยะยาว",
          "สามารถเดินทางไปปฏิบัติงานต่างจังหวัดได้"
        ],
        en: [
          "Able to perform field work and handle heavy equipment",
          "Vocational certificate (Por.Wor.Chor.) or higher",
          "Experience in refrigeration or cooling systems",
          "Able to drive, with a valid licence",
          "Available to start, with no commitments requiring extended leave",
          "Able to travel for upcountry assignments"
        ]
      }
    },
    {
      id: "technician-assistant",
      title: { th: "ผู้ช่วยช่าง เครื่องทำความเย็น / ห้องเย็น", en: "Refrigeration & Cold Room Technician Assistant" },
      type: { th: "งานประจำ", en: "Full-time" },
      location: { th: "ประจำกรุงเทพฯ · เดินทางต่างจังหวัด", en: "Bangkok-based · Upcountry travel" },
      requirements: {
        th: [
          "สามารถทำงานภาคสนามและยกอุปกรณ์หนักได้",
          "วุฒิระดับ ปวช. ขึ้นไป",
          "มีประสบการณ์ในสายงานระบบทำความเย็นหรือเครื่องเย็น",
          "ขับรถได้และมีใบขับขี่",
          "พร้อมเริ่มงานได้ ไม่ติดภาระผูกพันที่ต้องหยุดงานระยะยาว",
          "สามารถเดินทางไปปฏิบัติงานต่างจังหวัดได้"
        ],
        en: [
          "Able to perform field work and handle heavy equipment",
          "Vocational certificate (Por.Wor.Chor.) or higher",
          "Experience in refrigeration or cooling systems",
          "Able to drive, with a valid licence",
          "Available to start, with no commitments requiring extended leave",
          "Able to travel for upcountry assignments"
        ]
      }
    }
  ],

  // สวัสดิการ
  benefits: {
    title: { th: "สวัสดิการ", en: "Benefits" },
    note: { th: "บริษัทฯ มีสวัสดิการที่ดี ครบครัน ดูแลพนักงานทุกคน", en: "A complete benefits package — we look after everyone on the team." },
    items: {
      th: ["เครื่องแบบพนักงาน", "ค่าล่วงเวลา (OT)", "เบี้ยเลี้ยงเดินทาง", "ประกันสังคม", "วันหยุดพักผ่อนประจำปี"],
      en: ["Staff uniform", "Overtime pay (OT)", "Travel allowance", "Social security", "Annual leave"]
    }
  },

  noOpenings: {
    th: "ตอนนี้ยังไม่มีตำแหน่งที่เปิดรับ แต่เรายินดีรับประวัติไว้พิจารณาเสมอ — ถ้าคุณสนใจงานสายระบบทำความเย็น ส่งประวัติมาได้เลย",
    en: "No positions are open right now, but we're always glad to keep a CV on file. If refrigeration work interests you, send it over."
  },
  howToApply: { th: "ส่งประวัติมาที่", en: "Send your CV to" }
};

// ===== 8. แถบข้อความและปุ่มทั่วไป (Translations UI) =====
// แก้ไขข้อความปุ่ม และชื่อเมนู หรือส่วนต้อนรับอื่นๆ บนหน้าเว็บ
// หมายเหตุ: คีย์ของ hero / about / stats / whyChooseUs / ข้อมูลติดต่อ ไม่ได้อยู่ตรงนี้แล้ว
// เพราะมันถูกเขียนทับด้วย heroText, aboutText, stats, whyChooseUs และ companyInfo ด้านบนเสมอ
// แก้ที่บล็อกพวกนั้นแทน แก้ตรงนี้จะไม่มีผลอะไรเลย
export const translationsUI = {
  th: {
    navHome: "หน้าแรก",
    navServices: "บริการ",
    navProjects: "ผลงาน",
    navWhyUs: "ทำไมต้องเลือกเรา",
    navKnowledge: "คลังความรู้",
    navAbout: "เกี่ยวกับเรา",
    navContact: "ติดต่อ",
    btnQuote: "ขอใบเสนอราคา",
    btnQuoteFree: "ขอใบเสนอราคาฟรี",
    btnViewAll: "ดูผลงานทั้งหมด",
    btnReadMore: "อ่านเพิ่มเติม",
    btnViewDetails: "ดูรายละเอียด",


    servicesTitle: "บริการของเรา",
    servicesSubtitle: "OUR SERVICES",
    service1Title: "ห้องเย็น (Cold Room)",
    service1Desc: "ออกแบบ ติดตั้งห้องเย็นคลังสินค้าและแช่แข็งประสิทธิภาพสูง ควบคุมอุณหภูมิแม่นยำเพื่อรักษาคุณภาพสินค้า",
    service2Title: "ระบบชิลเลอร์ (Chiller System)",
    service2Desc: "ระบบระบายความร้อนด้วยน้ำและอากาศสำหรับกระบวนการผลิตอุตสาหกรรมขนาดใหญ่ ช่วยประหยัดพลังงานสูงสุด",
    service3Desc: "ห้องทดสอบอุณหภูมิและความชื้นพิเศษสำหรับห้องแล็บ โรงงานยา และอุตสาหกรรมอิเล็กทรอนิกส์มาตรฐานสูง",
    service4Title: "ประตูความเร็วสูง (Hi-Speed Door)",
    service4Desc: "ประตูม้วนความเร็วสูง ป้องกันฝุ่น แมลง และรักษาอุณหภูมิในคลังสินค้าได้อย่างดีเยี่ยม",
    service5Title: "ระบบมอนิเตอร์ริ่ง (Monitoring System)",
    service5Desc: "ระบบควบคุมและตรวจสอบอุณหภูมิอัจฉริยะแบบเรียลไทม์ 24 ชม. พร้อมระบบแจ้งเตือนผ่านสมาร์ทโฟน",

    projectsTitle: "ผลงานของเรา",
    projectsSubtitle: "OUR PROJECTS",
    project1Title: "ห้องเย็นอุตสาหกรรมอาหาร",
    project1Location: "สมุทรปราการ",
    project2Title: "ระบบชิลเลอร์โรงงานผลิต",
    project2Location: "ปทุมธานี",
    project3Title: "ห้องเย็นแช่แข็ง -25°C",
    project3Location: "ชลบุรี",
    project4Title: "ประตูความเร็วสูงคลังสินค้า",
    project4Location: "ระยอง",

    whyTitle: "ทำไมต้องเลือก THERMO",
    whySubtitle: "WHY CHOOSE THERMO",

    knowledgeTitle: "คลังความรู้",
    knowledgeSubtitle: "KNOWLEDGE CENTER",
    articleBadge: "บทความ",
    article1Title: "5 วิธีดูแลห้องเย็นให้เย็นจัด ประหยัดพลังงาน",
    article1Date: "10 พ.ค. 2567",
    article2Title: "Chiller System คืออะไร ทำงานอย่างไร",
    article2Date: "2 พ.ค. 2567",
    article3Title: "ระบบทำความเย็นกับการประหยัดพลังงาน",
    article3Date: "25 เม.ย. 2567",
    article4Title: "Hi-speed Door กับห้องเย็น สำคัญอย่างไร",
    article4Date: "18 เม.ย. 2567",

    aboutTitle: "เกี่ยวกับเรา",
    aboutSubtitle: "ABOUT US",

    ctaText: "ให้เราช่วยออกแบบโซลูชันความเย็นที่เหมาะสมกับธุรกิจของคุณ",
    ctaSub: "ปรึกษาฟรี โดยทีมวิศวกรผู้เชี่ยวชาญ",
    contactTitle: "ติดต่อเรา",
    contactAddressLabel: "ที่อยู่สำนักงานใหญ่",

    // Contact Form
    contactFormName: "ชื่อ",
    contactFormCompany: "บริษัท",
    contactFormPhone: "เบอร์โทร",
    contactFormEmail: "อีเมล",
    contactFormInterest: "ประเภทงานที่สนใจ",
    contactFormDetails: "รายละเอียดโครงการ",
    contactFormSubmit: "ส่งข้อมูล",
    contactFormSuccess: "ขอบคุณค่ะ เราจะติดต่อกลับโดยเร็ว",
    contactFormValidation: "กรุณากรอกข้อมูลในช่องที่จำเป็นให้ครบถ้วน",

    footerServices: "บริการของเรา",
    footerCompany: "บริษัท",
    footerKnowledge: "คลังความรู้",
    footerContact: "ติดต่อเรา",
    footerTagline: "ผู้เชี่ยวชาญระบบทำความเย็นอุตสาหกรรมแบบครบวงจร ด้วยคุณภาพ มาตรฐานสากล และบริการที่ไว้ใจได้"
  },
  en: {
    navHome: "Home",
    navServices: "Services",
    navProjects: "Projects",
    navWhyUs: "Why Us",
    navKnowledge: "Knowledge",
    navAbout: "About",
    navContact: "Contact",
    btnQuote: "Get a Quote",
    btnQuoteFree: "Get a Free Quote",
    btnViewAll: "View All Projects",
    btnReadMore: "Read More",
    btnViewDetails: "View Details",


    servicesTitle: "Our Services",
    servicesSubtitle: "OUR SERVICES",
    service1Title: "Cold Room",
    service1Desc: "Design and installation of high-efficiency cold rooms and blast freezers with precise temperature control to preserve product freshness.",
    service2Title: "Chiller System",
    service2Desc: "Water-cooled and air-cooled industrial chiller systems for large manufacturing processes, maximizing energy savings.",
    service3Desc: "High-precision temperature and humidity control rooms for laboratories, pharmaceutical plants, and high-tech electronics.",
    service4Title: "Hi-Speed Door",
    service4Desc: "High-speed roller doors preventing dust and pests, while excellently maintaining indoor temperatures within warehouse environments.",
    service5Title: "Monitoring System",
    service5Desc: "24/7 smart real-time temperature monitoring and logging system with immediate warnings sent directly to smartphones.",

    projectsTitle: "Our Projects",
    projectsSubtitle: "OUR PROJECTS",
    project1Title: "Industrial Food Cold Room",
    project1Location: "Samut Prakan",
    project2Title: "Factory Chiller System",
    project2Location: "Pathum Thani",
    project3Title: "Freezer Cold Room -25°C",
    project3Location: "Chonburi",
    project4Title: "Warehouse High-Speed Door",
    project4Location: "Rayong",

    whyTitle: "Why Choose THERMO",
    whySubtitle: "WHY CHOOSE THERMO",

    knowledgeTitle: "Knowledge Center",
    knowledgeSubtitle: "KNOWLEDGE CENTER",
    articleBadge: "Article",
    article1Title: "5 Ways to Maintain Your Cold Room for Peak Cooling & Energy Savings",
    article1Date: "May 10, 2024",
    article2Title: "What is a Chiller System and How Does It Work?",
    article2Date: "May 2, 2024",
    article3Title: "Cooling Systems and Energy Conservation",
    article3Date: "Apr 25, 2024",
    article4Title: "Why High-Speed Doors are Crucial for Cold Rooms",
    article4Date: "Apr 18, 2024",

    aboutTitle: "About Us",
    aboutSubtitle: "ABOUT US",

    ctaText: "Let us help design the cooling solution tailored to your business",
    ctaSub: "Free consultation by our expert engineering team",
    contactTitle: "Contact Us",
    contactAddressLabel: "Headquarters Address",

    // Contact Form
    contactFormName: "Name",
    contactFormCompany: "Company",
    contactFormPhone: "Phone",
    contactFormEmail: "Email",
    contactFormInterest: "Service of Interest",
    contactFormDetails: "Project Details",
    contactFormSubmit: "Send",
    contactFormSuccess: "Thank you! We will contact you back as soon as possible.",
    contactFormValidation: "Please fill in all required fields.",

    footerServices: "Our Services",
    footerCompany: "Company",
    footerKnowledge: "Knowledge Center",
    footerContact: "Contact Us",
    footerTagline: "Industrial refrigeration and cooling systems specialist, providing global quality standards and trusted services."
  }
};

// =========================================================================
// โค้ดส่วนจัดการเบื้องหลัง (Backend Mapping - ห้ามแก้ไขหากไม่มีความเชี่ยวชาญ)
// =========================================================================
// ส่วนนี้มีหน้าที่เชื่อมต่อระหว่างโครงสร้างข้อมูลที่แก้ไขง่ายด้านบน เข้ากับระบบเดิมของเว็บไซต์
// เพื่อให้เว็บไซต์ทำงานได้อย่างถูกต้อง รวดเร็ว โดยไม่มีส่วนใดๆ บกพร่อง

// 1. สร้างตัวแปร translations ของหน้าเว็บทั้งหมด
export const translations = {
  th: {
    ...translationsUI.th,
    contactAddress: companyInfo.address.th,
    contactPhone: companyInfo.phone,
    contactEmail: companyInfo.email,
    contactWeb: companyInfo.web,
    heroTitle: heroText.title.th,
    heroSubtitle: heroText.subtitle.th,
    heroTagline: heroText.tagline.th,
    feature1: heroText.features.th[0],
    feature2: heroText.features.th[1],
    feature3: heroText.features.th[2],
    aboutDescription: aboutText.description.th
  },
  en: {
    ...translationsUI.en,
    contactAddress: companyInfo.address.en,
    contactPhone: companyInfo.phone,
    contactEmail: companyInfo.email,
    contactWeb: companyInfo.web,
    heroTitle: heroText.title.en,
    heroSubtitle: heroText.subtitle.en,
    heroTagline: heroText.tagline.en,
    feature1: heroText.features.en[0],
    feature2: heroText.features.en[1],
    feature3: heroText.features.en[2],
    aboutDescription: aboutText.description.en
  }
};

// 2. แมพรายการ Services เข้าสู่รูปแบบดั้งเดิมที่คอมโพเนนต์ต้องการ
export const servicesData = services.map((s, idx) => ({
  id: s.id,
  titleKey: `service${idx + 1}Title`,
  descKey: `service${idx + 1}Desc`,
  imgName: s.imgName,
  iconName: s.iconName
}));

// อัปเดตคีย์ใน Translations ให้ตรงกับคีย์ของ ServicesData
services.forEach((s, idx) => {
  translations.th[`service${idx + 1}Title`] = s.title.th;
  translations.th[`service${idx + 1}Desc`] = s.description.th;
  translations.en[`service${idx + 1}Title`] = s.title.en;
  translations.en[`service${idx + 1}Desc`] = s.description.en;
});

// 3. แมพรายละเอียดบริการเชิงลึก (Services Details List)
export const servicesDetailList = services.map(s => ({
  id: s.id,
  titleTh: s.title.th,
  titleEn: s.title.en,
  introTh: s.intro.th,
  introEn: s.intro.en,
  paragraphsTh: s.paragraphs.th,
  paragraphsEn: s.paragraphs.en,
  featuresTh: s.features.th,
  featuresEn: s.features.en,
  industriesTh: s.industries.th,
  industriesEn: s.industries.en,
  imgName: s.imgName,
  specsTh: s.specs.th,
  specsEn: s.specs.en
}));

// ตัวแปรสำหรับ ServiceModal.tsx คีย์แบบ Record<lang, Record<id, details>>
export const serviceDetailsData = {
  th: services.reduce((acc, s) => {
    acc[s.id] = {
      title: s.title.th,
      subTitle: s.subTitle.th,
      img: s.imgName,
      description: s.intro.th,
      features: s.features.th,
      specs: s.specs.th
    };
    return acc;
  }, {}),
  en: services.reduce((acc, s) => {
    acc[s.id] = {
      title: s.title.en,
      subTitle: s.subTitle.en,
      img: s.imgName,
      description: s.intro.en,
      features: s.features.en,
      specs: s.specs.en
    };
    return acc;
  }, {})
};

// 4. แมพผลงานเข้ากับคีย์ดั้งเดิม
// ผลงานที่โชว์บนหน้าแรก = อันที่ใส่ featured: true ไว้ (เลือกได้เลยว่าจะโชว์อันไหน)
const featuredProjects = projects.filter(p => p.featured).slice(0, 4);

export const projectsData = featuredProjects.map((p, idx) => ({
  id: p.id,
  titleKey: `project${idx + 1}Title`,
  locationKey: `project${idx + 1}Location`,
  imgName: p.imgName
}));

featuredProjects.forEach((p, idx) => {
  translations.th[`project${idx + 1}Title`] = p.title.th;
  translations.th[`project${idx + 1}Location`] = p.location.th;
  translations.en[`project${idx + 1}Title`] = p.title.en;
  translations.en[`project${idx + 1}Location`] = p.location.en;
});

export const portfolioProjectsList = projects.map(p => ({
  id: p.id,
  titleTh: p.title.th,
  titleEn: p.title.en,
  clientTh: p.client.th,
  clientEn: p.client.en,
  scopeTh: p.scope.th,
  scopeEn: p.scope.en,
  categoryTh: p.category.th,
  categoryEn: p.category.en,
  locationTh: p.location.th,
  locationEn: p.location.en,
  imgName: p.imgName
}));

// รายชื่อหมวดหมู่ผลงาน — สร้างอัตโนมัติจาก projects ด้านบน
// เพิ่มหมวดใหม่ใน projects ได้เลย ปุ่ม filter จะขึ้นเอง ไม่ต้องแก้โค้ด
export const portfolioCategories = (() => {
  const seen = [];
  projects.forEach(p => {
    if (!seen.some(c => c.th === p.category.th)) {
      seen.push({ th: p.category.th, en: p.category.en });
    }
  });
  return seen;
})();

// 5. แมพทำไมต้องเลือกเรา
export const whyChooseUsData = whyChooseUs.map((w, idx) => ({
  id: w.id,
  iconName: w.iconName,
  titleKey: `whyItem${idx + 1}Title`,
  descKey: `whyItem${idx + 1}Desc`
}));

whyChooseUs.forEach((w, idx) => {
  translations.th[`whyItem${idx + 1}Title`] = w.title.th;
  translations.th[`whyItem${idx + 1}Desc`] = w.desc.th;
  translations.en[`whyItem${idx + 1}Title`] = w.title.en;
  translations.en[`whyItem${idx + 1}Desc`] = w.desc.en;
});

// 6. แมพสถิติความสำเร็จ
export const statsData = stats.map((st, idx) => ({
  id: st.id,
  numKey: `stat${idx + 1}Num`,
  labelKey: `stat${idx + 1}Label`,
  iconName: st.iconName
}));

stats.forEach((st, idx) => {
  translations.th[`stat${idx + 1}Num`] = st.num.th;
  translations.th[`stat${idx + 1}Label`] = st.label.th;
  translations.en[`stat${idx + 1}Num`] = st.num.en;
  translations.en[`stat${idx + 1}Label`] = st.label.en;
});

// เดิมหัวข้อ "ทำไมต้องเลือกเรา" ไม่ได้อ่านจาก whyChooseUs ด้านบนเลย
// ทำให้แก้ whyChooseUs แล้วเว็บไม่เปลี่ยน — บรรทัดพวกนี้แก้ให้อ่านจาก whyChooseUs จริงๆ
whyChooseUs.forEach((w, idx) => {
  translations.th[`whyItem${idx + 1}Title`] = w.title.th;
  translations.th[`whyItem${idx + 1}Desc`] = w.desc.th;
  translations.en[`whyItem${idx + 1}Title`] = w.title.en;
  translations.en[`whyItem${idx + 1}Desc`] = w.desc.en;
});

// 7. แมพรายการบทความสาระความรู้
export const articlesData = articles.slice(0, 4).map((a, idx) => ({
  id: a.id,
  titleKey: `article${idx + 1}Title`,
  dateKey: `article${idx + 1}Date`,
  imgName: a.image
}));

articles.slice(0, 4).forEach((a, idx) => {
  translations.th[`article${idx + 1}Title`] = a.title.th;
  translations.th[`article${idx + 1}Date`] = a.date.th;
  translations.en[`article${idx + 1}Title`] = a.title.en;
  translations.en[`article${idx + 1}Date`] = a.date.en;
});

export const articlesList = articles.map(a => ({
  id: a.id,
  titleTh: a.title.th,
  titleEn: a.title.en,
  dateTh: a.date.th,
  dateEn: a.date.en,
  datePublishedISO: a.datePublishedISO,
  dateModifiedISO: a.dateModifiedISO,
  categoryTh: a.category.th,
  categoryEn: a.category.en,
  excerptTh: a.excerpt.th,
  excerptEn: a.excerpt.en,
  contentTh: a.body.th,
  contentEn: a.body.en,
  imgName: a.image,
  bodyMarkdownTh: a.bodyMarkdown ? a.bodyMarkdown.th : null,
  bodyMarkdownEn: a.bodyMarkdown ? a.bodyMarkdown.en : null
}));

// รายชื่อหมวดหมู่คลังความรู้ — สร้างอัตโนมัติจาก articles ด้านบน
// เพิ่มหมวดใหม่ในบทความได้เลย ปุ่ม filter จะขึ้นเอง (ทำงานเหมือนหน้า Portfolio)
export const knowledgeCategories = (() => {
  const seen = [];
  articles.forEach(a => {
    if (!seen.some(c => c.th === a.category.th)) {
      seen.push({ th: a.category.th, en: a.category.en });
    }
  });
  return seen;
})();
