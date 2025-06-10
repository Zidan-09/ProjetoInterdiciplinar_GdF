import UserRegisterForm from "./components/userRegisterForm";

export default function AdminPage(){
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Cadastro de Funcionário</h1>
            <UserRegisterForm />
        </main>
    );
}
