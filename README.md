# Talker - Manager
Este projeto é um Sistema de Gerenciamento de Palestrantes, é uma aplicação de backend construída utilizando Node.js e Express. Ela fornece um conjunto de endpoints de API para gerenciar palestrantes, permitindo aos usuários realizar operações CRUD, bem como adicionar, atualizar e excluir palestrantes. Também oferece funcionalidades de busca com base em critérios diferentes, como nome, avaliação e data.

## Tecnologias e Técnicas Utilizadas
- **Node.js e Express**: A aplicação é construída em cima do ambiente de execução JavaScript Node.js, e utiliza o framework Express para gerenciar as rotas e requisições HTTP.

- **JavaScript Moderno (ES6+)**: O código do projeto utiliza funcionalidades avançadas do JavaScript como arrow functions, desestruturação, e promessas.

- **Middleware**: O projeto faz uso extensivo de middlewares do Express para realizar validações, autenticação e processamento de requisições.

- **Validação de Dados**: Há uma abordagem robusta para validar dados recebidos em requisições, garantindo que apenas dados válidos sejam processados.

- **Tratamento de Erros**: O código inclui tratamento adequado de erros, com mensagens de erro descritivas e códigos de status HTTP apropriados.

- **Programação Assíncrona com async/await**: A aplicação faz uso extensivo de programação assíncrona com async/await para lidar com operações, como leitura e escrita de arquivos, garantindo que o código seja eficiente e não bloqueante.

- **Armazenamento de Dados em Arquivo JSON**: O projeto utiliza um arquivo JSON para armazenar os dados dos palestrantes. Isso demonstra a habilidade de trabalhar com diferentes formas de persistência de dados.

- **Gestão de Rotas**: As rotas são organizadas em arquivos separados para facilitar a manutenção e escalabilidade do projeto.

- **Segurança com Tokens**: A aplicação inclui autenticação utilizando tokens gerados aleatoriamente. Isso ajuda a proteger os endpoints sensíveis.
  
- **Persistência de Dados com fs:** O projeto utiliza o módulo fs do Node.js para ler e escrever dados no arquivo talker.json. Isso é essencial para a persistência de dados e a manipulação das informações dos palestrantes.

## Funcionalidades
- **Adicionar Palestrante:** Permite adicionar um novo palestrante com nome, idade e descrição da palestra.

- **Atualizar Palestrante:** Permite atualizar os detalhes de um palestrante existente.

- **Excluir Palestrante:** Possibilita excluir um palestrante pelo seu identificador único.

- **Buscar Palestrante:** Permite buscar palestrantes com base em critérios como nome, avaliação e data.

- **Editar Avaliação do Palestrante:** Permite editar a avaliação de um palestrante.

- **Obter Todos os Palestrantes:** Retorna uma lista de todos os palestrantes cadastrados.

- **Obter Palestrante por ID:** Retorna um palestrante específico pelo seu identificador único.

- **Autenticação de Usuário:** Permite autenticar um usuário para obter um token de acesso.

## Como usar com Docker
1. Inicie os containers:
```bash
docker-compose up -d
```
2. Acesse o terminal do container e inicie a aplicação:
```bash
docker exec -it talker_manager bash
npm start
# ou para iniciar com live-reload
npm run dev
```
3. testes:
```bash
docker exec -it talker_manager bash
npm test # Roda todos os testes
npm test 01 # Roda apenas o teste do requisito 01
```
## Sem Docker (Início Rápido)
Atenção: Certifique-se de ter a versão do Node 16 instalada.

Crie um arquivo .env na raiz do projeto seguindo o padrão do arquivo env.example e modifique de acordo com a necessidade.

Inicie a aplicação no container:
```bash
npm install
env $(cat .env) npm start
# ou para iniciar com live-reload
env $(cat .env) npm run dev
```
testes:
```bash
env $(cat .env) npm test # Roda todos os testes
env $(cat .env) npm test 01 # Roda apenas o teste do requisito 01
```
## Restaurar Estado Inicial
Se precisar restaurar o arquivo src/talker.json para seu estado inicial, utilize o comando:
```bash
npm run restore
```
## Porta em Uso
Se encontrar o erro EADDRINUSE: address already in use 0.0.0.0:3001, execute o seguinte comando em seu terminal:
```bash
killall -9 node
```

