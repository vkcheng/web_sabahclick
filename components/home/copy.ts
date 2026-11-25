import type { Language } from "@/lib/i18n/translations"

export type NeedId = "web" | "app" | "flow" | "ai" | "training" | "unsure"
export type ProblemId = "replies" | "excel" | "stock" | "reports" | "followup" | "skills"
export type ModuleId = "web" | "app" | "flow"

export const NEED_IDS: NeedId[] = ["web", "app", "flow", "ai", "training", "unsure"]
export const PROBLEM_IDS: ProblemId[] = ["replies", "excel", "stock", "reports", "followup", "skills"]
export const MODULE_IDS: ModuleId[] = ["web", "app", "flow"]

type Module = { key: string; title: string; body: string; items: string[] }

type MessageParts = { needs: string[]; problems: string[]; name: string; business: string; note: string }

type Copy = {
    nav: { build: string; training: string; app: string; contact: string; whatsapp: string; menu: string; close: string; language: string; skip: string; home: string }
    hero: { line1: string; line2: string; body: string; primary: string; secondary: string; offers: [string, string][] }
    face: { idle: string; awake: string; alt: string }
    build: { title: string; lead: string; add: string; added: string; modules: Record<ModuleId, Module> }
    training: { title: string; lead: string; audiences: [string, string][]; facts: [string, string][]; add: string; added: string }
    start: { title: string; lead: string; steps: { title: string; body: string }[] }
    app: { title: string; body: string; specs: [string, string][]; more: string; privacy: string }
    contact: { title: string; body: string; whatsapp: string; email: string; location: string; place: string }
    form: {
        needsLabel: string
        needs: Record<NeedId, string>
        problemsLabel: string
        problems: Record<ProblemId, string>
        multi: string
        name: string
        business: string
        businessHint: string
        note: string
        optional: string
        selected: string
        send: string
        sendHint: string
        message: (parts: MessageParts) => string
        hello: string
    }
    footer: { line: string }
}

const list = (items: string[]) => items.map(item => `• ${item}`).join("\n")

export const copy: Record<Language, Copy> = {
    en: {
        nav: { build: "Custom systems", training: "AI training", app: "VKscanner", contact: "Contact", whatsapp: "WhatsApp us", menu: "Menu", close: "Close menu", language: "Language", skip: "Skip to content", home: "Home" },
        hero: {
            line1: "AI for the work",
            line2: "you do every day.",
            body: "SabahClick helps Sabah businesses hand their daily workflows to AI. We build custom web systems, mobile apps and workflow systems around the way you already work, then train your team to get more done with AI. We're in Kota Kinabalu, so we can meet in person.",
            primary: "Tell us what you need",
            secondary: "See what we build",
            offers: [["#web", "Web systems"], ["#app", "Mobile apps"], ["#flow", "Workflow systems"], ["#training", "AI training"]],
        },
        face: { idle: "SabahClick AI · idle", awake: "SabahClick AI · watching you", alt: "A cartoon girl drawn from digital symbols. Her eyes follow your pointer." },
        build: {
            title: "Custom systems",
            lead: "Software made for the way your business actually runs, with AI built in where it saves time.",
            add: "Add to my request",
            added: "Added to request",
            modules: {
                web: { key: "Web", title: "Web systems", body: "Systems your staff and customers use in the browser.", items: ["Online booking and ordering", "Customer and member portals", "Admin dashboards and reports"] },
                app: { key: "App", title: "Mobile apps", body: "Android and iOS apps for your staff or your customers.", items: ["Staff apps for stock counts, field work and check-ins", "Customer apps for orders, bookings and points", "Connected to the systems you already use"] },
                flow: { key: "Flow", title: "Workflow systems", body: "Your everyday jobs, organised and handed to AI where it helps.", items: ["Stock, orders, invoices and daily reports", "AI assistants that answer WhatsApp enquiries", "Reading receipts, forms and documents automatically", "Connecting Google Sheets, accounting software and WhatsApp"] },
            },
        },
        training: {
            title: "AI training",
            lead: "Practical classes that help your team get more done with AI. Real work, not theory.",
            audiences: [
                ["Owners and managers", "See where AI is worth using in your business, and where it isn't."],
                ["Staff teams", "In-company training on the AI tools for their own daily jobs."],
                ["Public workshops", "Open classes for anyone who wants to start."],
            ],
            facts: [["Language", "Mandarin"], ["Where", "In person, Sabah"]],
            add: "Add training to my request",
            added: "Training added",
        },
        start: {
            title: "How we start",
            lead: "No big package up front. We begin small and grow with what works.",
            steps: [
                { title: "Meet in person", body: "We come to see how your business runs and which jobs take your team's time." },
                { title: "Fix one workflow first", body: "Start with a single job: a small system, an AI assistant, or a class for the people who do it." },
                { title: "Expand what works", body: "When it helps in daily use, we take the next step together." },
            ],
        },
        app: {
            title: "Built by us: VKscanner",
            body: "Our own Android app for scanning documents, recognising text and exporting PDFs. It runs on your phone and works completely offline.",
            specs: [["On-device", "No cloud upload"], ["No tracking", "No sign-in, ads or analytics"], ["Text recognition", "Receipts, forms and invoices"], ["Free", "For everyday work"]],
            more: "About VKscanner",
            privacy: "Privacy policy",
        },
        contact: {
            title: "Tell us what you need.",
            body: "Pick what you're after and what's slowing you down. Choose as many as you like. We'll open WhatsApp with your message ready to send.",
            whatsapp: "WhatsApp",
            email: "Email",
            location: "Location",
            place: "Kota Kinabalu, Sabah",
        },
        form: {
            needsLabel: "What do you need?",
            needs: { web: "Web system", app: "Mobile app", flow: "Workflow system", ai: "AI assistant or automation", training: "AI training", unsure: "Not sure yet" },
            problemsLabel: "What's slowing you down?",
            problems: {
                replies: "Answering the same WhatsApp questions all day",
                excel: "Typing data into Excel by hand",
                stock: "Hard to keep track of stock and orders",
                reports: "Reports take too long",
                followup: "Following up with customers",
                skills: "Our staff don't know how to use AI",
            },
            multi: "Choose any",
            name: "Your name",
            business: "Business type",
            businessHint: "Homestay, restaurant, trading…",
            note: "Anything else?",
            optional: "Optional",
            selected: "Selected",
            send: "Send on WhatsApp",
            sendHint: "Opens WhatsApp with your message filled in. Nothing is sent until you press send there.",
            message: ({ needs, problems, name, business, note }) => [
                `Hi SabahClick${name ? `, I'm ${name}` : ""}.${business ? ` I run a ${business} business.` : ""}`,
                needs.length ? `What I need:\n${list(needs)}` : "",
                problems.length ? `What's slowing us down:\n${list(problems)}` : "",
                note ? `Also: ${note}` : "",
                "Can we talk?",
            ].filter(Boolean).join("\n\n"),
            hello: "Hi SabahClick, I'd like to talk about using AI in my business.",
        },
        footer: { line: "Custom web systems, mobile apps, workflow systems and AI training. Kota Kinabalu, Sabah." },
    },
    cn: {
        nav: { build: "定制系统", training: "AI 培训", app: "VKscanner", contact: "联系", whatsapp: "WhatsApp 我们", menu: "菜单", close: "关闭菜单", language: "语言", skip: "跳到主要内容", home: "首页" },
        hero: {
            line1: "用 AI，",
            line2: "理顺你每天的工作。",
            body: "SabahClick 用 AI 帮沙巴本地商家解决每天的工作流程：按你现在的做事方式，定制网站系统、手机 App 和日常工作流系统，再培训你的团队用 AI 提高效率。我们就在亚庇，可以当面谈。",
            primary: "告诉我们你的需要",
            secondary: "看看我们做什么",
            offers: [["#web", "网站系统"], ["#app", "手机 App"], ["#flow", "工作流系统"], ["#training", "AI 提效培训"]],
        },
        face: { idle: "SabahClick AI · 待机", awake: "SabahClick AI · 正在看你", alt: "用数码符号拼成的卡通女孩，眼睛会跟着你的鼠标看。" },
        build: {
            title: "定制系统",
            lead: "按你生意实际的运作方式开发软件，在能省时间的地方放进 AI。",
            add: "加入我的需求",
            added: "已加入需求",
            modules: {
                web: { key: "Web", title: "网站系统", body: "员工和顾客在浏览器里使用的系统。", items: ["网上预约和下单", "顾客和会员专区", "后台管理和报表"] },
                app: { key: "App", title: "手机 App", body: "给员工或顾客用的 Android 和 iOS App。", items: ["员工 App：盘点库存、外勤工作、打卡", "顾客 App：下单、预约、积分", "和你现有的系统连在一起"] },
                flow: { key: "Flow", title: "日常工作流系统", body: "把每天的工作整理好，适合的部分交给 AI。", items: ["库存、订单、发票和每日报表", "自动回复 WhatsApp 询问的 AI 助手", "自动识别收据、表格和文件", "串接 Google Sheet、会计软件和 WhatsApp"] },
            },
        },
        training: {
            title: "AI 提效培训",
            lead: "实用的课程，帮你的团队用 AI 提高效率。讲真实工作，不讲空泛理论。",
            audiences: [
                ["老板和管理层", "看清 AI 在你的生意里哪里值得用，哪里不值得。"],
                ["员工团队", "到公司包场培训，学会在自己每天的工作里用 AI 工具。"],
                ["公开课和工作坊", "个人也可以报名，从零开始。"],
            ],
            facts: [["授课语言", "华语"], ["上课地点", "沙巴线下"]],
            add: "把培训加入需求",
            added: "已加入培训",
        },
        start: {
            title: "怎么开始",
            lead: "不先卖大套餐。从小处开始，有效再一起扩大。",
            steps: [
                { title: "当面聊", body: "我们上门看你的生意怎么运作，哪些事最占团队的时间。" },
                { title: "先改一个流程", body: "从一件事开始：一个小系统、一个 AI 助手，或给做这件事的人上一堂课。" },
                { title: "有效再扩大", body: "在日常工作里真的有帮助，我们再一起做下一步。" },
            ],
        },
        app: {
            title: "我们自己做的：VKscanner",
            body: "我们自己开发的 Android App，可以扫描文件、识别文字、导出 PDF。全部在手机上处理，完全离线也能用。",
            specs: [["设备上处理", "不上传云端"], ["零追踪", "免登录、无广告、无分析"], ["文字识别", "收据、表格和发票"], ["免费", "日常工作好帮手"]],
            more: "了解 VKscanner",
            privacy: "隐私政策",
        },
        contact: {
            title: "告诉我们你的需要。",
            body: "选出你需要的服务和遇到的问题，可以多选。我们会打开 WhatsApp，把讯息帮你写好。",
            whatsapp: "WhatsApp",
            email: "电邮",
            location: "地点",
            place: "沙巴亚庇",
        },
        form: {
            needsLabel: "你需要什么？",
            needs: { web: "网站系统", app: "手机 App", flow: "工作流系统", ai: "AI 助手或自动化", training: "AI 培训", unsure: "还不确定" },
            problemsLabel: "现在遇到什么问题？",
            problems: {
                replies: "整天回复一样的 WhatsApp 问题",
                excel: "手动把资料打进 Excel",
                stock: "库存和订单很难跟进",
                reports: "做报表太花时间",
                followup: "跟进客户",
                skills: "员工不懂得用 AI",
            },
            multi: "可多选",
            name: "你的名字",
            business: "生意类型",
            businessHint: "民宿、餐厅、贸易……",
            note: "其他补充",
            optional: "选填",
            selected: "已选",
            send: "发送到 WhatsApp",
            sendHint: "会打开 WhatsApp 并填好讯息，你在那里按发送才会送出。",
            message: ({ needs, problems, name, business, note }) => [
                `你好 SabahClick${name ? `，我是${name}` : ""}${business ? `，我做${business}生意` : ""}。`,
                needs.length ? `我需要：\n${list(needs)}` : "",
                problems.length ? `现在遇到的问题：\n${list(problems)}` : "",
                note ? `补充：${note}` : "",
                "可以聊聊吗？",
            ].filter(Boolean).join("\n\n"),
            hello: "你好 SabahClick，我想聊聊怎么在生意里用 AI。",
        },
        footer: { line: "定制网站系统、手机 App、工作流系统与 AI 提效培训。沙巴亚庇。" },
    },
    bm: {
        nav: { build: "Sistem tersuai", training: "Latihan AI", app: "VKscanner", contact: "Hubungi", whatsapp: "WhatsApp kami", menu: "Menu", close: "Tutup menu", language: "Bahasa", skip: "Langkau ke kandungan", home: "Utama" },
        hero: {
            line1: "AI untuk kerja",
            line2: "yang anda buat setiap hari.",
            body: "SabahClick membantu perniagaan di Sabah menyerahkan aliran kerja harian kepada AI. Kami membina sistem web, aplikasi mudah alih dan sistem aliran kerja tersuai mengikut cara anda bekerja, kemudian melatih pasukan anda untuk bekerja lebih pantas dengan AI. Kami di Kota Kinabalu, jadi kita boleh berjumpa.",
            primary: "Beritahu keperluan anda",
            secondary: "Lihat apa kami bina",
            offers: [["#web", "Sistem web"], ["#app", "Aplikasi mudah alih"], ["#flow", "Sistem aliran kerja"], ["#training", "Latihan AI"]],
        },
        face: { idle: "SabahClick AI · sedia", awake: "SabahClick AI · sedang memerhati", alt: "Gadis kartun yang dibina daripada simbol digital. Matanya mengikut penuding anda." },
        build: {
            title: "Sistem tersuai",
            lead: "Perisian yang dibina mengikut cara perniagaan anda berjalan, dengan AI di tempat yang menjimatkan masa.",
            add: "Tambah ke permintaan",
            added: "Ditambah",
            modules: {
                web: { key: "Web", title: "Sistem web", body: "Sistem yang digunakan staf dan pelanggan dalam pelayar.", items: ["Tempahan dan pesanan dalam talian", "Portal pelanggan dan ahli", "Papan pemuka pentadbir dan laporan"] },
                app: { key: "App", title: "Aplikasi mudah alih", body: "Aplikasi Android dan iOS untuk staf atau pelanggan anda.", items: ["Aplikasi staf untuk kiraan stok, kerja luar dan daftar masuk", "Aplikasi pelanggan untuk pesanan, tempahan dan mata ganjaran", "Disambungkan kepada sistem sedia ada"] },
                flow: { key: "Flow", title: "Sistem aliran kerja", body: "Kerja harian anda tersusun, dan diserahkan kepada AI di mana ia membantu.", items: ["Stok, pesanan, invois dan laporan harian", "Pembantu AI yang membalas pertanyaan WhatsApp", "Membaca resit, borang dan dokumen secara automatik", "Menghubungkan Google Sheets, perisian perakaunan dan WhatsApp"] },
            },
        },
        training: {
            title: "Latihan AI",
            lead: "Kelas praktikal yang membantu pasukan anda bekerja lebih pantas dengan AI. Kerja sebenar, bukan teori.",
            audiences: [
                ["Pemilik dan pengurus", "Kenal pasti di mana AI berbaloi digunakan dalam perniagaan anda, dan di mana tidak."],
                ["Pasukan staf", "Latihan dalam syarikat untuk alat AI dalam kerja harian mereka."],
                ["Bengkel awam", "Kelas terbuka untuk sesiapa yang ingin bermula."],
            ],
            facts: [["Bahasa", "Mandarin"], ["Lokasi", "Bersemuka, Sabah"]],
            add: "Tambah latihan ke permintaan",
            added: "Latihan ditambah",
        },
        start: {
            title: "Cara kita bermula",
            lead: "Tiada pakej besar di awal. Kita mula kecil dan berkembang dengan apa yang berkesan.",
            steps: [
                { title: "Berjumpa", body: "Kami datang melihat cara perniagaan anda berjalan dan kerja yang makan masa pasukan anda." },
                { title: "Baiki satu aliran kerja dahulu", body: "Mula dengan satu kerja: sistem kecil, pembantu AI atau kelas untuk orang yang melakukannya." },
                { title: "Kembangkan yang berkesan", body: "Apabila ia membantu dalam kerja harian, kita ambil langkah seterusnya bersama." },
            ],
        },
        app: {
            title: "Dibina oleh kami: VKscanner",
            body: "Aplikasi Android kami sendiri untuk mengimbas dokumen, mengecam teks dan mengeksport PDF. Ia berjalan dalam telefon anda dan berfungsi sepenuhnya tanpa talian.",
            specs: [["Dalam peranti", "Tiada muat naik awan"], ["Tiada penjejakan", "Tiada log masuk, iklan atau analitik"], ["Pengecaman teks", "Resit, borang dan invois"], ["Percuma", "Untuk kerja harian"]],
            more: "Tentang VKscanner",
            privacy: "Dasar privasi",
        },
        contact: {
            title: "Beritahu keperluan anda.",
            body: "Pilih apa yang anda perlukan dan apa yang melambatkan kerja. Pilih seberapa banyak yang anda mahu. Kami akan membuka WhatsApp dengan mesej yang sedia dihantar.",
            whatsapp: "WhatsApp",
            email: "E-mel",
            location: "Lokasi",
            place: "Kota Kinabalu, Sabah",
        },
        form: {
            needsLabel: "Apa yang anda perlukan?",
            needs: { web: "Sistem web", app: "Aplikasi mudah alih", flow: "Sistem aliran kerja", ai: "Pembantu AI atau automasi", training: "Latihan AI", unsure: "Belum pasti" },
            problemsLabel: "Apa yang melambatkan kerja?",
            problems: {
                replies: "Menjawab soalan WhatsApp yang sama sepanjang hari",
                excel: "Menaip data ke dalam Excel secara manual",
                stock: "Sukar menjejak stok dan pesanan",
                reports: "Laporan mengambil masa terlalu lama",
                followup: "Membuat susulan dengan pelanggan",
                skills: "Staf kami tidak tahu menggunakan AI",
            },
            multi: "Pilih mana-mana",
            name: "Nama anda",
            business: "Jenis perniagaan",
            businessHint: "Homestay, restoran, perdagangan…",
            note: "Ada lagi?",
            optional: "Pilihan",
            selected: "Dipilih",
            send: "Hantar di WhatsApp",
            sendHint: "Membuka WhatsApp dengan mesej anda. Tiada apa dihantar sehingga anda menekan hantar di sana.",
            message: ({ needs, problems, name, business, note }) => [
                `Hai SabahClick${name ? `, saya ${name}` : ""}.${business ? ` Saya menjalankan perniagaan ${business}.` : ""}`,
                needs.length ? `Apa yang saya perlukan:\n${list(needs)}` : "",
                problems.length ? `Apa yang melambatkan kerja kami:\n${list(problems)}` : "",
                note ? `Juga: ${note}` : "",
                "Boleh kita berbincang?",
            ].filter(Boolean).join("\n\n"),
            hello: "Hai SabahClick, saya ingin berbincang tentang penggunaan AI dalam perniagaan saya.",
        },
        footer: { line: "Sistem web tersuai, aplikasi mudah alih, sistem aliran kerja dan latihan AI. Kota Kinabalu, Sabah." },
    },
}
