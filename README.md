# 📚 Sistema de Notas da Escola Conhecimento  

Este projeto é um sistema de gerenciamento de notas desenvolvido para a **Escola Conhecimento**. A aplicação permite que os usuários façam login, visualizem a lista de alunos e acessem os boletins de notas.  

---

## 📁 Estrutura do Projeto  

A organização do código segue uma estrutura modular para facilitar a manutenção e escalabilidade.  

### **📂 public/**  
Contém arquivos públicos que não são processados pelo Webpack.  
- 📝 `index.html`: Arquivo HTML principal.  
- ⚙️ `manifest.json`: Configurações do PWA.  
- 🤖 `robots.txt`: Configurações para indexação por motores de busca.  

### **📂 src/**  
Diretório principal contendo todo o código-fonte da aplicação.  
- 🔗 `api.js`: Configuração do **Axios** para requisições HTTP.  
- 🏠 `App.js` e `App.jsx`: Componentes principais da aplicação.  
- 🎨 `App.css` e `index.css`: Estilos globais.  
- 🚀 `index.js`: Ponto de entrada da aplicação.  

#### **📂 assets/**  
📷 Armazena arquivos de mídia, como imagens.  

#### **📂 components/**  
🧩 Componentes reutilizáveis da aplicação.  
- 🏷️ `header.jsx`: Componente de cabeçalho.  
- 🔓 `logout-button.jsx`: Botão de logout.  

#### **📂 pages/**  
📄 Componentes das páginas principais.  
- **📂 components/**: Componentes específicos de páginas.  
  - 📝 `report-card.jsx`: Componente de boletim.  
  - 📋 `students-list.jsx`: Componente de lista de alunos.  

#### **📂 routes/**  
🛤️ Configuração das rotas da aplicação.  
- 🔀 `index.jsx`: Define e gerencia as rotas com **react-router-dom**.  

#### **📂 services/**  
🔧 Serviços para comunicação com a API.  
- 🔑 `authService.js`: Serviço de autenticação.  

---

## ⚙️ Pré-requisitos  

Antes de instalar e executar o projeto, certifique-se de ter as seguintes dependências instaladas:  

- **📌 Node.js**  
- **📌 npm** (ou **yarn**)  

---

## 🚀 Instalação  

Siga os passos abaixo para clonar e rodar o projeto localmente:  

```sh
# 1️⃣ Clone o repositório  
git clone https://github.com/seu-usuario/front-report-card.git  

# 2️⃣ Acesse o diretório do projeto  
cd front-report-card  

# 3️⃣ Instale as dependências  
npm install  
# ou  
yarn install  

# 4️⃣ Inicie o servidor de desenvolvimento  
npm start  
# ou  
yarn start  

📌 Funcionalidades

✔️ Autenticação: Implementada no componente login.jsx e gerenciada pelo serviço authService.js.
✔️ Navegação: Controlada pelo react-router-dom em App.jsx e routes/index.jsx.
✔️ Requisições HTTP: Feitas com Axios, configurado em api.js.
✔️ Estilização: Utilização de styled-components para personalização visual.
✔️ Componentes Reutilizáveis: Como Header e LogoutButton.
📜 Licença

Este projeto é distribuído sob a Licença MIT. Consulte o arquivo LICENSE para mais detalhes.

💡 Feito com ❤️ para a Escola Conhecimento 🎓