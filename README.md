```
# **> > Sistema de Gestão de Agenda - CulturArte Eventos < <**

# **>  Sobre o Projeto <**

O **> Sistema de Gestão de Agenda <**  **> CulturArte Eventos <**, foi desenvolvido para atender a necessidade crescente de uma ferramenta acessível e intuitiva para a administração de compromissos e eventos.
Este sistema visa oferecer uma solução abrangente e prática para a organização de agendas, proporcionando uma interface amigável com funções objetivas para facilitar a gestão de tempo.
Superando a complexidade do gerenciamento de dados, interface do usuário, e funcionalidades.
Essa aplicação visa organizar compromissos e eventos, visualizar a agenda, gerenciar tarefas, interface flexível, funcional e de fácil compreensão,
além de garantir um melhor desempenho e produtividade para os colaboradores no alcance e cumprimento das metas.

# **> Funcionalidades <**

- **Criação e Edição de Compromissos:** Adicione, modifique e exclua compromissos facilmente.**
- **Visualização de Agenda:** Visualize sua agenda em diferentes formatos (diário, semanal, mensal).**
- **Gerenciamento de Tarefas:** Adicione e acompanhe tarefas com prazos definidos.**

# **> Tecnologias Utilizadas <**

- **Front-end:** [React](https://reactjs.org/), [CSS](https://www.w3schools.com/css/)**
- **Back-end:** [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)**
- **Banco de Dados:** [MySql](https://www.mysql.com/)**
- **Gerenciamento de Pacotes:** [npm](https://www.npmjs.com/)**

# **> Instalação <**

### **Pré-requisitos**

**Antes de começar, certifique-se de ter instalado o seguinte em sua máquina:**

- **[Node.js](https://nodejs.org/) (versão 14 ou superior)**
- **[npm](https://www.npmjs.com/) (geralmente vem junto com o Node.js)**
- **[Mysql](https://www.mysql.com/) (local ou serviço na nuvem)**

# **> Clonando o Repositório <**

1. Abra o terminal.
2. Navegue até o diretório onde você deseja clonar o projeto.
3. Execute o seguinte comando:

   ```bash
   git clone https://github.com/jsvivis/SGA_CulturArte-Eventos.git
   ```

4. Acesse o diretório do projeto:

   ```bash
   cd nome-do-repositorio
   ```
### Instalando Dependências

1. No diretório do projeto, instale as dependências do back-end:

   ```bash
   cd backend
   npm install
   ```

2. Para o front-end, navegue até o diretório e instale as dependências:

   ```bash
   cd ../frontend
   npm install
   ```

### Configuração do Ambiente

Configuração do Banco de Dados
Criar o Banco de Dados:
Acesse seu cliente MySQL (por exemplo, MySQL Workbench ou via linha de comando) e crie um banco de dados:
CREATE DATABASE nome_do_banco;
Configurar as Tabelas:
Execute os scripts SQL fornecidos no diretório backend/sql para criar as tabelas necessárias.
Configuração do Ambiente:
Crie um arquivo .env no diretório backend e adicione suas variáveis de ambiente, incluindo detalhes de conexão com o MySQL:


DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
PORT=5000

2. **Inicie o Servidor:**
   No diretório `backend`, execute:

   ```bash
   npm start ou npm index.js
   ```

3. **Inicie o Front-end:**
   No diretório `frontend`, execute:

   ```bash
   npm start ou npm run dev
   ```

### Acesso à Aplicação

Após iniciar o servidor do back-end e do front-end, você poderá acessar a aplicação no navegador através do seguinte endereço:

```
http://localhost:5173/
```

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Agradecimentos

Agradeço a todos que contribuíram direta ou indiretamente para o desenvolvimento deste projeto. 
E espero ter conseguido descrever completamente o processo de desenvolvimento e os resultados desse trabalho.
 
---

```
