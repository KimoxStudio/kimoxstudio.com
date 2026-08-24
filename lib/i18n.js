// Shared content for Kimox Studio chrome — nav, footer, and site meta that
// render outside the kx-fw content-driven landing sections (those live in
// content/pages/index.json). ES / EN / JA. Each terminal value is { es, en, ja }.

export const I18N = {
  meta: {
    email: "kimoxstudio@gmail.com"
  },

  nav: {
    services: { es: "Servicios", en: "Services", ja: "サービス" },
    webService: { es: "Planes", en: "Plans", ja: "プラン" },
    work: { es: "Proyectos", en: "Work", ja: "プロジェクト" },
    testimonials: { es: "Voces", en: "Voices", ja: "声" },
    about: { es: "Equipo", en: "Team", ja: "チーム" },
    contact: { es: "Contacto", en: "Contact", ja: "お問い合わせ" }
  },

  footer: {
    rights: {
      es: "© 2026 Kimox Studio · Hecho a mano en España",
      en: "© 2026 Kimox Studio · Handcrafted in Spain",
      ja: "© 2026 Kimox Studio · スペインで手作り"
    }
  }
};
