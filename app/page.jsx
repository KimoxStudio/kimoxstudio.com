import './landing.css';
import LandingClient from '../components/LandingClient';

export const metadata = {
  title: 'Kimox Studio — Software con alma propia',
  description: 'Estudio de software. Aplicaciones web y móviles a medida.',
};

export default function Page() {
  return <LandingClient />;
}
