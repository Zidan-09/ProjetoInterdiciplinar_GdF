'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, ClipboardList, Users, PencilLine, PlusCircle, Monitor } from 'lucide-react';
import { useAuth } from '../utils/authRedirect';
import { toast } from 'react-hot-toast';
import { UserCircle2 } from 'lucide-react';

export default function AdminPage() {
  useAuth('admin');
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState<'register' | 'queue' | 'edit' | 'patient' |'list'>('register');

  const [formData, setFormData] = useState({
    accessLevel: '',
    registrationNumber: '',
    name: '',
    cpf: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    workShift: '',
    status: '',
    salary: '',
    cnesCode: '',
    weeklyHours: '',
    department: '',
    crm: '',
    coren: '',
    specialty: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cpf') {
      formattedValue = value
        .replace(/\D/g, '')
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    if (name === 'phone') {
      formattedValue = value
        .replace(/\D/g, '')
        .slice(0, 11)
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
    }

    if (name === 'cnesCode') {
      formattedValue = value
        .replace(/[^\d]/g, '')
        .slice(0, 4)
        .replace(/(\d{2})(\d{0,2})/, '$1-$2');
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token de admin não encontrado. Faça login como admin.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const payload: any = {
        registrationNumber: Number(formData.registrationNumber),
        name: formData.name,
        cpf: formData.cpf.replace(/\D/g, ''),
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ''),
        dob: formData.dob,
        address: formData.address,
        workShift: formData.workShift,
        status: formData.status,
        salary: Number(formData.salary),
        cnesCode: formData.cnesCode,
        weeklyHours: Number(formData.weeklyHours),
        accessLevel: formData.accessLevel,
      };

      if (formData.accessLevel === 'doctor') {
        payload.crm = formData.crm;
        payload.specialty = formData.specialty;
      }

      if (formData.accessLevel === 'nurse') {
        payload.coren = formData.coren;
        payload.department = formData.department;
        payload.specialty = formData.specialty;
      }

      const response = await fetch('http://localhost:3333/employee/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.status) {
        setMessage('Funcionário cadastrado. Aguardando autenticação via e-mail.');
      } else {
        setError(result.message || 'Erro ao cadastrar funcionário.');
      }
    } catch (err) {
      console.error(err);
      setError('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    router.push('/login');
  };

  const irParaSocket = () => {
    router.push('/calls');
  };

  const { accessLevel } = formData;

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-teal-600 text-white flex flex-col justify-between h-screen">
    <div>
      <div className="flex gap-1 mb-6">
        <img src="/Gemini_Generated_Image_9357q79357q79357.png" alt="Logo" className="h-[150px] w-[150px] ml-2 -mt-3" />
        <h1 className="text-lg uppercase font-bold leading-tight tracking-wide -ml-8 mt-6">
          Sistema<br />GdF
        </h1>
          </div>

          <div className="space-y-2">
            <div onClick={() => setSelectedSection('register')} className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${selectedSection === 'register' ? 'bg-white text-teal-600 font-bold shadow' : 'hover:bg-teal-700'}`}>
              <PlusCircle size={16} /> Cadastrar Funcionário
            </div>
            <div onClick={() => setSelectedSection('queue')} className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${selectedSection === 'queue' ? 'bg-white text-teal-600 font-bold shadow' : 'hover:bg-teal-700'}`}>
              <ClipboardList size={16} /> Ver Fila(em desenvol.)
            </div>
            <div onClick={() => setSelectedSection('edit')} className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${selectedSection === 'edit' ? 'bg-white text-teal-600 font-bold shadow' : 'hover:bg-teal-700'}`}>
              <PencilLine size={16} /> Editar Funcionário(em desenvol.)
            </div>
            <div onClick={() => setSelectedSection('list')} className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${selectedSection === 'list' ? 'bg-white text-teal-600 font-bold shadow' : 'hover:bg-teal-700'}`}>
              <Users size={16} /> Ver Funcionários(em desenvol.)
            </div>
            <div onClick={() => setSelectedSection('patient')} className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${selectedSection === 'patient' ? 'bg-white text-teal-600 font-bold shadow' : 'hover:bg-teal-700'}`}>
              <UserCircle2 size={16} /> Ver Pacientes(em desenvol.)
            </div>
          </div>
        </div>

        <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-6 flex items-center gap-2">
          <LogOut size={16} /> Sair
        </button>
      </div>

      {/* Main Section */}
      <div className="flex-1 ml-64 p-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl  font-bold text-gray-800">PAINEL DO ADMINISTRADOR 👤</h1>
         <a
      href="/calls"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-orange-400 hover:bg-orange-300 text-white px-4 py-2 rounded-full cursor-pointer"
    >
      <Monitor size={16} /> Painel de Chamados
    </a>

        </div>

        {selectedSection === 'register' && (
          <div className="max-w-4xl w-full mx-auto p-6 border rounded shadow bg-white">
            <h1 className="text-2xl text-black font-bold mb-4">Cadastrar Novo Funcionário</h1>
            {message && <p className="text-green-600 mb-4">{message}</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                name="accessLevel"
                onChange={handleChange}
                value={formData.accessLevel}
                required
                className="text-black w-full border p-2 rounded"
              >
                <option value="">Selecione o cargo</option>
                <option value="admin">Admin</option>
                <option value="doctor">Médico</option>
                <option value="nurse">Enfermeiro</option>
                <option value="receptionist">Recepcionista</option>
              </select>

              <input
                name="registrationNumber"
                placeholder="Número de Registro"
                type="text"
                inputMode="numeric"
                pattern="\d*"
                onChange={handleChange}
                value={formData.registrationNumber}
                required
                className="w-full border p-2 rounded text-black"
              />
              <input
                name="name"
                placeholder="Nome"
                onChange={handleChange}
                value={formData.name}
                required
                className="w-full border p-2 rounded text-black"
              />
              <input
                name="cpf"
                placeholder="CPF (000.000.000-00)"
                onChange={handleChange}
                value={formData.cpf}
                required
                className="w-full border p-2 rounded text-black"
              />
              <input
                name="email"
                placeholder="Email"
                type="email"
                onChange={handleChange}
                value={formData.email}
                required
                className="w-full border p-2 rounded text-black"
              />
              <input
                name="phone"
                placeholder="Telefone ((00) 00000-0000)"
                onChange={handleChange}
                value={formData.phone}
                required
                className="w-full border p-2 rounded text-black"
              />
              <input
                name="dob"
                placeholder="Data de Nascimento"
                type="date"
                onChange={handleChange}
                value={formData.dob}
                required
                className="w-full border p-2 rounded text-black"
              />
              <input
                name="address"
                placeholder="Endereço"
                onChange={handleChange}
                value={formData.address}
                required
                className="w-full border p-2 rounded text-black"
              />
              <select
                name="workShift"
                onChange={handleChange}
                value={formData.workShift}
                required
                className="w-full border p-2 rounded text-black"
              >
                <option value="">Turno</option>
                <option value="morning">Manhã</option>
                <option value="afternoon">Tarde</option>
                <option value="night">Noite</option>
                <option value="full-time">Integral</option>
              </select>
              <select
                name="status"
                onChange={handleChange}
                value={formData.status}
                required
                className="w-full border p-2 rounded text-black"
              >
                <option value="">Status</option>
                <option value="active">Ativo</option>
                <option value="on_leave">Afastado</option>
                <option value="resigned">Inativo</option>
              </select>
              <input
                name="salary"
                placeholder="Salário"
                type="text"
                inputMode="decimal"
                pattern="^\d+(\.\d{0,2})?$"
                onChange={handleChange}
                value={formData.salary}
                required
                className="w-full border p-2 rounded text-black"
              />
              <input
                name="cnesCode"
                placeholder="Código CNES (00-00)"
                onChange={handleChange}
                value={formData.cnesCode}
                required
                className="w-full border p-2 rounded text-black"
              />
              <input
                name="weeklyHours"
                placeholder="Horas Semanais"
                type="text"
                inputMode="numeric"
                pattern="\d*"
                onChange={handleChange}
                value={formData.weeklyHours}
                required
                className="w-full border p-2 rounded text-black"
              />
              {accessLevel === 'doctor' && (
                <>
                  <input
                    name="crm"
                    placeholder="CRM"
                    onChange={handleChange}
                    value={formData.crm}
                    required
                    className="w-full border p-2 rounded text-black"
                  />
                  <input
                    name="specialty"
                    placeholder="Especialidade"
                    onChange={handleChange}
                    value={formData.specialty}
                    required
                    className="w-full border p-2 rounded text-black"
                  />
                </>
              )}
              {accessLevel === 'nurse' && (
                <>
                  <input
                    name="coren"
                    placeholder="COREN"
                    onChange={handleChange}
                    value={formData.coren}
                    required
                    className="w-full border p-2 rounded text-black"
                  />
                  <input
                    name="department"
                    placeholder="Departamento"
                    onChange={handleChange}
                    value={formData.department}
                    required
                    className="w-full border p-2 rounded text-black"
                  />
                  <input
                    name="specialty"
                    placeholder="Especialidade"
                    onChange={handleChange}
                    value={formData.specialty}
                    required
                    className="w-full border p-2 rounded text-black"
                  />
                </>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-4 py-2 rounded-full text-white ${
                  loading ? 'bg-gray-400' : 'bg-green-400 hover:bg-green-300'
                }`}
              >
                {loading ? 'Enviando...' : 'Cadastrar Funcionário'}
              </button>
            </form>

          </div>
        )}

        {selectedSection === 'queue' && (
          <div className="border rounded p-6 shadow max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Lista de Atendimentos</h2>
            <p className="text-gray-500 italic">(Implementar lista de atendimentos com fetch)</p>
          </div>
        )}

        {selectedSection === 'edit' && (
          <div className="border rounded p-6 shadow max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Editar Funcionário</h2>
            <p className="text-gray-500 italic">(Implementar edição de funcionário)</p>
          </div>
        )}

        {selectedSection === 'list' && (
          <div className="border rounded p-6 shadow max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">Funcionários Cadastrados</h2>
            <p className="text-gray-500 italic">(Implementar listagem de funcionários)</p>
          </div>
        )}
      </div>
    </div>
  );
}



//Botao para tela de chamados(/calls)
//ajeitar os campos
//botar um fundo
//dividir em seçoes,as funcionais(ver filas:Recepçao,triagem,consuta)
//cadastrar funcionario
//Editar funcionario
//demitir(dois campos:nome e cpf) mandava um post e muda o status no banco de active para inative
//ver os funcionarios
//Botao de recuperar(recover)