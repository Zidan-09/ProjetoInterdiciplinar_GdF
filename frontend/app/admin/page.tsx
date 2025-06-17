import ProtectedRoute from '../components/ProtectedRoute';

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRole="admin">
      <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
        <h1>Bem-vindo ao Painel do Administrador</h1>
      </div>
    </ProtectedRoute>
  );
}