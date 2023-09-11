# Cubos Bank - API

Bem-vindo à API do Cubos Bank, um projeto piloto de um banco digital. Esta API permite a criação e gestão de contas bancárias, incluindo operações como depósito, saque, transferência e muito mais.

## Pré-requisitos

Antes de começar a usar a API do Cubos Bank, certifique-se de que possui os seguintes pré-requisitos instalados em sua máquina:

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes Node.js)
- Git (opcional, mas útil para clonar o repositório)

- Para testar todos os endpoints da API de forma simples e eficaz, é altamente recomendado usar uma ferramenta de teste de API, como o Insomnia.

O Insomnia é uma aplicação de código aberto que permite criar, testar e documentar suas APIs de maneira fácil e organizada. Com ele, você pode importar facilmente as solicitações de exemplo fornecidas aqui e fazer ajustes conforme necessário para testar sua API do Banco.

## Instalação

1. Clone este repositório (ou faça o download do código-fonte):

   ```bash
   git clone git@github.com:RalphCajazeira/cubos-bank-api.git


# Documentação da API do Banco

Bem-vindo à documentação da API do Banco! Esta documentação fornecerá informações detalhadas sobre como usar os endpoints e realizar operações bancárias por meio da API.

## Introdução

A API do Banco foi desenvolvida para fornecer funcionalidades de um banco digital, incluindo a criação de contas bancárias, depósitos, saques, transferências e muito mais. É importante seguir as instruções cuidadosamente para garantir o uso correto da API.

## Base URL

Certifique-se de que a API esteja em execução localmente em:

```
http://localhost:3000
```

## Autenticação

Alguns endpoints da API exigem autenticação com uma senha de banco. Certifique-se de incluir a senha do banco como um parâmetro em todas as solicitações que a exigirem.

Exemplo de parâmetro de senha de banco:
```
senha_banco=Cubos123Bank
```

## Endpoints Disponíveis

A API oferece os seguintes endpoints para realizar operações bancárias:

1. Listar Contas Bancárias
   - **Endpoint**: `GET /contas?senha_banco={senha_banco}`
   - Listar todas as contas bancárias existentes.

2. Criar Conta Bancária
   - **Endpoint**: `POST /contas`
   - Criar uma nova conta bancária.

3. Atualizar Dados do Usuário da Conta Bancária
   - **Endpoint**: `PUT /contas/{numeroConta}/usuario`
   - Atualizar os dados do usuário de uma conta bancária.

4. Excluir Conta Bancária
   - **Endpoint**: `DELETE /contas/{numeroConta}`
   - Excluir uma conta bancária existente.

5. Depositar
   - **Endpoint**: `POST /transacoes/depositar`
   - Realizar um depósito em uma conta bancária.

6. Sacar
   - **Endpoint**: `POST /transacoes/sacar`
   - Realizar um saque de uma conta bancária.

7. Transferir
   - **Endpoint**: `POST /transacoes/transferir`
   - Realizar uma transferência entre contas bancárias.

8. Consultar Saldo
   - **Endpoint**: `GET /contas/saldo?numero_conta={numero_conta}&senha={senha}`
   - Consultar o saldo de uma conta bancária.

9. Emitir Extrato
   - **Endpoint**: `GET /contas/extrato?numero_conta={numero_conta}&senha={senha}`
   - Emitir o extrato de uma conta bancária.

## Exemplos de Uso

## 1. Listar Contas Bancárias

- **Exemplo de Solicitação**:
  - Método: GET
  - URL: `http://localhost:3000/contas?senha_banco=Cubos123Bank`
 
    ![image](https://github.com/RalphCajazeira/cubos-bank-api/assets/130074637/d0141d05-c694-4536-b2e4-0a0e6fbeef00)

  
## 2. Criar Conta Bancária

- **Exemplo de Solicitação**:
  - Método: POST
  - URL: `http://localhost:3000/contas`
  - Corpo da Solicitação:
    ```json
    {
        "nome": "Exemplo de Nome",
        "cpf": "12345678901",
        "data_nascimento": "1990-01-01",
        "telefone": "71999998888",
        "email": "exemplo@email.com",
        "senha": "MinhaSenha123"
    }
    ```

    ![image](https://github.com/RalphCajazeira/cubos-bank-api/assets/130074637/65035e6a-f4df-4506-af81-e4efdd141fe5)


## 3. Atualizar Dados do Usuário da Conta Bancária

- **Exemplo de Solicitação**:
  - Método: PUT
  - URL: `http://localhost:3000/contas/1/usuario`
  - Corpo da Solicitação (exemplo de atualização de e-mail):
    ```json
    {
        "email": "novoemail@email.com"
    }
    ```
![image](https://github.com/RalphCajazeira/cubos-bank-api/assets/130074637/d28b3ad6-10f2-4332-8148-70c2ffb9649f)


## 4. Excluir Conta Bancária

- **Exemplo de Solicitação**:
  - Método: DELETE
  - URL: `http://localhost:3000/contas/1`

![image](https://github.com/RalphCajazeira/cubos-bank-api/assets/130074637/4177a457-e8c2-4c99-b340-d886bfc36eb8)


## 5. Depositar

- **Exemplo de Solicitação**:
  - Método: POST
  - URL: `http://localhost:3000/transacoes/depositar`
  - Corpo da Solicitação:
    ```json
    {
        "numero_conta": "1",
        "valor": 1000
    }
    ```
![image](https://github.com/RalphCajazeira/cubos-bank-api/assets/130074637/3bcd9ab5-6308-42c1-92ae-5992c95bc830)


## 6. Sacar

- **Exemplo de Solicitação**:
  - Método: POST
  - URL: `http://localhost:3000/transacoes/sacar`
  - Corpo da Solicitação:
    ```json
    {
        "numero_conta": "1",
        "valor": 500,
        "senha": "MinhaSenha123"
    }
    ```
![image](https://github.com/RalphCajazeira/cubos-bank-api/assets/130074637/85dd6c5c-c968-4aee-a644-be8adf85a330)


## 7. Transferir

- **Exemplo de Solicitação**:
  - Método: POST
  - URL: `http://localhost:3000/transacoes/transferir`
  - Corpo da Solicitação:
    ```json
    {
        "numero_conta_origem": "1",
        "numero_conta_destino": "2",
        "valor": 300,
        "senha": "MinhaSenha123"
    }
    ```
    ![image](https://github.com/RalphCajazeira/cubos-bank-api/assets/130074637/e89abc50-9c37-4a24-89e9-c0293012bb9b)


## 8. Consultar Saldo

- **Exemplo de Solicitação**:
  - Método: GET
  - URL: `http://localhost:3000/contas/saldo?numero_conta=1&senha=MinhaSenha123`

![image](https://github.com/RalphCajazeira/cubos-bank-api/assets/130074637/ce25d73d-7224-43d9-9704-8e0ee68fae54)


## 9. Emitir Extrato

- **Exemplo de Solicitação**:
  - Método: GET
  - URL: `http://localhost:3000/contas/extrato?numero_conta=1&senha=MinhaSenha123`

![image](https://github.com/RalphCajazeira/cubos-bank-api/assets/130074637/2fe04adc-dedf-41a0-b8ab-4de2d7dab77a)


Lembre-se de substituir "http://localhost:3000" pelo URL real da sua API, se necessário, e fornecer os parâmetros corretos e seguir as instruções de autenticação (quando necessário) para usar cada endpoint com sucesso.

## Contribuição

Este projeto é de código aberto, e contribuições são bem-vindas. Sinta-se à vontade para enviar problemas (issues) e solicitações de pull (pull requests) para melhorar a API.

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.
