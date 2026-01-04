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
