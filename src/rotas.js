const { Router } = require('express')
const contas = require('./controller/contas')

const rotas = Router()


rotas.get('/contas', contas.listarContas)
rotas.post('/contas', contas.criarConta)
rotas.put('/contas/:numeroConta/usuario', contas.atualizarUsuario)
rotas.delete('/contas/:numeroConta', contas.excluirConta)
rotas.post('/transacoes/depositar', contas.depositar)
rotas.post('/transacoes/sacar', contas.sacar)
rotas.post('/transacoes/transferir', contas.transferir)
rotas.get('/contas/saldo', contas.consultarSaldo)
rotas.get('/contas/extrato', contas.emitirExtrato)


module.exports = rotas