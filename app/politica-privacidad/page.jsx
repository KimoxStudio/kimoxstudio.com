import fs from 'node:fs';
import path from 'node:path';
import '../blog/blog.css';
import LegalPageClient from '../../components/LegalPageClient';

export const metadata = {
  title: 'Política de Privacidad — Kimox Studio',
  description:
    'Política de privacidad y protección de datos de Kimox Studio: responsable del tratamiento, finalidad, conservación y derechos de los usuarios.',
};

function getBody() {
  const filePath = path.join(process.cwd(), 'content', 'legal', 'politica-privacidad.md');
  return fs.readFileSync(filePath, 'utf8');
}

export default function Page() {
  return <LegalPageClient title="Política de Privacidad" body={getBody()} />;
}
