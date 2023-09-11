const bancoDeDados = require('./bancodedados')


function verificarCPF(cpf) {
    return bancoDeDados.contas.find((conta) => conta.usuario.cpf === cpf) !== undefined;
}

function verificarEmail(email) {
    return bancoDeDados.contas.find((conta) => conta.usuario.email === email) !== undefined;
}




function formatarData(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    const hora = String(data.getHours()).padStart(2, '0');
    const minuto = String(data.getMinutes()).padStart(2, '0');
    const segundo = String(data.getSeconds()).padStart(2, '0');

    return `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
}


function encontrarContaPorNumero(numero_conta) {
    return bancoDeDados.contas.find((conta) => conta.numero === numero_conta);
}


module.exports = {
    formatarData,
    encontrarContaPorNumero,
    verificarCPF,
    verificarEmail
}