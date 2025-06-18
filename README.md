# Projeto Interdisciplinar - Gerenciamento de Filas em Pronto-Socorro

Este projeto tem como objetivo desenvolver um sistema completo para gerenciamento de filas em unidades de pronto atendimento (UPAs e hospitais), com foco na triagem eficiente, atendimento ordenado e controle administrativo de pacientes.
🛠 Tecnologias Utilizadas

    Node.js com TypeScript

    MySQL (Servidor acessado via Tailscale temporariamente)

    Express.js (API REST)

    WebSocket

    NextJs (para consumo da API)

📁 Estrutura do Projeto

```plaintext
ProjetoInterdisciplinar_GdF-master/
│
├── backend/
│   ├── src/
│   │   ├── app.ts              # Inicialização do app
│   │   ├── server.ts           # Inicialização do servidor
│   │   ├── socket.ts           # Inicialização do socket
│   │   ├── db.ts               # Configuração do banco de dados
│   │   ├── Json/               # Arquivos JSON com dados de teste
│   │   └── (demais pastas de serviços e entidades)
│   ├── package.json            # Dependências do projeto
│   └── tsconfig.json           # Configurações do TypeScript
│
├── frontend/
│   ├── app/
│   │   ├── admin/              # Interface do administrador
│   │   ├── auth/               # Interface de autenticação
│   │   ├── calls/              # Interface do chamados
│   │   ├── doctor/             # Interface do médico
│   │   ├── login/              # Interface de login
│   │   └── (demais rotas)
│   ├── public/                 # Imagens
│   ├── package.json            # Dependências do projeto
│   └── tsconfig.json           # Configurações do TypeScript
│   └── (demais arquivos de configurações)
├── database/
│   ├── db_generation_script.sql              # Script de definição do banco de dados
├── diagramas/
│   ├── DiagramaDeClasse.drawio.svg           # Diagrama de classes
│   ├── (demais diagramas que definem o projeto)
├── README.md
├── Sistema_de_Gerenciamento_de_Filas_em_PS.docx              # Documentação
```

⚙️ Funcionalidades Principais

    Cadastro de pacientes, enfermeiros, médicos, recepcionistas e administradores.

    Triagem com atribuição de critérios de prioridade.

    Chamada e gerenciamento de pacientes em fila com base na prioridade.

    Controle de atendimentos médicos.

    Geração de relatórios administrativos.

    Comunicação em tempo real para chamadas.

▶️ Como Executar o Projeto
Pré-requisitos

    Node.js e npm instalados

Instalação

cd backend
npm install

Executando

npm run dev

    O servidor será iniciado, e a API estará acessível em http://localhost:3333 (ou porta definida).

cd frontend
npm install

Executando

npm run dev

    O servidor será iniciado, e o frontend estará acessível em http://localhost:3000 (ou porta definida).

📄 Licença

Este projeto é parte de um Projeto Interdisciplinar acadêmico. Licença livre para fins educacionais e demonstração.
✍️ Autores

    Desenvolvido por Samuel, Gabriel Lima e Gabriel Oliveira
