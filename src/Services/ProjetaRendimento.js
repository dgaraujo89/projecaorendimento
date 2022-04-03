// entradas
const parametros = {
    capitalInicial: 0.0,
    valorAplicacaoMensal: 0.0,
    periodoAplicacao: 0, // em anos
    tempoAplicacaoMensal: 0, // em anos
    taxaRedimento: 0, // em percentual pelo periodo
    retiradas: [
        {
            valor: 0.0,
            ano: 0,
            mes: 0,
            ajustaTaxa: false,
            novaTaxa: 0
        }
    ]
}

var meses = [];
var anos = [];

function projetaRendimentos() {
    meses = [];
    anos = [];

    const controle = {
        saldo: 0.0,
        valorAplicadoMes: 0.0,
        valorTotalAplicado: 0.0,
        valorTotalRendido: 0.0,
        percentualTotalRendido: 0.0
    }

    for(var mes = 1; mes <= parametros.periodoAplicacao * 12; mes++) {
        if(mes == 1) {
            controle.saldo = parametros.capitalInicial;
            controle.valorTotalAplicado = parametros.capitalInicial;
            controle.valorAplicadoMes = parametros.capitalInicial;
        } else {
            var retirada = obtemRetirada(mes);
            
            if(retirada != null) {
                var valorRetirado = efetuaRetirada(retirada);
                controle.saldo -= valorRetirado;
                controle.valorAplicadoMes = valorRetirado * -1;
            } else if(mes <= parametros.tempoAplicacaoMensal * 12) {
                controle.saldo += parametros.valorAplicacaoMensal;
                controle.valorTotalAplicado += parametros.valorAplicacaoMensal;
                controle.valorAplicadoMes = parametros.valorAplicacaoMensal;
            } else {
                controle.valorAplicadoMes = 0;
            }
        }

        // console.log(`Mes: ${mes}, Ref: ${parametros.tempoAplicacaoMensal * 12}`)

        var rendimento = calculaRendimento(controle.saldo)
        controle.saldo += rendimento;
        controle.valorTotalRendido += rendimento;

        controle.percentualTotalRendido = ((controle.saldo - controle.valorTotalAplicado) / controle.valorTotalAplicado) * 100;

        registraProjecao(mes, {
            saldo: controle.saldo,
            valorAplicadoMes: controle.valorAplicadoMes,
            valorTotalAplicado: controle.valorTotalAplicado,
            valorTotalRendido: controle.valorTotalRendido,
            percentualTotalRendido: controle.percentualTotalRendido,
            rendimento: rendimento,
            taxa: parametros.taxaRedimento
        });
    }
}

function obtemRetirada(mes) {
    var retiradas = parametros.retiradas.filter(r => {
        if(mes >= ((r.ano) * 12 + r.mes)) {
            return true;
        }

        return false;
    });

    if(retiradas.length == 0) {
        return null;
    }

    return retiradas[retiradas.length - 1];
}

function efetuaRetirada(retirada) {
    if(retirada.ajustaTaxa) {
        parametros.taxaRedimento = retirada.novaTaxa;
    }

    return retirada.valor;
}

function registraProjecao(mes, dados) {
    meses.push({
        saldo: dados.saldo,
        valorAplicadoMes: dados.valorAplicadoMes,
        valorTotalAplicado: dados.valorTotalAplicado,
        valorTotalRendido: dados.valorTotalRendido,
        percentualTotalRendido: dados.percentualTotalRendido,
        rendimento: dados.rendimento,
        taxa: dados.taxa
    });

    if(mes % 12 == 0) {
        anos.push({
            saldo: dados.saldo,
            valorTotalAplicado: dados.valorTotalAplicado,
            valorTotalRendido: dados.valorTotalRendido,
            percentualTotalRendido: dados.percentualTotalRendido
        });
    }
}

function calculaRendimento(valor) {
    return valor * (parametros.taxaRedimento / 100);
}

function calcular({capitalInicial, valorAplicacaoMensal, periodoAplicacao, tempoAplicacaoMensal, taxa, retiradas}) {
    parametros.capitalInicial = capitalInicial;
    parametros.valorAplicacaoMensal = valorAplicacaoMensal;
    parametros.periodoAplicacao = periodoAplicacao;
    parametros.tempoAplicacaoMensal = tempoAplicacaoMensal;
    parametros.taxaRedimento = taxa;
    parametros.retiradas = retiradas;

    projetaRendimentos();

    return {
        meses,
        anos
    }
}

export default calcular