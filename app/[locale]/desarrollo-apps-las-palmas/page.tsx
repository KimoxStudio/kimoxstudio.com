import ServiceLanding, { type ServiceContent } from "@/components/ServiceLanding";
import { requireSpanish, serviceMetadata } from "../_shared/service-page";

const PATH = "/desarrollo-apps-las-palmas";

export const generateMetadata = serviceMetadata(
  PATH,
  "Desarrollo de apps en Las Palmas — Kimox Studio",
  "Desarrollo de aplicaciones web y móviles a medida en Las Palmas de Gran Canaria: iOS, Android y web. Apps web desde 1.500 € o 120 €/mes. Respuesta en 24 h.",
);

const CONTENT: ServiceContent = {
  path: PATH,
  serviceType: "Desarrollo de aplicaciones web y móviles",
  h1: "Desarrollo de apps en Las Palmas de Gran Canaria",
  lede:
    "Diseñamos y programamos aplicaciones web y móviles a medida para iOS, Android y la web, con base de datos, usuarios y panel propio. Te acompañamos desde la idea hasta la app publicada, y después la seguimos cuidando.",
  priceHint: "Apps web desde 1.500 € o 120 €/mes · sin IGIC · respuesta en menos de 24 h",
  includes: [
    {
      title: "Apps para iOS y Android",
      body: "Desarrollo multiplataforma nativo para iOS, Android y escritorio cuando tiene sentido.",
    },
    {
      title: "Aplicaciones web y PWA",
      body: "Apps que se usan desde el navegador y se instalan en el móvil, como Holovisor, que reconoce cartas con la cámara.",
    },
    {
      title: "Base de datos, usuarios y panel",
      body: "Autenticación, datos propios y un panel para gestionar tu negocio sin depender de nadie.",
    },
    {
      title: "Integraciones e IA",
      body: "Conectamos tu app con pagos, APIs y modelos de lenguaje cuando aportan algo de verdad.",
    },
    {
      title: "Diseño y desarrollo juntos",
      body: "El mismo equipo diseña la interfaz y escribe el código, así no se pierde nada por el camino.",
    },
    {
      title: "Después del lanzamiento",
      body: "Publicación, mantenimiento, soporte y mejoras cuando la app ya está en manos de tus usuarios.",
    },
  ],
  prices: [
    {
      name: "Aplicación web",
      body: "App web completa con base de datos, autenticación y panel propio, como Mymedesp u Holovisor. Hosting incluido el primer año.",
      oneOff: "1.500 €",
      monthly: "o 120 €/mes",
    },
    {
      name: "App móvil, SaaS o plataforma",
      body: "Apps para iOS y Android, SaaS, integraciones y plataformas complejas. Cuéntanos qué necesitas y te pasamos un plan.",
      oneOff: "A medida",
      monthly: "según funcionalidades",
    },
  ],
  priceNote: "El precio de una app depende de sus funcionalidades finales.",
  steps: [
    { title: "Entendemos el problema", body: "Quién usará la app, para qué y qué tiene que resolver. Respondemos en menos de 24 h." },
    { title: "Decidimos cómo funciona", body: "Web, móvil o las dos; qué datos guarda, quién entra y qué puede hacer cada uno." },
    { title: "Diseñamos y programamos", body: "Interfaz y código salen del mismo equipo, con un stack moderno y escalable." },
    { title: "La publicamos y la cuidamos", body: "Publicación, mantenimiento técnico, soporte y mejoras después del lanzamiento." },
  ],
  local: {
    title: "Un estudio de Las Palmas",
    paragraphs: [
      "Kimox Studio tiene su base en Las Palmas de Gran Canaria. Somos un equipo pequeño que diseña y programa, y trabaja con pocos clientes a la vez para meterse a fondo en cada proyecto.",
      "Hablas directamente con quien construye tu app: no subcontratamos ni tenemos vendedores. Trabajamos con empresas de toda Gran Canaria y de fuera, en remoto, y te entregamos código que tu equipo puede leer.",
    ],
  },
  projectsTitle: "Apps que hemos hecho.",
  projects: ["holovisor", "mymedesp", "rachafit"],
  faq: [
    {
      q: "¿Cuánto cuesta desarrollar una app?",
      a: "Una aplicación web empieza en 1.500 € en pago único o 120 €/mes, sin IGIC. Las apps móviles, los SaaS y las plataformas más complejas se presupuestan a medida según sus funcionalidades.",
    },
    {
      q: "¿Hacéis apps para iOS y Android?",
      a: "Sí. Hacemos desarrollo multiplataforma nativo para iOS, Android y escritorio, y aplicaciones web instalables (PWA) cuando encajan mejor.",
    },
    {
      q: "¿Me conviene una app móvil o una aplicación web?",
      a: "Depende de quién la use y cómo. Una aplicación web funciona en cualquier dispositivo sin pasar por las tiendas de apps; una app nativa aprovecha mejor la cámara, el GPS o las notificaciones. Te recomendamos la opción que tenga sentido para tu caso.",
    },
    {
      q: "¿Podré seguir trabajando en la app con otro equipo?",
      a: "Sí. Escribimos código a medida y legible, pensado para que tu equipo pueda entenderlo y seguir trabajando en él.",
    },
    {
      q: "¿Qué pasa después de publicar la app?",
      a: "Seguimos con el mantenimiento, el soporte y las mejoras. En la modalidad mensual, el hosting y el mantenimiento van incluidos.",
    },
    {
      q: "¿Podéis añadir inteligencia artificial a mi app?",
      a: "Sí. Construimos agentes, automatizaciones e integraciones con modelos de lenguaje, y te decimos dónde la IA ahorra tiempo o dinero y dónde no merece la pena.",
    },
    {
      q: "¿Trabajáis solo con empresas de Las Palmas?",
      a: "No. Tenemos la base en Las Palmas de Gran Canaria y trabajamos con empresas de toda la isla y de fuera, en remoto.",
    },
  ],
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  await requireSpanish(params);
  return <ServiceLanding content={CONTENT} />;
}
