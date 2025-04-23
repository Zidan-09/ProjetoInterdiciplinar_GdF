ESTRUTURA:

CLASSES:
    hospital
    patient
    hospital staff
    queue

FUNÇÕES:
    validar cpf utilizando o método de validação (xxx.xxx.xxx-yy => x * 10, x * 9... sum(all) * 10 % 11 => 10 | 11 = 0)
    cadastrar paciente
    verificar se paciente já está cadastrado
    inserir paciente na fila para a triagem
    realizar triagem atribuindo gravidade
    mover paciente para a fila para consulta
    ordenar fila de acordo com tempo de espera e severidade
    chamar pacientes na fila de acordo com gravidade e tempo de espera
    médico inicia e finaliza consulta chamando o próximo da fila
    ter relatórios que mostrem:
        1 - Quantidade de pacientes naquele dia
        2 - Classificação de risco dos pacientes com porcentagens e quantidade
        3 - Horário de pico
        4 - Idade dos pacientes mais frequentes

FLUXOS:
    FLUXO NORMAL (FUNCIONÁRIOS):
        1 - O funcionário chega ao hospital e abre o sistema (computador ou celular)
        2 - O sistema abre a inferface de acordo com a função do funcionário e altera o status do funcionário: ativo

    FLUXO NORMAL (PACIENTES):
        1 - O paciente chega ao hospital e solicita uma senha
        2 - A recepcionista gera uma senha e faz os chamados
        2 - A senha é chamada e o paciente vai para a recepção
        3 - A recepcionista realiza o cadastrado do paciente no sistema com:
            nome, data de nascimento, estado civil, cpf, rg, contatos, gênero, plano de saúde e endereço (o sistema insere data de chegada, status: Aguardando triagem e sintomas: nulo)
        4 - O sistema move o paciente para uma fila para a triagem
        5 - A enfermeira realiza a triagem atribuindo ao paciente uma classificação de risco e sinais vitais:
            azul: não urgente, verde: baixa urgência, amarelo, urgente, laranja: muito urgente, vermelho: emergência;
            pressão arterial, frequência cardíaca, frequência respiratória, temperatura corporal, saturaçã de oxigênio, nível de dor: 1 - 10
        6 - A enfermeira atribui ao paciente os dados e o relato do paciente (sintomas resumidos)
        7 - De acordo com esses dados o sistema move o paciente para uma fila, é marcado um tempo máximo de permanência e seu status é alterado: Aguardando consulta
        8 - Ao finalizar a consulta o médico indica ao sistema para chamar o próximo
        9 - O sistema chama o paciente para a consulta
        10 - Quando a entrada do paciente é confirmada no consultório seu status é alterado: Em consulta
        11 - Ao finalizar a consulta o status do paciente é alterado: Foi tratado
        12 - O cadastrado é armazenado no banco de dados para agilizar futuras consultas

    FLUXOS SECUNDÁRIOS:
        Paciente já cadastrado:
            1 - O sistema informa que o paciente já está cadastrado e pergunta se é uma nova consulta
            2 - A enfermeira confirma
            3 - O sistema adiciona uma nova data de chegada, sintomas e status
            4 - O processo é repetido a cada nova consulta do mesmo paciente

        Paciente não compareceu ao ser chamado:
            1 - O sistema chama o próximo da fila
            2 - O médico ainda não confirmou a entrada do paciente chamado ao consultório
            3 - O sistema chama mais 2 vezes o paciente
            4 - O sistema pede confirmação da recepcionista se o paciente está no local
            5 - A recepcionista informa se está ou não
            6 - Caso esteja:
                7 - O paciente é movido para a próxima posisão da fila
                8 - O sistema chama o posterior da fila
                9 - O médico finaliza a consulta
                10 - O sistema chama o próximo da fila (paciente que perdeu a vez)
            6 - Caso não esteja:
                7 - O paciente é retirado da fila
                8 - O sistema segue o fluxo padrão
        
        Caso de agravamento:
            1 - A recepcionista comunica o médico
            2 - O médico é direcionado a recepção
            3 - O paciente é levado as pressas para atendimento
            4 - A recepcionista altera os dados do paciente: atendimento de emergência
            5 - O sistema pausa a fila em caso de apenas um médico
        
        Ambulância:
            FLUXO NORMAL:
                1 - A ambulância chega ao local
                2 - O técnico de enfermagem realiza os procedimentos necessários
                3 - O técnico de enfermagem realiza a triagem no percuso ao hospital e registra no sistema com a classificação de risco
                4 - Ao chegar no hospital o paciente já tem seu lugar na fila definido

            FLUXO SECUNDÁRIO:
                1 - O técnico de enfermagem realiza a triagem no percuso ao hospital e registra no sistema com a classificação de risco de emergência
                2 - Ao chegar no hospital o paciente é atendido imediatamente


REQUISITOS:

✅ Requisitos Funcionais (RF) – Versão Acadêmica

    Cadastro de pacientes

    Triagem com classificação de risco (ex: vermelho, amarelo, verde)

    Atribuição automática de prioridade na fila

    Visualização da fila por profissionais de saúde

    Registro de atendimento médico

    Chamadas para atendimento (painel de senhas)

    Encaminhamento para leitos ou outros setores

    Painel para gestão de capacidade da unidade (leitos, consultórios)

    Relatórios simples (número de atendimentos por dia, tempo médio de espera)

    Cadastro e login de usuários (administradores, triagem, médicos, recepção)

🔧 Requisitos Não Funcionais (RNF)

    Interface simples e amigável

    Sistema web (acessado pelo navegador)

    Dados armazenados localmente (banco de dados relacional, tipo MySQL ou SQLite)

    Permitir múltiplos usuários simultâneos

    Senhas armazenadas de forma segura (criptografia hash, tipo bcrypt)

    Tempo de resposta rápido (menos de 3 segundos por ação)

    Sistema com layout responsivo (acesso via tablet, desktop)

📘 Requisitos Normativos (RN)

(Aqui a gente pode usar apenas normas e boas práticas de software ou simular regras da instituição de saúde, sem citar o governo)

    Adoção de protocolo de triagem baseado na prioridade clínica

    Registro obrigatório do responsável pelo atendimento

    Armazenamento de histórico de atendimentos por paciente

    Controle de acesso baseado em níveis de permissão

    Armazenamento de logs de acesso e alterações em registros críticos

    Tempo máximo de espera por prioridade (ex: vermelho = 0 min, amarelo = até 30 min)

Médico

Atributos:

    Nome: Nome completo do médico.

    CPF: Número do CPF (Cadastro de Pessoas Físicas) do médico.

    Contatos: Lista de contatos do médico (como telefone, email, etc.).

    Número de Registro: Número de registro profissional, geralmente o CRM (Conselho Regional de Medicina).

    Data de Admissão: Data em que o médico foi contratado pelo hospital ou clínica.

    Turno: O turno em que o médico trabalha, como "manhã", "tarde" ou "noite".

    Salário: O valor pago ao médico pelo seu trabalho.

    Código CNES: Código que identifica o estabelecimento de saúde no Cadastro Nacional de Estabelecimentos de Saúde.

    CRM: Número de registro no Conselho Regional de Medicina, que certifica a qualificação do médico.

    Especialidade: A especialidade médica do profissional, como "Cardiologia", "Neurologia", etc.

    Carga Horária Semanal: Número de horas semanais que o médico deve trabalhar.

    Está de Plantão: Indica se o médico está de plantão (valor booleano: verdadeiro ou falso).

Enfermeiro

Atributos:

    Nome: Nome completo do enfermeiro.

    CPF: Número do CPF do enfermeiro.

    Contatos: Lista de contatos do enfermeiro.

    Número de Registro: Número de registro profissional, que pode ser o COREN (Conselho Regional de Enfermagem).

    Data de Admissão: Data em que o enfermeiro foi admitido no hospital.

    Turno: O turno de trabalho do enfermeiro.

    Salário: O salário do enfermeiro.

    Código CNES: Código do hospital ou clínica registrado no Cadastro Nacional de Estabelecimentos de Saúde.

    COREN: Número de registro no Conselho Regional de Enfermagem.

    Departamento: O setor em que o enfermeiro trabalha, como "UTI", "Emergência", "Enfermaria", etc.

    Tipo de Função: A função desempenhada, como "Enfermeiro" ou "Técnico de Enfermagem".

    Carga Horária Semanal: O número de horas que o enfermeiro deve trabalhar semanalmente.

    Está de Plantão: Indica se o enfermeiro está de plantão (valor booleano: verdadeiro ou falso).

Recepcionista

Atributos:

    Nome: Nome completo da recepcionista.

    CPF: Número do CPF da recepcionista.

    Contatos: Lista de contatos da recepcionista (como telefone, email, etc.).

    Número de Registro: Número de registro ou matrícula no sistema.

    Data de Admissão: Data em que a recepcionista foi contratada.

    Turno: O turno de trabalho da recepcionista (por exemplo, "manhã", "tarde" ou "noite").

    Salário: O salário da recepcionista.

    Código CNES: Código de registro do estabelecimento de saúde no Cadastro Nacional de Estabelecimentos de Saúde.

    Carga Horária Semanal: O número de horas que a recepcionista deve trabalhar semanalmente.

Administrador

Atributos:

    Nome: Nome completo do administrador.

    CPF: Número do CPF do administrador.

    Contatos: Lista de contatos do administrador (como telefone, email, etc.).

    Número de Registro: Número de registro ou matrícula do administrador no sistema.

    Data de Admissão: Data de contratação do administrador.

    Turno: O turno em que o administrador trabalha (pode ser "manhã", "tarde" ou "noite").

    Salário: O salário do administrador.

    Código CNES: Código do hospital ou clínica no Cadastro Nacional de Estabelecimentos de Saúde.

    Último Login: A data e hora do último login do administrador no sistema, o que ajuda a monitorar quando ele acessou o sistema pela última vez.