# TaskFlow

Plataforma de gestão de projetos estilo Jira, construída do zero em Angular 21.

## Stack e tecnologias

| Tecnologia | Versão | Como é usada |
| --- | --- | --- |
| Angular | 22 | Framework principal — componentes, roteamento, formulários reativos |
| TypeScript | 5 | Tipagem estática — interfaces, generics, decoradores |
| RxJS | 7 | Estado reativo — BehaviorSubject, Observables, operadores tap e map |
| SCSS | — | Estilização — Design System com variáveis CSS customizadas |
| Angular CDK | — | Drag and drop nativo no board Kanban |
| json-server | 1 | API REST simulada — banco de dados local em JSON |
| Jest | — | Testes unitários — services, guards e componentes |
| Docker | — | Containerização — Dockerfile + docker-compose |

## Arquitetura

<img width="863" height="547" alt="image" src="https://github.com/user-attachments/assets/71313be4-e7b5-4346-b690-7a8577a9473c" />


## Funcionalidades

- Autenticação completa com login, registro, JWT e proteção de rotas via AuthGuard
- CRUD de projetos — criar, listar e deletar projetos com status (em andamento, pausado, concluído)
- Board Kanban com drag and drop entre colunas (A fazer, Em andamento, Concluído) usando Angular CDK
- Dashboard com métricas de projetos e tarefas
- Design System próprio com Button, Badge, Card e Modal reutilizáveis
- Formulários reativos com validação em tempo real
- HTTP Interceptor que injeta o token JWT automaticamente em todas as requisições
- Responsividade para desktop e mobile

## Como rodar localmente

**Pré-requisitos:** Node.js 20+, npm, Docker (opcional)

**1. Clone o repositório**
```bash
git clone https://github.com/Firmino03/TaskFlow.git
cd TaskFlow
```

**2. Instale as dependências**
```bash
npm install
```

**3. Suba a API simulada (terminal 1)**
```bash
npm run api
```

**4. Rode o Angular (terminal 2)**
```bash
ng serve
```

**5. Acesse** `http://localhost:4200`

Usuário padrão:
- Email: `karol@taskflow.com`
- Senha: `123456`

**Com Docker:**
```bash
docker-compose up
```
