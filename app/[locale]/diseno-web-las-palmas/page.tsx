import ServiceLanding, { type ServiceContent } from "@/components/ServiceLanding";
import { requireSpanish, serviceMetadata } from "../_shared/service-page";

const PATH = "/diseno-web-las-palmas";

export const generateMetadata = serviceMetadata(
  PATH,
  "Diseño web en Las Palmas de Gran Canaria — Kimox Studio",
  "Diseño y desarrollo web a medida en Las Palmas de Gran Canaria. Webs rápidas, con SEO técnico incluido, desde 500 € o 80 €/mes. Respondemos en menos de 24 h.",
);

const CONTENT: ServiceContent = {
  path: PATH,
  serviceType: "Diseño y desarrollo web",
  h1: "Diseño web en Las Palmas de Gran Canaria",
  lede:
    "Hacemos webs a medida para negocios de Gran Canaria. Las diseñamos desde cero, con el SEO técnico hecho desde la primera línea, y las pensamos para que tus clientes te llamen, te escriban o reserven. Sin plantillas.",
  priceHint: "Desde 500 € o 80 €/mes · sin IGIC · respuesta en menos de 24 h",
  includes: [
    {
      title: "Diseño a medida",
      body: "Partimos de tu negocio, no de un tema de WordPress. Cada página se diseña para lo que tiene que conseguir.",
    },
    {
      title: "SEO técnico incluido",
      body: "Estructura, metadatos, datos estructurados, sitemap y velocidad desde el primer día, para que Google entienda qué haces y dónde.",
    },
    {
      title: "Rápida en el móvil",
      body: "Casi todos tus clientes te buscarán desde el móvil. Cuidamos imágenes, fuentes y código para que la web cargue rápido.",
    },
    {
      title: "Contacto a un toque",
      body: "Teléfono, WhatsApp, formulario o reservas: lo que use tu cliente para dar el siguiente paso, siempre a mano.",
    },
    {
      title: "Varios idiomas",
      body: "Español, inglés o los idiomas que necesites, cada uno bien indexado. Útil si también vendes al turismo.",
    },
    {
      title: "Hosting y mantenimiento",
      body: "En la modalidad mensual va todo dentro: hosting, mantenimiento técnico, soporte con personas reales y mejoras.",
    },
  ],
  prices: [
    {
      name: "Landing page",
      body: "Una página hecha a mano para presentar tu negocio o una campaña, optimizada para SEO. Entrega en 2-3 semanas.",
      oneOff: "500 €",
      monthly: "o 80 €/mes",
    },
    {
      name: "Web con base de datos y panel",
      body: "Una web completa con base de datos, usuarios y un panel propio para gestionar tu contenido o tu negocio. Hosting incluido el primer año.",
      oneOff: "1.500 €",
      monthly: "o 120 €/mes",
    },
  ],
  priceNote: "El precio de una web con base de datos y panel depende de sus funcionalidades finales.",
  priceLink: { href: "/blog/precio-pagina-web-gran-canaria", label: "Cuánto cuesta una página web en Gran Canaria: precios reales y qué cambia el precio" },
  steps: [
    { title: "Entendemos el problema", body: "Nos cuentas tu negocio y a quién quieres llegar. Respondemos en menos de 24 h." },
    { title: "Decidimos cómo funciona", body: "Qué páginas hacen falta, qué tiene que encontrar tu cliente y qué tiene que hacer después." },
    { title: "Diseñamos y programamos", body: "Solo entonces decidimos cómo se ve. Diseño y código salen del mismo equipo." },
    { title: "La publicamos y la cuidamos", body: "Dominio, hosting y SEO listos. Con la cuota mensual, la mantenemos y mejoramos." },
  ],
  local: {
    title: "Un estudio de Las Palmas",
    paragraphs: [
      "Kimox Studio tiene su base en Las Palmas de Gran Canaria. Hemos hecho webs para negocios de la ciudad como la Cafetería Bonita Vida, en Schamann, el centro Patri Santana Estética o la asociación Alea Las Palmas.",
      "Trabajamos con negocios de toda Gran Canaria, y de fuera de la isla, en remoto, así que no tienes que desplazarte. Hablas directamente con quien diseña y programa tu web: no subcontratamos ni tenemos vendedores.",
    ],
  },
  projectsTitle: "Webs que hemos hecho.",
  projects: ["bonitaVida", "patriSantana", "alea"],
  faq: [
    {
      q: "¿Cuánto cuesta una página web en Las Palmas?",
      a: "Una landing page empieza en 500 € en pago único o 80 €/mes, y una web con base de datos, usuarios y panel propio en 1.500 € o 120 €/mes, siempre sin IGIC. Te decimos el precio final antes de empezar.",
    },
    {
      q: "¿Cuánto se tarda en hacer una web?",
      a: "Una landing page se entrega en 2-3 semanas. Una web más grande depende de sus funcionalidades; te damos el plazo junto con la propuesta.",
    },
    {
      q: "¿Qué incluye la cuota mensual?",
      a: "El diseño y desarrollo de la web, el hosting, el mantenimiento técnico, soporte con personas reales y mejoras continuas. Empezamos con un compromiso mínimo y después sigues mes a mes.",
    },
    {
      q: "¿Me ayudáis a salir en Google?",
      a: "Sí. Todas nuestras webs llevan el SEO técnico incluido: estructura, velocidad, datos estructurados y sitemap. También hacemos auditorías SEO técnicas de webs que ya existen.",
    },
    {
      q: "¿Hacéis webs en WordPress?",
      a: "Normalmente programamos la web a medida con Next.js, que da webs más rápidas. Si ya tienes un WordPress o lo necesitas, también trabajamos con él: la web de Alea Las Palmas está hecha en WordPress.",
    },
    {
      q: "Ya tengo una web. ¿Podéis rehacerla o mantenerla?",
      a: "Sí. Mantenemos proyectos existentes, hacemos migraciones de tecnología y refactorizamos código heredado.",
    },
    {
      q: "¿Trabajáis solo en Las Palmas de Gran Canaria?",
      a: "No. Tenemos la base en Las Palmas de Gran Canaria y trabajamos con negocios de toda la isla y de fuera, en remoto.",
    },
  ],
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  await requireSpanish(params);
  return <ServiceLanding content={CONTENT} />;
}
