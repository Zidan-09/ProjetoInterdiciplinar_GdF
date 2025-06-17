import { useRouter } from 'next/router';

export default function AdminPage() {
  const router = useRouter();

  return (
    <div style={{ padding: 20 }}>
      <h1>Painel do Admin</h1>
      <button onClick={() => router.push('/calls')} style={{ marginTop: 20 }}>
        Ver Chamados
      </button>
    </div>
  );
}