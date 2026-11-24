import type { Language } from "@/lib/i18n/translations"

// Sample workdays for the step row. These are illustrative, labelled "sample" on the page:
// they show the kind of daily jobs AI can take, not records of real clients.

export type Route = "learn" | "assist" | "build"

export type Step = {
    time: string
    route: Route
    task: Record<Language, string>
    help: Record<Language, string>
}

export type Workday = {
    id: string
    name: Record<Language, string>
    steps: Step[]
}

type Row = [time: string, route: Route, enTask: string, enHelp: string, cnTask: string, cnHelp: string, bmTask: string, bmHelp: string]

function day(id: string, name: Record<Language, string>, rows: Row[]): Workday {
    return {
        id,
        name,
        steps: rows.map(([time, route, en, enHelp, cn, cnHelp, bm, bmHelp]) => ({
            time,
            route,
            task: { en, cn, bm },
            help: { en: enHelp, cn: cnHelp, bm: bmHelp },
        })),
    }
}

export const workdays: Workday[] = [
    day("homestay", { en: "Homestay", cn: "民宿", bm: "Homestay" }, [
        ["07:30", "build", "Check today's arrivals", "Bookings from every platform gather into one arrivals list.", "核对今天入住名单", "各订房平台的订单自动汇总成一张入住名单。", "Semak tetamu tiba hari ini", "Tempahan dari semua platform dikumpul dalam satu senarai."],
        ["08:00", "assist", "Reply to overnight enquiries", "An AI assistant drafts replies from your rooms and rates; staff check and send.", "回复昨晚的 WhatsApp 询问", "AI 助手按房况和价格起草回复，员工确认后发送。", "Balas pertanyaan semalam", "Pembantu AI menyediakan draf balasan; staf semak dan hantar."],
        ["08:30", "assist", "Send check-in instructions", "Directions and check-in steps go out automatically before each arrival.", "发送入住指南", "按入住时间自动发出路线和入住说明。", "Hantar arahan daftar masuk", "Arahan dan lokasi dihantar secara automatik sebelum tetamu tiba."],
        ["09:30", "build", "Update room availability", "Change it once and every booking site updates.", "更新各平台房况", "串接各订房平台，一处更新，处处同步。", "Kemas kini bilik kosong", "Ubah sekali, semua laman tempahan dikemas kini."],
        ["11:00", "build", "Plan room cleaning", "Rooms are ordered for cleaning by check-out and arrival times.", "安排清洁顺序", "系统按退房和入住时间排好清洁顺序。", "Atur jadual pembersihan", "Bilik disusun mengikut masa daftar keluar dan masuk."],
        ["12:00", "learn", "Write a promo post", "Staff learn to write posts and captions with AI in ten minutes.", "写社交媒体贴文", "员工学会用 AI 写贴文和图片说明，十分钟完成。", "Tulis hantaran promosi", "Staf belajar menulis hantaran dengan AI dalam sepuluh minit."],
        ["13:00", "assist", "Answer tour questions", "The assistant answers common questions from the notes you give it.", "回答行程和交通问题", "AI 助手用你整理好的资料回答常见问题。", "Jawab soalan lawatan dan pengangkutan", "Pembantu menjawab soalan lazim berdasarkan nota anda."],
        ["14:00", "build", "Record payments and deposits", "Payments land in the records automatically, no copying by hand.", "记录付款和订金", "付款记录自动进表，不再手抄。", "Rekod bayaran dan deposit", "Bayaran direkod secara automatik, tanpa salin tangan."],
        ["15:00", "assist", "Fill in guest details", "AI reads the ID photo and fills in the registration form.", "填写住客资料", "AI 识别证件照片，自动填好住客资料。", "Isi butiran tetamu", "AI membaca gambar kad pengenalan dan mengisi borang."],
        ["15:30", "learn", "Reply to online reviews", "Staff learn to write polite replies in English, Chinese and Malay with AI.", "回复网上评价", "员工学会用 AI 写得体的中英巫三语回复。", "Balas ulasan dalam talian", "Staf belajar membalas ulasan dalam tiga bahasa dengan AI."],
        ["16:00", "build", "Restock supplies", "You get a reminder when toiletries run below your set level.", "补充房间用品", "用品低于设定数量时自动提醒。", "Tambah stok bekalan", "Peringatan dihantar apabila stok kurang daripada paras ditetapkan."],
        ["17:00", "learn", "Translate guest messages", "Staff learn to translate Korean, Chinese and English messages on the spot.", "翻译外国住客讯息", "员工学会用 AI 即时翻译韩文、中文、英文讯息。", "Terjemah mesej tetamu", "Staf belajar menterjemah mesej Korea, Cina dan Inggeris serta-merta."],
        ["18:00", "learn", "Hand over to the night shift", "Turn the day's notes into a handover checklist with AI.", "交接给夜班", "用 AI 把当天事项整理成交接清单。", "Serah tugas kepada syif malam", "Jadikan nota hari ini senarai serahan dengan AI."],
        ["19:00", "assist", "Confirm tomorrow's arrivals", "Confirmation messages go out and the replies come back to you in one list.", "确认明天的入住", "AI 自动发确认讯息，回复汇总给你。", "Sahkan tetamu esok", "Mesej pengesahan dihantar dan balasan dikumpul untuk anda."],
        ["20:00", "build", "Reconcile the day's income", "The system matches bookings and payments and totals the day.", "核对当日收入", "系统自动对账，算出当日营收。", "Padankan pendapatan hari ini", "Sistem memadankan tempahan dan bayaran serta menjumlahkan hari ini."],
        ["21:00", "build", "Send the owner a daily report", "A one-page report reaches the owner's WhatsApp every night.", "发每日报告给老板", "每晚自动生成一页报表，发到老板 WhatsApp。", "Hantar laporan harian kepada pemilik", "Laporan satu halaman dihantar ke WhatsApp pemilik setiap malam."],
    ]),
    day("restaurant", { en: "Restaurant", cn: "餐饮", bm: "Restoran" }, [
        ["07:00", "build", "Check yesterday's stock", "The stock system shows what's left, no counting by hand.", "核对昨天剩余食材", "库存系统直接显示剩余食材，不用手点。", "Semak stok semalam", "Sistem stok menunjukkan baki tanpa perlu kira sendiri."],
        ["07:30", "assist", "Order from suppliers", "AI drafts the order from stock and sales; you approve it and send.", "向供应商订货", "AI 按库存和销量起草订货单，确认后发给供应商。", "Pesan daripada pembekal", "AI menyediakan draf pesanan; anda luluskan dan hantar."],
        ["08:30", "learn", "Write today's specials", "Staff learn to write menu copy and translate it into three languages with AI.", "写今日特餐", "员工学会用 AI 写菜单文案和三语翻译。", "Tulis menu istimewa hari ini", "Staf belajar menulis menu dan menterjemahnya dengan AI."],
        ["10:00", "assist", "Reply to table bookings", "The assistant checks open tables and drafts the reply.", "回复订位讯息", "AI 助手查好空位，起草订位回复。", "Balas tempahan meja", "Pembantu menyemak meja kosong dan menyediakan balasan."],
        ["11:00", "assist", "Check deliveries against invoices", "AI reads the delivery note and invoice and checks quantities and prices.", "收货核对发票", "AI 识别送货单和发票，自动核对数量和价钱。", "Semak penghantaran dengan invois", "AI membaca nota hantaran dan invois serta menyemak kuantiti."],
        ["12:00", "build", "Handle the lunch rush", "Orders go straight from the counter to the kitchen screen.", "处理午餐高峰订单", "点单系统把订单直接送到厨房。", "Urus waktu puncak makan tengah hari", "Pesanan terus dari kaunter ke skrin dapur."],
        ["13:30", "assist", "Answer menu and halal questions", "The assistant answers from your menu and ingredient notes.", "回答菜单和清真问题", "AI 助手用你的菜单资料回答常见问题。", "Jawab soalan menu dan halal", "Pembantu menjawab berdasarkan menu dan nota bahan anda."],
        ["14:30", "learn", "Post today's photos", "Staff learn to write posts and hashtags with AI.", "发今天的美食照片", "员工学会用 AI 写贴文和标签。", "Muat naik gambar hari ini", "Staf belajar menulis hantaran dan tanda pagar dengan AI."],
        ["15:00", "build", "Plan staff shifts", "Shifts are drawn up from headcount, leave and holidays.", "排员工班表", "排班系统按人手、请假和节日排好班。", "Rancang syif pekerja", "Syif disusun mengikut bilangan staf, cuti dan perayaan."],
        ["15:30", "learn", "Reply to Google reviews", "Staff learn to answer good and bad reviews well with AI.", "回复 Google 评价", "员工学会用 AI 得体地回复好评和差评。", "Balas ulasan Google", "Staf belajar membalas ulasan baik dan buruk dengan AI."],
        ["16:00", "learn", "Plan next week's promotion", "Owners and supervisors learn to read sales and brainstorm offers with AI.", "策划下周促销", "老板和主管学会用 AI 看销量、想促销点子。", "Rancang promosi minggu depan", "Pemilik dan penyelia belajar membaca jualan dan mencari idea dengan AI."],
        ["17:00", "build", "Update delivery-app menus", "Change a price once and every delivery app follows.", "更新外卖平台菜单", "串接外卖平台，一处改价，处处同步。", "Kemas kini menu aplikasi penghantaran", "Ubah harga sekali, semua aplikasi ikut serta."],
        ["21:00", "build", "Count cash and e-wallet takings", "Cash and e-wallet sales are totalled for you.", "点算现金和电子钱包收入", "系统自动汇总现金和电子钱包收入。", "Kira tunai dan e-dompet", "Jualan tunai dan e-dompet dijumlahkan untuk anda."],
        ["21:30", "assist", "Record food waste", "Staff take a photo; AI logs the item and quantity.", "记录报废食材", "员工拍照，AI 自动记录报废食材和数量。", "Rekod sisa makanan", "Staf ambil gambar; AI merekod item dan kuantiti."],
        ["22:00", "build", "Send the day's sales report", "A sales report reaches the owner every night.", "发当日销售报表", "每晚自动生成销售报表发给老板。", "Hantar laporan jualan harian", "Laporan jualan dihantar kepada pemilik setiap malam."],
        ["22:30", "assist", "Prepare tomorrow's prep list", "AI works out tomorrow's prep from bookings and sales.", "准备明天的备料清单", "AI 按订位和销量算出明天的备料清单。", "Sedia senarai persediaan esok", "AI mengira persediaan esok berdasarkan tempahan dan jualan."],
    ]),
    day("trading", { en: "Trading", cn: "贸易批发", bm: "Perdagangan" }, [
        ["08:00", "assist", "Read overnight WhatsApp orders", "AI turns chat orders into a standard order sheet.", "整理昨晚的 WhatsApp 订单", "AI 把聊天订单整理成标准订单表。", "Baca pesanan WhatsApp semalam", "AI menukar pesanan sembang kepada borang pesanan standard."],
        ["08:30", "build", "Check stock for each order", "The stock system shows live quantities for every item.", "逐单查库存", "库存系统即时显示每件货的存量。", "Semak stok untuk setiap pesanan", "Sistem stok menunjukkan kuantiti semasa setiap barang."],
        ["09:00", "learn", "Prepare quotations", "Sales staff learn to write quotes and follow-ups quickly with AI.", "做报价单", "业务员学会用 AI 快速写报价和跟进讯息。", "Sediakan sebut harga", "Staf jualan belajar menulis sebut harga dengan cepat menggunakan AI."],
        ["10:00", "build", "Issue invoices", "Invoices are issued as soon as an order is confirmed.", "开发票", "订单确认后自动开发票。", "Keluarkan invois", "Invois dikeluarkan sebaik pesanan disahkan."],
        ["11:00", "build", "Plan delivery routes", "Deliveries are put in order by address.", "安排送货路线", "系统按地址排好送货顺序。", "Rancang laluan penghantaran", "Penghantaran disusun mengikut alamat."],
        ["12:00", "assist", "Key in supplier invoices", "AI reads supplier invoices and enters them for you.", "录入供应商发票", "AI 识别供应商发票，自动录入。", "Masukkan invois pembekal", "AI membaca invois pembekal dan memasukkannya."],
        ["13:30", "assist", "Answer price and stock enquiries", "The assistant replies from your latest price list and stock.", "回答价格和存货询问", "AI 助手按最新价目表和库存回复询问。", "Jawab pertanyaan harga dan stok", "Pembantu membalas berdasarkan senarai harga dan stok terkini."],
        ["14:30", "assist", "Chase late payments", "AI drafts polite reminders based on how overdue each account is.", "催收逾期账款", "AI 按账龄起草礼貌的催款讯息。", "Kejar bayaran lewat", "AI menyediakan peringatan sopan mengikut tempoh tertunggak."],
        ["15:00", "build", "Update the price list", "Change the price list once; quotes and invoices follow.", "更新价目表", "改一次价目表，报价和发票同步更新。", "Kemas kini senarai harga", "Ubah senarai harga sekali; sebut harga dan invois ikut serta."],
        ["15:30", "learn", "Write product descriptions", "Staff learn to write and translate product copy with AI.", "写产品介绍", "员工学会用 AI 写产品介绍和三语翻译。", "Tulis penerangan produk", "Staf belajar menulis dan menterjemah penerangan produk dengan AI."],
        ["16:00", "build", "Reorder from suppliers", "A purchase order is drafted when stock drops below your level.", "向供应商补货", "存量低于设定值时自动生成订货单。", "Pesan semula daripada pembekal", "Pesanan belian disediakan apabila stok jatuh di bawah paras."],
        ["17:00", "assist", "Prepare shipping documents", "AI pre-fills shipping documents from the order.", "准备出货文件", "AI 按订单资料预填出货文件。", "Sediakan dokumen penghantaran", "AI mengisi dokumen penghantaran daripada pesanan."],
        ["18:00", "build", "Match payments to invoices", "Bank receipts are matched to invoices automatically.", "核对入账和发票", "银行入账自动对应发票。", "Padankan bayaran dengan invois", "Penerimaan bank dipadankan dengan invois secara automatik."],
        ["18:30", "build", "Update customer records", "Customer details and history live in one system.", "更新客户资料", "客户资料和交易记录集中在一个系统。", "Kemas kini rekod pelanggan", "Butiran dan sejarah pelanggan dalam satu sistem."],
        ["19:00", "learn", "Review the month's sales", "Owners learn to read sales data and spot best sellers with AI.", "看本月销售", "老板学会用 AI 看懂销售数据、找出畅销品。", "Semak jualan bulan ini", "Pemilik belajar membaca data jualan dan mengenal pasti produk laris dengan AI."],
        ["19:30", "build", "Send the boss a daily summary", "A one-page summary reaches the boss's WhatsApp every evening.", "发每日摘要给老板", "每天自动生成一页摘要，发到老板 WhatsApp。", "Hantar ringkasan harian kepada bos", "Ringkasan satu halaman dihantar ke WhatsApp bos setiap petang."],
    ]),
]
