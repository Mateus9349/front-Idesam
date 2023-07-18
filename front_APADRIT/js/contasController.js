import api from './linkAPI.js'

async function pagarConta(tipo, descricao, valor, pago){
    const conexao = await fetch(`${api}/contas`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            tipo: tipo,
            descricao: descricao,
            valor: valor,
            pago: pago
        })
    });
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

export const contas = {
    pagarConta,
}
