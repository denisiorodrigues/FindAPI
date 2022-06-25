## FinAPI - Financeiro

Aplicativo financeiro feito em NodeJS para laboratório de estudos
---

### REQUISITOS

RQ1- [x] Deve ser possível criar um conta
RQ2- [x] Deve ser possível buscar o extrato bancário do cliente
RQ3- [x] Deve ser possível realizar um deposíto
RQ4- [x] Deve ser possível realizar um saque
RQ5- [x] Deve ser possível buscar o extrato bancário do cliente por data
RQ6- [] Deve ser possível atualizar dados da conta do cliente
RQ7- [] Deve ser possível obter dados da conta do cliente
RQ8- [] Deve ser possível deletar uma conta


### REGRAS DE NEGÓCIO

RN1- [x] Não deve ser possível cadastrar uma conta cp, CPF já existente
RN2- [x] Não deve ser possível fazer um depósito em uma conta não existente
RN3- [x] Não deve ser possível buscar um extrato em uma conta não existente
RN4- [x] Não deve ser possível fazer um saque em uma conta não existente
RN5- [] Não deve ser possível excluir uma conta não existente
RN6- [x] Não deve ser possível fazer um saque quando o saldo for insuficiente