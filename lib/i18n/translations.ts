export type Language = 'en' | 'cn' | 'bm';

export type Translation = {
    nav: {
        home: string;
        services: string;
        showcase: string;
        contact: string;
        about: string;
    };
    hero: {
        titleLine1: string;
        titleLine2: string;
        subtitle: string;
        cta: string;
    };
    services: {
        title: string;
        webDesign: string;
        webDesignDesc: string;
        landingPage: string;
        landingPageDesc: string;
        seo: string;
        seoDesc: string;
    };
    aboutSection: {
        headline: string;
        body1: string;
        body2: string;
    };
    contact: {
        title: string;
        name: string;
        email: string;
        tel: string;
        message: string;
        submit: string;
    };
};

export const translations: Record<Language, Translation> = {
    en: {
        nav: {
            home: "Home",
            services: "Services",
            showcase: "Showcase",
            contact: "Contact",
            about: "About",
        },
        hero: {
            titleLine1: "Future-Ready",
            titleLine2: "Web Design",
            subtitle: "Elevate your business with minimalist, high-performance landing pages.",
            cta: "Get Started",
        },
        services: {
            title: "Our Services",
            webDesign: "Web Design",
            webDesignDesc: "Custom built websites with modern aesthetics.",
            landingPage: "Landing Pages",
            landingPageDesc: "High conversion landing pages for small businesses.",
            seo: "SEO Optimization",
            seoDesc: "Rank higher and reach more customers.",
        },
        aboutSection: {
            headline: "Empowering Sabah Businesses, One Click to New Opportunities.",
            body1: "SabahClick was founded with a single mission: to help every local entrepreneur and freelancer in our home state possess a beautiful, professional web presence.",
            body2: "Whether you are based in Kota Kinabalu or anywhere across Sabah, we are here to build the most aesthetic and effective promotional tools for you. Let your business stand out and thrive in the digital age.",
        },
        contact: {
            title: "Get in Touch",
            name: "Name",
            email: "Email",
            tel: "Phone",
            message: "Message",
            submit: "Send Message",
        },
    },
    cn: {
        nav: {
            home: "首页",
            services: "服务",
            showcase: "案例",
            contact: "联系我们",
            about: "关于我们",
        },
        hero: {
            titleLine1: "面向未来的",
            titleLine2: "网页设计",
            subtitle: "以极简、高性能的着陆页提升您的业务。",
            cta: "立即开始",
        },
        services: {
            title: "我们的服务",
            webDesign: "网页设计",
            webDesignDesc: "具有现代美学的定制网站。",
            landingPage: "着陆页制作",
            landingPageDesc: "为小企业打造的高转化率着陆页。",
            seo: "SEO 优化",
            seoDesc: "提高排名，触达更多客户。",
        },
        aboutSection: {
            headline: "赋能沙巴企业，一键开启新机遇。",
            body1: "SabahClick 成立的宗旨只有一个：帮助家乡的每一位本地企业家和自由职业者拥有一个美观、专业的网络形象。",
            body2: "无论您位于亚庇还是沙巴的任何地方，我们都致力于为您打造最美观、最有效的推广工具。让您的业务在数字时代脱颖而出，蓬勃发展。",
        },
        contact: {
            title: "联系我们",
            name: "姓名",
            email: "邮箱",
            tel: "电话",
            message: "留言",
            submit: "发送信息",
        },
    },
    bm: {
        nav: {
            home: "Utama",
            services: "Perkhidmatan",
            showcase: "Galeri",
            contact: "Hubungi",
            about: "Tentang Kami",
        },
        hero: {
            titleLine1: "Reka Bentuk Web",
            titleLine2: "Masa Depan",
            subtitle: "Tingkatkan perniagaan anda dengan halaman pendaratan minimalis dan berprestasi tinggi.",
            cta: "Mula Sekarang",
        },
        services: {
            title: "Perkhidmatan Kami",
            webDesign: "Reka Bentuk Web",
            webDesignDesc: "Laman web tersuai dengan estetika moden.",
            landingPage: "Halaman Pendaratan",
            landingPageDesc: "Halaman pendaratan konversi tinggi untuk perniagaan kecil.",
            seo: "Optimumkan SEO",
            seoDesc: "Tingkatkan kedudukan dan capai lebih ramai pelanggan.",
        },
        aboutSection: {
            headline: "Memperkasa Perniagaan Sabah, Satu Klik ke Peluang Baru.",
            body1: "SabahClick ditubuhkan dengan satu misi: untuk membantu setiap usahawan tempatan dan pekerja bebas di negeri asal kami memiliki kehadiran web yang cantik dan profesional.",
            body2: "Sama ada anda bertapak di Kota Kinabalu atau di mana-mana sahaja di seluruh Sabah, kami berada di sini untuk membina alat promosi yang paling estetik dan berkesan untuk anda. Biarkan perniagaan anda menonjol dan berkembang maju dalam era digital.",
        },
        contact: {
            title: "Hubungi Kami",
            name: "Nama",
            email: "E-mel",
            tel: "Telefon",
            message: "Mesej",
            submit: "Hantar Mesej",
        },
    },
};
