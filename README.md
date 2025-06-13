# Projeto Interdiciplinar - Gerenciamento de Filas em Pronto-Socorro

Este projeto tem como objetivo desenvolver um sistema completo para gerenciamento de filas em unidades de pronto atendimento (UPAs e hospitais), com foco na triagem eficiente, atendimento ordenado e controle administrativo de pacientes.
🛠 Tecnologias Utilizadas

    Node.js com TypeScript

    SQLite (persistência de dados local)

    Express.js (API REST)

    WebSocket (planejado ou já implementado para comunicação em tempo real)

    Fetch API (para consumo da API via frontend HTML + JS)

📁 Estrutura do Projeto

ProjetoInterdiciplinar_GdF-master/
│
├── backend/
│   ├── src/
│   │   ├── app.ts              # Inicialização do app
│   │   ├── server.ts           # Inicialização do servidor
│   │   ├── socket.ts           # Inicialização do socket
│   │   ├── db.ts               # Configuração do banco de dados
│   │   ├── Json/               # Arquivos JSON com dados de teste
│   │   └── (demais pastas de serviços e modelos)
│   ├── package.json            # Dependências do projeto
│   └── tsconfig.json           # Configurações do TypeScript

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

npx ts-node src/server.ts

    O servidor será iniciado, e a API estará acessível em http://localhost:3000 (ou porta definida).

📄 Licença

Este projeto é parte de um Projeto Integrador acadêmico. Licença livre para fins educacionais e demonstração.
✍️ Autores

    Desenvolvido por Samuel, Gabriel Lima e Gabriel Oliveira
