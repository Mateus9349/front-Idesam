import api from './linkAPI.js'

async function dividirValorMateriaPrima(quantidadeTotal, valorInicial, quantidadeRetirada) {
    // Calcula o valor por unidade da matéria-prima
    const valorPorUnidade = Number(valorInicial) / Number(quantidadeTotal);

    // Calcula o valor da quantidade retirada
    const valorRetirada = valorPorUnidade * Number(quantidadeRetirada);

    // Calcula o valor restante da matéria-prima
    const valorRestante = Number(valorInicial) - valorRetirada;

    return {
        valorRetirada,
        valorRestante
    };
}

async function getValueLote(id) {
    let dadosApi = await fetch(`${api}/loteEntradas/${id}`);
    let dadosConvertidos = await dadosApi.json();
    return dadosConvertidos.valor_pago;
}

export const dividirProcessos = {
    getValueLote,
    dividirValorMateriaPrima
}