import fs from 'node:fs';
import path from 'node:path';
import '../blog/blog.css';
import LegalPageClient from '../../components/LegalPageClient';

export const metadata = {
  title: 'Aviso Legal — Kimox Studio',
  description:
    'Aviso legal de Kimox Studio: identificación del titular, condiciones de uso del sitio web y propiedad intelectual, conforme a la LSSI-CE.',
};

function getBody() {
  const filePath = path.join(process.cwd(), 'content', 'legal', 'aviso-legal.md');
  return fs.readFileSync(filePath, 'utf8');
}

export default function Page() {
  return <LegalPageClient title="Aviso Legal" body={getBody()} slug="aviso-legal" />;
}
