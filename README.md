# Clean Energy Simulator

Simulador para cálculo de economia de energia e captura de leads para empresas de energia renovável.

![Logo Clean Energy Simulator](public/logo.png)

## 🚀 Visão Geral

O Clean Energy Simulator é uma plataforma full stack desenvolvida em Next.js 15 (App Router), TypeScript, TailwindCSS, Prisma e PostgreSQL, com banco de dados pronto para rodar via Docker.  
Usuários simulam sua economia ao migrar para energia limpa e cadastram seus dados para contato comercial.  
O painel admin é protegido por autenticação e permite gerenciar leads facilmente.

---

## ✨ Funcionalidades

- **Simulação Pública:** Calcula economia de 25% na conta de energia com formulário validado.
- **Armazenamento de Leads:** Todos os dados ficam salvos no banco PostgreSQL.
- **Painel Admin:** Login seguro, listagem, exclusão e exportação CSV de leads.
- **Exportação CSV compatível com Excel PT-BR.**
- **Feedback visual:** Toasts e mensagens amigáveis com Sonner/shadcn-ui.
- **Responsividade e design moderno.**

---

## 🛠️ Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) + [Sonner](https://sonner.emilkowal.ski/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

---

## ⚙️ Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seuusuario/clean-energy-simulator.git
cd clean-energy-simulator


#### 2. Instale as dependências

```bash
npm install
```
### 3. Configure o banco de dados
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/clean_energy_db"
ADMIN_EMAIL=admin@clean.com
ADMIN_PASSWORD=sua-senha-aqui
```
### 4. Inicie o Docker
```bash
docker-compose up -d
```
### 5. Rode as migrações do Prisma

```bash
npx prisma migrate dev --name init  
```
### 6. Inicie o servidor de desenvolvimento

```bash
npm run dev
``` 
### 7. Acesse o simulador
Abra seu navegador e acesse `http://localhost:3000`.

### 8. Acesse o painel admin 🧑‍💼
Abra `http://localhost:3000/admin` e faça login com as credenciais definidas no `.env`.

### 9. Teste a simulação 
Preencha o formulário com os dados de consumo e veja a economia calculada.

### 10. Gerencie os leads
No painel admin, você pode visualizar, excluir e exportar os leads cadastrados.

## 📄 Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

### Estrutura do Projeto

```
.
app/
  simulation/           # Página pública de simulação
  admin/
    login/              # Tela de login admin
    leads/              # Painel admin de leads
  api/
    leads/              # API de leads (GET, POST, DELETE)
    admin/
      login/            # API login admin
      logout/           # API logout admin
    leads/export/       # Exportação de leads (CSV)
components/             # Componentes de UI (shadcn/ui)
prisma/                 # Schema, migrations
public/                 # Logo, favicon

```
## Contribuição
