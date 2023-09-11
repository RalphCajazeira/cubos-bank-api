const bancoDeDados = require('../bancodedados')
const { formatarData, encontrarContaPorNumero } = require('../auxiliares')


function criarConta(req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
    }

    const contaExistente = bancoDeDados.contas.find(
        (conta) => conta.usuario.cpf === cpf || conta.usuario.email === email
    );
    if (contaExistente) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o CPF ou e-mail informado!' });
    }

    const novoNumeroConta = (bancoDeDados.contas.length + 1).toString();

    const novaConta = {
        numero: novoNumeroConta,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha,
        },
    };

    bancoDeDados.contas.push(novaConta);

    res.status(201).json({ mensagem: 'Conta criada com sucesso!' });
}



function listarContas(req, res) {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(400).json({ mensagem: 'A senha do banco é obrigatória!' });
    }

    if (senha_banco !== bancoDeDados.banco.senha) {
        return res.status(401).json({ mensagem: 'A senha do banco informada é inválida!' });
    }

    return res.status(200).json(bancoDeDados.contas);
}




function atualizarUsuario(req, res) {
    const numeroConta = req.params.numeroConta;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const conta = bancoDeDados.contas.find((conta) => conta.numero === numeroConta);
    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontrada!' });
    }

    const cpfExistente = bancoDeDados.contas.find(
        (conta) => conta.usuario.cpf === cpf && conta.numero !== numeroConta
    );
    if (cpfExistente) {
        return res.status(400).json({ mensagem: 'O CPF informado já existe cadastrado!' });
    }

    const emailExistente = bancoDeDados.contas.find(
        (conta) => conta.usuario.email === email && conta.numero !== numeroConta
    );
    if (emailExistente) {
        return res.status(400).json({ mensagem: 'O e-mail informado já existe cadastrado!' });
    }

    if (nome) conta.usuario.nome = nome;
    if (cpf) conta.usuario.cpf = cpf;
    if (data_nascimento) conta.usuario.data_nascimento = data_nascimento;
    if (telefone) conta.usuario.telefone = telefone;
    if (email) conta.usuario.email = email;
    if (senha) conta.usuario.senha = senha;

    res.status(204).send();
}


function excluirConta(req, res) {
    const numeroConta = req.params.numeroConta;

    const conta = bancoDeDados.contas.find((conta) => conta.numero === numeroConta);
    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontrada!' });
    }

    if (conta.saldo !== 0) {
        return res.status(400).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
    }

    bancoDeDados.contas = bancoDeDados.contas.filter((conta) => conta.numero !== numeroConta);

    res.status(204).send();
}



function depositar(req, res) {
    const { numero_conta, valor } = req.body;

    if (!numero_conta || valor === undefined) {
        return res.status(400).json({ mensagem: 'O número da conta e o valor são obrigatórios!' });
    }

    const conta = encontrarContaPorNumero(numero_conta);
    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontrada!' });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor do depósito deve ser maior que zero!' });
    }

    conta.saldo += valor;

    const dataAtual = new Date();
    const dataFormatada = formatarData(dataAtual);

    bancoDeDados.depositos.push({
        data: dataFormatada,
        numero_conta,
        valor,
    });

    res.status(204).send();
}


function sacar(req, res) {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta || valor === undefined || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta, valor do saque e senha são obrigatórios!' });
    }

    const conta = encontrarContaPorNumero(numero_conta);

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontrada!' });
    }

    if (senha !== conta.usuario.senha) {
        return res.status(401).json({ mensagem: 'Senha incorreta!' });
    }

    if (valor <= 0 || valor > conta.saldo) {
        return res.status(400).json({ mensagem: 'O valor não pode ser menor que zero!' });
    }

    conta.saldo -= valor;

    const dataAtual = new Date();
    const dataFormatada = formatarData(dataAtual);

    bancoDeDados.saques.push({
        data: dataFormatada,
        numero_conta,
        valor,
    });

    res.status(204).send();
}




function transferir(req, res) {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem || !numero_conta_destino || valor === undefined || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta de origem, número da conta de destino, valor da transferência e senha são obrigatórios!' });
    }

    const contaOrigem = bancoDeDados.contas.find((conta) => conta.numero === numero_conta_origem);
    const contaDestino = bancoDeDados.contas.find((conta) => conta.numero === numero_conta_destino);

    if (!contaOrigem || !contaDestino) {
        return res.status(404).json({ mensagem: 'Conta bancária de origem ou destino não encontrada!' });
    }

    if (senha !== contaOrigem.usuario.senha) {
        return res.status(401).json({ mensagem: 'Senha incorreta!' });
    }

    if (valor <= 0 || valor > contaOrigem.saldo) {
        return res.status(400).json({ mensagem: 'Valor de transferência inválido ou saldo insuficiente!' });
    }

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    const dataAtual = new Date();
    const dataFormatada = formatarData(dataAtual);

    bancoDeDados.transferencias.push({
        data: dataFormatada,
        numero_conta_origem,
        numero_conta_destino,
        valor,
    });

    res.status(204).send();
}



function consultarSaldo(req, res) {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta e a senha são obrigatórios!' });
    }

    const conta = encontrarContaPorNumero(numero_conta);

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontrada!' });
    }

    if (senha !== conta.usuario.senha) {
        return res.status(401).json({ mensagem: 'Senha incorreta!' });
    }

    return res.status(200).json({ saldo: conta.saldo });
}


function emitirExtrato(req, res) {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta e a senha são obrigatórios!' });
    }

    const conta = encontrarContaPorNumero(numero_conta);

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontrada!' });
    }

    if (senha !== conta.usuario.senha) {
        return res.status(401).json({ mensagem: 'Senha incorreta!' });
    }

    const extrato = {
        depositos: bancoDeDados.depositos.filter((deposito) => deposito.numero_conta === numero_conta),
        saques: bancoDeDados.saques.filter((saque) => saque.numero_conta === numero_conta),
        transferenciasEnviadas: bancoDeDados.transferencias.filter(
            (transferencia) => transferencia.numero_conta_origem === numero_conta
        ),
        transferenciasRecebidas: bancoDeDados.transferencias.filter(
            (transferencia) => transferencia.numero_conta_destino === numero_conta
        ),
    };

    return res.status(200).json(extrato);
}



module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta,
    depositar,
    sacar,
    transferir,
    consultarSaldo,
    emitirExtrato
}

