import ProtectedRoute from '../components/ProtectedRoute';

export default function ReceptionistPage() {
  return (
    <ProtectedRoute allowedRole="receptionist">
      <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
        <h1>Bem-vindo ao Painel da Recepção</h1>
      </div>
    </ProtectedRoute>
  );
}
