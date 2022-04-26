# Car rental typescript API

## Descrição do projeto
<p> O projeto contempla a criação de uma REST api para uma empresa de aluguel de carros possuindo endpoints para cadastro de usuários e de carros feitos com paginação além disso possui endpoint para autenticação com token JWT, para a construção forma utilizadas ferramentas como NodeJS com TypeScript e express, para banco de dados mongoDB e docker </p>

## Features
### Autenticação
- Autenticação na aplicação com token JWT
### Clientes
- Cadastro de um novo cliente
    - Quando cliente novo for cadastrado vai receber o token de autenticação automaticamente
    - O cliente sempre vai ter um campo se possui habilitação
- Listagem de todos os clientes cadastrados    
- Listagem de um cliente pelo seu ID
- Atualização dos dados de um cliente
- Remoção de um cliente
### Carros
- Cadastro de um novo carro
    - O carro cadastrado precisa ter acessórios presentes
- Listagem de todos os carros cadastrados
- Listagem de um carro pesquisando por sua cor, modelo ou ano
- Listagem de um carro pelo seu ID
- Atualização dos dados de um carro
- Remoção de um carro

## Instalação com docker
Criação do container
Para crição do banco no docker é preciso trocar o DATABASE_HOST no arquivo .env.local para 'db'
```bash
docker-compose up
```
> As dependências do projeto serão baixadas e instaladas automaticamente juntamente com banco de dados mongoDB, a API e seus endpoints estarão disponíveis na URL http://localhost:3000

## Instalação local
Para crição local é preciso trocar o DATABASE_HOST no arquivo .env.local para '127.0.0.1' e ter o mongoDB instalado na máquina <br>

Instalar dependências
```bash
npm install
```

Compilar o projeto <br>
```bash
npm run build
```

Executar aplicação
Após a compilação o arquivo compilado de TS para JS vai ser criado e assim disponível para execução
```bash
npm run start
```

Localmente a API pode ser inicializada com o comando de desenvolvimento onde não é feita a compilação do código TypeScript
```bash
npm run dev
```
> A API estará disponível na URL http://localhost:3000

## Endpoints

### Autenticação
- (POST) Autentica '/api/v1/authenticate'

### Clientes
- (POST) Cadastra '/api/v1/people'
- (GET) Lista de todos registros '/api/v1/people?limit=&offset='
- (GET) Consulta pelo ID '/api/v1/people/{id}'
- (PUT) Atualiza pelo ID '/api/v1/people/{id}'
- (DELETE) Remove pelo ID '/api/v1/people/{id}'

### Carros
- (POST) Cadastra '/api/v1/car'
- (GET) Lista todos os registros '/api/v1/car?limit=&offset='
- (GET) Lista dos registros pela cor, modelo ou ano '/api/v1/car?limit=&offset=&color=&model=&year='
- (GET) Consulta pelo ID '/api/v1/car/{id}'
- (PUT) Atualiza pelo ID '/api/v1/car/{id}'
- (DELETE) Remove pelo ID '/api/v1/car/{id}'