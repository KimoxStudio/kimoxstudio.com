import './studio.css';
import { isAuthed } from '../../lib/studio-auth';
import StudioClient from '../../components/studio/StudioClient';

export const metadata = {
  title: 'Studio — Kimox Studio',
  robots: { index: false, follow: false },
};

export default async function StudioPage() {
  const authed = await isAuthed();
  return <StudioClient initialAuthed={authed} />;
}
